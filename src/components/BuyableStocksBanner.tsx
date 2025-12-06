import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Stock } from "@/data/mockStocks";

interface BuyableStocksBannerProps {
  stocks: Stock[];
}

const BuyableStocksBanner = ({ stocks }: BuyableStocksBannerProps) => {
  return (
    <div className="glass-card p-6 glow-border animate-pulse-glow">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-success" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">오늘의 매수 신호</h2>
          <p className="text-sm text-muted-foreground">AI가 분석한 최적의 매수 타이밍</p>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        {stocks.length > 0 ? (
          <>
            <span className="text-muted-foreground">오늘 매수 가능한 종목은</span>
            {stocks.map((stock, index) => (
              <span key={stock.ticker} className="inline-flex items-center">
                <Link 
                  to={`/stock/${stock.ticker}`}
                  className="ticker-text text-success hover:text-success/80 transition-colors underline underline-offset-4 decoration-success/30 hover:decoration-success"
                >
                  {stock.ticker}
                </Link>
                {index < stocks.length - 1 && (
                  <span className="text-muted-foreground ml-1">,</span>
                )}
              </span>
            ))}
            <span className="text-muted-foreground">입니다.</span>
          </>
        ) : (
          <span className="text-muted-foreground">오늘은 매수 신호가 없습니다.</span>
        )}
      </div>
    </div>
  );
};

export default BuyableStocksBanner;
