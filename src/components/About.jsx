import './About.css'

function About() {
  // Define the 10 RKCP parameters with their detailed explanations
  const parameters = [
    {
      id: 1,
      name: 'Mark 1',
      title: 'Net Income & Net Profit Margin (NPM) Growth',
      explanation: 'Net Income and Net Profit Margin should be positive and higher than the previous year. This shows improved profitability and better cost efficiency.'
    },
    {
      id: 2,
      name: 'Mark 2',
      title: 'Operating Cash Flow (CFO) & Cash Flow Margin (CFM)',
      explanation: 'Both Operating Cash Flow and Cash Flow Margin should be positive and show growth compared to last year. This indicates strong cash generation from core operations.'
    },
    {
      id: 3,
      name: 'Mark 3',
      title: 'Operating Profit Margin (OPM)',
      explanation: 'Operating Profit Margin should be positive. A positive OPM means the company is earning profit from its main business activities.'
    },
    {
      id: 4,
      name: 'Mark 4',
      title: 'Long-Term Debt-to-Equity Ratio',
      explanation: 'The Long-Term D/E Ratio should be lower than the previous year. This suggests reduced financial risk and better leverage management.'
    },
    {
      id: 5,
      name: 'Mark 5',
      title: 'CFO > Net Income (Quality of Earnings)',
      explanation: 'Operating Cash Flow should be greater than Net Income. This indicates high earnings quality and genuine cash-backed profits.'
    },
    {
      id: 6,
      name: 'Mark 6',
      title: 'Current Ratio',
      explanation: 'The Current Ratio should be higher compared to the previous year. A higher Current Ratio means better short-term liquidity and financial stability.'
    },
    {
      id: 7,
      name: 'Mark 7',
      title: 'Asset Turnover Ratio',
      explanation: 'The Asset Turnover Ratio should increase year-over-year. This reflects better efficiency in using assets to generate revenue.'
    },
    {
      id: 8,
      name: 'Mark 8',
      title: 'PEG Ratio < 1',
      explanation: 'A PEG Ratio less than 1 means the company offers good growth at a fair valuation. This helps identify undervalued growth stocks.'
    },
    {
      id: 9,
      name: 'Mark 9',
      title: 'P/E Ratio < Sector P/E',
      explanation: 'The company\'s P/E should be lower than the sector average, indicating relative undervaluation.'
    },
    {
      id: 10,
      name: 'Mark 10',
      title: 'Quarterly Profit Growth (YoY)',
      explanation: 'Quarterly profits should show growth compared to the same quarter last year. This captures recent performance momentum and business improvement.'
    }
  ]

  return (
    <div className="about-page">
      <div className="about-container">
        <h1 className="about-title">About RKCP Scoring System</h1>
        
        <section className="about-intro">
          <h2>What is the RKCP Score?</h2>
          <p>
            The RKCP Score is a modern and simplified stock evaluation system designed to help investors 
            understand a company's financial strength, growth potential, and market performance in an 
            easy and clear way.
          </p>
          <p>
            The model evaluates companies using 10 carefully selected financial and technical parameters, 
            each contributing 1 mark. The final RKCP Score is calculated out of 10, making it simple to 
            compare different companies and identify strong investment opportunities.
          </p>
          <div className="score-interpretation">
            <p><strong>To make interpretation easy:</strong></p>
            <ul className="interpretation-list">
              <li><strong>Score 8 to 10</strong> → Good Stock (strong fundamentals & growth)</li>
              <li><strong>Score 4 to 7</strong> → Average Stock (moderate performance)</li>
              <li><strong>Score 0 to 3</strong> → Weak Stock (poor financial condition)</li>
            </ul>
          </div>
          <p>
            The RKCP system combines fundamental analysis with technical indicators, offering a 
            complete, reliable, and user-friendly tool for evaluating stock quality and investment potential.
          </p>
        </section>

        <section className="parameters-section">
          <h2>The 10 RKCP Parameters</h2>
          <p className="section-description">
            Each parameter gives a different perspective on the company's performance. Together, they 
            provide a holistic and balanced view of strength, growth, valuation, and stability.
          </p>

          <div className="parameters-grid">
            {parameters.map((param) => (
              <div key={param.id} className="parameter-card">
                <div className="parameter-header">
                  <span className="parameter-number">{param.id}</span>
                  <h3 className="parameter-name">{param.name}</h3>
                </div>
                <div className="parameter-content">
                  <div className="parameter-title">
                    <strong>{param.title}</strong>
                  </div>
                  <div className="parameter-explanation">
                    <p>{param.explanation}</p>
                  </div>
                </div>
              </div>
            ))}
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



