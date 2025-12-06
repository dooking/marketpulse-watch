import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Stock } from "@/data/mockStocks";
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
}

const getScoreClass = (score: number): string => {
  if (score >= 80) return "score-high";
  if (score >= 60) return "score-medium";
  return "score-low";
};

const StockTable = ({ stocks }: StockTableProps) => {
  return (
    <div className="glass-card overflow-hidden">
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-semibold text-foreground">Top 10 점수 순위</h2>
        <p className="text-sm text-muted-foreground mt-1">AI 분석 점수 기준 상위 종목</p>
      </div>
      
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
            {stocks.map((stock, index) => (
              <TableRow 
                key={stock.ticker} 
                className="border-border/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
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
                  <span className={`score-badge ${getScoreClass(stock.score)}`}>
                    {stock.score}
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StockTable;
