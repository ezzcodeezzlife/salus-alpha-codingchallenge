# USD Currency Converter

A Next.js application for converting USD to EUR and CHF using real-time exchange rates from the European Central Bank via the Frankfurter API.

## Features

- Real-time exchange rates (USD to EUR and CHF)
- Input validation with 2 decimal place limit
- Quick select buttons (100, 1,000, 10,000 USD)
- 14-day historical rate charts with interactive hover
- Rate change indicators (1D, 3D, 7D, 14D)
- Locale-aware number formatting
- Comprehensive error and loading states
- Responsive design

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **Formatting:** Intl.NumberFormat
- **Testing:** Vitest, React Testing Library
- **Code Quality:** ESLint, Prettier

## Installation

```bash
# Clone repository then
cd salus-alpha-codingchallenge

# Install dependencies
npm install

# Start development server
npm run dev
```

The application runs on [http://localhost:3000](http://localhost:3000).

## Available Scripts

```bash
npm run dev           # Start development server
npm run build         # Create production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm test              # Run unit tests
npm run test:watch    # Run tests in watch mode
npm run test:ui       # Run tests with UI
npm run test:coverage # Generate coverage report
```

## Project Structure

```text
salus-alpha-codingchallenge/
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page (Server Component)
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── loading.tsx        # Loading state with skeleton UI
│   │   ├── error.tsx          # Error boundary
│   │   ├── globals.css        # Global styles and theme
│   │   └── favicon.ico        # Application favicon
│   ├── components/
│   │   ├── Converter.tsx      # Main converter (Client Component)
│   │   ├── AmountInput.tsx    # Input field with validation
│   │   ├── QuickAmountButtons.tsx  # Preset amount buttons
│   │   ├── ResultCard.tsx     # Conversion results display
│   │   ├── HistoryChart.tsx   # Historical rate chart
│   │   └── __tests__/         # Component tests
│   │       └── QuickAmountButtons.test.tsx
│   └── lib/
│       ├── fetchRates.ts      # API fetching (Server-side)
│       ├── validation.ts      # Input validation logic
│       ├── format.ts          # Number/date formatting utilities
│       └── __tests__/         # Unit tests
│           ├── validation.test.ts
│           └── format.test.ts
├── public/                    # Static assets
├── .gitignore                 # Git ignore patterns
├── .prettierrc                # Prettier configuration
├── .prettierignore            # Prettier ignore patterns
├── eslint.config.mjs          # ESLint configuration
├── next.config.ts             # Next.js configuration
├── next-env.d.ts              # Next.js TypeScript declarations
├── postcss.config.mjs         # PostCSS configuration
├── tsconfig.json              # TypeScript configuration
├── vitest.config.ts           # Vitest test configuration
├── vitest.setup.ts            # Vitest setup file
├── package.json               # Project dependencies
└── README.md                  # This file
```

## Architecture Decisions

### 1. Next.js App Router with Server Components

The application uses the modern App Router architecture. Exchange rate data is fetched server-side in `page.tsx` using parallel Promise.all() for optimal performance.

### 2. Server-Side Data Fetching

Both `getLatestRates()` and `getHistoryRates()` run exclusively on the server with 1-hour cache revalidation (`next: { revalidate: 3600 }`).

### 3. Minimal Client-Side State

Only the `Converter` component and its children use client-side state (`'use client'`). State is limited to:

- User input value
- Validation errors
- Chart hover interactions

No external state management library is needed for this scope.

### 4. Validation Strategy

Input validation enforces:

- Numeric input only (digits and decimal separator)
- Maximum 2 decimal places (standard USD precision)
- Range validation: 0 < amount ≤ 1,000,000
- Support for both dot and comma as decimal separator

Validation runs on every input change with immediate feedback.

### 5. Number Formatting

All currency values use `Intl.NumberFormat` with appropriate locales:

- EUR: German locale (de-DE)
- CHF: Swiss locale (de-CH)
- Exchange rates display with 5 decimal precision
- Consistent formatting across the application

### 6. Component Design

Components are organized by responsibility:

- **Converter:** Orchestrates state and layout
- **AmountInput:** Handles input and displays errors
- **QuickAmountButtons:** Provides preset amounts
- **ResultCard:** Displays results and manages chart hover state
- **HistoryChart:** Renders chart with percentage changes

Each component is documented with JSDoc comments.

## API Integration

The application uses the free Frankfurter API (ECB data):

**Latest rates:**

```http
GET https://api.frankfurter.app/latest?from=USD&to=EUR,CHF
```

**Historical rates (14 days):**

```http
GET https://api.frankfurter.app/[start_date]..[end_date]?from=USD&to=EUR,CHF
```

The API requires no authentication and updates daily. The application requests 20 days of historical data to ensure 14 valid data points (accounting for weekends/holidays).

## Testing

The project includes comprehensive unit tests using **Vitest** and **React Testing Library**.

### Test Coverage

- **49 tests total** across 3 test suites
- All critical functionality is tested

### What's Tested

#### 1. Validation Logic (`validation.test.ts` - 23 tests)

- Valid inputs (integers, decimals with dot/comma)
- Invalid formats (letters, special characters, negative numbers)
- Decimal place validation (max 2 places)
- Range validation (0 < amount ≤ 1,000,000 USD)
- Edge cases (zero, empty input, boundary values)

#### 2. Formatting Utilities (`format.test.ts` - 18 tests)

- Currency formatting (EUR with German locale, CHF with Swiss locale)
- Decimal precision (always 2 decimal places)
- Thousands separators
- Date formatting with multiple locales
- Rounding behavior

#### 3. Component Interactions (`QuickAmountButtons.test.tsx` - 8 tests)

- Button rendering
- Click event handlers
- Callback invocations with correct values
- Number formatting in UI
- Multiple interaction scenarios

### Running Tests

```bash
# Run all tests once
npm test

# Watch mode for development
npm run test:watch

# Generate coverage report
npm run test:coverage

# Interactive UI mode
npm run test:ui
```

### Test Configuration

- **Framework:** Vitest (fast, modern, Vite-native)
- **DOM Environment:** happy-dom (lightweight, fast)
- **Testing Library:** @testing-library/react
- **Matchers:** @testing-library/jest-dom
- **Config:** `vitest.config.ts` with TypeScript and path alias support

