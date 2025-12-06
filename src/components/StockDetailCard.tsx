import { ArrowUpRight, ArrowDownRight, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { Stock } from "@/data/mockStocks";

interface StockDetailCardProps {
  stock: Stock;
}

const getScoreClass = (score: number): string => {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
};

const StockDetailCard = ({ stock }: StockDetailCardProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="ticker-text text-xl text-primary">
              {stock.ticker.slice(0, 2)}
            </span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground ticker-text">{stock.ticker}</h1>
            <p className="text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        
        {stock.isBuyable && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success border border-success/30">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">매수 추천</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">AI 점수</span>
          </div>
          <span className={`score-badge text-lg ${getScoreClass(stock.score)}`}>
            {stock.score}
          </span>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">현재가</span>
          </div>
          <span className="price-text text-lg text-foreground">
            ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {stock.change >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-success" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-destructive" />
            )}
            <span className="text-sm">등락률</span>
          </div>
          <span className={`price-text text-lg ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
            {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default StockDetailCard;
