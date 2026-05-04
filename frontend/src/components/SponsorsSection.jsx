import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { supabase } from "../lib/supabase";
import SponsorCard from "./SponsorCard";
import FilterChips from "./FilterChips";

const FILTER_OPTIONS = [
  { value: "all", label: "All supporters" },
  { value: "Commercial Ad", label: "Commercial Ads" },
  { value: "Best Compliments", label: "Best Compliments" },
  { value: "Best Wishes", label: "Best Wishes" },
];

export default function SponsorsSection() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from("sponsors")
        .select(
          "id, display_name, slug, tag, type, contact_person, business_name, phone_1, phone_2, email, website, address, short_details, pdf_page, pdf_url, logo_url, sort_order"
        )
        .eq("status", "publish")
        .eq("is_featured", true)
        .order("sort_order", { ascending: true })
        .limit(8);

      if (cancelled) return;
      if (err) {
        console.error("[sponsors] fetch error", err);
        setError(err.message || "Unable to load sponsors");
      } else {
        setSponsors(data || []);
      }
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    if (filter === "all") return sponsors;
    return sponsors.filter((s) => s.tag === filter);
  }, [sponsors, filter]);

  return (
    <section
      id="sponsors"
      className="py-20 sm:py-24 bg-ivory-50"
      data-testid="sponsors-section"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-500 mb-4">
              Sponsors &amp; Well-Wishers
            </p>
            <h2 className="font-heading font-semibold text-ink-900 text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.1] tracking-tight">
              Featured supporters from the{" "}
              <span className="text-burgundy-600">Sabha Day 2026 Souvenir</span>
            </h2>
            <p className="mt-5 text-ink-700 leading-relaxed max-w-xl">
              Businesses, parishes, families and well-wishers who make our community
              mission possible. Open any card to view its original page in the
              souvenir.
            </p>
          </div>

          <Link
            to="/sponsors"
            className="inline-flex items-center gap-2 self-start lg:self-end rounded-lg border border-burgundy-600 text-burgundy-600 hover:bg-burgundy-100 font-medium px-5 py-3 transition-colors"
            data-testid="sponsors-view-all"
          >
            View all sponsors
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Filters (optional, visually subtle) */}
        <div className="mb-10">
          <FilterChips options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
        </div>

        {/* Grid / states */}
        {loading ? (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-testid="sponsors-loading"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-line rounded-2xl p-6 h-64 animate-pulse"
              >
                <div className="w-14 h-14 rounded-lg bg-ivory-100" />
                <div className="mt-6 h-3 w-24 rounded bg-ivory-100" />
                <div className="mt-4 h-4 w-3/4 rounded bg-ivory-100" />
                <div className="mt-2 h-4 w-2/3 rounded bg-ivory-100" />
                <div className="mt-6 h-3 w-full rounded bg-ivory-100" />
                <div className="mt-2 h-3 w-5/6 rounded bg-ivory-100" />
              </div>
            ))}
          </div>
        ) : error ? (
          <EmptyState
            title="We couldn’t load sponsors right now"
            body={error}
            testId="sponsors-error"
          />
        ) : visible.length === 0 ? (
          <EmptyState
            title={
              filter === "all"
                ? "No featured sponsors yet"
                : "No featured sponsors match this filter"
            }
            body={
              filter === "all"
                ? "Featured supporters will appear here once they are published."
                : "Try another tag, or view the full directory to see every supporter."
            }
            testId="sponsors-empty"
          />
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            data-testid="sponsors-grid"
          >
            {visible.map((s, i) => (
              <SponsorCard key={s.id} sponsor={s} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function EmptyState({ title, body, testId }) {
  return (
    <div
      className="bg-white border border-dashed border-line rounded-2xl py-16 px-6 flex flex-col items-center text-center"
      data-testid={testId}
    >
      <span className="w-12 h-12 rounded-full bg-burgundy-100 text-burgundy-600 flex items-center justify-center mb-4">
        <Heart size={20} />
      </span>
      <h3 className="font-heading text-xl text-ink-900">{title}</h3>
      <p className="mt-2 text-ink-700 max-w-md">{body}</p>
    </div>
  );
}
