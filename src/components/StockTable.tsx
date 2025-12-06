import { ArrowUpRight, ArrowDownRight, Sparkles, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";
import { Stock } from "@/data/mockStocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface StockTableProps {
  stocks: Stock[];
  openAiStocks: Stock[];
}

const getScoreClass = (score: number): string => {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
};

const StockTableContent = ({ stocks, scoreKey }: { stocks: Stock[]; scoreKey: 'score' | 'openAiScore' }) => (
  <div className="overflow-x-auto">
    <Table>
      <TableHeader>
        <TableRow className="border-border/50 hover:bg-transparent">
          <TableHead className="text-muted-foreground font-medium w-12">#</TableHead>
          <TableHead className="text-muted-foreground font-medium">종목</TableHead>
          <TableHead className="text-muted-foreground font-medium text-center">점수</TableHead>
          <TableHead className="text-muted-foreground font-medium text-right">현재가</TableHead>
          <TableHead className="text-muted-foreground font-medium text-right">등락률</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stocks.map((stock, index) => {
          const score = scoreKey === 'openAiScore' ? (stock.openAiScore || 0) : stock.score;
          return (
            <TableRow 
              key={stock.ticker} 
              className="border-border/30 hover:bg-secondary/50 transition-colors cursor-pointer group animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell className="font-mono text-muted-foreground">
                {index + 1}
              </TableCell>
              <TableCell>
                <Link to={`/stock/${stock.ticker}`} className="block">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                      <span className="ticker-text text-sm text-primary">
                        {stock.ticker.slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="ticker-text text-foreground group-hover:text-primary transition-colors">
                        {stock.ticker}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[150px] md:max-w-none">
                        {stock.name}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                <span className={`score-badge ${getScoreClass(score)}`}>
                  {score}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <span className="price-text text-foreground">
                  ${stock.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <div className={`flex items-center justify-end gap-1 ${stock.change >= 0 ? 'text-success' : 'text-destructive'}`}>
                  {stock.change >= 0 ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span className="price-text">
                    {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                  </span>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  </div>
);

const StockTable = ({ stocks, openAiStocks }: StockTableProps) => {
  return (
    <div className="glass-card overflow-hidden">
      <Tabs defaultValue="score" className="w-full">
        <div className="p-6 border-b border-border/50">
          <TabsList className="grid w-full max-w-md grid-cols-2 bg-secondary/50">
            <TabsTrigger 
              value="score" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              Top 10 점수
            </TabsTrigger>
            <TabsTrigger 
              value="openai" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground gap-2"
            >
              <Sparkles className="w-4 h-4" />
              OpenAI Top 10
            </TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="score" className="mt-0">
          <StockTableContent stocks={stocks} scoreKey="score" />
        </TabsContent>
        
        <TabsContent value="openai" className="mt-0">
          <StockTableContent stocks={openAiStocks} scoreKey="openAiScore" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockTable;
