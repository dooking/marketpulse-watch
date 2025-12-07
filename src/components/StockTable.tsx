import { useState } from "react";
import { ArrowUpRight, ArrowDownRight, Sparkles, BarChart3, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { format, addDays, subDays, isToday } from "date-fns";
import { ko } from "date-fns/locale";
import { Stock } from "@/data/mockStocks";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handlePrevDay = () => {
    setSelectedDate(prev => subDays(prev, 1));
  };

  const handleNextDay = () => {
    setSelectedDate(prev => addDays(prev, 1));
  };

  const handleToday = () => {
    setSelectedDate(new Date());
  };

  return (
    <div className="glass-card overflow-hidden">
      <Tabs defaultValue="score" className="w-full">
        <div className="p-6 border-b border-border/50">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handlePrevDay}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[180px] justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(selectedDate, "PPP", { locale: ko })}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>

              <Button
                variant="outline"
                size="icon"
                className="h-9 w-9"
                onClick={handleNextDay}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {!isToday(selectedDate) && (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleToday}
                  className="ml-2"
                >
                  오늘
                </Button>
              )}
            </div>
          </div>
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
