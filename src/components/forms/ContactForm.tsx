'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui/Action';
import { services } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * Web3Forms delivers submissions straight to the shop's inbox — no server of
 * our own required. The access key is not a secret: Web3Forms is designed to
 * be called directly from the browser, the same way a Formspree or Basin
 * endpoint is public. Rotate it any time at web3forms.com if it ever needs
 * changing, and swap the value here.
 */
const WEB3FORMS_ACCESS_KEY = '4f929fe5-0377-42ea-ae98-42392930cda1';
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  submittedAt: string;
};

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;

    // Honeypot: invisible to a real visitor, but a bot that fills in every
    // field on the page fills this one too. A non-empty value is spam, so we
    // pretend to succeed and drop it rather than spending an API call on it.
    if (data.botcheck) {
      form.reset();
      setStatus('sent');
      return;
    }

    const payload: Lead = {
      name: data.name ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      service: data.service ?? '',
      message: data.message ?? '',
      submittedAt: new Date().toISOString(),
    };

    try {
      setStatus('sending');
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: `Service request from ${payload.name}`,
          from_name: payload.name,
          // Email is a required field, so this is always set — it's what
          // lets the shop hit "Reply" in their inbox and land straight in the
          // customer's, instead of a Web3Forms address that goes nowhere.
          replyto: payload.email,
          ...payload,
        }),
      });
      const result: { success?: boolean; message?: string } | null = await res
        .json()
        .catch(() => null);
      if (!res.ok || !result?.success) throw new Error(result?.message ?? String(res.status));
      form.reset();
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="mt-10 sm:mt-12">
      {/* Honeypot for the spam check in handleSubmit above. sr-only rather
          than display:none, since some bots skip fields that are display:none.
          Clipped to 1px in place rather than pushed off-screen, so it can
          never add to the page's scrollable width. */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="sr-only"
      />

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Field label="Name" name="name" autoComplete="name" placeholder="Jordan Miller" required />
        <Field
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="(208) 555-0146"
          required
        />
        <Field
          label="Email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          className="sm:col-span-2"
          required
        />

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="service">What do you need?</FieldLabel>
          <div className="relative">
            <select
              id="service"
              name="service"
              defaultValue=""
              required
              className={`${fieldClass} appearance-none pr-8`}
            >
              <option value="" disabled>
                Select a service
              </option>
              {services.map((s) => (
                <option key={s.id} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Something else">Something else</option>
            </select>
            <svg
              aria-hidden
              viewBox="0 0 12 8"
              className="pointer-events-none absolute right-1 top-1/2 h-2 w-3 -translate-y-1/2 text-navy/40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M1 1.5 6 6.5l5-5" strokeLinecap="square" />
            </svg>
          </div>
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="message">Tell us what is happening</FieldLabel>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Water heater is leaking from the bottom, tank looks about ten years old."
            className={`${fieldClass} resize-none leading-relaxed`}
          />
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="group inline-flex h-14 items-center gap-3 bg-royal px-8 text-[1.0625rem] font-bold tracking-[0.01em] text-white transition-colors duration-500 hover:bg-royal-deep disabled:opacity-60"
        >
          <span className="relative block h-[1.5em] overflow-hidden">
            <span className="block leading-[1.5] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
              {status === 'sending' ? 'Sending' : 'Send request'}
            </span>
            <span
              aria-hidden
              className="absolute left-0 top-full block leading-[1.5] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full"
            >
              {status === 'sending' ? 'Sending' : 'Send request'}
            </span>
          </span>
          <Arrow />
        </button>

        <p className="max-w-xs text-[1.0625rem] font-medium leading-relaxed text-navy/60">
          We reply the same business day. Nothing you send here is shared with anyone.
        </p>
      </div>

      <AnimatePresence>
        {status === 'sent' && (
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 border-l-2 border-royal bg-royal/5 py-3.5 pl-4 text-[1.125rem] font-medium text-navy"
          >
            Request received. If it is urgent, call{' '}
            <a href={site.phone.href} className="font-medium text-royal underline underline-offset-4">
              {site.phone.display}
            </a>{' '}
            and we will pick up.
          </m.p>
        )}
        {status === 'error' && (
          <m.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mt-6 border-l-2 border-signal bg-signal/5 py-3.5 pl-4 text-[1.125rem] font-medium text-navy"
          >
            That did not go through. Call or text{' '}
            <a href={site.phone.href} className="font-medium text-signal underline underline-offset-4">
              {site.phone.display}
            </a>{' '}
            instead and we will sort it out.
          </m.p>
        )}
      </AnimatePresence>
    </form>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2.5 block text-[1.0625rem] font-bold tracking-[0.005em] text-navy"
    >
      {children}
    </label>
  );
}

/** Shared field chrome: heavier rule, darker text, larger type. */
const fieldClass =
  'w-full border-0 border-b-2 border-navy/25 bg-transparent py-3 text-[1.1875rem] font-medium text-navy outline-none transition-colors duration-400 placeholder:font-normal placeholder:text-navy/35 focus:border-royal';

function Field({
  label,
  name,
  type = 'text',
  required,
  placeholder,
  autoComplete,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <FieldLabel htmlFor={name}>
        {label}
        {!required && <span className="ml-2 font-medium text-navy/45">optional</span>}
      </FieldLabel>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={fieldClass}
      />
    </div>
  );
}
