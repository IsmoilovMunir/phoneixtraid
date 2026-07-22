"use client";

import { useActionState } from "react";
import { submitPartnerForm } from "@/lib/actions";
import type { FormState } from "@/lib/validations";
import { cn } from "@/lib/utils";
import { useDictionary } from "@/components/i18n/LocaleProvider";

const initialState: FormState = { success: false, message: "" };

const directionKeys = [
  "import",
  "export",
  "logistics",
  "distribution",
  "other",
] as const;

export function PartnerForm() {
  const dict = useDictionary();
  const t = dict.forms.partner;
  const [state, action, pending] = useActionState(
    submitPartnerForm,
    initialState
  );

  if (state.success) {
    return (
      <div className="rounded-lg border border-gold/30 bg-gold/10 p-6 text-center">
        <p className="text-gold text-lg">{state.message || t.success}</p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-gold/30 bg-green-dark/50 px-4 py-3 text-cream focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

  return (
    <form action={action} className="space-y-4">
      <div>
        <label htmlFor="company" className="block text-sm text-cream/80 mb-1.5">
          {t.company} <span className="text-gold">*</span>
        </label>
        <input id="company" name="company" required className={inputClass} />
        {state.errors?.company && (
          <p className="mt-1 text-sm text-red-400">{state.errors.company[0]}</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm text-cream/80 mb-1.5">
            {t.contactPerson} <span className="text-gold">*</span>
          </label>
          <input id="name" name="name" required className={inputClass} />
          {state.errors?.name && (
            <p className="mt-1 text-sm text-red-400">{state.errors.name[0]}</p>
          )}
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm text-cream/80 mb-1.5">
            {t.phone} <span className="text-gold">*</span>
          </label>
          <input id="phone" name="phone" type="tel" required className={inputClass} />
          {state.errors?.phone && (
            <p className="mt-1 text-sm text-red-400">{state.errors.phone[0]}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm text-cream/80 mb-1.5">
          {t.email} <span className="text-gold">*</span>
        </label>
        <input id="email" name="email" type="email" required className={inputClass} />
        {state.errors?.email && (
          <p className="mt-1 text-sm text-red-400">{state.errors.email[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="direction" className="block text-sm text-cream/80 mb-1.5">
          {t.direction} <span className="text-gold">*</span>
        </label>
        <select id="direction" name="direction" required className={cn(inputClass, "cursor-pointer")}>
          <option value="">{t.directionPlaceholder}</option>
          {directionKeys.map((key) => (
            <option key={key} value={t.directions[key]}>
              {t.directions[key]}
            </option>
          ))}
        </select>
        {state.errors?.direction && (
          <p className="mt-1 text-sm text-red-400">{state.errors.direction[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm text-cream/80 mb-1.5">
          {t.additionalInfo}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={cn(inputClass, "resize-none")}
        />
      </div>

      {state.message && !state.success && (
        <p className="text-red-400 text-sm">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-wide text-green-dark transition-colors hover:bg-gold-light disabled:opacity-50"
      >
        {pending ? t.submitting : t.submit}
      </button>
    </form>
  );
}
