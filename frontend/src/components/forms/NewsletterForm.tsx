"use client";

import { useActionState } from "react";
import { submitNewsletter } from "@/lib/actions";
import type { FormState } from "@/lib/validations";
import { useDictionary } from "@/components/i18n/LocaleProvider";

const initialState: FormState = { success: false, message: "" };

export function NewsletterForm() {
  const dict = useDictionary();
  const t = dict.forms.newsletter;
  const [state, action, pending] = useActionState(
    submitNewsletter,
    initialState
  );

  return (
    <div>
      <form action={action} className="flex gap-2">
        <input
          name="email"
          type="email"
          placeholder={t.emailPlaceholder}
          required
          className="flex-1 rounded-lg border border-gold/30 bg-green-dark/50 px-4 py-2.5 text-sm text-cream placeholder:text-cream/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-lg bg-gold px-4 py-2.5 text-sm font-semibold text-green-dark hover:bg-gold-light transition-colors disabled:opacity-50 shrink-0"
        >
          {pending ? t.submitting : t.submit}
        </button>
      </form>
      {state.message && (
        <p
          className={`mt-2 text-xs ${state.success ? "text-gold" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
