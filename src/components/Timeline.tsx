import { useState } from 'react';
import { Briefcase, GraduationCap, Milestone, CircleDot, ChevronDown, ChevronUp, Clock } from 'lucide-react';
import { TIMELINE_DATA } from '../data';

export default function Timeline() {
  const [filterType, setFilterType] = useState<'all' | 'work' | 'education'>('all');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredTimeline = TIMELINE_DATA.filter(
    (item) => filterType === 'all' || item.type === filterType
  );

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="timeline" className="py-24 border-t border-neutral-900 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
              <CircleDot size={12} className="text-indigo-400" />
              <span>Rekam Jejak Karir</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Linimasa & Pengalaman
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-2 max-w-lg">
              Perjalanan profesional saya dalam dunia rekayasa perangkat lunak, kolaborasi tim, dan perluasan kebiasaan belajar.
            </p>
          </div>

          <div className="flex bg-neutral-900/40 p-1 rounded-lg border border-neutral-800 self-start md:self-end">
            <button
              onClick={() => setFilterType('all')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === 'all' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Semua Jejak
            </button>
            <button
              onClick={() => setFilterType('work')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === 'work' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pekerjaan
            </button>
            <button
              onClick={() => setFilterType('education')}
              className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-all ${
                filterType === 'education' ? 'bg-neutral-800 text-white' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Pendidikan
            </button>
          </div>
        </div>

        {/* Timeline Thread */}
        <div className="relative max-w-3xl mx-auto pl-6 sm:pl-8 border-l border-neutral-800/80">
          {filteredTimeline.map((item, index) => {
            const isExpanded = expandedId === item.id;
            return (
              <div key={item.id} className="relative mb-12 text-left group">
                {/* Visual Timeline Node Bullet */}
                <span className="absolute -left-[35px] sm:-left-[43px] top-1.5 w-6 h-6 rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-white group-hover:border-indigo-400 transition-all z-10 shadow shadow-neutral-950">
                  {item.type === 'work' ? (
                    <Briefcase size={11} />
                  ) : item.type === 'education' ? (
                    <GraduationCap size={12} />
                  ) : (
                    <Milestone size={11} />
                  )}
                </span>

                {/* Event block */}
                <div className="bg-neutral-900/20 hover:bg-neutral-900/35 border border-neutral-800/60 p-5 sm:p-6 rounded-xl transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-3.5">
                    <span className="inline-flex items-center gap-1.5 text-indigo-400 text-xs font-mono font-semibold">
                      <Clock size={11} />
                      {item.year}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 font-bold bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded self-start sm:self-auto">
                      {item.type === 'work' ? 'Pengalaman Kerja' : 'Akademis'}
                    </span>
                  </div>

                  <h3 className="font-display text-base sm:text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-neutral-300 text-xs sm:text-sm font-semibold mt-1">
                    {item.company}
                  </p>

                  {/* Description - Collapsible for neatness */}
                  <p className={`text-neutral-400 text-xs sm:text-sm mt-3 leading-relaxed transition-all ${
                    isExpanded ? '' : 'line-clamp-2 md:line-clamp-none'
                  }`}>
                    {item.description}
                  </p>

                  {/* Toggle button on small screens when clamped */}
                  <button
                    onClick={() => toggleExpand(item.id)}
                    className="flex md:hidden items-center gap-1 text-[11px] font-mono font-bold text-indigo-400 mt-3 hover:text-white cursor-pointer"
                  >
                    {isExpanded ? (
                      <>
                        Sembunyikan <ChevronUp size={12} />
                      </>
                    ) : (
                      <>
                        Selengkapnya <ChevronDown size={12} />
                      </>
                    )}
                  </button>

                  {/* Core tags used during experience */}
                  <div className="flex flex-wrap gap-1.5 mt-4.5">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-neutral-900 border border-neutral-800/80 text-[10px] font-mono text-neutral-400 px-2.5 py-0.7 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
