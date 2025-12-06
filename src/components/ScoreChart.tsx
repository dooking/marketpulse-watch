import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";
import { StockHistory } from "@/data/mockStocks";

interface ScoreChartProps {
  data: StockHistory[];
  ticker: string;
  onDataPointClick?: (data: StockHistory) => void;
  selectedDate?: string | null;
}

const ScoreChart = ({ data, ticker, onDataPointClick, selectedDate }: ScoreChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatFullDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleClick = (data: any) => {
    if (data && data.activePayload && data.activePayload[0] && onDataPointClick) {
      onDataPointClick(data.activePayload[0].payload);
    }
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const isSelected = label === selectedDate;
      return (
        <div className={`glass-card p-3 border ${isSelected ? 'border-primary' : 'border-border/50'}`}>
          <p className="text-sm text-muted-foreground mb-1">{formatFullDate(label)}</p>
          <p className="text-lg font-mono font-bold text-primary">
            점수: {payload[0].value}
          </p>
          <p className="text-xs text-muted-foreground mt-1">클릭하여 상세 보기</p>
        </div>
      );
    }
    return null;
  };

  const todayDate = data[data.length - 1]?.date;

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">30일 점수 추이</h3>
        <p className="text-sm text-muted-foreground mt-1">{ticker} AI 분석 점수 변화 • 클릭하여 날짜별 데이터 확인</p>
      </div>
      
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
          >
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0.4} />
                <stop offset="95%" stopColor="hsl(187, 85%, 53%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 30%, 18%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="date" 
              tickFormatter={formatDate}
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              interval="preserveStartEnd"
            />
            <YAxis 
              domain={[0, 100]}
              stroke="hsl(215, 20%, 55%)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            {selectedDate && selectedDate !== todayDate && (
              <ReferenceLine 
                x={selectedDate} 
                stroke="hsl(187, 85%, 53%)" 
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            )}
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(187, 85%, 53%)"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              dot={false}
              activeDot={{ 
                r: 8, 
                fill: "hsl(187, 85%, 53%)",
                stroke: "hsl(222, 47%, 6%)",
                strokeWidth: 3,
                cursor: 'pointer'
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {selectedDate && selectedDate !== todayDate && (
        <div className="mt-4 flex justify-center">
          <button 
            onClick={() => onDataPointClick && onDataPointClick(data[data.length - 1])}
            className="text-sm text-primary hover:text-primary/80 transition-colors underline underline-offset-4"
          >
            오늘 날짜로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreChart;
