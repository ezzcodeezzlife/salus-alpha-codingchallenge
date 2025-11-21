// Maximum number of decimal places allowed for USD amounts
const MAX_DECIMAL_PLACES = 2;

/**
 * Validates and parses a currency amount input string.
 * Supports both dot and comma as decimal separator.
 * Enforces range: 0 < amount ≤ 1,000,000 USD.
 * Limits decimal places to 2 (standard currency precision).
 *
 * @param raw - Raw input string from user
 * @returns Validation result with parsed value or error message
 */
export function validateAmount(raw: string): {
  value: number | null;
  error: string | null;
} {
  // Empty input is valid (shows placeholder)
  if (!raw || raw.trim() === '') {
    return { value: null, error: null };
  }

  // Replace comma with dot for decimal input
  const normalized = raw.replace(',', '.');

  // Check for valid number format
  if (!/^\d+\.?\d*$/.test(normalized)) {
    return {
      value: null,
      error: 'Please enter a valid number (digits and decimal point only).',
    };
  }

  // Check decimal places limit
  const decimalPart = normalized.split('.')[1];
  if (decimalPart && decimalPart.length > MAX_DECIMAL_PLACES) {
    return {
      value: null,
      error: `Maximum ${MAX_DECIMAL_PLACES} decimal places allowed.`,
    };
  }

  const value = parseFloat(normalized);

  // Check for NaN
  if (isNaN(value)) {
    return {
      value: null,
      error: 'Invalid amount.',
    };
  }

  // Check minimum
  if (value <= 0) {
    return {
      value: null,
      error: 'Amount must be greater than 0.',
    };
  }

  // Check maximum (1 million USD)
  if (value > 1_000_000) {
    return {
      value: null,
      error: 'Amount must not exceed 1,000,000 USD.',
    };
  }

  return { value, error: null };
}
