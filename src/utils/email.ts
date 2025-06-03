// src/utils/email.ts

import nodemailer from "nodemailer";

// Configuração do transporter. No .env definimos SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, // deve ser "smtp.mailtrap.io"
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER, // ex: "bc1b29a58e4e6a"
    pass: process.env.SMTP_PASS, // ex: "df85e988a2d26b"
  },
});

export async function sendVerificationEmail(to: string, token: string) {
  // Link que o usuário deve clicar. FRONTEND_URL vem do .env
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Gamo App" <${process.env.SMTP_FROM}>`,
    to,
    subject: "Confirm your email",
    html: `
      <p>Hello,</p>
      <p>Please confirm your email by clicking the link below:</p>
      <a href="${verificationUrl}">Confirm Email</a>
      <p>This link will expire in 24 hours.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
