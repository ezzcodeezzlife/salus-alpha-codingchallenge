/**
 * Server-side API helpers for fetching exchange rates from Frankfurter API (ECB data).
 * These functions run on the server and include caching strategies.
 */

export interface LatestRates {
  amount: number;
  base: string;
  date: string;
  rates: {
    EUR: number;
    CHF: number;
  };
}

export interface HistoryRates {
  amount: number;
  base: string;
  start_date: string;
  end_date: string;
  rates: {
    [date: string]: {
      EUR: number;
      CHF: number;
    };
  };
}

export interface HistoryDataPoint {
  date: string;
  eur: number;
  chf: number;
}

/**
 * Fetches the latest USD to EUR and CHF exchange rates from Frankfurter API.
 * Caches results for 1 hour using Next.js revalidation.
 *
 * @returns Latest exchange rate data with date
 * @throws Error if API request fails
 */
export async function getLatestRates(): Promise<LatestRates> {
  try {
    const response = await fetch(
      'https://api.frankfurter.app/latest?from=USD&to=EUR,CHF',
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching latest rates:', error);
    throw new Error('Error loading exchange rates. Please try again later.');
  }
}

/**
 * Fetches historical exchange rates for the last 14 days from Frankfurter API.
 * Requests 20 days of data to account for weekends/holidays, then returns the last 14 points.
 * Caches results for 1 hour using Next.js revalidation.
 *
 * @returns Array of historical rate data points, sorted by date ascending
 * @returns Empty array if request fails (non-critical feature)
 */
export async function getHistoryRates(): Promise<HistoryDataPoint[]> {
  try {
    // Calculate date range (last 20 days to ensure we get at least 14 data points, accounting for weekends)
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 20);

    const formatDate = (date: Date) => date.toISOString().split('T')[0];

    const response = await fetch(
      `https://api.frankfurter.app/${formatDate(startDate)}..${formatDate(endDate)}?from=USD&to=EUR,CHF`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
      }
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`);
    }

    const data: HistoryRates = await response.json();

    // Transform to array format
    const history: HistoryDataPoint[] = Object.entries(data.rates).map(
      ([date, rates]) => ({
        date,
        eur: rates.EUR,
        chf: rates.CHF,
      })
    );

    // Sort by date ascending
    history.sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Take the last 14 data points to ensure we get 14 days
    return history.slice(-14);
  } catch (error) {
    console.error('Error fetching history rates:', error);
    // Return empty array if history fails (non-critical feature)
    return [];
  }
}
