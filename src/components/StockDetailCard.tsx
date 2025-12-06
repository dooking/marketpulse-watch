import { ArrowUpRight, ArrowDownRight, TrendingUp, TrendingDown, DollarSign, BarChart3, Calendar } from "lucide-react";
import { Stock, StockHistory } from "@/data/mockStocks";

interface StockDetailCardProps {
  stock: Stock;
  selectedData?: StockHistory | null;
  todayData?: StockHistory | null;
}

const getScoreClass = (score: number): string => {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
};

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const StockDetailCard = ({ stock, selectedData, todayData }: StockDetailCardProps) => {
  const isComparing = selectedData && todayData && selectedData.date !== todayData.date;
  const displayData = selectedData || todayData;
  
  const scoreDiff = isComparing && todayData && selectedData 
    ? todayData.score - selectedData.score 
    : null;
  const priceDiff = isComparing && todayData && selectedData 
    ? todayData.price - selectedData.price 
    : null;
  const changeDiff = isComparing && todayData && selectedData 
    ? todayData.change - selectedData.change 
    : null;

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
        
        <div className="flex items-center gap-3">
          {isComparing && selectedData && (
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{formatDate(selectedData.date)}</span>
            </div>
          )}
          {stock.isBuyable && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-success/20 text-success border border-success/30">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">매수 추천</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* AI 점수 */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <BarChart3 className="w-4 h-4" />
            <span className="text-sm">AI 점수</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`score-badge text-lg ${getScoreClass(displayData?.score || stock.score)}`}>
              {displayData?.score || stock.score}
            </span>
            {isComparing && scoreDiff !== null && (
              <div className={`flex items-center gap-1 text-sm ${scoreDiff >= 0 ? 'text-success' : 'text-destructive'}`}>
                {scoreDiff >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="font-mono">
                  {scoreDiff >= 0 ? '+' : ''}{scoreDiff} vs 오늘
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 현재가 */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            <DollarSign className="w-4 h-4" />
            <span className="text-sm">현재가</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="price-text text-lg text-foreground">
              ${(displayData?.price || stock.price).toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </span>
            {isComparing && priceDiff !== null && (
              <div className={`flex items-center gap-1 text-sm ${priceDiff >= 0 ? 'text-success' : 'text-destructive'}`}>
                {priceDiff >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="font-mono">
                  {priceDiff >= 0 ? '+' : ''}${priceDiff.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* 등락률 */}
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-2">
            {(displayData?.change || stock.change) >= 0 ? (
              <ArrowUpRight className="w-4 h-4 text-success" />
            ) : (
              <ArrowDownRight className="w-4 h-4 text-destructive" />
            )}
            <span className="text-sm">등락률</span>
          </div>
          <div className="flex items-center gap-3">
            <span className={`price-text text-lg ${(displayData?.change || stock.change) >= 0 ? 'text-success' : 'text-destructive'}`}>
              {(displayData?.change || stock.change) >= 0 ? '+' : ''}{(displayData?.change || stock.change).toFixed(2)}%
            </span>
            {isComparing && changeDiff !== null && (
              <div className={`flex items-center gap-1 text-sm ${changeDiff >= 0 ? 'text-success' : 'text-destructive'}`}>
                {changeDiff >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span className="font-mono">
                  {changeDiff >= 0 ? '+' : ''}{changeDiff.toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isComparing && (
        <div className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-sm text-primary flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            차트에서 날짜를 클릭하면 해당 날짜의 데이터를 확인할 수 있습니다. 현재 <strong>{formatDate(selectedData.date)}</strong> 데이터를 보고 있습니다.
          </p>
        </div>
      )}
    </div>
  );
};

export default StockDetailCard;
