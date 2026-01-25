import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body || !body.name || !body.email || !body.items) {
    return NextResponse.json(
      { ok: false, error: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { name, email, phone, message, items } = body;

  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;

  if (!toEmail || !fromEmail) {
    return NextResponse.json(
      { ok: false, error: 'Contact email is not configured' },
      { status: 500 }
    );
  }

  if (!apiKey) {
    return NextResponse.json(
      { ok: false, error: 'Resend API key is not configured' },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const subject = `Quote Request from ${name}`;
    
    const itemsList = items
      .map((item: any) => `<li><strong>${item.name}</strong> (${item.type}) - Quantity: ${item.quantity}</li>`)
      .join('');

    const html = `
      <h2>New Quote Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || '-'}</p>
      ${message ? `<p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br />')}</p>` : ''}
      
      <h3>Requested Items:</h3>
      <ul>${itemsList}</ul>
      
      <p><em>Total Items: ${items.reduce((sum: number, item: any) => sum + item.quantity, 0)}</em></p>
    `;

    const result = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject,
      html,
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return NextResponse.json(
        { ok: false, error: result.error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Error sending quote email:', error);
    return NextResponse.json(
      { ok: false, error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
