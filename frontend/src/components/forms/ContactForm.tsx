"use client";

import { useActionState } from "react";
import { submitContactForm } from "@/lib/actions";
import type { FormState } from "@/lib/validations";
import { cn } from "@/lib/utils";

const initialState: FormState = { success: false, message: "" };

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  rows?: number;
  errors?: string[];
}

function FormField({
  label,
  name,
  type = "text",
  required,
  rows,
  errors,
}: FormFieldProps) {
  const id = `field-${name}`;

  return (
    <div>
      <label htmlFor={id} className="block text-sm text-cream/80 mb-1.5">
        {label}
        {required && <span className="text-gold ml-1">*</span>}
      </label>
      {rows ? (
        <textarea
          id={id}
          name={name}
          rows={rows}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-green-dark/50 px-4 py-3 text-cream placeholder:text-cream/40",
            "border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold",
            "transition-colors resize-none"
          )}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={required}
          className={cn(
            "w-full rounded-lg border bg-green-dark/50 px-4 py-3 text-cream placeholder:text-cream/40",
            "border-gold/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold",
            "transition-colors"
          )}
        />
      )}
      {errors && errors.length > 0 && (
        <p className="mt-1 text-sm text-red-400">{errors[0]}</p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(
    submitContactForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="text-gold text-lg">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={action} className="space-y-4">
      <FormField
        label="Ваше имя"
        name="name"
        required
        errors={state.errors?.name}
      />
      <FormField
        label="Email"
        name="email"
        type="email"
        required
        errors={state.errors?.email}
      />
      <FormField
        label="Телефон"
        name="phone"
        type="tel"
        errors={state.errors?.phone}
      />
      <FormField
        label="Сообщение"
        name="message"
        required
        rows={5}
        errors={state.errors?.message}
      />

      {state.message && !state.success && (
        <p className="text-red-400 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-green-dark transition-colors hover:bg-gold-light disabled:opacity-50"
      >
        {pending ? "Отправка..." : "Отправить сообщение"}
      </button>
    </form>
  );
}
