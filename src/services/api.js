// API service to connect to Vercel backend
// Your deployed API URL: https://rkcp-score.vercel.app
// In development, Vite proxy will handle the requests (see vite.config.js)
// In production, use the full URL or set VITE_API_URL environment variable
const DEFAULT_API_URL = 'https://rkcp-score.vercel.app';

// Get API base URL
// Priority: 1. VITE_API_URL env var, 2. Empty string in dev (proxy), 3. Default production URL
const isDevelopment = import.meta.env.MODE === 'development' || import.meta.env.DEV === true;
const API_BASE_URL = import.meta.env.VITE_API_URL || (isDevelopment ? '' : DEFAULT_API_URL);

// Debug log (remove in production if needed)
if (import.meta.env.DEV) {
  console.log('API_BASE_URL:', API_BASE_URL || '(using proxy)');
}

/**
 * Fetch stock by ticker symbol
 * @param {string} ticker - Stock ticker symbol
 * @returns {Promise<Object>} Stock data
 */
export const getStockByTicker = async (ticker) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stock/${ticker}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Network error: Unable to connect to API at ${API_BASE_URL}. Please check your internet connection and API URL.`);
    }
    throw error;
  }
};

/**
 * Search stock by name
 * @param {string} name - Stock name to search
 * @returns {Promise<Object>} Stock data
 */
export const searchStockByName = async (name) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stock/search?name=${encodeURIComponent(name)}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Network error: Unable to connect to API at ${API_BASE_URL}. Please check your internet connection and API URL.`);
    }
    throw error;
  }
};

/**
 * Get all stocks with pagination
 * @param {number} limit - Number of stocks to fetch
 * @param {number} skip - Number of stocks to skip
 * @returns {Promise<Object>} Stocks data
 */
export const getAllStocks = async (limit = 100, skip = 0) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/stock?limit=${limit}&skip=${skip}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Provide more detailed error messages
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      throw new Error(`Network error: Unable to connect to API at ${API_BASE_URL}. Please check your internet connection and API URL.`);
    }
    throw error;
  }
};

/**
 * Get stock suggestions for autocomplete
 * @param {string} query - Search query
 * @param {number} limit - Maximum number of suggestions
 * @returns {Promise<Array>} Array of stock suggestions
 */
export const getStockSuggestions = async (query, limit = 10) => {
  try {
    if (!query || query.trim().length < 2) {
      return [];
    }

    // Get a larger set of stocks to filter from
    const result = await getAllStocks(500, 0);
    
    if (!result.success || !result.data) {
      return [];
    }

    const searchTerm = query.toLowerCase().trim();
    const suggestions = result.data
      .filter(stock => {
        const name = (stock.Name || stock.name || '').toLowerCase();
        const ticker = (stock.Ticker || stock.ticker || stock.SYMBOL || stock.Symbol || '').toLowerCase();
        return name.includes(searchTerm) || ticker.includes(searchTerm);
      })
      .slice(0, limit)
      .map(stock => ({
        ...stock,
        displayName: stock.Name || stock.name || 'N/A',
        displayTicker: stock.Ticker || stock.ticker || stock.SYMBOL || stock.Symbol || 'N/A'
      }));

    return suggestions;
  } catch (error) {
    console.error('Error getting suggestions:', error);
    return [];
  }
};

/**
 * Health check endpoint
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
