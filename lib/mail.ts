import { Resend } from 'resend';
import nodemailer from 'nodemailer';
import { PasswordReset } from '@/components/auth/emails/password-reset';
import { EmailVerification } from '@/components/auth/emails/email-verification';
import { TwoFactorAuthentication } from '@/components/auth/emails/two-factor-authentication';
import { render } from '@react-email/render';


const domain = process.env.NEXT_PUBLIC_AUTH_URL;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,     // your@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // App-specific password
  },
});

export async function sendVerificationEmail(
  name: string | null,
  email: string,
  token: string
) {
  const verifyLink = `${domain}/auth/email-verification?token=${token}`;

  const html = await render(EmailVerification({ name, verifyLink }));

  await transporter.sendMail({
    from: `"Yeti" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html,
  });
}

export async function sendPasswordResetEmail(
  name: string | null,
  email: string,
  token: string
) {
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  const html = await render(PasswordReset({ name, resetLink }));

  await transporter.sendMail({
    from: `"Yeti" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html,
  });
}

export async function sendTwoFactorTokenEmail(
  name: string | null,
  email: string,
  token: string
) {
  const html = await render(TwoFactorAuthentication({ name, token }));

  await transporter.sendMail({
    from: `"Yeti" <${process.env.GMAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html,
  });
}
