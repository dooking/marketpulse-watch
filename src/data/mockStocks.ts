export interface Stock {
  ticker: string;
  name: string;
  score: number;
  price: number;
  change: number;
  isBuyable: boolean;
  openAiScore?: number;
}

export interface StockHistory {
  date: string;
  score: number;
  price: number;
  change: number;
}

// Generate mock stock data
export const mockStocks: Stock[] = [
  { ticker: "NVDA", name: "NVIDIA Corporation", score: 95, price: 875.32, change: 3.2, isBuyable: true, openAiScore: 88 },
  { ticker: "AAPL", name: "Apple Inc.", score: 88, price: 189.45, change: 1.5, isBuyable: true, openAiScore: 92 },
  { ticker: "MSFT", name: "Microsoft Corporation", score: 86, price: 425.18, change: 2.1, isBuyable: true, openAiScore: 95 },
  { ticker: "GOOGL", name: "Alphabet Inc.", score: 82, price: 175.23, change: -0.8, isBuyable: false, openAiScore: 85 },
  { ticker: "AMZN", name: "Amazon.com Inc.", score: 79, price: 186.92, change: 1.9, isBuyable: false, openAiScore: 90 },
  { ticker: "META", name: "Meta Platforms Inc.", score: 77, price: 512.45, change: 2.8, isBuyable: false, openAiScore: 78 },
  { ticker: "TSLA", name: "Tesla Inc.", score: 74, price: 248.67, change: -2.1, isBuyable: false, openAiScore: 82 },
  { ticker: "AMD", name: "Advanced Micro Devices", score: 71, price: 165.89, change: 1.2, isBuyable: false, openAiScore: 75 },
  { ticker: "NFLX", name: "Netflix Inc.", score: 68, price: 628.34, change: 0.5, isBuyable: false, openAiScore: 70 },
  { ticker: "CRM", name: "Salesforce Inc.", score: 65, price: 298.12, change: -0.3, isBuyable: false, openAiScore: 68 },
];

// Generate 30 days of historical data for each stock
export const generateStockHistory = (ticker: string): StockHistory[] => {
  const baseData: Record<string, { baseScore: number; basePrice: number }> = {
    NVDA: { baseScore: 85, basePrice: 820 },
    AAPL: { baseScore: 80, basePrice: 180 },
    MSFT: { baseScore: 78, basePrice: 400 },
    GOOGL: { baseScore: 75, basePrice: 165 },
    AMZN: { baseScore: 72, basePrice: 175 },
    META: { baseScore: 70, basePrice: 480 },
    TSLA: { baseScore: 65, basePrice: 230 },
    AMD: { baseScore: 62, basePrice: 150 },
    NFLX: { baseScore: 60, basePrice: 600 },
    CRM: { baseScore: 58, basePrice: 280 },
  };

  const { baseScore, basePrice } = baseData[ticker] || { baseScore: 70, basePrice: 100 };
  const history: StockHistory[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const scoreVariation = Math.sin(i * 0.3) * 10 + Math.random() * 8 - 4;
    const priceVariation = Math.sin(i * 0.2) * basePrice * 0.05 + Math.random() * basePrice * 0.03;
    const changeVariation = (Math.random() - 0.5) * 6;
    
    history.push({
      date: date.toISOString().split('T')[0],
      score: Math.round(Math.max(0, Math.min(100, baseScore + scoreVariation + (29 - i) * 0.3))),
      price: Math.round((basePrice + priceVariation + (29 - i) * 1.5) * 100) / 100,
      change: Math.round(changeVariation * 100) / 100,
    });
  }

  return history;
};

export const getStockByTicker = (ticker: string): Stock | undefined => {
  return mockStocks.find(stock => stock.ticker === ticker);
};

export const getBuyableStocks = (): Stock[] => {
  return mockStocks.filter(stock => stock.isBuyable);
};

export const getTopStocks = (count: number = 10): Stock[] => {
  return [...mockStocks].sort((a, b) => b.score - a.score).slice(0, count);
};

export const getTopOpenAiStocks = (count: number = 10): Stock[] => {
  return [...mockStocks].sort((a, b) => (b.openAiScore || 0) - (a.openAiScore || 0)).slice(0, count);
};
