import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Cross } from "lucide-react";

const linkBase = "text-sm font-medium text-ink-700 hover:text-burgundy-600 transition-colors";
const activeLink = "text-burgundy-600";

export default function Navbar() {
  return (
    <header
      className="sticky top-0 z-50 w-full bg-ivory-50/85 backdrop-blur border-b border-line"
      data-testid="site-navbar"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" data-testid="nav-home-link">
          <span
            className="inline-flex items-center justify-center w-8 h-8 rounded-md bg-burgundy-600 text-white shadow-card"
            aria-hidden="true"
          >
            <Cross size={16} strokeWidth={2.25} />
          </span>
          <span className="font-heading text-[1.15rem] tracking-tight text-burgundy-600 font-semibold">
            Bombay Catholic Sabha
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}
            data-testid="nav-link-home"
          >
            Home
          </NavLink>
          <NavLink
            to="/sponsors"
            className={({ isActive }) => `${linkBase} ${isActive ? activeLink : ""}`}
            data-testid="nav-link-sponsors"
          >
            Sponsors
          </NavLink>
          <a
            href="#about"
            className={linkBase}
            data-testid="nav-link-about"
          >
            About
          </a>
          <a
            href="#contact"
            className={linkBase}
            data-testid="nav-link-contact"
          >
            Contact
          </a>
        </nav>

        <Link
          to="/sponsors"
          className="hidden sm:inline-flex items-center rounded-lg bg-burgundy-600 hover:bg-burgundy-700 text-white text-sm font-medium px-4 py-2 shadow-card transition-colors"
          data-testid="nav-cta-sponsors"
        >
          Souvenir Directory
        </Link>
      </div>
    </header>
  );
}
