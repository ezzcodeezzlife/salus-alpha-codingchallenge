import { describe, it, expect } from 'vitest';
import { validateAmount } from '../validation';

describe('validateAmount', () => {
  describe('Valid inputs', () => {
    it('should accept valid integer', () => {
      const result = validateAmount('100');
      expect(result.error).toBeNull();
      expect(result.value).toBe(100);
    });

    it('should accept valid decimal with dot', () => {
      const result = validateAmount('123.45');
      expect(result.error).toBeNull();
      expect(result.value).toBe(123.45);
    });

    it('should accept valid decimal with comma', () => {
      const result = validateAmount('123,45');
      expect(result.error).toBeNull();
      expect(result.value).toBe(123.45);
    });

    it('should accept one decimal place', () => {
      const result = validateAmount('50.5');
      expect(result.error).toBeNull();
      expect(result.value).toBe(50.5);
    });

    it('should accept maximum value (1,000,000)', () => {
      const result = validateAmount('1000000');
      expect(result.error).toBeNull();
      expect(result.value).toBe(1000000);
    });

    it('should accept small decimal values', () => {
      const result = validateAmount('0.01');
      expect(result.error).toBeNull();
      expect(result.value).toBe(0.01);
    });

    it('should accept empty string as valid (placeholder state)', () => {
      const result = validateAmount('');
      expect(result.error).toBeNull();
      expect(result.value).toBeNull();
    });

    it('should accept whitespace-only string as valid', () => {
      const result = validateAmount('   ');
      expect(result.error).toBeNull();
      expect(result.value).toBeNull();
    });
  });

  describe('Invalid inputs - Format', () => {
    it('should reject letters', () => {
      const result = validateAmount('abc');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });

    it('should reject special characters', () => {
      const result = validateAmount('100$');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });

    it('should reject multiple decimal points', () => {
      const result = validateAmount('100.50.25');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });

    it('should reject negative numbers', () => {
      const result = validateAmount('-100');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });
  });

  describe('Invalid inputs - Decimal places', () => {
    it('should reject more than 2 decimal places', () => {
      const result = validateAmount('100.123');
      expect(result.error).toBe('Maximum 2 decimal places allowed.');
      expect(result.value).toBeNull();
    });

    it('should reject 3 decimal places', () => {
      const result = validateAmount('50.999');
      expect(result.error).toBe('Maximum 2 decimal places allowed.');
      expect(result.value).toBeNull();
    });

    it('should reject many decimal places', () => {
      const result = validateAmount('1.23456789');
      expect(result.error).toBe('Maximum 2 decimal places allowed.');
      expect(result.value).toBeNull();
    });
  });

  describe('Invalid inputs - Range', () => {
    it('should reject zero', () => {
      const result = validateAmount('0');
      expect(result.error).toBe('Amount must be greater than 0.');
      expect(result.value).toBeNull();
    });

    it('should reject zero with decimals', () => {
      const result = validateAmount('0.00');
      expect(result.error).toBe('Amount must be greater than 0.');
      expect(result.value).toBeNull();
    });

    it('should reject amount exceeding maximum', () => {
      const result = validateAmount('1000001');
      expect(result.error).toBe('Amount must not exceed 1,000,000 USD.');
      expect(result.value).toBeNull();
    });

    it('should reject very large amount', () => {
      const result = validateAmount('999999999');
      expect(result.error).toBe('Amount must not exceed 1,000,000 USD.');
      expect(result.value).toBeNull();
    });
  });

  describe('Edge cases', () => {
    it('should handle decimal point only', () => {
      const result = validateAmount('.');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });

    it('should handle leading decimal point', () => {
      const result = validateAmount('.50');
      expect(result.error).toBe(
        'Please enter a valid number (digits and decimal point only).'
      );
      expect(result.value).toBeNull();
    });

    it('should handle very small valid amount', () => {
      const result = validateAmount('0.01');
      expect(result.error).toBeNull();
      expect(result.value).toBe(0.01);
    });

    it('should handle amount just below maximum', () => {
      const result = validateAmount('999999.99');
      expect(result.error).toBeNull();
      expect(result.value).toBe(999999.99);
    });
  });
});

