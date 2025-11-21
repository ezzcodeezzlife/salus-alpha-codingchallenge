/**
 * Formats a number as currency using Intl.NumberFormat with proper locale.
 *
 * @param amount - Numeric amount to format
 * @param currency - Target currency (EUR or CHF)
 * @returns Formatted currency string (e.g., "1.234,56 €")
 */
export function formatCurrency(
  amount: number,
  currency: 'EUR' | 'CHF'
): string {
  const localeMap = {
    EUR: 'de-DE',
    CHF: 'de-CH',
  };

  return new Intl.NumberFormat(localeMap[currency], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Formats a date string for display using Intl.DateTimeFormat.
 *
 * @param dateString - ISO date string to format
 * @param locale - Locale code for formatting (defaults to 'de-DE')
 * @returns Formatted date string (e.g., "21.11.2025")
 */
export function formatDate(
  dateString: string,
  locale: string = 'de-DE'
): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
