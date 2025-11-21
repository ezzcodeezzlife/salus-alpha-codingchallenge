'use client';

import { useState } from 'react';
import { formatCurrency } from '@/lib/format';
import { HistoryChart } from './HistoryChart';
import type { HistoryDataPoint } from '@/lib/fetchRates';

interface ResultCardProps {
  amount: number | null;
  eurRate: number;
  chfRate: number;
  history: HistoryDataPoint[];
}

/**
 * Displays conversion results for EUR and CHF with interactive historical charts.
 * Shows empty state when no amount is entered. Supports hovering on charts to see
 * historical rates and recalculate amounts based on past exchange rates.
 *
 * @param amount - USD amount to convert (null if invalid/empty)
 * @param eurRate - Current USD to EUR exchange rate
 * @param chfRate - Current USD to CHF exchange rate
 * @param history - Historical rate data for charts
 */
export function ResultCard({
  amount,
  eurRate,
  chfRate,
  history,
}: ResultCardProps) {
  const [hoveredEurRate, setHoveredEurRate] = useState<number | null>(null);
  const [hoveredChfRate, setHoveredChfRate] = useState<number | null>(null);

  if (!amount || amount <= 0) {
    return (
      <div className="h-full flex items-center justify-center min-h-[280px]">
        <div className="text-center text-muted-foreground space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
            <svg
              className="w-8 h-8 opacity-50"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs font-medium">Enter an amount to convert</p>
        </div>
      </div>
    );
  }

  const activeEurRate = hoveredEurRate !== null ? hoveredEurRate : eurRate;
  const activeChfRate = hoveredChfRate !== null ? hoveredChfRate : chfRate;

  const eurAmount = amount * activeEurRate;
  const chfAmount = amount * activeChfRate;

  return (
    <div className="space-y-3">
      {/* EUR Result */}
      <div className="group relative bg-primary rounded-2xl p-5 border border-primary/20 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div className="relative space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium text-primary-foreground/60 uppercase tracking-wider mb-1">
                Euro{' '}
                {hoveredEurRate !== null && (
                  <span className="text-primary-foreground/80">
                    (Historical)
                  </span>
                )}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                {formatCurrency(eurAmount, 'EUR')}
              </p>
              <p className="text-[10px] text-primary-foreground/50 font-medium mt-1">
                1 USD = {activeEurRate.toFixed(5)} EUR
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary-foreground">
                €
              </span>
            </div>
          </div>

          {history.length > 0 && (
            <div className="pt-3 border-t border-primary-foreground/10">
              <HistoryChart
                history={history}
                currency="EUR"
                onRateHover={setHoveredEurRate}
              />
            </div>
          )}
        </div>
      </div>

      {/* CHF Result */}
      <div className="group relative bg-primary/80 rounded-2xl p-5 border border-primary/20 shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300">
        <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
        <div className="relative space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-medium text-primary-foreground/60 uppercase tracking-wider mb-1">
                Swiss Franc{' '}
                {hoveredChfRate !== null && (
                  <span className="text-primary-foreground/80">
                    (Historical)
                  </span>
                )}
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-primary-foreground tracking-tight">
                {formatCurrency(chfAmount, 'CHF')}
              </p>
              <p className="text-[10px] text-primary-foreground/50 font-medium mt-1">
                1 USD = {activeChfRate.toFixed(5)} CHF
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-primary-foreground">
                ₣
              </span>
            </div>
          </div>

          {history.length > 0 && (
            <div className="pt-3 border-t border-primary-foreground/10">
              <HistoryChart
                history={history}
                currency="CHF"
                onRateHover={setHoveredChfRate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
