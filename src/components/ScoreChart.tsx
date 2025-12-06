import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { StockHistory } from "@/data/mockStocks";

interface ScoreChartProps {
  data: StockHistory[];
  ticker: string;
}

const ScoreChart = ({ data, ticker }: ScoreChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border border-border/50">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <p className="text-lg font-mono font-bold text-primary">
            점수: {payload[0].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground">30일 점수 추이</h3>
        <p className="text-sm text-muted-foreground mt-1">{ticker} AI 분석 점수 변화</p>
      </div>
      
      <div className="h-[300px] md:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <Area
              type="monotone"
              dataKey="score"
              stroke="hsl(187, 85%, 53%)"
              strokeWidth={2}
              fill="url(#scoreGradient)"
              dot={false}
              activeDot={{ 
                r: 6, 
                fill: "hsl(187, 85%, 53%)",
                stroke: "hsl(222, 47%, 6%)",
                strokeWidth: 2
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ScoreChart;
