// src/utils/email.ts

import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

// Helper para carregar JSON de tradução a partir de um locale
function loadLocaleFile(locale: string): Record<string, unknown> {
  // Ajuste conforme onde seus arquivos de tradução estejam localizados
  // Aqui assumimos: public/locales/{locale}.json
  const filePath = path.join(process.cwd(), "public", "locales", `${locale}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Locale file not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, "utf8");
  return JSON.parse(raw);
}

// Busca valor aninhado no objeto por “caminho” como "email.verify.subject"
function getTranslatedString(
  translations: Record<string, unknown>,
  keyPath: string,
  variables?: Record<string, string>,
): string {
  const parts = keyPath.split(".");
  let current: unknown = translations;

  for (const part of parts) {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      Object.prototype.hasOwnProperty.call(current, part)
    ) {
      current = (current as Record<string, unknown>)[part];
    } else {
      // Caso não encontre a chave, retorna a própria keyPath como fallback
      return keyPath;
    }
  }

  if (typeof current !== "string") {
    return keyPath;
  }

  let result = current;
  // Interpolação de variáveis no template (ex: {link}, {email})
  if (variables) {
    for (const [k, v] of Object.entries(variables)) {
      result = result.replace(new RegExp(`\\{${k}\\}`, "g"), v);
    }
  }
  return result;
}

// Configuração do transporter. No .env definimos SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 2525,
  secure: false, // se sua porta for 465, coloque true; para 587, basta false (STARTTLS)
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

/**
 * Envia e-mail de verificação de conta.
 * @param to – e-mail do destinatário
 * @param token – token gerado para verificar e-mail
 * @param locale – "pt" ou "en" (ou outro idioma que você tenha no /public/locales)
 */
export async function sendVerificationEmail(to: string, token: string, locale: string = "pt") {
  // Carrega JSON de tradução para o locale desejado
  const translations = loadLocaleFile(locale);

  // Monta a URL de verificação
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  // Pega subject e body do JSON de tradução
  const subject = getTranslatedString(translations, "email.verify.subject");
  const htmlBody = getTranslatedString(translations, "email.verify.body", {
    link: verificationUrl,
  });

  const mailOptions = {
    from: `"Gamo App" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html: htmlBody,
  };

  await transporter.sendMail(mailOptions);
}

/**
 * Envia e-mail de recuperação de senha.
 * @param to – e-mail do destinatário
 * @param resetLink – link que o usuário deve clicar para redefinir senha
 * @param locale – "pt" ou "en"
 */
export async function sendRecoveryEmail(to: string, resetLink: string, locale: string = "pt") {
  const translations = loadLocaleFile(locale);

  const subject = getTranslatedString(translations, "email.recover.subject");
  const htmlBody = getTranslatedString(translations, "email.recover.body", {
    link: resetLink,
  });

  const mailOptions = {
    from: `"Gamo App" <${process.env.SMTP_FROM}>`,
    to,
    subject,
    html: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✉️  Enviado e-mail de recuperação de senha:", info.messageId);
}
