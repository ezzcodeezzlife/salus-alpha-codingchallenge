'use client';

import type { HistoryDataPoint } from '@/lib/fetchRates';
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  YAxis,
  XAxis,
} from 'recharts';

interface HistoryChartProps {
  history: HistoryDataPoint[];
  currency: 'EUR' | 'CHF';
  onRateHover?: (rate: number | null) => void;
}

interface TooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: { displayDate: string };
  }>;
  currency: string;
}

/**
 * Custom tooltip component for chart hover interactions.
 * Displays the exchange rate and date for a hovered data point.
 *
 * @param active - Whether the tooltip is currently active
 * @param payload - Data payload from the hovered point
 * @param currency - Currency symbol to display (EUR or CHF)
 * @param onHover - Callback to notify parent of the hovered rate
 */
function CustomTooltipComponent({
  active,
  payload,
  currency,
  onHover,
}: TooltipProps & { onHover?: (rate: number | null) => void }) {
  if (active && payload && payload.length) {
    const rate = payload[0].value;

    // Update parent with hovered rate
    if (onHover && rate) {
      // Use setTimeout to avoid state update during render
      setTimeout(() => onHover(rate), 0);
    }

    return (
      <div className="bg-black/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg shadow-xl border border-white/20">
        <div className="text-[10px] opacity-70 mb-1">
          {payload[0].payload.displayDate}
        </div>
        <div className="text-sm font-bold">
          {rate.toFixed(5)} {currency}
        </div>
      </div>
    );
  }
  return null;
}

/**
 * Interactive historical exchange rate chart with 1D, 3D, 7D, and 14D percentage changes.
 * Displays an area chart showing rate trends over the last 14 days.
 * Hovering on the chart updates the parent component with historical rates.
 *
 * @param history - Array of historical rate data points
 * @param currency - Which currency to display (EUR or CHF)
 * @param onRateHover - Callback when user hovers over a data point
 */
export function HistoryChart({
  history,
  currency,
  onRateHover,
}: HistoryChartProps) {
  if (!history || history.length === 0) {
    return null;
  }

  const data = history.map((point) => ({
    date: point.date,
    rate: currency === 'EUR' ? point.eur : point.chf,
    displayDate: new Date(point.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  /**
   * Calculates the percentage change in exchange rate over a specified period
   */
  const calculateChange = (daysAgo: number) => {
    if (data.length < 2) return null;

    const currentRate = data[data.length - 1].rate;
    let pastRate: number;

    // Special case for 14D - compare first to last
    if (daysAgo >= data.length - 1) {
      pastRate = data[0].rate;
    } else {
      const pastIndex = data.length - 1 - daysAgo;
      if (pastIndex < 0) return null;
      pastRate = data[pastIndex].rate;
    }

    const change = ((currentRate - pastRate) / pastRate) * 100;
    return change;
  };

  const change1Day = calculateChange(1);
  const change3Day = calculateChange(3);
  const change7Day = calculateChange(7);
  const change14Day = calculateChange(14);

  const formatChange = (change: number | null) => {
    if (change === null) return 'N/A';
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(2)}%`;
  };

  const getChangeColor = (change: number | null) => {
    if (change === null) return 'text-muted-foreground';
    return change >= 0 ? 'text-green-400' : 'text-red-400';
  };

  // Create tooltip with callback
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderTooltip = (props: any) => (
    <CustomTooltipComponent
      {...props}
      currency={currency}
      onHover={onRateHover}
    />
  );

  return (
    <div className="w-full space-y-3">
      {/* Percentage Changes */}
      <div className="grid grid-cols-4 gap-1.5">
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-xs text-primary-foreground/60 mb-1 font-medium">
            1D
          </div>
          <div className={`text-sm font-bold ${getChangeColor(change1Day)}`}>
            {formatChange(change1Day)}
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-xs text-primary-foreground/60 mb-1 font-medium">
            3D
          </div>
          <div className={`text-sm font-bold ${getChangeColor(change3Day)}`}>
            {formatChange(change3Day)}
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-xs text-primary-foreground/60 mb-1 font-medium">
            7D
          </div>
          <div className={`text-sm font-bold ${getChangeColor(change7Day)}`}>
            {formatChange(change7Day)}
          </div>
        </div>
        <div className="bg-black/20 rounded-lg p-2 text-center">
          <div className="text-xs text-primary-foreground/60 mb-1 font-medium">
            14D
          </div>
          <div className={`text-sm font-bold ${getChangeColor(change14Day)}`}>
            {formatChange(change14Day)}
          </div>
        </div>
      </div>

      {/* Recharts Area Chart */}
      <div className="w-full h-24 **:outline-none **:focus-visible:outline-none" onMouseLeave={() => onRateHover?.(null)}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id={`gradient-${currency}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#ffffff" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ffffff" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="displayDate"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={['dataMin - 0.001', 'dataMax + 0.001']}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 9 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              tickLine={false}
              tickFormatter={(value) => value.toFixed(4)}
              width={35}
            />
            <Tooltip
              content={renderTooltip}
              cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }}
            />
            <Area
              type="monotone"
              dataKey="rate"
              stroke="#ffffff"
              strokeWidth={2}
              fill={`url(#gradient-${currency})`}
              activeDot={{ r: 4, fill: '#ffffff' }}
              dot={{ r: 2, fill: '#ffffff', strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
