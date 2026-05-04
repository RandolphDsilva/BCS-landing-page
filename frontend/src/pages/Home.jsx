import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SponsorsSection from "../components/SponsorsSection";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SponsorsSection />
        <AboutBlock />
      </main>
      <Footer />
    </>
  );
}

function AboutBlock() {
  return (
    <section id="about" className="py-20 sm:py-24 bg-white border-t border-line">
      <div className="max-w-5xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-gold-500 mb-4">
          About the Sabha
        </p>
        <h2 className="font-heading font-semibold text-ink-900 text-3xl sm:text-4xl leading-tight">
          A community of faith, service and friendship.
        </h2>
        <div className="gold-rule mx-auto my-7" aria-hidden="true" />
        <p className="text-ink-700 leading-relaxed max-w-3xl mx-auto">
          The Bombay Catholic Sabha brings together parishes, families, businesses
          and well-wishers across Mumbai. Our Sabha Day 2026 Souvenir is a tribute
          to the people who quietly make our work possible — in prayer, in
          partnership, and in practical support for the community.
        </p>
      </div>
    </section>
  );
}
