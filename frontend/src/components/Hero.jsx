import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-ivory-50"
      data-testid="hero-section"
      id="home"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16 sm:pb-20">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left: text */}
          <div className="lg:col-span-7">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-500 mb-5">
              Sabha Day 2026 · Souvenir
            </p>
            <h1 className="font-heading font-semibold text-ink-900 text-4xl sm:text-5xl lg:text-[3.75rem] leading-[1.05] tracking-tight">
              Honouring the hands
              <span className="block text-burgundy-600">that build our community.</span>
            </h1>

            <div className="gold-rule my-7" aria-hidden="true" />

            <p className="text-ink-700 text-base sm:text-lg max-w-2xl leading-relaxed">
              A celebration of the businesses, parishes, families and well-wishers who
              stand with the Bombay Catholic Sabha. Discover each supporter and open
              their page in the original Sabha Day 2026 souvenir.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#sponsors"
                className="inline-flex items-center gap-2 rounded-lg bg-burgundy-600 hover:bg-burgundy-700 text-white font-medium px-5 py-3 shadow-card transition-colors"
                data-testid="hero-cta-primary"
              >
                Meet the supporters
                <ArrowRight size={16} />
              </a>
              <Link
                to="/sponsors"
                className="inline-flex items-center gap-2 rounded-lg border border-burgundy-600 text-burgundy-600 hover:bg-burgundy-100 font-medium px-5 py-3 transition-colors"
                data-testid="hero-cta-secondary"
              >
                <BookOpen size={16} />
                Browse full directory
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Supporters</dt>
                <dd className="mt-1 font-heading text-2xl text-ink-900">130+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Parishes</dt>
                <dd className="mt-1 font-heading text-2xl text-ink-900">25+</dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-wider text-ink-500">Souvenir Pages</dt>
                <dd className="mt-1 font-heading text-2xl text-ink-900">400+</dd>
              </div>
            </dl>
          </div>

          {/* Right: framed image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-[28px] overflow-hidden border border-line shadow-card-hover">
              <img
                src="https://images.unsplash.com/photo-1663321231228-2625873fbdcd?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA4Mzl8MHwxfHNlYXJjaHwyfHxjaHVyY2glMjBpbnRlcmlvciUyMHdhcm0lMjBhcmNoaXRlY3R1cmV8ZW58MHx8fHwxNzc3ODgzMDg4fDA&ixlib=rb-4.1.0&q=85"
                alt="Warm church interior with rows of wooden chairs."
                className="w-full h-[420px] sm:h-[480px] object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-burgundy-700/25 via-transparent to-transparent" />
            </div>
            <div className="hidden lg:block absolute -bottom-6 -left-6 bg-white border border-line rounded-xl p-4 shadow-card w-56">
              <p className="text-xs uppercase tracking-wider text-gold-500 font-semibold">
                Souvenir
              </p>
              <p className="mt-1 font-heading text-ink-900 leading-snug">
                Sabha Day 2026 — printed keepsake
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
