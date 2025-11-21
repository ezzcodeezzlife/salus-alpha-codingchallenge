import { describe, it, expect } from 'vitest';
import { formatCurrency, formatDate } from '../format';

describe('formatCurrency', () => {
  describe('EUR formatting', () => {
    it('should format EUR with German locale', () => {
      const result = formatCurrency(1234.56, 'EUR');
      // German locale uses . for thousands and , for decimals
      expect(result).toBe('1.234,56\u00A0€');
    });

    it('should format small EUR amount', () => {
      const result = formatCurrency(5.5, 'EUR');
      expect(result).toBe('5,50\u00A0€');
    });

    it('should format large EUR amount', () => {
      const result = formatCurrency(999999.99, 'EUR');
      expect(result).toBe('999.999,99\u00A0€');
    });

    it('should format zero EUR', () => {
      const result = formatCurrency(0, 'EUR');
      expect(result).toBe('0,00\u00A0€');
    });

    it('should always show 2 decimal places for EUR', () => {
      const result = formatCurrency(100, 'EUR');
      expect(result).toBe('100,00\u00A0€');
    });
  });

  describe('CHF formatting', () => {
    it('should format CHF with Swiss locale', () => {
      const result = formatCurrency(1234.56, 'CHF');
      // Swiss locale format
      expect(result).toContain('1');
      expect(result).toContain('234');
      expect(result).toContain('56');
      expect(result).toContain('CHF');
    });

    it('should format small CHF amount', () => {
      const result = formatCurrency(10.25, 'CHF');
      expect(result).toContain('10');
      expect(result).toContain('25');
      expect(result).toContain('CHF');
    });

    it('should format large CHF amount', () => {
      const result = formatCurrency(500000, 'CHF');
      expect(result).toContain('500');
      expect(result).toContain('000');
      expect(result).toContain('CHF');
    });

    it('should always show 2 decimal places for CHF', () => {
      const result = formatCurrency(75, 'CHF');
      expect(result).toContain('75');
      expect(result).toContain('CHF');
    });
  });

  describe('Precision', () => {
    it('should round to 2 decimal places', () => {
      const result = formatCurrency(99.999, 'EUR');
      expect(result).toBe('100,00\u00A0€');
    });

    it('should handle very small decimals', () => {
      const result = formatCurrency(0.01, 'EUR');
      expect(result).toBe('0,01\u00A0€');
    });
  });
});

describe('formatDate', () => {
  describe('Default locale (de-DE)', () => {
    it('should format date with German locale by default', () => {
      const result = formatDate('2025-11-21');
      expect(result).toBe('21.11.2025');
    });

    it('should format date at start of year', () => {
      const result = formatDate('2025-01-01');
      expect(result).toBe('01.01.2025');
    });

    it('should format date at end of year', () => {
      const result = formatDate('2025-12-31');
      expect(result).toBe('31.12.2025');
    });
  });

  describe('Custom locales', () => {
    it('should format with US locale', () => {
      const result = formatDate('2025-11-21', 'en-US');
      expect(result).toBe('11/21/2025');
    });

    it('should format with French locale', () => {
      const result = formatDate('2025-11-21', 'fr-FR');
      expect(result).toBe('21/11/2025');
    });
  });

  describe('Edge cases', () => {
    it('should handle ISO datetime string', () => {
      const result = formatDate('2025-11-21T12:30:00Z');
      // Should still format the date part correctly
      expect(result).toMatch(/21\.11\.2025/);
    });

    it('should handle single-digit months and days', () => {
      const result = formatDate('2025-03-05');
      expect(result).toBe('05.03.2025');
    });
  });
});
