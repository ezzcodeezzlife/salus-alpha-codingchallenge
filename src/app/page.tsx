import { getLatestRates, getHistoryRates } from '@/lib/fetchRates';
import { Converter } from '@/components/Converter';

export const dynamic = 'force-dynamic';

/**
 * Home page - Server Component that fetches exchange rates and renders the converter.
 * Uses parallel data fetching for optimal performance.
 */
export default async function Home() {
  const [latestRates, history] = await Promise.all([
    getLatestRates(),
    getHistoryRates(),
  ]);

  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <Converter latestRates={latestRates} history={history} />
      </div>
    </main>
  );
}
