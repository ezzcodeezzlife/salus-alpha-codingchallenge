/**
 * Loading component - displays skeleton UI while data is being fetched.
 * Matches the layout of the main converter for smooth transitions.
 */
export default function Loading() {
  return (
    <main className="min-h-screen bg-background relative flex items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Decorative background gradient */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 via-background to-primary/10" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-size-[50px_50px]" />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-xl mx-auto space-y-4">
        {/* Title skeleton */}
        <div className="text-center space-y-2 px-4">
          <div className="h-9 w-48 bg-muted/50 rounded-xl mx-auto animate-pulse" />
          <div className="h-3 w-32 bg-muted/30 rounded mx-auto animate-pulse" />
        </div>

        {/* Vertical Stack */}
        <div className="space-y-4">
          {/* Input Section */}
          <div className="bg-card border border-border rounded-2xl p-6 space-y-6">
            <div className="h-14 bg-muted/50 rounded-xl animate-pulse" />
            <div className="grid grid-cols-3 gap-2">
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
              <div className="h-10 bg-muted/50 rounded-lg animate-pulse" />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-3">
            <div className="h-32 bg-primary/20 rounded-2xl animate-pulse" />
            <div className="h-32 bg-primary/15 rounded-2xl animate-pulse" />
          </div>

          {/* Chart skeleton */}
          <div className="h-48 bg-card border border-border rounded-2xl animate-pulse" />
        </div>
      </div>
    </main>
  );
}
