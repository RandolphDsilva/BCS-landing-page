/**
 * Phone + link helpers used across sponsor cards.
 * Keep these tiny, pure, and easy to unit-test.
 */

// Strip spaces, brackets, dashes, plus signs, dots — digits only.
// Normalisation for Indian numbers:
//   - 10 digits            -> "91" + digits  (mobile without country code)
//   - 11 digits + leading 0 -> "91" + digits.slice(1)  (landline trunk prefix)
//   - else                  -> return digits as-is (assume already international)
export function cleanPhone(raw) {
  if (!raw) return "";
  const digits = String(raw).replace(/\D+/g, "");
  if (!digits) return "";
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;
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
