import { ArrowUp, Code, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="bg-neutral-950 border-t border-neutral-900 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left copyright notice */}
        <div className="flex flex-col sm:items-start text-center sm:text-left gap-1.5">
          <div className="flex items-center justify-center sm:justify-start gap-2 font-display text-sm font-bold text-white">
            <Code size={14} className="text-indigo-400" />
            <span>mahmuda<span className="text-indigo-400 font-mono font-medium">.dev</span></span>
          </div>
          <p className="text-[11px] text-neutral-500 font-mono uppercase tracking-wider">
            © {new Date().getFullYear()} Mahmuda. Seluruh hak cipta dilindungi.
          </p>
        </div>

        {/* Center built statement */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
          <span>Didesain dengan</span>
          <Heart size={11} className="text-indigo-400 fill-indigo-400/20" />
          <span>&</span>
          <Sparkles size={11} className="text-teal-400 fill-teal-400/10" />
          <span>estetika minimalis modern</span>
        </div>

        {/* Right scroll to top button */}
        <button
          onClick={handleScrollToTop}
          className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-all cursor-pointer hover:scale-105"
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>

      </div>
    </footer>
  );
}
