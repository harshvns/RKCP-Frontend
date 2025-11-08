import './StockDetails.css'
import { companyTickerMap } from '../utils/tickerMapping.js'

function StockDetails({ stock, onBack }) {
  const formatValue = (value, fieldName = '') => {
    if (value === null || value === undefined) return 'N/A'
    
    // Handle nested objects (like Mar Cap Rs: { Cr: { " ": 111887.95 } })
    if (typeof value === 'object' && !Array.isArray(value)) {
      // Try to extract numeric value from nested structure
      const numericValue = extractNumericValue(value)
      if (numericValue !== null) {
        // Check if field is market cap (already in crores)
        const isMarketCap = /mar\s*cap/i.test(fieldName)
        return formatNumber(numericValue, isMarketCap)
      }
      // If we can't extract a number, show as JSON
      return JSON.stringify(value, null, 2)
    }
    
    // Handle arrays
    if (Array.isArray(value)) {
      return value.join(', ')
    }
    
    // Handle numbers - format with commas
    if (typeof value === 'number') {
      // Check if field is market cap (already in crores)
      const isMarketCap = /mar\s*cap/i.test(fieldName)
      return formatNumber(value, isMarketCap)
    }
    
    return String(value)
  }

  // Extract numeric value from nested objects like { Cr: { " ": 111887.95 } }
  const extractNumericValue = (obj) => {
    if (typeof obj !== 'object' || obj === null) return null
    
    // Check if object has a numeric value directly
    for (const key in obj) {
      const value = obj[key]
      
      // If value is a number, return it
      if (typeof value === 'number') {
        return value
      }
      
      // If value is an object, recurse
      if (typeof value === 'object' && value !== null) {
        const nested = extractNumericValue(value)
        if (nested !== null) {
          return nested
        }
      }
    }
    
    return null
  }

  // Format number with commas and appropriate suffix
  // isAlreadyInCrores: true if the value is already in crores (like market cap)
  const formatNumber = (num, isAlreadyInCrores = false) => {
    if (typeof num !== 'number' || isNaN(num)) return 'N/A'
    
    // If already in crores (like market cap), just add Cr suffix
    if (isAlreadyInCrores) {
      return `₹${num.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`
    }
    
    // For very large numbers, use Cr (Crores) or L (Lakhs)
    if (num >= 10000000) {
      return `₹${(num / 10000000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`
    } else if (num >= 100000) {
      return `₹${(num / 100000).toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`
    } else if (num >= 1000) {
      return `₹${num.toLocaleString('en-IN')}`
    }
    
    return `₹${num.toLocaleString('en-IN')}`
  }

  const getStockName = (stock) => {
    return stock.Name || stock.name || stock.NAME || 'N/A'
  }

  const getStockTicker = (stock) => {
    return stock.Ticker || stock.ticker || stock.SYMBOL || stock.Symbol || 'N/A'
  }

  const getRKCPScore = (stock) => {
    return stock['Total Mark out of 10'] || stock['Total Mark'] || stock.totalMark || 'N/A'
  }


  // Generate Screener.in URL from ticker symbol
  // Screener.in uses ticker symbols in UPPERCASE with /consolidated/ path
  // Example: "Bharti Airtel" -> "BHARTIARTL" -> https://www.screener.in/company/BHARTIARTL/consolidated/
  const getScreenerUrl = (stock) => {
    const stockName = getStockName(stock)
    
    // First, check if we have a mapping for this company
    if (stockName && companyTickerMap[stockName]) {
      const ticker = companyTickerMap[stockName]
      return `https://www.screener.in/company/${ticker}/consolidated/`
    }
    
    // Second, try to get ticker symbol from data if available
    const ticker = getStockTicker(stock)
    if (ticker && ticker !== 'N/A') {
      // Use ticker in uppercase
      const tickerUpper = ticker.trim().toUpperCase().replace(/[^A-Z0-9]/g, '')
      if (tickerUpper && tickerUpper.length > 0) {
        return `https://www.screener.in/company/${tickerUpper}/consolidated/`
      }
    }
    
    // If no ticker, try to generate ticker-like symbol from company name
    // Remove common words and spaces, convert to uppercase
    if (stockName && stockName !== 'N/A') {
      // Remove common words like "Ltd", "Limited", "Inc", etc.
      let tickerLike = stockName
        .trim()
        .replace(/\s*(Ltd|Limited|Inc|Incorporated|Corp|Corporation|Private|Pvt)\s*/gi, '')
        .replace(/\s+/g, '') // Remove all spaces
        .replace(/[^A-Za-z0-9]/g, '') // Remove special characters
        .toUpperCase()
      
      if (tickerLike && tickerLike.length >= 3) {
        return `https://www.screener.in/company/${tickerLike}/consolidated/`
      }
    }
    
    return null
  }

  // Generate Screener.in search URL - more reliable when ticker is unknown
  const getScreenerSearchUrl = (stock) => {
    const stockName = getStockName(stock)
    if (stockName === 'N/A' || !stockName) return null
    
    // Use search URL - this always works
    const searchQuery = encodeURIComponent(stockName)
    return `https://www.screener.in/search/?q=${searchQuery}`
  }

  // Fields to exclude
  const excludedFields = [
    '_id',
    '__v',
    'S', // Serial number
    'Mark1',
    'Mark 2',
    'Mark 3',
    'Marks 4',
    'Mark 5',
    'Mark6',
    'Mark7',
    'Mark8',
    'Mark9',
    'Mark10',
    'Total Mark out of 10' // Will be shown separately
  ]

  // Filter out internal MongoDB fields, serial number, and individual marks
  const displayFields = Object.entries(stock).filter(
    ([key]) => {
      // Exclude fields that start with underscore (except we'll handle _id separately)
      if (key.startsWith('_') && key !== '_id') return false
      // Exclude specific fields
      if (excludedFields.includes(key)) return false
      // Exclude fields that match mark patterns
      if (/^Mark\s*\d+$/i.test(key)) return false
      if (/^Marks\s*\d+$/i.test(key)) return false
      return true
    }
  )

  return (
    <div className="stock-details">
      <button onClick={onBack} className="back-button">
        ← Back to Search
      </button>

      <div className="details-container">
        <h2>{getStockName(stock)}</h2>
        {getStockTicker(stock) !== 'N/A' && (
          <p className="ticker-display">{getStockTicker(stock)}</p>
        )}

        {/* RKCP Score and Screener Link */}
        <div className="header-actions">
          <div className="rkcp-score-section">
            <div className="rkcp-score-label">RKCP Score</div>
            <div className="rkcp-score-value">{getRKCPScore(stock)} / 10</div>
          </div>
          
          {(getScreenerUrl(stock) || getScreenerSearchUrl(stock)) && (
            <a
              href={getScreenerUrl(stock) || getScreenerSearchUrl(stock)}
              target="_blank"
              rel="noopener noreferrer"
              className="screener-link"
              title={getScreenerUrl(stock) ? `View ${getStockName(stock)} on Screener.in` : `Search for ${getStockName(stock)} on Screener.in (using search as ticker not available)`}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
              View on Screener
            </a>
          )}
        </div>

        <div className="details-grid">
          {displayFields.map(([key, value]) => (
            <div key={key} className="detail-item">
              <div className="detail-label">{key}</div>
              <div className="detail-value">{formatValue(value, key)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default StockDetails

