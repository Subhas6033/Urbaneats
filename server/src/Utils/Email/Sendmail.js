import { asyncHandeler } from '../AsyncHandeler.js';
import { APIERROR } from '../APIERR.js';
import { APIRESPONSE } from '../APIRES.js';
import { SMTPClient } from 'emailjs';

const sendEmail = (subject, message) =>
  asyncHandeler(async (req, res) => {
    console.log(req.body);
    const { email } = req.body;
    const client = new SMTPClient({
      user: process.env.EMAIL_USER,
      password: process.env.EMAIL_PASSWORD,
      host: process.env.EMAIL_HOST,
      ssl: true,
    });

    const mailResponse = new Promise((resolve, reject) => {
      try {
        client.send(
          {
            to: email,
            from: `Urban Eats <${process.env.EMAIL_USER}>`,
            subject: subject,
            message: message,
          },
          (error, msg) => (error ? reject(error) : resolve(msg))
        );
        return res
          .status(200)
          .json(
            new APIRESPONSE(200, mailResponse, 'Successfully sent the email')
          );
      } catch (error) {
        console.log(error);
        throw new APIERROR(
          502,
          'Internal Server Error While Sending the Email'
        );
      }
    });
  });

export { sendEmail };
