import { useState } from 'react'
import StockSearch from './components/StockSearch'
import StockList from './components/StockList'
import StockDetails from './components/StockDetails'
import './App.css'

function App() {
  const [selectedStock, setSelectedStock] = useState(null)
  const [view, setView] = useState('search') // 'search', 'list', 'details'

  return (
    <div className="app">
      <header className="app-header">
        <h1>📈 Stock Market Dashboard</h1>
        <nav className="nav-tabs">
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
        </nav>
      </header>

      <main className="app-main">
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
            onBack={() => setView('search')}
          />
        )}
      </main>
    </div>
  )
}

export default App

