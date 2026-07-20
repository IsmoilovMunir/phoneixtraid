"use server";

import {
  contactFormSchema,
  partnerFormSchema,
  newsletterSchema,
  type FormState,
} from "./validations";
import {
  sendEmail,
  formatContactEmail,
  formatPartnerEmail,
  formatNewsletterEmail,
} from "./email";

export async function submitContactForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message"),
  };

  const parsed = contactFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте правильность заполнения формы",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await sendEmail({
      subject: `Обратная связь: ${parsed.data.name}`,
      html: formatContactEmail(parsed.data),
      replyTo: parsed.data.email,
    });

    return {
      success: true,
      message: "Спасибо! Ваше сообщение отправлено. Мы свяжемся с вами в ближайшее время.",
    };
  } catch {
    return {
      success: false,
      message: "Не удалось отправить сообщение. Попробуйте позже или позвоните нам.",
    };
  }
}

export async function submitPartnerForm(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = {
    company: formData.get("company"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    direction: formData.get("direction"),
    message: formData.get("message"),
  };

  const parsed = partnerFormSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Проверьте правильность заполнения формы",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await sendEmail({
      subject: `Заявка на партнёрство: ${parsed.data.company}`,
      html: formatPartnerEmail(parsed.data),
      replyTo: parsed.data.email,
    });

    return {
      success: true,
      message: "Заявка отправлена! Наш менеджер свяжется с вами в течение 1 рабочего дня.",
    };
  } catch {
    return {
      success: false,
      message: "Не удалось отправить заявку. Попробуйте позже или позвоните нам.",
    };
  }
}

export async function submitNewsletter(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = { email: formData.get("email") };
  const parsed = newsletterSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      message: "Введите корректный email",
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await sendEmail({
      subject: "Новая подписка на рассылку",
      html: formatNewsletterEmail(parsed.data.email),
      replyTo: parsed.data.email,
    });

    return {
      success: true,
      message: "Вы успешно подписались на рассылку!",
    };
  } catch {
    return {
      success: false,
      message: "Не удалось оформить подписку. Попробуйте позже.",
    };
  }
}
