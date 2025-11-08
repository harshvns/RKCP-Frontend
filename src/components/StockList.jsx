import { useState, useEffect } from 'react'
import { getAllStocks } from '../services/api'
import { companyTickerMap } from '../utils/tickerMapping.js'
import './StockList.css'

function StockList({ onStockSelect }) {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [limit, setLimit] = useState(50)
  const [skip, setSkip] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const loadStocks = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getAllStocks(limit, skip)
      
      if (result.success && result.data) {
        if (result.data.length === 0) {
          setHasMore(false)
        } else {
          setStocks(prev => [...prev, ...result.data])
          setHasMore(result.data.length === limit)
        }
      } else {
        setError(result.error || 'Failed to load stocks')
      }
    } catch (err) {
      setError(err.message || 'Failed to load stocks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadStocks()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip])

  const handleLoadMore = () => {
    setSkip(prev => prev + limit)
  }

  const getStockName = (stock) => {
    return stock.Name || stock.name || stock.NAME || 'N/A'
  }

  const getStockTicker = (stock) => {
    return stock.Ticker || stock.ticker || stock.SYMBOL || stock.Symbol || 'N/A'
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

  return (
    <div className="stock-list">
      <h2>All Stocks</h2>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {stocks.length > 0 && (
        <div className="stocks-grid">
          {stocks.map((stock, index) => (
            <div
              key={index}
              className="stock-card"
            >
              <div className="stock-card-content" onClick={() => onStockSelect(stock)}>
                <h3>{getStockName(stock)}</h3>
                {getStockTicker(stock) !== 'N/A' && (
                  <p className="ticker">{getStockTicker(stock)}</p>
                )}
              </div>
              {(getScreenerUrl(stock) || getScreenerSearchUrl(stock)) && (
                <a
                  href={getScreenerUrl(stock) || getScreenerSearchUrl(stock)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stock-card-screener-link"
                  onClick={(e) => e.stopPropagation()}
                  title={getScreenerUrl(stock) ? `View ${getStockName(stock)} on Screener.in` : `Search for ${getStockName(stock)} on Screener.in`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  Screener
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="loading">
          Loading stocks...
        </div>
      )}

      {hasMore && !loading && stocks.length > 0 && (
        <button onClick={handleLoadMore} className="load-more-button">
          Load More
        </button>
      )}

      {!hasMore && stocks.length > 0 && (
        <div className="end-message">
          No more stocks to load
        </div>
      )}
    </div>
  )
}

export default StockList

