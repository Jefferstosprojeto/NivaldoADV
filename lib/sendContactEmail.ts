import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site-config";

export type ContactSubmission = {
  name: string;
  phone: string;
  email: string;
  area: string;
  message: string;
};

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

export async function sendContactEmail(
  data: ContactSubmission
): Promise<void> {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: siteConfig.contactInboxEmail,
    replyTo: data.email,
    subject: `Novo contato pelo site — ${data.name}`,
    text: [
      `Nome: ${data.name}`,
      `Telefone: ${data.phone}`,
      `E-mail: ${data.email}`,
      `Área de interesse: ${data.area}`,
      `Consentimento LGPD: aceito em ${new Date().toISOString()}`,
      "",
      data.message,
    ].join("\n"),
  });
}
