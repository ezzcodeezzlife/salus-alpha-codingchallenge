'use client';

interface QuickAmountButtonsProps {
  onSelect: (amount: number) => void;
}

const QUICK_AMOUNTS = [100, 1000, 10000];

/**
 * Displays a row of buttons for quickly selecting preset USD amounts.
 *
 * @param onSelect - Callback when a quick amount button is clicked
 */
export function QuickAmountButtons({ onSelect }: QuickAmountButtonsProps) {
  return (
    <div className="space-y-3">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Quick Select
      </p>
      <div className="grid grid-cols-3 gap-2">
        {QUICK_AMOUNTS.map((amount) => (
          <button
            key={amount}
            onClick={() => onSelect(amount)}
            className="h-10 px-3 font-semibold text-xs sm:text-sm cursor-pointer
                     bg-muted/50 hover:bg-primary hover:text-primary-foreground hover:shadow-lg hover:shadow-primary/20
                     border border-border hover:border-primary
                     rounded-lg transition-all duration-200
                     active:scale-95 focus:outline-none focus:ring-4 focus:ring-primary/20"
          >
            ${amount.toLocaleString('en-US')}
          </button>
        ))}
      </div>
    </div>
  );
}
