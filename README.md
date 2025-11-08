# Stock Market Frontend

A modern React frontend application for the Stock Market API backend.

## Features

- 🔍 **Search Stocks**: Search by ticker symbol or stock name with autocomplete suggestions
- 📊 **View All Stocks**: Browse all available stocks with pagination
- 📈 **Stock Details**: View detailed information about any stock including RKCP Score
- 🔗 **Screener Links**: Direct links to Screener.in for each stock
- 🎨 **Modern UI**: Clean, responsive design with smooth animations
- ⚡ **Fast Performance**: Built with Vite for optimal performance

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend API URL (default: `https://rkcp-score.vercel.app`)

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd stock-market-frontend
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure API URL (Optional)**
   
   The API is already configured to use `https://rkcp-score.vercel.app` by default.
   
   If you need to use a different backend URL, create a `.env` file:
   ```env
   VITE_API_URL=https://rkcp-score.vercel.app
   ```
   
   Or copy the example file:
   ```bash
   cp .env.example .env
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The app will open at `http://localhost:3001`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Project Structure

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── StockSearch.jsx   # Search component with autocomplete
│   │   ├── StockList.jsx     # List all stocks
│   │   └── StockDetails.jsx  # Stock details view
│   ├── services/
│   │   └── api.js            # API service layer
│   ├── utils/
│   │   └── tickerMapping.js  # Company name to ticker mapping
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # Entry point
│   └── index.css             # Global styles
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js            # Vite configuration
└── package.json              # Dependencies
```

## API Endpoints Used

- `GET /api/stock/:ticker` - Get stock by ticker
- `GET /api/stock/search?name=stockname` - Search stock by name
- `GET /api/stock?limit=100&skip=0` - Get all stocks with pagination
- `GET /health` - Health check

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | `https://rkcp-score.vercel.app` |

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Set root directory to `frontend` (if needed)

3. **Configure Environment Variables**
   - In Vercel project settings → Environment Variables
   - Add: `VITE_API_URL` = `https://rkcp-score.vercel.app`
   - Or leave it empty to use the default

4. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Deploy to Netlify

1. **Build Command**: `npm run build`
2. **Publish Directory**: `dist`
3. **Environment Variables**: Add `VITE_API_URL` if needed

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting provider

## Technologies Used

- React 19
- Vite
- CSS3 (Custom Properties)
- Fetch API

## License

MIT
