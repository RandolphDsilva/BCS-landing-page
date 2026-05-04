import React from "react";
import { Cross, Mail, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="bg-white border-t border-line mt-8"
      data-testid="site-footer"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-burgundy-600 text-white"
              aria-hidden="true"
            >
              <Cross size={16} strokeWidth={2.25} />
            </span>
            <span className="font-heading text-lg text-burgundy-600 font-semibold">
              Bombay Catholic Sabha
            </span>
          </div>
          <p className="mt-4 text-sm text-ink-700 leading-relaxed max-w-sm">
            c/o St. Michael&apos;s Church, Mahim, Mumbai 400 016. Affiliated to the
            All India Catholic Union.
          </p>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500">
            Contact
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-700">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-ink-500" />
              <a
                href="mailto:president@bcsabha.org"
                className="hover:text-burgundy-600 transition-colors"
                data-testid="footer-email"
              >
                president@bcsabha.org
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Globe size={14} className="text-ink-500" />
              <a
                href="https://www.bcsabha.org"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-burgundy-600 transition-colors"
                data-testid="footer-website"
              >
                www.bcsabha.org
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-500">
            Souvenir
          </h4>
          <p className="mt-4 text-sm text-ink-700 leading-relaxed">
            Sabha Day 2026 Souvenir — a keepsake celebrating sponsors, parishes and
            community well-wishers.
          </p>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 py-5 text-xs text-ink-500 flex flex-wrap items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Bombay Catholic Sabha. All rights reserved.</span>
          <span className="font-heading italic">Ad Majorem Dei Gloriam</span>
        </div>
      </div>
    </footer>
  );
}
