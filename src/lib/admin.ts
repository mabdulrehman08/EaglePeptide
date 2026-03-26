export const ADMIN_EMAILS = (import.meta.env.VITE_ADMIN_EMAILS || "eaglepeptidite@gmail.com")
  .split(",")
  .map((email: string) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null) {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
