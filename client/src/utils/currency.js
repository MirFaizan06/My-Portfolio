// Currency conversion utility with support for top 10 currencies

export const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', flag: '🇺🇸' },
  EUR: { symbol: '€', name: 'Euro', flag: '🇪🇺' },
  GBP: { symbol: '£', name: 'British Pound', flag: '🇬🇧' },
  INR: { symbol: '₹', name: 'Indian Rupee', flag: '🇮🇳' },
  JPY: { symbol: '¥', name: 'Japanese Yen', flag: '🇯🇵' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', flag: '🇦🇺' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', flag: '🇨🇦' },
  CHF: { symbol: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  CNY: { symbol: '¥', name: 'Chinese Yuan', flag: '🇨🇳' },
  AED: { symbol: 'د.إ', name: 'UAE Dirham', flag: '🇦🇪' },
};

// Exchange rates relative to USD (updated periodically)
// Using approximate rates - in production, fetch from an API
const BASE_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  INR: 83.12,
  JPY: 149.50,
  AUD: 1.52,
  CAD: 1.36,
  CHF: 0.88,
  CNY: 7.24,
  AED: 3.67,
};

// Fetch live exchange rates from API
let cachedRates = { ...BASE_RATES };
let lastFetchTime = null;
const CACHE_DURATION = 3600000; // 1 hour in milliseconds

export const fetchExchangeRates = async () => {
  // Check if we have cached rates that are still fresh
  if (lastFetchTime && Date.now() - lastFetchTime < CACHE_DURATION) {
    return cachedRates;
  }

  try {
    // Using exchangerate-api.com (free tier)
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();

    if (data && data.rates) {
      // Update cached rates
      Object.keys(SUPPORTED_CURRENCIES).forEach(currency => {
        if (data.rates[currency]) {
          cachedRates[currency] = data.rates[currency];
        }
      });
      lastFetchTime = Date.now();
    }
  } catch (error) {
    console.warn('Failed to fetch live exchange rates, using cached rates:', error);
    // Fall back to base rates if fetch fails
    cachedRates = { ...BASE_RATES };
  }

  return cachedRates;
};

// Convert price from USD to target currency
export const convertPrice = (priceInUSD, targetCurrency, rates = cachedRates) => {
  if (!rates[targetCurrency]) {
    console.warn(`Currency ${targetCurrency} not supported, using USD`);
    return priceInUSD;
  }

  return priceInUSD * rates[targetCurrency];
};

// Format price with currency symbol and proper decimals
export const formatPrice = (price, currency = 'USD') => {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  if (!currencyInfo) {
    return `$${Math.round(price)}`;
  }

  // Round to nearest whole number for cleaner display
  const roundedPrice = Math.round(price);

  return `${currencyInfo.symbol}${roundedPrice.toLocaleString()}`;
};

// Get user's location-based currency
export const getUserCurrency = async () => {
  try {
    // Try to get user's location from IP
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();

    if (data && data.currency) {
      const currency = data.currency;
      // Check if the currency is in our supported list
      if (SUPPORTED_CURRENCIES[currency]) {
        return currency;
      }

      // Map some common currencies to supported ones
      const currencyMap = {
        'NZD': 'AUD', // New Zealand Dollar -> Australian Dollar
        'SGD': 'USD', // Singapore Dollar -> USD
        'HKD': 'CNY', // Hong Kong Dollar -> Chinese Yuan
        'SAR': 'AED', // Saudi Riyal -> UAE Dirham
      };

      if (currencyMap[currency]) {
        return currencyMap[currency];
      }
    }
  } catch (error) {
    console.warn('Failed to detect user currency:', error);
  }

  // Default to USD if detection fails
  return 'USD';
};

// Initialize currency system
export const initCurrency = async () => {
  // Fetch exchange rates
  await fetchExchangeRates();

  // Get user's preferred currency
  const userCurrency = await getUserCurrency();

  return userCurrency;
};
