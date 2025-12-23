/**
 * Formats a timestamp to a human-readable relative time string
 * @param timestamp - ISO timestamp string (timestamptz format)
 * @param fallback - Optional fallback timestamp if primary is null
 * @returns Formatted string like "3 days ago", "2 hours ago", etc.
 */
export function formatTimestamp(
  timestamp: string | null,
  fallback?: string | null
): string {
  const dateString = timestamp || fallback;

  if (!dateString) {
    return "Unknown";
  }

  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
  }
  if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
  }
  if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
  }
  if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
  }
  if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

/**
 * Formats a phone number to a readable format
 * @param phone - Raw phone number string (e.g., "5623324687" or "+15623324687")
 * @returns Formatted phone number (e.g., "562-332-4687")
 */
export function formatPhoneNumber(phone: string | null): string {
  if (!phone) {
    return "";
  }

  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // Handle different phone number lengths
  if (digits.length === 10) {
    // Format: 562-332-4687
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length === 11 && digits[0] === "1") {
    // US number with country code: remove leading 1 and format
    return `${digits.slice(1, 4)}-${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  // For other formats, return the original phone number
  return phone;
}
