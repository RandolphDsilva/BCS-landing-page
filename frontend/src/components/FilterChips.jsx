import React from "react";

export default function FilterChips({ options, value, onChange }) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="tablist"
      aria-label="Filter sponsors by tag"
      data-testid="filter-chips"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(opt.value)}
            className={
              active
                ? "px-4 py-1.5 rounded-full bg-burgundy-600 text-white border border-burgundy-600 shadow-card text-sm font-medium transition-colors"
                : "px-4 py-1.5 rounded-full border border-line text-ink-700 hover:border-gold-500 hover:bg-gold-50 hover:text-ink-900 transition-colors text-sm font-medium"
            }
            data-testid={`filter-chip-${opt.value}`}
            type="button"
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
