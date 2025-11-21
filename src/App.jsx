import { useState } from 'react'
import StockSearch from './components/StockSearch'
import StockList from './components/StockList'
import StockDetails from './components/StockDetails'
import Top10Stocks from './components/Top10Stocks'
import About from './components/About'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [selectedStock, setSelectedStock] = useState(null)
  const [view, setView] = useState('top10') // 'search', 'list', 'top10', 'details', 'about'
  const [logoLoaded, setLogoLoaded] = useState(false)
  const [logoError, setLogoError] = useState(false)

  // Try to load logo - will attempt different extensions via onError
  const handleLogoLoad = () => {
    setLogoLoaded(true)
    setLogoError(false)
  }

  const handleLogoError = (e) => {
    const currentSrc = e.target.src
    const baseUrl = window.location.origin
    
    // Try SVG if PNG fails
    if (currentSrc.includes('.png')) {
      e.target.src = '/rkcp-logo.svg'
    } else if (currentSrc.includes('.svg')) {
      // Try JPG if SVG fails
      e.target.src = '/rkcp-logo.jpg'
    } else {
      // All attempts failed - hide logo
      setLogoError(true)
      setLogoLoaded(false)
      console.warn('RKCP logo not found. Please add rkcp-logo.png, rkcp-logo.svg, or rkcp-logo.jpg to the public folder.')
    }
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div className="header-left-section">
            <div className="header-title-section">
              <img 
                src="/rkcp-logo.png" 
                alt="RKCP Logo" 
                className={`rkcp-logo ${logoError ? 'logo-hidden' : ''}`}
                onLoad={handleLogoLoad}
                onError={handleLogoError}
              />
              <h1>Stock Market Dashboard</h1>
            </div>
            <nav className="nav-tabs">
              <button 
                className={view === 'top10' ? 'active' : ''} 
                onClick={() => { setView('top10'); setSelectedStock(null); }}
              >
                Top 10
              </button>
              <button 
                className={view === 'search' ? 'active' : ''} 
                onClick={() => { setView('search'); setSelectedStock(null); }}
              >
                Search
              </button>
              <button 
                className={view === 'list' ? 'active' : ''} 
                onClick={() => { setView('list'); setSelectedStock(null); }}
              >
                All Stocks
              </button>
              <button 
                className={view === 'about' ? 'active' : ''} 
                onClick={() => { setView('about'); setSelectedStock(null); }}
              >
                About
              </button>
            </nav>
          </div>
          <div className="header-actions">
            <img 
              src="/college-logo.png" 
              alt="MMM University Logo" 
              className="college-logo"
              onError={(e) => {
                // Try SVG if PNG fails
                if (e.target.src.includes('.png')) {
                  e.target.src = '/college-logo.svg'
                } else if (e.target.src.includes('.svg')) {
                  e.target.src = '/college-logo.jpg'
                } else {
                  e.target.style.display = 'none'
                }
              }}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="app-main">
        {view === 'top10' && (
          <Top10Stocks 
            onStockSelect={(stock) => {
              setSelectedStock(stock)
              setView('details')
            }}
          />
        )}
        
        {view === 'search' && (
          <StockSearch 
            onStockSelect={(stock) => {
              setSelectedStock(stock)
              setView('details')
            }}
          />
        )}
        
        {view === 'list' && (
          <StockList 
            onStockSelect={(stock) => {
              setSelectedStock(stock)
              setView('details')
            }}
          />
        )}
        
        {view === 'details' && selectedStock && (
          <StockDetails 
            stock={selectedStock}
            onBack={() => setView('top10')}
          />
        )}
        
        {view === 'about' && (
          <About />
        )}
      </main>
    </div>
  )
}

export default App

