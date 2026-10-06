import { cn } from '../../lib/cn';

/**
 * Mirne zlatne zrake i topli sjaj preko navy podloge — daju dubinu heroa i
 * CTA bloka bez fotografije. Kretanje je sporo (22 s) i gasi se uz
 * `prefers-reduced-motion`.
 */
export function LightRays({ className, origin = '72% 18%' }: { className?: string; origin?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 -z-10 overflow-hidden', className)}
    >
      {/* Dijagonalne zrake, maskirane oko izvora svjetla. */}
      <div
        className="absolute -inset-[20%] animate-rays"
        style={{
          background:
            'repeating-linear-gradient(118deg, transparent 0 7%, rgb(201 160 74 / 0.22) 9.5%, transparent 12.5%, transparent 21%)',
          maskImage: `radial-gradient(ellipse 55% 60% at ${origin}, #000 0%, transparent 72%)`,
          WebkitMaskImage: `radial-gradient(ellipse 55% 60% at ${origin}, #000 0%, transparent 72%)`,
          filter: 'blur(10px)',
        }}
      />
      {/* Topli izvor svjetla. */}
      <div
        className="absolute -top-48 -right-40 size-[48rem] rounded-full opacity-30 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-gold-500) 0%, transparent 62%)' }}
      />
      {/* Hladnija dubina u suprotnom uglu. */}
      <div
        className="absolute -bottom-72 -left-60 size-[56rem] rounded-full opacity-50 blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--color-navy-700) 0%, transparent 66%)' }}
      />
    </div>
  );
}
