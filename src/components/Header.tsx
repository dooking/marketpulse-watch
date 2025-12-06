import { TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Stock Score</h1>
              <p className="text-xs text-muted-foreground">AI 기반 주식 점수</p>
            </div>
          </Link>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{today}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">실시간 업데이트</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
