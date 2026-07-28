import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    console.log('Contact API called');
    const apiKey = process.env.RESEND_API_KEY;
    
    console.log('API Key exists:', !!apiKey);
    
    if (!apiKey) {
      console.error('Resend API key is not configured');
      return NextResponse.json(
        { error: 'Resend API key is not configured' },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);
    
    const body = await request.json();
    const { name, email, subject, message } = body;

    console.log('Form data:', { name, email, subject, message: message?.substring(0, 50) + '...' });

    if (!name || !email || !subject || !message) {
      console.error('Missing required fields');
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    console.log('Sending email via Resend to: fofie_joel@yahoo.fr');
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'fofie_joel@yahoo.fr',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
            .container { max-width: 600px; margin: 0 auto; }
            .header { background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 40px 30px; text-align: center; border-radius: 12px 12px 0 0; }
            .header h1 { color: white; margin: 0; font-size: 28px; font-weight: 600; }
            .header p { color: rgba(255,255,255,0.9); margin: 10px 0 0; font-size: 16px; }
            .hero-image { width: 100%; height: 200px; background: linear-gradient(135deg, #fed7aa 0%, #fdba74 100%); display: flex; align-items: center; justify-content: center; font-size: 48px; }
            .content { background: #ffffff; padding: 30px; }
            .section { margin-bottom: 25px; }
            .section-title { font-size: 18px; font-weight: 600; color: #111827; margin-bottom: 15px; }
            .field { margin-bottom: 20px; }
            .label { font-weight: 600; color: #6b7280; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
            .value { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316; font-size: 15px; color: #374151; }
            .message-box { white-space: pre-wrap; }
            .steps { background: #f9fafb; padding: 25px; border-radius: 8px; margin: 25px 0; }
            .step { display: flex; margin-bottom: 20px; }
            .step:last-child { margin-bottom: 0; }
            .step-number { width: 32px; height: 32px; background: #f97316; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 16px; flex-shrink: 0; margin-right: 15px; }
            .step-content { flex: 1; }
            .step-title { font-weight: 600; color: #111827; margin-bottom: 4px; }
            .step-desc { font-size: 14px; color: #6b7280; }
            .cta-button { display: inline-block; background: #2563eb; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; text-align: center; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; color: #9ca3af; font-size: 13px; border-top: 1px solid #e5e7eb; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Message from your Portfolio</h1>
              <p>You've received a new message through your contact form</p>
            </div>
            <div class="content">
              <div class="section">
                <div class="section-title">Message Details</div>
                <div class="field">
                  <div class="label">From</div>
                  <div class="value">${name} &lt;${email}&gt;</div>
                </div>
                <div class="field">
                  <div class="label">Subject</div>
                  <div class="value">${subject}</div>
                </div>
                <div class="field">
                  <div class="label">Message</div>
                  <div class="value message-box">${message}</div>
                </div>
              </div>
              <div class="steps">
                <div class="section-title" style="margin-top: 0;">What happens next?</div>
                <div class="step">
                  <div class="step-number">1</div>
                  <div class="step-content">
                    <div class="step-title">Review the message</div>
                    <div class="step-desc">Take a look at the details above to understand the inquiry.</div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">2</div>
                  <div class="step-content">
                    <div class="step-title">Respond promptly</div>
                    <div class="step-desc">Reply to ${email} to continue the conversation.</div>
                  </div>
                </div>
                <div class="step">
                  <div class="step-number">3</div>
                  <div class="step-content">
                    <div class="step-title">Build the connection</div>
                    <div class="step-desc">Turn this inquiry into a meaningful professional relationship.</div>
                  </div>
                </div>
              </div>
              <div style="text-align: center;">
                <a href="#" class="cta-button">Visit Portfolio</a>
              </div>
            </div>
            <div class="footer">
              <p>Sent from your portfolio contact form</p>
            </div>
          </div>
        </body>
        </html>
      `,
      replyTo: email,
    });

    console.log('Resend response:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error sending email:', error);
    console.error('Error details:', JSON.stringify(error, null, 2));
    return NextResponse.json(
      { error: 'Failed to send email', details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
