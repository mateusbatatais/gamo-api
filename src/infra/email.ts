import nodemailer from "nodemailer";

// Templates de e-mail independentes de arquivos frontend
const EMAIL_TEMPLATES = {
  verify: {
    pt: {
      subject: "Verifique seu e-mail",
      body: (link: string) =>
        `<p>Clique no link para verificar seu e-mail: <a href="${link}">Verificar E-mail</a></p>`,
    },
    en: {
      subject: "Verify your email",
      body: (link: string) =>
        `<p>Click the link to verify your email: <a href="${link}">Verify Email</a></p>`,
    },
    es: {
      subject: "Verifique su correo electrónico",
      body: (link: string) =>
        `<p>Haga clic en el enlace para verificar su correo electrónico: <a href="${link}">Verificar Email</a></p>`,
    },
  },
  recover: {
    pt: {
      subject: "Recuperação de senha",
      body: (link: string) =>
        `<p>Clique no link para redefinir sua senha: <a href="${link}">Redefinir Senha</a></p>`,
    },
    en: {
      subject: "Password recovery",
      body: (link: string) =>
        `<p>Click the link to reset your password: <a href="${link}">Reset Password</a></p>`,
    },
    es: {
      subject: "Recuperación de contraseña",
      body: (link: string) =>
        `<p>Haga clic en el enlace para restablecer su contraseña: <a href="${link}">Restablecer contraseña</a></p>`,
    },
  },
};

// Configuração do transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envia e-mail de verificação de conta.
 * @param to - E-mail do destinatário
 * @param token - Token de verificação
 * @param locale - Idioma (pt, en, es)
 */

type Locale = "pt" | "en" | "es";

export async function sendVerificationEmail(to: string, token: string, locale: Locale = "pt") {
  // Seleciona template ou usa português como fallback
  const template = EMAIL_TEMPLATES.verify[locale] || EMAIL_TEMPLATES.verify.pt;
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: `"Gamo App" <${process.env.SMTP_FROM}>`,
    to,
    subject: template.subject,
    html: template.body(verificationUrl),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✉️ Verification email sent to ${to}`);
  } catch (error) {
    console.error("Email sending error:", error);
    throw new Error("EMAIL_SEND_FAILED");
  }
}

/**
 * Envia e-mail de recuperação de senha.
 * @param to - E-mail do destinatário
 * @param resetLink - Link completo para resetar senha
 * @param locale - Idioma (pt, en, es)
 */

export async function sendRecoveryEmail(to: string, resetLink: string, locale: Locale = "pt") {
  const template = EMAIL_TEMPLATES.recover[locale] || EMAIL_TEMPLATES.recover.pt;

  const mailOptions = {
    from: `"Gamo App" <${process.env.SMTP_FROM}>`,
    to,
    subject: template.subject,
    html: template.body(resetLink),
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✉️ Recovery email sent to ${to}`);
    return info;
  } catch (error) {
    console.error("Recovery email error:", error);
    throw new Error("EMAIL_SEND_FAILED");
  }
}
