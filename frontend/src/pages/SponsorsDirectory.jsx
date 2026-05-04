import React, { useEffect, useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "../lib/supabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SponsorCard from "../components/SponsorCard";
import FilterChips from "../components/FilterChips";

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "Commercial Ad", label: "Commercial Ads" },
  { value: "Best Compliments", label: "Best Compliments" },
  { value: "Best Wishes", label: "Best Wishes" },
];

export default function SponsorsDirectory() {
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      const { data, error: err } = await supabase
        .from("sponsors")
        .select(
          "id, display_name, slug, tag, type, contact_person, business_name, phone_1, phone_2, email, website, address, short_details, pdf_page, pdf_url, logo_url, sort_order"
        )
        .eq("status", "publish")
        .order("sort_order", { ascending: true });
      if (cancelled) return;
      if (err) setError(err.message);
      else setAll(data || []);
      setLoading(false);
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return all.filter((s) => {
      if (filter !== "all" && s.tag !== filter) return false;
      if (!q) return true;
      return [
        s.display_name,
        s.business_name,
        s.short_details,
        s.type,
        s.contact_person,
      ]
        .filter(Boolean)
        .some((v) => String(v).toLowerCase().includes(q));
    });
  }, [all, filter, query]);

  return (
    <>
      <Navbar />
      <main className="bg-ivory-50 min-h-screen">
        <section className="py-14 sm:py-20 border-b border-line bg-white">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-ink-500 hover:text-burgundy-600 transition-colors mb-6"
              data-testid="directory-back"
            >
              <ArrowLeft size={14} /> Back to home
            </Link>
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-500 mb-4">
              Sabha Day 2026 · Directory
            </p>
            <h1 className="font-heading font-semibold text-ink-900 text-3xl sm:text-5xl leading-[1.05] tracking-tight">
              All sponsors &amp; well-wishers
            </h1>
            <p className="mt-5 text-ink-700 max-w-2xl leading-relaxed">
              Browse every supporter featured in the Sabha Day 2026 Souvenir. Open
              any card to jump straight to its page in the original souvenir PDF.
            </p>
          </div>
        </section>

        <section className="py-10 sm:py-12">
          <div className="max-w-7xl mx-auto px-5 sm:px-8">
            {/* Toolbar */}
            <div className="flex flex-col lg:flex-row lg:items-center gap-4 lg:justify-between mb-8">
              <div className="relative w-full lg:w-96">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-500"
                />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, business or type…"
                  className="w-full bg-white border border-line rounded-lg pl-9 pr-4 py-2.5 text-sm placeholder:text-ink-500 focus:border-burgundy-600 focus:outline-none transition-colors"
                  data-testid="directory-search"
                  aria-label="Search sponsors"
                />
              </div>
              <FilterChips options={FILTER_OPTIONS} value={filter} onChange={setFilter} />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-white border border-line rounded-2xl p-6 h-64 animate-pulse"
                  />
                ))}
              </div>
            ) : error ? (
              <p className="text-burgundy-600" data-testid="directory-error">
                {error}
              </p>
            ) : visible.length === 0 ? (
              <div
                className="bg-white border border-dashed border-line rounded-2xl py-16 text-center"
                data-testid="directory-empty"
              >
                <p className="font-heading text-xl text-ink-900">No matches</p>
                <p className="mt-2 text-ink-700">
                  Try clearing filters or changing your search.
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm text-ink-500 mb-6" data-testid="directory-count">
                  Showing <span className="text-ink-900 font-semibold">{visible.length}</span>{" "}
                  supporters
                </p>
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                  data-testid="directory-grid"
                >
                  {visible.map((s, i) => (
                    <SponsorCard key={s.id} sponsor={s} index={i} />
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
