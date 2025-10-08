import { SMTPClient } from 'emailjs';

export const sendEmail = async (to, subject, text, html) => {
  const client = new SMTPClient({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASSWORD,
    host: process.env.EMAIL_HOST,
    ssl: true,
  });

  try {
    const mailResponse = await new Promise((resolve, reject) => {
      client.send(
        {
          text,
          attachment: [{ data: html, alternative: true }],
          from: `Urban Eats <${process.env.EMAIL_USER}>`,
          to,
          subject,
        },
        (err, msg) => (err ? reject(err) : resolve(msg))
      );
    });

    console.log('Email sent:', mailResponse);
    return mailResponse;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Email sending failed: ${error.message}`);
  }
};
