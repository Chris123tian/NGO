import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, amount, reference, callback_url } = body;

    const secretKey = process.env.PAYSTACK_SECRET_KEY;

    if (!secretKey) {
      // Return simulated success if Paystack secret key not configured yet
      return NextResponse.json({
        status: true,
        message: 'Simulation mode: PAYSTACK_SECRET_KEY not set in environment.',
        data: {
          authorization_url: null,
          reference
        }
      });
    }

    // Call Paystack API
    const response = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secretKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        amount: Math.round(amount * 100), // convert GHS to pesewas
        currency: 'GHS',
        reference,
        callback_url
      })
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { status: false, message: error.message || 'Payment initialization failed' },
      { status: 500 }
    );
  }
}
