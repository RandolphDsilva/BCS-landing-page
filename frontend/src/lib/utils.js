/**
 * Phone + link helpers used across sponsor cards.
 * Keep these tiny, pure, and easy to unit-test.
 */

// Strip spaces, brackets, dashes, plus signs, dots — digits only.
// If the number is 10 digits we assume India (+91). If it already has a country
// code (11–15 digits) we keep it as-is.
export function cleanPhone(raw) {
  if (!raw) return "";
  const digits = String(raw).replace(/\D+/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

export function telHref(raw) {
  const digits = cleanPhone(raw);
  return digits ? `tel:+${digits}` : "";
}

export function whatsappHref(raw) {
  const digits = cleanPhone(raw);
  return digits ? `https://wa.me/${digits}` : "";
}

export function mailHref(email) {
  if (!email) return "";
  return `mailto:${String(email).trim()}`;
}

export function websiteHref(url) {
  if (!url) return "";
  const trimmed = String(url).trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// PDF.js viewer deep-link: /pdfjs/web/viewer.html?file=<encoded>#page=<n>
export function pdfViewerHref(pdfUrl, pdfPage) {
  if (!pdfUrl || !pdfPage) return "";
  return `/pdfjs/web/viewer.html?file=${encodeURIComponent(pdfUrl)}#page=${pdfPage}`;
}

export function initialsOf(name) {
  if (!name) return "BCS";
  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const take = parts.slice(0, 2).map((p) => p[0]?.toUpperCase() || "");
  return take.join("") || "BCS";
}
