import { TrendingUp, Search, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { mockStocks } from "@/data/mockStocks";
import { Input } from "@/components/ui/input";

const Header = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const today = new Date().toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });

  const filteredStocks = mockStocks.filter(stock =>
    stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleStockClick = (ticker: string) => {
    navigate(`/stock/${ticker}`);
    setSearchQuery("");
    setShowResults(false);
    setIsSearchOpen(false);
  };

  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-xl sticky top-0 z-50">
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-foreground">Stock Score</h1>
              <p className="text-xs text-muted-foreground">AI 기반 주식 점수</p>
            </div>
          </Link>

          {/* Search Bar */}
          <div ref={searchRef} className="relative flex-1 max-w-md">
            <div className={`flex items-center transition-all ${isSearchOpen ? 'w-full' : 'w-full sm:w-64'}`}>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="티커 또는 종목명 검색..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(e.target.value.length > 0);
                  }}
                  onFocus={() => searchQuery.length > 0 && setShowResults(true)}
                  className="pl-10 pr-10 bg-background/50 border-border/50 focus:border-primary"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowResults(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Search Results Dropdown */}
            {showResults && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50">
                {filteredStocks.length > 0 ? (
                  <ul className="max-h-64 overflow-y-auto">
                    {filteredStocks.map((stock) => (
                      <li key={stock.ticker}>
                        <button
                          onClick={() => handleStockClick(stock.ticker)}
                          className="w-full px-4 py-3 flex items-center justify-between hover:bg-muted/50 transition-colors text-left"
                        >
                          <div>
                            <span className="font-mono font-semibold text-primary">{stock.ticker}</span>
                            <span className="ml-2 text-sm text-muted-foreground">{stock.name}</span>
                          </div>
                          <span className="text-sm font-medium">${stock.price.toFixed(2)}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-muted-foreground">
                    검색 결과가 없습니다
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="text-right hidden sm:block shrink-0">
            <p className="text-sm text-muted-foreground">{today}</p>
            <div className="flex items-center gap-2 mt-1 justify-end">
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
