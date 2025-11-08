import { useState, useEffect, useRef } from 'react'
import { getStockByTicker, searchStockByName, getStockSuggestions } from '../services/api'
import './StockSearch.css'

function StockSearch({ onStockSelect }) {
  const [searchType, setSearchType] = useState('ticker') // 'ticker' or 'name'
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stock, setStock] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const searchInputRef = useRef(null)
  const suggestionsRef = useRef(null)

  // Debounced search for suggestions
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        const results = await getStockSuggestions(searchQuery.trim(), 10)
        setSuggestions(results)
        setShowSuggestions(results.length > 0)
        setSelectedIndex(-1)
      } catch (err) {
        console.error('Error fetching suggestions:', err)
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300) // 300ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target) &&
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (e) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Please enter a search query')
      return
    }

    setLoading(true)
    setError(null)
    setStock(null)
    setShowSuggestions(false)

    try {
      let result
      if (searchType === 'ticker') {
        result = await getStockByTicker(searchQuery.trim())
      } else {
        result = await searchStockByName(searchQuery.trim())
      }

      if (result.success && result.data) {
        setStock(result.data)
        onStockSelect(result.data)
      } else {
        setError(result.error || 'Stock not found')
      }
    } catch (err) {
      setError(err.message || 'Failed to search stock')
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.displayName)
    setShowSuggestions(false)
    setSuggestions([])
    onStockSelect(suggestion)
  }

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value)
    setError(null)
    setStock(null)
  }

  const handleKeyDown = (e) => {
    if (!showSuggestions || suggestions.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Enter' && selectedIndex >= 0) {
      e.preventDefault()
      handleSuggestionClick(suggestions[selectedIndex])
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  const getStockName = (stock) => {
    return stock.Name || stock.name || stock.NAME || 'N/A'
  }

  const getStockTicker = (stock) => {
    return stock.Ticker || stock.ticker || stock.SYMBOL || stock.Symbol || 'N/A'
  }

  return (
    <div className="stock-search">
      <div className="search-container">
        <h2>Search Stocks</h2>
        
        <div className="search-type-toggle">
          <button
            className={searchType === 'ticker' ? 'active' : ''}
            onClick={() => {
              setSearchType('ticker')
              setSearchQuery('')
              setSuggestions([])
              setShowSuggestions(false)
            }}
          >
            By Ticker
          </button>
          <button
            className={searchType === 'name' ? 'active' : ''}
            onClick={() => {
              setSearchType('name')
              setSearchQuery('')
              setSuggestions([])
              setShowSuggestions(false)
            }}
          >
            By Name
          </button>
        </div>

        <div className="search-wrapper">
          <form onSubmit={handleSearch} className="search-form">
            <div className="input-wrapper">
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => {
                  if (suggestions.length > 0) {
                    setShowSuggestions(true)
                  }
                }}
                placeholder={searchType === 'ticker' ? 'Start typing to see suggestions...' : 'Start typing to see suggestions...'}
                className="search-input"
                disabled={loading}
                autoComplete="off"
              />
              <button type="submit" className="search-button" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div ref={suggestionsRef} className="suggestions-dropdown">
              {suggestions.map((suggestion, index) => (
                <div
                  key={suggestion._id || index}
                  className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  onMouseEnter={() => setSelectedIndex(index)}
                >
                  <div className="suggestion-name">{suggestion.displayName}</div>
                  {suggestion.displayTicker !== 'N/A' && (
                    <div className="suggestion-ticker">{suggestion.displayTicker}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        {stock && !error && (
          <div className="search-result-preview">
            <h3>Found:</h3>
            <p><strong>Name:</strong> {getStockName(stock)}</p>
            <p><strong>Ticker:</strong> {getStockTicker(stock)}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default StockSearch
