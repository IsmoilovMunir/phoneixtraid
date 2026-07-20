import nodemailer from "nodemailer";
import { siteConfig } from "./config";

function createTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 587);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface EmailOptions {
  subject: string;
  html: string;
  replyTo?: string;
}

export async function sendEmail({ subject, html, replyTo }: EmailOptions) {
  const transporter = createTransporter();

  if (!transporter) {
    console.log("[Email] SMTP not configured. Email would be sent:", subject);
    return { success: true, simulated: true };
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM || siteConfig.email,
    to: siteConfig.email,
    replyTo,
    subject,
    html,
  });

  return { success: true, simulated: false };
}

export function formatContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  return `
    <h2>Новое сообщение с сайта</h2>
    <p><strong>Имя:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    ${data.phone ? `<p><strong>Телефон:</strong> ${data.phone}</p>` : ""}
    <p><strong>Сообщение:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
  `;
}

export function formatPartnerEmail(data: {
  company: string;
  name: string;
  email: string;
  phone: string;
  direction: string;
  message?: string;
}) {
  return `
    <h2>Заявка на партнёрство</h2>
    <p><strong>Компания:</strong> ${data.company}</p>
    <p><strong>Контактное лицо:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Телефон:</strong> ${data.phone}</p>
    <p><strong>Направление:</strong> ${data.direction}</p>
    ${data.message ? `<p><strong>Сообщение:</strong></p><p>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
  `;
}

export function formatNewsletterEmail(email: string) {
  return `
    <h2>Новая подписка на рассылку</h2>
    <p><strong>Email:</strong> ${email}</p>
  `;
}
