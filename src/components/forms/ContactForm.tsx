'use client';

import { AnimatePresence, m } from 'framer-motion';
import { useState, type FormEvent } from 'react';
import { Arrow } from '@/components/ui/Action';
import { services } from '@/lib/content';
import { site } from '@/lib/site';
import { cx } from '@/lib/utils';

/**
 * Where the form posts.
 *
 * Leave empty and the form falls back to opening a pre-filled email to the
 * shop, so no lead is ever lost. Point it at a form endpoint (Formspree,
 * Basin, a Netlify function, your CRM webhook…) and it will POST JSON instead:
 *   { name, phone, email, service, message, emergency, submittedAt }
 */
const FORM_ENDPOINT = '';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export type Lead = {
  name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  emergency: boolean;
  submittedAt: string;
};

export function ContactForm() {
  const [emergency, setEmergency] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const payload: Lead = {
      name: data.name ?? '',
      phone: data.phone ?? '',
      email: data.email ?? '',
      service: data.service ?? '',
      message: data.message ?? '',
      emergency,
      submittedAt: new Date().toISOString(),
    };

    if (!FORM_ENDPOINT) {
      const body = [
        `Name: ${payload.name}`,
        `Phone: ${payload.phone}`,
        `Email: ${payload.email}`,
        `Service: ${payload.service}`,
        `Emergency: ${emergency ? 'Yes' : 'No'}`,
        '',
        payload.message,
      ].join('\n');
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        `${emergency ? '[EMERGENCY] ' : ''}Service request from ${payload.name}`,
      )}&body=${encodeURIComponent(body)}`;
      setStatus('sent');
      return;
    }

    try {
      setStatus('sending');
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setEmergency(false);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate={false} className="mt-10 sm:mt-12">
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

      {/* Emergency toggle — the only switch on the site, so it gets its own treatment */}
      <button
        type="button"
        role="switch"
        aria-checked={emergency}
        onClick={() => setEmergency((v) => !v)}
        className={cx(
          'mt-10 flex w-full items-center gap-4 border p-4 text-left transition-colors duration-500 sm:p-5',
          emergency ? 'border-signal bg-signal/8' : 'border-navy/15 hover:border-navy/35',
        )}
      >
        <span
          className={cx(
            'relative flex h-6 w-6 shrink-0 items-center justify-center border transition-colors duration-400',
            emergency ? 'border-signal bg-signal text-white' : 'border-navy/30 text-transparent',
          )}
        >
          <svg viewBox="0 0 12 10" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 5l3.2 3.2L11 1.4" strokeLinecap="square" />
          </svg>
        </span>
        <span>
          <span className={cx('block text-[1.125rem] font-bold', emergency ? 'text-signal' : 'text-navy')}>
            This is an emergency
          </span>
          <span className="mt-1 block text-[1.0625rem] font-medium leading-relaxed text-navy/65">
            Flags the request for immediate dispatch. For anything actively flooding, calling is
            still faster than typing.
          </span>
        </span>
      </button>

      <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={status === 'sending'}
          className={cx(
            'group inline-flex h-14 items-center gap-3 px-8 text-[1.0625rem] font-bold tracking-[0.01em] text-white transition-colors duration-500 disabled:opacity-60',
            emergency ? 'bg-signal hover:bg-signal/85' : 'bg-royal hover:bg-royal-deep',
          )}
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
