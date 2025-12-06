import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import StockDetailCard from "@/components/StockDetailCard";
import ScoreChart from "@/components/ScoreChart";
import { getStockByTicker, generateStockHistory, StockHistory } from "@/data/mockStocks";
import { Button } from "@/components/ui/button";

const StockDetail = () => {
  const { ticker } = useParams<{ ticker: string }>();
  const stock = ticker ? getStockByTicker(ticker) : undefined;
  const history = useMemo(() => ticker ? generateStockHistory(ticker) : [], [ticker]);
  
  const todayData = history[history.length - 1] || null;
  const [selectedData, setSelectedData] = useState<StockHistory | null>(todayData);

  const handleDataPointClick = (data: StockHistory) => {
    setSelectedData(data);
  };

  if (!stock) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">종목을 찾을 수 없습니다</h1>
            <Link to="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                홈으로 돌아가기
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 md:py-8 space-y-6">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>목록으로 돌아가기</span>
        </Link>

        <section className="animate-fade-in">
          <StockDetailCard 
            stock={stock} 
            selectedData={selectedData}
            todayData={todayData}
          />
        </section>

        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <ScoreChart 
            data={history} 
            ticker={stock.ticker}
            onDataPointClick={handleDataPointClick}
            selectedDate={selectedData?.date}
          />
        </section>
      </main>

      <footer className="border-t border-border/50 mt-12">
        <div className="container py-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Stock Score. AI 기반 주식 분석 서비스.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default StockDetail;
