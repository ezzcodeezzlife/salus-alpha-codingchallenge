'use client';

import { useState } from 'react';
import type { LatestRates, HistoryDataPoint } from '@/lib/fetchRates';
import { validateAmount } from '@/lib/validation';
import { AmountInput } from './AmountInput';
import { QuickAmountButtons } from './QuickAmountButtons';
import { ResultCard } from './ResultCard';

interface ConverterProps {
  latestRates: LatestRates;
  history: HistoryDataPoint[];
}

/**
 * Main currency converter component that handles USD to EUR/CHF conversions.
 * Manages input state, validation, and displays conversion results with historical charts.
 *
 * @param latestRates - Current exchange rates from ECB
 * @param history - 14-day historical rate data for charts
 */
export function Converter({ latestRates, history }: ConverterProps) {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles amount input changes and validates the input value
   */
  const handleAmountChange = (value: string) => {
    setAmount(value);
    const validation = validateAmount(value);
    setError(validation.error);
  };

  /**
   * Handles quick amount button clicks and sets a preset amount
   */
  const handleQuickAmount = (value: number) => {
    setAmount(value.toString());
    setError(null);
  };

  const validation = validateAmount(amount);
  const amountNumber = validation.error ? null : validation.value;

  return (
    <div className="w-full max-w-xl mx-auto space-y-6">
      {/* Title */}
      <div className="text-center space-y-2 px-4 pb-4">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-primary">
          Currency Converter
        </h1>
        <p className="text-muted-foreground text-sm mt-3">
          Convert USD to EUR & CHF with ECB rates
        </p>
        <div className="text-xs text-muted-foreground">
          Rates from{' '}
          {new Date(latestRates.date).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </div>
      </div>

      {/* Vertical Stack - All sections */}
      <div className="space-y-4">
        {/* Input Section */}
        <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
          <AmountInput
            value={amount}
            onChange={handleAmountChange}
            error={error}
          />
          <QuickAmountButtons onSelect={handleQuickAmount} />
        </div>

        {/* Results Section */}
        <div className="flex flex-col gap-3">
          <ResultCard
            amount={amountNumber}
            eurRate={latestRates.rates.EUR}
            chfRate={latestRates.rates.CHF}
            history={history}
          />
        </div>
      </div>
    </div>
  );
}
