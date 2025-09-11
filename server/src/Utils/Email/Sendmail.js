import { SMTPClient } from 'emailjs';

const client = new SMTPClient({
  user: process.env.EMAIL_USER,
  password: process.env.EMAIL_PASSWORD,
  host: process.env.EMAIL_HOST,
  ssl: true,
});

/**
 * Send an email using the SMTP client.
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} text - Plain text message body
 * @returns {Promise<object>} - Resolves with emailjs response
 */
export const sendEmail = async (to, subject, text) => {
  return new Promise((resolve, reject) => {
    client.send(
      {
        to,
        from: `Urban Eats <${process.env.EMAIL_USER}>`,
        subject,
        text,
      },
      (error, msg) => (error ? reject(error) : resolve(msg))
    );
  });
};
