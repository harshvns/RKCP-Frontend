import './About.css'

function About() {
  // Define the 10 RKCP parameters with their terminology and explanations
  const parameters = [
    {
      id: 1,
      name: 'Mark 1',
      terminology: 'Revenue Growth',
      explanation: 'Measures the year-over-year percentage increase in a company\'s total revenue. Indicates the company\'s ability to grow its sales and market presence. Higher growth rates suggest strong business momentum and market demand for the company\'s products or services.'
    },
    {
      id: 2,
      name: 'Mark 2',
      terminology: 'Profitability Ratio',
      explanation: 'Evaluates the company\'s ability to generate profits relative to its revenue, assets, or equity. Common metrics include Net Profit Margin, Return on Equity (ROE), or Return on Assets (ROA). Higher ratios indicate better efficiency in converting sales into profits.'
    },
    {
      id: 3,
      name: 'Mark 3',
      terminology: 'Debt-to-Equity Ratio',
      explanation: 'Compares a company\'s total debt to its shareholders\' equity. A lower ratio indicates less financial risk and better financial stability. It shows how much the company relies on debt financing versus equity financing. Lower is generally better, indicating less financial leverage.'
    },
    {
      id: 4,
      name: 'Mark 4',
      terminology: 'Current Ratio / Liquidity',
      explanation: 'Measures a company\'s ability to pay short-term obligations with its current assets. A ratio above 1 indicates the company can cover its short-term liabilities. Higher ratios suggest better liquidity and financial flexibility, though excessively high ratios may indicate inefficient use of assets.'
    },
    {
      id: 5,
      name: 'Mark 5',
      terminology: 'Price-to-Earnings (P/E) Ratio',
      explanation: 'Compares a company\'s stock price to its earnings per share. Lower P/E ratios may indicate undervaluation, while higher ratios suggest the market expects future growth. It helps investors assess whether a stock is overvalued or undervalued relative to its earnings.'
    },
    {
      id: 6,
      name: 'Mark 6',
      terminology: 'Earnings Per Share (EPS) Growth',
      explanation: 'Measures the rate at which a company\'s earnings per share are increasing over time. Consistent EPS growth indicates improving profitability and is a key indicator of a company\'s financial health and potential for future dividend payments or stock price appreciation.'
    },
    {
      id: 7,
      name: 'Mark 7',
      terminology: 'Market Capitalization',
      explanation: 'The total market value of a company\'s outstanding shares, calculated by multiplying the current stock price by the total number of shares. It categorizes companies as large-cap, mid-cap, or small-cap, which helps assess investment risk and growth potential.'
    },
    {
      id: 8,
      name: 'Mark 8',
      terminology: 'Dividend Yield',
      explanation: 'The annual dividend payment divided by the stock\'s current price, expressed as a percentage. It indicates the return on investment from dividends. Higher yields can be attractive to income-seeking investors, though very high yields may signal financial distress.'
    },
    {
      id: 9,
      name: 'Mark 9',
      terminology: 'Price-to-Book (P/B) Ratio',
      explanation: 'Compares a company\'s market value to its book value (assets minus liabilities). A P/B ratio below 1 may indicate the stock is undervalued. It helps investors identify potentially undervalued stocks by comparing market price to the company\'s accounting value.'
    },
    {
      id: 10,
      name: 'Mark 10',
      terminology: 'Operating Margin',
      explanation: 'Measures operating income as a percentage of revenue, showing how efficiently a company converts sales into operating profits. Higher margins indicate better cost control and pricing power. It reflects the company\'s core business profitability before interest and taxes.'
    }
  ]

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About RKCP Scoring System</h1>
        
        <section className="about-intro">
          <h2>What is RKCP Score?</h2>
          <p>
            The RKCP (Research-based Key Company Parameters) Score is a comprehensive stock evaluation system 
            that analyzes companies across 10 critical financial and market parameters. Each parameter is 
            evaluated and assigned a mark, with the total score calculated out of 10 points.
          </p>
          <p>
            This scoring methodology helps investors quickly assess a company's overall financial health, 
            growth potential, and investment attractiveness by consolidating multiple key metrics into a 
            single, easy-to-understand score.
          </p>
        </section>

        <section className="parameters-section">
          <h2>The 10 RKCP Parameters</h2>
          <p className="section-description">
            Each parameter is carefully evaluated to provide a holistic view of a company's performance. 
            Below are detailed explanations of all 10 parameters used in the RKCP scoring system.
          </p>

          <div className="parameters-grid">
            {parameters.map((param) => (
              <div key={param.id} className="parameter-card">
                <div className="parameter-header">
                  <span className="parameter-number">{param.id}</span>
                  <h3 className="parameter-name">{param.name}</h3>
                </div>
                <div className="parameter-content">
                  <div className="parameter-terminology">
                    <span className="terminology-label">Terminology:</span>
                    <span className="terminology-value">{param.terminology}</span>
                  </div>
                  <div className="parameter-explanation">
                    <p>{param.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="scoring-section">
          <h2>How the Score is Calculated</h2>
          <div className="scoring-info">
            <p>
              Each of the 10 parameters is evaluated independently and assigned a mark. The marks are then 
              aggregated to calculate the <strong>Total Mark out of 10</strong>, which represents the 
              RKCP Score.
            </p>
            <ul className="scoring-points">
              <li>Each parameter contributes to the overall score</li>
              <li>Higher scores indicate stronger financial performance across multiple metrics</li>
              <li>The score is updated regularly to reflect current market conditions</li>
              <li>Stocks are ranked by their RKCP Score, with the top 10 displayed on the dashboard</li>
            </ul>
          </div>
        </section>

        <section className="disclaimer-section">
          <h2>Important Disclaimer</h2>
          <p>
            The RKCP Score is a tool for investment research and analysis. It should not be considered as 
            the sole basis for investment decisions. Always conduct thorough research, consider your risk 
            tolerance, and consult with financial advisors before making investment decisions. Past 
            performance does not guarantee future results.
          </p>
        </section>
      </div>
    </div>
  )
}

export default About

