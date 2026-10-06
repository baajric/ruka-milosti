import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';
import { useId } from 'react';
import { cn } from '../../lib/cn';

const controlBase =
  'w-full min-w-0 rounded-[10px] border bg-cream-50 px-4 py-3 text-[1rem] text-navy-900 ' +
  'placeholder:text-ink-muted/55 transition-[border-color,box-shadow] duration-200 ' +
  'focus:outline-none focus-visible:outline-none';

const controlTone = (invalid: boolean) =>
  invalid
    ? 'border-red-700/45 focus:border-red-700/70 focus:shadow-[0_0_0_3px_rgb(153_27_27/0.10)]'
    : 'border-navy-900/15 focus:border-gold-500 focus:shadow-[0_0_0_3px_rgb(179_134_48/0.14)]';

function Shell({
  id,
  label,
  error,
  hint,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={id} className="text-[0.875rem] font-medium text-ink-soft">
        {label}
        {optional && <span className="ml-1.5 font-normal text-ink-muted">(nije obavezno)</span>}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="text-[0.8125rem] text-red-800">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-hint`} className="text-[0.8125rem] text-ink-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

export function TextField({ label, error, hint, optional, className, ...rest }: TextFieldProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  const invalid = Boolean(error);

  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional}>
      <input
        {...rest}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, controlTone(invalid), className)}
      />
    </Shell>
  );
}

type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};

export function TextArea({ label, error, hint, optional, className, ...rest }: TextAreaProps) {
  const reactId = useId();
  const id = rest.id ?? reactId;
  const invalid = Boolean(error);

  return (
    <Shell id={id} label={label} error={error} hint={hint} optional={optional}>
      <textarea
        {...rest}
        id={id}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(controlBase, controlTone(invalid), 'resize-y', className)}
      />
    </Shell>
  );
}

/** Grupa izbora kao radio dugmad — dostupna tastaturom preko strelica. */
export function ChoiceChips({
  legend,
  options,
  value,
  onChange,
  name,
}: {
  legend: string;
  options: readonly string[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
}) {
  return (
    <fieldset className="grid gap-3">
      <legend className="mb-1 text-[0.875rem] font-medium text-ink-soft">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((option) => {
          const checked = value === option;
          return (
            <label
              key={option}
              className={cn(
                'cursor-pointer rounded-full border px-4 py-2 text-[0.875rem] transition-colors duration-200',
                'has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-gold-500',
                checked
                  ? 'border-navy-900 bg-navy-900 text-cream-50'
                  : 'border-navy-900/15 text-ink-soft hover:border-navy-900/35 hover:bg-navy-900/[0.03]',
              )}
            >
              <input
                type="radio"
                name={name}
                value={option}
                checked={checked}
                onChange={() => onChange(option)}
                className="sr-only"
              />
              {option}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
