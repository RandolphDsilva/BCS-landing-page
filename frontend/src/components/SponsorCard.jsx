import React from "react";
import { BookMarked } from "lucide-react";
import SponsorActions from "./SponsorActions";
import { initialsOf } from "../lib/utils";

export default function SponsorCard({ sponsor, index = 0 }) {
  const {
    display_name,
    business_name,
    tag,
    short_details,
    pdf_page,
    logo_url,
  } = sponsor;

  const showBusiness =
    business_name && business_name.trim() && business_name.trim() !== display_name?.trim();

  return (
    <article
      className="rise-in bg-white border border-line rounded-2xl p-6 flex flex-col h-full shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all duration-300"
      style={{ animationDelay: `${Math.min(index, 7) * 60}ms` }}
      data-testid="sponsor-card"
    >
      {/* Top row: logo + page badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="w-14 h-14 rounded-lg bg-ivory-100 border border-line flex items-center justify-center overflow-hidden shrink-0">
          {logo_url ? (
            <img
              src={logo_url}
              alt={`${display_name} logo`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <span
              className="font-heading text-gold-500 text-lg font-semibold"
              aria-hidden="true"
            >
              {initialsOf(display_name || business_name)}
            </span>
          )}
        </div>

        {pdf_page ? (
          <span
            className="inline-flex items-center gap-1 bg-burgundy-100 text-burgundy-600 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide"
            data-testid="sponsor-page-badge"
          >
            <BookMarked size={12} />
            Souvenir · p.{pdf_page}
          </span>
        ) : null}
      </div>

      {/* Tag */}
      {tag && (
        <span
          className="mt-5 self-start bg-gold-50 text-gold-600 border border-gold-300 px-2.5 py-0.5 rounded-full text-[11px] font-semibold tracking-wider uppercase"
          data-testid="sponsor-tag-badge"
        >
          {tag}
        </span>
      )}

      {/* Title + business */}
      <h3
        className="mt-3 font-heading text-[1.15rem] leading-snug text-ink-900 font-semibold clamp-2"
        data-testid="sponsor-title"
      >
        {display_name || business_name || "Supporter"}
      </h3>
      {showBusiness && (
        <p className="mt-1 text-sm text-ink-500 clamp-2" data-testid="sponsor-business">
          {business_name}
        </p>
      )}

      {/* Short details */}
      {short_details && (
        <p
          className="mt-3 text-sm text-ink-700 leading-relaxed clamp-3"
          data-testid="sponsor-short-details"
        >
          {short_details}
        </p>
      )}

      {/* Actions */}
      <SponsorActions sponsor={sponsor} />
    </article>
  );
}
