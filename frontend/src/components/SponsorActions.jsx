import React from "react";
import { Phone, MessageCircle, Mail, Globe, BookOpen } from "lucide-react";
import {
  telHref,
  whatsappHref,
  mailHref,
  websiteHref,
  pdfViewerHref,
} from "../lib/utils";

const iconBtn =
  "inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-ink-700 hover:text-burgundy-600 hover:border-burgundy-600 hover:bg-burgundy-100 transition-colors";

const primaryPill =
  "inline-flex items-center gap-1.5 rounded-full bg-burgundy-600 hover:bg-burgundy-700 text-white text-xs font-semibold px-3.5 py-2 transition-colors";

export default function SponsorActions({ sponsor }) {
  const { phone_1, email, website, pdf_url, pdf_page, display_name } = sponsor;

  const phoneLink = telHref(phone_1);
  const waLink = whatsappHref(phone_1);
  const mailLink = mailHref(email);
  const siteLink = websiteHref(website);
  const pdfLink = pdf_url && pdf_page ? pdfViewerHref(pdf_url, pdf_page) : "";

  return (
    <div className="mt-auto pt-4 flex items-center justify-between gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        {phoneLink && (
          <a
            href={phoneLink}
            aria-label={`Call ${display_name}`}
            title="Call"
            className={iconBtn}
            data-testid="sponsor-action-call"
          >
            <Phone size={15} />
          </a>
        )}
        {waLink && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`WhatsApp ${display_name}`}
            title="WhatsApp"
            className={iconBtn}
            data-testid="sponsor-action-whatsapp"
          >
            <MessageCircle size={15} />
          </a>
        )}
        {mailLink && (
          <a
            href={mailLink}
            aria-label={`Email ${display_name}`}
            title="Email"
            className={iconBtn}
            data-testid="sponsor-action-email"
          >
            <Mail size={15} />
          </a>
        )}
        {siteLink && (
          <a
            href={siteLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${display_name} website`}
            title="Website"
            className={iconBtn}
            data-testid="sponsor-action-website"
          >
            <Globe size={15} />
          </a>
        )}
      </div>

      {pdfLink && (
        <a
          href={pdfLink}
          target="_blank"
          rel="noopener noreferrer"
          className={primaryPill}
          data-testid="sponsor-action-souvenir"
        >
          <BookOpen size={14} />
          View in Souvenir
        </a>
      )}
    </div>
  );
}
