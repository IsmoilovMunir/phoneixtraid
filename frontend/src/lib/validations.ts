import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .max(20, "Номер телефона слишком длинный")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .min(10, "Сообщение должно содержать минимум 10 символов")
    .max(2000, "Сообщение слишком длинное"),
});

export const partnerFormSchema = z.object({
  company: z
    .string()
    .min(2, "Укажите название компании")
    .max(200, "Название слишком длинное"),
  name: z
    .string()
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(100, "Имя слишком длинное"),
  email: z.string().email("Введите корректный email"),
  phone: z
    .string()
    .min(10, "Введите корректный номер телефона")
    .max(20, "Номер телефона слишком длинный"),
  direction: z.string().min(1, "Выберите направление"),
  message: z
    .string()
    .max(2000, "Сообщение слишком длинное")
    .optional()
    .or(z.literal("")),
});

export const newsletterSchema = z.object({
  email: z.string().email("Введите корректный email"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type PartnerFormData = z.infer<typeof partnerFormSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;

export type FormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};
