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

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-header-content">
          <div>
            <h1>📈 Stock Market Dashboard</h1>
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

