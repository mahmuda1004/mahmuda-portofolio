import { useState } from 'react';
import {
  Trophy,
  Award,
  ExternalLink,
  Calendar,
  Sparkles,
  Bookmark,
  X,
  Target,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AWARDS_DATA } from '../data';
import { AwardOrHonor } from '../types';

export default function Pencapaian() {
  const [selectedAward, setSelectedAward] = useState<AwardOrHonor | null>(null);

  return (
    <section id="achievements" className="py-24 border-t border-neutral-900 bg-[#07080a] relative overflow-hidden">
      {/* Visual Accent Glow */}
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center md:text-left mb-16">
          <div className="inline-flex items-center gap-2 text-purple-400 text-xs font-mono tracking-wider uppercase mb-3 justify-center md:justify-start">
            <Trophy size={12} className="text-purple-400 animate-bounce" />
            <span>Pencapaian & Kehormatan</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Penghargaan & Prestasi
          </h2>
          <p className="text-neutral-510 text-sm sm:text-base mt-2 max-w-2xl text-left text-neutral-500">
            Apresiasi akademik, kreativitas desain identitas universitas, kompetisi kepenulisan sastra nasional, dan kontes robotik yang pernah diraih.
          </p>
        </div>

        {/* Bento Grid Gallery for Achievements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {AWARDS_DATA.map((award, index) => {
            const isSpecial = award.id === 'a1' || award.id === 'a2';
            return (
              <div
                key={award.id}
                onClick={() => setSelectedAward(award)}
                className={`group relative rounded-2xl border bg-neutral-900/10 p-6 sm:p-7 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between h-[210px] sm:h-[190px] ${
                  isSpecial
                    ? 'border-neutral-800 hover:border-purple-500/40 bg-gradient-to-br from-neutral-900/20 via-neutral-900/10 to-transparent'
                    : 'border-neutral-850/60 hover:border-neutral-700/80'
                }`}
                id={`award-card-${award.id}`}
              >
                {/* Neon-ish glow line for special awards */}
                {isSpecial && (
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-indigo-500 to-transparent" />
                )}

                <div className="flex gap-4 items-start">
                  {/* Icon Frame */}
                  <div className={`p-2.5 rounded-xl border shrink-0 ${
                    isSpecial
                      ? 'bg-purple-500/10 border-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform'
                      : 'bg-neutral-950 border-neutral-850 text-neutral-400'
                  }`}>
                    {award.id === 'a1' ? (
                      <Sparkles size={16} />
                    ) : award.id === 'a2' ? (
                      <Target size={16} />
                    ) : (
                      <Award size={16} />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className="text-[10px] text-neutral-520 font-mono flex items-center gap-1 font-semibold text-neutral-500">
                        <Calendar size={10} />
                        <span>{award.issueDate}</span>
                      </span>
                      {award.association && (
                        <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-neutral-950 border border-neutral-850 text-neutral-400 font-medium truncate max-w-[150px]">
                          {award.association}
                        </span>
                      )}
                    </div>
                    
                    <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-purple-300 transition-colors tracking-tight line-clamp-2 leading-snug">
                      {award.title}
                    </h3>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-850/40 flex items-center justify-between">
                  <p className="text-neutral-400 text-xs truncate max-w-[70%] font-medium">
                    {award.issuer}
                  </p>
                  <span className="text-[11px] font-mono text-purple-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                    Detail Penghargaan
                    <ArrowRight size={11} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Overlay detail view */}
        <AnimatePresence>
          {selectedAward && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedAward(null)}
              id="award-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                id="award-modal-content"
              >
                {/* Visual Accent Header Line */}
                <div className="h-1.5 bg-gradient-to-r from-purple-500 via-indigo-500 to-teal-400" />
                
                <div className="p-6 sm:p-7 text-left">
                  {/* Top Meta info */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                      Penghargaan & Prestasi
                    </span>
                    <button
                      onClick={() => setSelectedAward(null)}
                      className="text-neutral-500 hover:text-white transition-colors cursor-pointer bg-neutral-900 hover:bg-neutral-800 p-1 rounded-lg border border-neutral-800"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Title & Issuer banner */}
                  <div className="mb-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                      {selectedAward.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-2 flex-wrap text-xs text-neutral-400">
                      <span>Pemberi Penghargaan:</span>
                      <span className="font-semibold text-neutral-200 bg-neutral-900 border border-neutral-850 px-2 py-0.5 rounded">
                        {selectedAward.issuer}
                      </span>
                    </div>
                  </div>

                  {/* Technical description block */}
                  <div className="bg-neutral-900/30 border border-neutral-900/80 p-4 rounded-xl text-neutral-300 text-xs sm:text-[13px] leading-relaxed mb-6 font-sans select-all">
                    {selectedAward.description}
                  </div>

                  {/* Stats Meta table */}
                  <div className="grid grid-cols-2 gap-4 py-4 mb-6 border-y border-neutral-905">
                    <div>
                      <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider">Tahun / Waktu</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <Calendar size={13} className="text-purple-400" />
                        <span className="text-xs text-neutral-200 font-bold font-mono">{selectedAward.issueDate}</span>
                      </div>
                    </div>
                    
                    {selectedAward.association && (
                      <div>
                        <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-wider font-semibold">Terkait Dengan</p>
                        <div className="flex items-center gap-1.5 mt-1">
                          <Bookmark size={13} className="text-indigo-400" />
                          <span className="text-xs text-neutral-220 font-bold max-w-[150px] truncate">{selectedAward.association}</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Button interactions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedAward(null)}
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs py-3.5 rounded-xl transition-all font-mono tracking-wider text-center"
                    >
                      Kembali
                    </button>
                    {selectedAward.link && (
                      <a
                        href={selectedAward.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-[2] flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-4 py-3.5 rounded-xl transition-all shadow-lg shadow-purple-500/20"
                      >
                        <span>Lihat Implementasi Kode / Sumber</span>
                        <ExternalLink size={13} />
                      </a>
                    )}
                  </div>

                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
