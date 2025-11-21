'use client';

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
  error: string | null;
}

/**
 * Input component for entering USD amounts with validation.
 * Features dollar sign prefix, error handling, and accessibility support.
 *
 * @param value - Current input value
 * @param onChange - Callback when input value changes
 * @param error - Error message to display, if any
 */
export function AmountInput({ value, onChange, error }: AmountInputProps) {
  return (
    <div className="space-y-3">
      <label
        htmlFor="amount"
        className="block text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        Amount in USD
      </label>
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <span className="text-xl sm:text-2xl font-bold text-primary/50 group-focus-within:text-primary transition-colors">
            $
          </span>
        </div>
        <input
          id="amount"
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="1,000"
          className={`
            w-full h-14 pl-12 pr-4 
            text-2xl sm:text-3xl font-bold
            bg-background/50 
            border-2 rounded-xl
            transition-all duration-200
            placeholder:text-muted-foreground/30
            focus:outline-none focus:ring-4 focus:ring-primary/20 focus:border-primary focus:bg-background/80
            ${
              error
                ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
                : 'border-border hover:border-primary/50 hover:bg-background/70'
            }
          `}
          aria-invalid={!!error}
          aria-describedby={error ? 'amount-error' : undefined}
        />
      </div>
      {error && (
        <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
          <svg
            className="w-4 h-4 text-destructive shrink-0 mt-0.5"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
          <p
            id="amount-error"
            className="text-xs text-destructive font-medium"
            role="alert"
          >
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
