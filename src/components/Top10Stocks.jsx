import { useState, useEffect } from 'react'
import { getTop10StocksWithTrend } from '../services/api'
import './Top10Stocks.css'

function Top10Stocks({ onStockSelect }) {
  const [stocks, setStocks] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadTop10Stocks()
  }, [])

  const loadTop10Stocks = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await getTop10StocksWithTrend()
      
      if (result.success && result.data) {
        setStocks(result.data)
      } else {
        setError(result.error || 'Failed to load top 10 stocks')
      }
    } catch (err) {
      setError(err.message || 'Failed to load top 10 stocks')
    } finally {
      setLoading(false)
    }
  }

  const getStockName = (stock) => {
    return stock.Name || stock.name || stock.NAME || 'N/A'
  }

  const getRKCPScore = (stock) => {
    return stock['Total Mark out of 10'] || stock['Total Mark'] || stock.totalMark || stock.rkcpScore || 'N/A'
  }

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'bullish':
        return '#10b981' // green
      case 'bearish':
        return '#ef4444' // red
      case 'neutral':
        return '#6b7280' // gray
      default:
        return '#9ca3af' // light gray
    }
  }

  const getSignalLabel = (signal) => {
    const labels = {
      'strong_buy': 'Strong Buy',
      'buy': 'Buy',
      'weak_buy': 'Weak Buy',
      'hold': 'Hold',
      'weak_sell': 'Weak Sell',
      'sell': 'Sell',
      'strong_sell': 'Strong Sell',
      'insufficient_data': 'No Data',
      'error': 'Error',
      'unknown': 'Unknown'
    }
    return labels[signal] || signal
  }

  const formatPrice = (price) => {
    if (!price || isNaN(price)) return 'N/A'
    return `₹${price.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  return (
    <div className="top10-stocks">
      <div className="top10-header">
        <h2>🏆 Top 10 Stocks by RKCP Score</h2>
        <button onClick={loadTop10Stocks} className="refresh-button" disabled={loading}>
          {loading ? 'Loading...' : '🔄 Refresh'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {loading && (
        <div className="loading-message">
          Loading top 10 stocks with trend analysis...
        </div>
      )}

      {!loading && stocks.length > 0 && (
        <div className="top10-grid">
          {stocks.map((stock, index) => {
            const trendAnalysis = stock.trendAnalysis || {}
            const trend = trendAnalysis.trend || 'unknown'
            const signal = trendAnalysis.signal || 'unknown'
            
            return (
              <div
                key={index}
                className="top10-card"
                onClick={() => onStockSelect(stock)}
              >
                <div className="card-rank">#{index + 1}</div>
                
                <div className="card-content">
                  <h3 className="card-title">{getStockName(stock)}</h3>
                  
                  <div className="card-rkcp-score">
                    <span className="rkcp-label">RKCP Score</span>
                    <span className="rkcp-value">{getRKCPScore(stock)} / 10</span>
                  </div>

                  {trendAnalysis.trend && trendAnalysis.trend !== 'unknown' ? (
                    <div className="trend-analysis">
                      <div className="trend-header">
                        <span 
                          className="trend-indicator"
                          style={{ backgroundColor: getTrendColor(trend) }}
                        >
                          {trend === 'bullish' ? '📈' : trend === 'bearish' ? '📉' : '➡️'}
                        </span>
                        <span className="trend-label" style={{ color: getTrendColor(trend) }}>
                          {trend.charAt(0).toUpperCase() + trend.slice(1)}
                        </span>
                        <span className="signal-badge" style={{ 
                          backgroundColor: getTrendColor(trend) + '20',
                          color: getTrendColor(trend)
                        }}>
                          {getSignalLabel(signal)}
                        </span>
                      </div>

                      <div className="dma-details">
                        <div className="dma-item">
                          <span className="dma-label">50 DMA</span>
                          <span className="dma-value">{formatPrice(trendAnalysis.dma50)}</span>
                        </div>
                        <div className="dma-item">
                          <span className="dma-label">200 DMA</span>
                          <span className="dma-value">{formatPrice(trendAnalysis.dma200)}</span>
                        </div>
                        <div className="dma-item">
                          <span className="dma-label">Current</span>
                          <span className="dma-value">{formatPrice(trendAnalysis.currentPrice)}</span>
                        </div>
                      </div>

                      {trendAnalysis.dma50PercentDiff !== undefined && (
                        <div className="dma-percentages">
                          <span className="percent-item">
                            50 vs 200: 
                            <span style={{ 
                              color: trendAnalysis.dma50Above200 ? '#10b981' : '#ef4444',
                              fontWeight: '600'
                            }}>
                              {trendAnalysis.dma50Above200 ? '+' : ''}{trendAnalysis.dma50PercentDiff}%
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="trend-analysis">
                      <div className="no-trend-data">
                        {trendAnalysis.message || 'Trend analysis not available'}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {!loading && stocks.length === 0 && !error && (
        <div className="no-stocks-message">
          No stocks found
        </div>
      )}
    </div>
  )
}

export default Top10Stocks

