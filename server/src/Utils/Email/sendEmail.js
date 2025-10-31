import emailjs from '@emailjs/nodejs';
import { APIERROR } from '../APIERR.js';

/**
 * Send an email using EmailJS with dynamic template and data.
 *
 * @param {string} templateId - The EmailJS template ID.
 * @param {object} templateData - Key-value pairs matching your template variables.
 * @returns {Promise<object>} EmailJS response object.
 */
export const sendEmail = async (templateId, templateData) => {
  if (!templateId || !templateData || typeof templateData !== 'object') {
    throw new APIERROR(400, 'Invalid or missing template parameters');
  }

  try {
    const response = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID,
      templateId,
      templateData,
      {
        publicKey: process.env.EMAILJS_PUBLIC_KEY,
        privateKey: process.env.EMAILJS_PRIVATE_KEY,
      }
    );

    console.log('Email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('EmailJS Error:', error);
    throw new APIERROR(500, error.text || 'Failed to send email');
  }
};
