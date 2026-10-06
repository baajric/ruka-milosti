/**
 * Veže crtu za prethodnu riječ (nedjeljivi razmak) da naslov nikad ne počne
 * sa „—" u novom redu. Primjenjuje se na naslove, ne na tekst u pasusima.
 */
export function tightenDashes(text: string): string {
  return text.replace(/ ([—–]) /g, ' $1 ');
}
