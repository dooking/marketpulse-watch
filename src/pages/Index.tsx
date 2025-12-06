import Header from "@/components/Header";
import BuyableStocksBanner from "@/components/BuyableStocksBanner";
import StockTable from "@/components/StockTable";
import { getBuyableStocks, getTopStocks, getTopOpenAiStocks } from "@/data/mockStocks";

const Index = () => {
  const buyableStocks = getBuyableStocks();
  const topStocks = getTopStocks(10);
  const topOpenAiStocks = getTopOpenAiStocks(10);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 md:py-8 space-y-6 md:space-y-8">
        <section className="animate-fade-in">
          <BuyableStocksBanner stocks={buyableStocks} />
        </section>

        <section className="animate-slide-up" style={{ animationDelay: '100ms' }}>
          <StockTable stocks={topStocks} openAiStocks={topOpenAiStocks} />
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

export default Index;
