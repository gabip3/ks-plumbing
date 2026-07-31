'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/brand/Logo';
import {
  CLOUD_NAME,
  FOLDER,
  PANEL_PW_HASH,
  TAG_PREFIX,
  UPLOAD_PRESET,
  slugify,
  uploadCategories,
  type UploadCategory,
} from '@/lib/cloudinary';
import { site } from '@/lib/site';
import { cx } from '@/lib/utils';

const SESSION_KEY = 'ksplumbing_panel_ok';

export default function AdminPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setUnlocked(sessionStorage.getItem(SESSION_KEY) === '1');
    setChecked(true);
  }, []);

  if (!checked) return <main className="min-h-screen bg-paper" />;

  return unlocked ? <Panel /> : <Lock onUnlock={() => setUnlocked(true)} />;
}

/* ------------------------------------------------------------------ */

function Lock({ onUnlock }: { onUnlock: () => void }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
      const hex = [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
      if (hex === PANEL_PW_HASH) {
        sessionStorage.setItem(SESSION_KEY, '1');
        onUnlock();
      } else {
        setError('That password is not right. Try again.');
        setValue('');
      }
    } catch {
      setError('Open the site over https and try again.');
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ink px-5 text-white">
      <div aria-hidden className="grid-rule-dark pointer-events-none fixed inset-0 opacity-60" />
      <form onSubmit={submit} className="relative w-full max-w-sm text-center">
        <Logo tone="light" size="lg" className="mx-auto" />
        <h1 className="mt-8 text-[1.5rem] font-bold tracking-[-0.03em]">Photo panel</h1>
        <p className="mt-2 text-[1rem] font-medium text-white/60">
          Hi Jessica and Khaleb. Enter the password to add photos.
        </p>

        <input
          type="password"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError('');
          }}
          placeholder="Password"
          autoFocus
          className="mt-7 w-full border-0 border-b-2 border-white/25 bg-transparent py-3 text-center text-[1.125rem] font-medium text-white outline-none transition-colors placeholder:text-white/35 focus:border-water"
        />

        {error && <p className="mt-3 text-[0.9375rem] font-semibold text-signal">{error}</p>}

        <button
          type="submit"
          className="mt-7 inline-flex h-14 w-full items-center justify-center bg-royal text-[1.0625rem] font-bold text-white transition-colors hover:bg-royal-deep"
        >
          Open the panel
        </button>

        <a
          href="/"
          className="mt-6 inline-block text-[0.9375rem] font-medium text-white/45 underline-offset-4 hover:text-white hover:underline"
        >
          Back to the website
        </a>
      </form>
    </main>
  );
}

/* ------------------------------------------------------------------ */

type Result = { ok: number; failed: number; category: string } | null;

