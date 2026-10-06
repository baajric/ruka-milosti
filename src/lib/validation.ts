import type { Inquiry } from './inquiry';

export type FieldName = keyof Omit<Inquiry, 'helpType'>;
export type Errors = Partial<Record<FieldName, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
// Dozvoljava +, razmake, crtice, zagrade i tačke — brojevi stižu iz više zemalja.
const PHONE = /^[+]?[\d\s().-]{6,}$/;

export function validate(values: Inquiry): Errors {
  const errors: Errors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Upišite ime i prezime.';
  }

  const hasPhone = values.phone.trim().length > 0;
  const hasEmail = values.email.trim().length > 0;

  if (!hasPhone && !hasEmail) {
    errors.phone = 'Ostavite telefon ili e-mail da vam se možemo javiti.';
  } else {
    if (hasPhone && !PHONE.test(values.phone.trim())) {
      errors.phone = 'Provjerite broj telefona.';
    }
    if (hasEmail && !EMAIL.test(values.email.trim())) {
      errors.email = 'Provjerite e-mail adresu.';
    }
  }

  if (values.location.trim().length < 2) {
    errors.location = 'Upišite mjesto — bar okvirno.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Napišite bar rečenicu o situaciji.';
  }

  return errors;
}
