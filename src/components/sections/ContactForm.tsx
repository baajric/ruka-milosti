import { useRef, useState } from 'react';
import { Button } from '../ui/Button';
import { ChoiceChips, TextArea, TextField } from '../ui/Field';
import { contactSection, helpTypes } from '../../data/site';
import { isMockMode, submitInquiry, type Inquiry } from '../../lib/inquiry';
import { validate, type Errors } from '../../lib/validation';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY: Inquiry = {
  name: '',
  phone: '',
  email: '',
  location: '',
  helpType: null,
  message: '',
};

function Spinner() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="size-4 shrink-0 animate-spin"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <circle cx="8" cy="8" r="6" strokeOpacity="0.3" />
      <path d="M14 8a6 6 0 0 0-6-6" />
    </svg>
  );
}

function Success({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-start" role="status">
      <span className="grid size-12 place-items-center rounded-full border border-gold-500/40 bg-gold-500/10">
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          className="size-5 text-gold-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3.5 10.5 4 4 9-10" />
        </svg>
      </span>
      <h3 className="mt-6 font-serif text-[2rem] text-navy-900">
        {contactSection.successTitle}
      </h3>
      <p className="mt-3 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink-muted">
        {contactSection.successText}
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-7 text-[0.9375rem] text-navy-900 underline decoration-gold-500/50 underline-offset-[6px] transition-colors hover:decoration-gold-500"
      >
        Pošaljite još jedan upit
      </button>
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<Inquiry>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverError, setServerError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const set = <K extends keyof Inquiry>(key: K, value: Inquiry[K]) => {
    setValues((previous) => ({ ...previous, [key]: value }));
    if (key in errors) {
      setErrors((previous) => {
        const next = { ...previous };
        delete next[key as keyof Errors];
        return next;
      });
    }
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setServerError(null);

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) {
      // Fokusiraj prvo polje sa greškom.
      const first = formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }

    setStatus('sending');
    const result = await submitInquiry(values);

    if (result.ok) {
      setStatus('success');
      setValues(EMPTY);
    } else {
      setStatus('error');
      setServerError(result.error);
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-panel border border-navy-900/8 bg-cream-100 p-6 shadow-lifted sm:p-10">
        <Success onReset={() => setStatus('idle')} />
      </div>
    );
  }

  const sending = status === 'sending';

  return (
    <div className="rounded-panel border border-navy-900/8 bg-cream-100 p-6 shadow-lifted sm:p-10">
      <h3 className="font-serif text-[2rem] leading-tight text-navy-900">
        {contactSection.formTitle}
      </h3>
      <p className="mt-2 text-[0.9375rem] text-ink-muted">{contactSection.formLead}</p>

      <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-8 grid gap-5">
        <TextField
          label="Vaše ime i prezime"
          name="name"
          autoComplete="name"
          placeholder="npr. Amina Hodžić"
          value={values.name}
          error={errors.name}
          disabled={sending}
          onChange={(event) => set('name', event.target.value)}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <TextField
            label="Telefon"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="+49 …"
            value={values.phone}
            error={errors.phone}
            disabled={sending}
            onChange={(event) => set('phone', event.target.value)}
          />
          <TextField
            label="E-mail"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="ime@primjer.com"
            value={values.email}
            error={errors.email}
            disabled={sending}
            onChange={(event) => set('email', event.target.value)}
          />
        </div>

        <TextField
          label="Gdje živi osoba kojoj treba pomoć?"
          name="location"
          autoComplete="off"
          placeholder="npr. Gradačac, Ledenice"
          value={values.location}
          error={errors.location}
          disabled={sending}
          onChange={(event) => set('location', event.target.value)}
        />

        <ChoiceChips
          legend="Šta vam je potrebno?"
          name="helpType"
          options={helpTypes}
          value={values.helpType}
          onChange={(value) => set('helpType', value)}
        />

        <TextArea
          label="Recite nam nešto o situaciji"
          name="message"
          rows={4}
          placeholder="Mama ima 78 godina, živi sama, teško joj je oko kuće…"
          value={values.message}
          error={errors.message}
          disabled={sending}
          onChange={(event) => set('message', event.target.value)}
        />

        {serverError && (
          <p
            role="alert"
            className="rounded-[10px] border border-red-800/25 bg-red-50 px-4 py-3 text-[0.875rem] text-red-900"
          >
            {serverError}
          </p>
        )}

        <Button type="submit" size="lg" disabled={sending} className="mt-1 w-full" withArrow={!sending}>
          {sending && <Spinner />}
          {sending ? 'Šaljemo…' : 'Pošaljite upit'}
        </Button>

        <p className="text-center text-[0.8125rem] text-ink-muted">{contactSection.privacyNote}</p>

        {import.meta.env.DEV && isMockMode && (
          <p className="rounded-[10px] border border-gold-500/30 bg-gold-500/8 px-4 py-2.5 text-center text-[0.75rem] text-gold-700">
            Razvojni način rada: forma ne šalje ništa dok se ne podesi VITE_CONTACT_ENDPOINT.
          </p>
        )}
      </form>
    </div>
  );
}