function Panel() {
  const [category, setCategory] = useState<UploadCategory>(uploadCategories[0]);
  const [files, setFiles] = useState<File[]>([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<Result>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const add = useCallback((list: FileList | null) => {
    if (!list) return;
    const images = [...list].filter((f) => f.type.startsWith('image/'));
    setFiles((prev) => [...prev, ...images]);
    setResult(null);
  }, []);

  async function uploadOne(file: File) {
    const body = new FormData();
    body.append('file', file);
    body.append('upload_preset', UPLOAD_PRESET);
    body.append('folder', `${FOLDER}/${slugify(category)}`);
    body.append('tags', `${TAG_PREFIX}${slugify(category)}`);
    const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body,
    });
    return res.ok;
  }

  async function publish() {
    if (!files.length) return;
    setSending(true);
    setResult(null);
    const outcomes = await Promise.all(files.map(uploadOne));
    const ok = outcomes.filter(Boolean).length;
    setResult({ ok, failed: files.length - ok, category });
    setFiles([]);
    if (inputRef.current) inputRef.current.value = '';
    setSending(false);
  }

  return (
    <main className="min-h-screen bg-paper pb-24">
      <header className="border-b border-navy/12 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
          <Logo tone="dark" size="sm" />
          <a
            href="/"
            className="text-[0.9375rem] font-semibold text-navy/60 underline-offset-4 hover:text-royal hover:underline"
          >
            View the website
          </a>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <h1 className="text-[1.875rem] font-bold tracking-[-0.035em] text-navy sm:text-[2.25rem]">
          Add photos to the gallery
        </h1>
        <p className="mt-3 max-w-xl text-[1.0625rem] font-medium leading-relaxed text-navy/70">
          Pick what the job was, drop the photos in, and press publish. They show up on the
          website straight away. Nothing here can break the site.
        </p>

        {/* 1 ─ category */}
        <section className="mt-10">
          <Step n="1" title="What kind of job was it?" />
          <div className="mt-4 flex flex-wrap gap-2.5">
            {uploadCategories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => {
                  setCategory(c);
                  setResult(null);
                }}
                className={cx(
                  'h-12 border px-5 text-[1rem] font-semibold transition-colors duration-300',
                  category === c
                    ? 'border-royal bg-royal text-white'
                    : 'border-navy/20 text-navy/70 hover:border-navy/50 hover:text-navy',
                )}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        {/* 2 ─ files */}
        <section className="mt-10">
          <Step n="2" title="Choose the photos" />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragEnter={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              add(e.dataTransfer.files);
            }}
            className={cx(
              'mt-4 flex w-full flex-col items-center justify-center gap-2 border-2 border-dashed px-6 py-14 transition-colors duration-300',
              dragging ? 'border-royal bg-royal/5' : 'border-navy/25 hover:border-navy/50',
            )}
          >
            <svg viewBox="0 0 24 24" className="h-8 w-8 text-royal" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 16V4m0 0L7.5 8.5M12 4l4.5 4.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 15v3.5A1.5 1.5 0 0 0 4.5 20h15a1.5 1.5 0 0 0 1.5-1.5V15" strokeLinecap="round" />
            </svg>
            <span className="text-[1.0625rem] font-bold text-navy">
              Tap here to pick photos
            </span>
            <span className="text-[0.9375rem] font-medium text-navy/55">
              or drag them onto this box
            </span>
          </button>

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => add(e.target.files)}
            className="hidden"
          />

          {files.length > 0 && (
            <>
              <p className="mt-6 text-[1rem] font-semibold text-navy">
                {files.length} photo{files.length > 1 ? 's' : ''} ready
              </p>
              <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
                {files.map((f, i) => (
                  <li key={`${f.name}-${i}`} className="relative aspect-square overflow-hidden bg-mist">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={URL.createObjectURL(f)}
                      alt=""
                      className="h-full w-full object-cover"
                      onLoad={(e) => URL.revokeObjectURL((e.target as HTMLImageElement).src)}
                    />
                    <button
                      type="button"
                      onClick={() => setFiles((prev) => prev.filter((_, k) => k !== i))}
                      aria-label={`Remove photo ${i + 1}`}
                      className="absolute right-1.5 top-1.5 flex h-8 w-8 items-center justify-center bg-ink/80 text-[1.125rem] font-bold text-white transition-colors hover:bg-signal"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </>
          )}
        </section>

        {/* 3 ─ publish */}
        <section className="mt-10">
          <Step n="3" title="Put them on the website" />
          <button
            type="button"
            onClick={publish}
            disabled={!files.length || sending}
            className="mt-4 inline-flex h-14 w-full items-center justify-center bg-royal text-[1.0625rem] font-bold text-white transition-colors hover:bg-royal-deep disabled:cursor-not-allowed disabled:bg-navy/20 disabled:text-navy/45 sm:w-auto sm:px-10"
          >
            {sending
              ? 'Publishing…'
              : files.length
                ? `Publish ${files.length} photo${files.length > 1 ? 's' : ''}`
                : 'Choose photos first'}
          </button>

          {result && (
            <div
              className={cx(
                'mt-6 border-l-4 py-4 pl-5',
                result.ok ? 'border-live bg-live/8' : 'border-signal bg-signal/8',
              )}
            >
              {result.ok > 0 && (
                <p className="text-[1.125rem] font-bold text-navy">
                  {result.ok} photo{result.ok > 1 ? 's' : ''} published to {result.category}.
                </p>
              )}
              {result.failed > 0 && (
                <p className="mt-1 text-[1rem] font-semibold text-signal">
                  {result.failed} did not go through. Try those again.
                </p>
              )}
              {result.ok > 0 && (
                <p className="mt-2 text-[1rem] font-medium text-navy/70">
                  Open the website and scroll to Recent work to see them. If they are not there
                  yet, pull down to refresh the page.
                </p>
              )}
            </div>
          )}
        </section>

        <p className="mt-14 border-t border-navy/12 pt-6 text-[0.9375rem] font-medium leading-relaxed text-navy/50">
          Photos landscape or portrait both work. Anything you publish here sits alongside the
          photos already on the site and can be removed by whoever manages the account. Questions,
          call {site.phone.display}.
        </p>
      </div>
    </main>
  );
}

function Step({ n, title }: { n: string; title: string }) {
  return (
    <h2 className="flex items-center gap-3 text-[1.25rem] font-bold tracking-[-0.02em] text-navy">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-navy font-mono text-[0.9375rem] text-white">
        {n}
      </span>
      {title}
    </h2>
  );
}
