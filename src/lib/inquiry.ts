/**
 * ============================================================================
 *  SLANJE UPITA — sloj između forme i backenda
 * ============================================================================
 *  Frontend ne zna ništa o tome kako se upit isporučuje. Kada backend bude
 *  spreman, dovoljno je postaviti `VITE_CONTACT_ENDPOINT` u `.env` — forma
 *  tada radi POST JSON na taj URL. Bez te varijable radi u mock modu i samo
 *  simulira uspješno slanje (korisno za razvoj i demo klijentu).
 * ============================================================================
 */

export type Inquiry = {
  name: string;
  phone: string;
  email: string;
  location: string;
  helpType: string | null;
  message: string;
};

export type InquiryResult = { ok: true } | { ok: false; error: string };

const ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export const isMockMode = !ENDPOINT;

export async function submitInquiry(data: Inquiry, signal?: AbortSignal): Promise<InquiryResult> {
  if (!ENDPOINT) {
    // Mock: kratka pauza da se vidi loading state.
    await new Promise((resolve) => setTimeout(resolve, 900));
    if (import.meta.env.DEV) {
      console.info('[Ruka Milosti] Mock slanje upita:', data);
    }
    return { ok: true };
  }

  try {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, sentAt: new Date().toISOString() }),
      signal,
    });

    if (!response.ok) {
      return {
        ok: false,
        error: 'Slanje nije uspjelo. Pokušajte ponovo ili nas nazovite telefonom.',
      };
    }
    return { ok: true };
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') {
      return { ok: false, error: 'Slanje je prekinuto.' };
    }
    return {
      ok: false,
      error: 'Nema veze sa serverom. Provjerite internet ili nas nazovite telefonom.',
    };
  }
}
