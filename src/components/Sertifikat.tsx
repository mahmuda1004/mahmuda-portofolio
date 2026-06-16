import { useState } from 'react';
import {
  Award,
  Search,
  ExternalLink,
  ShieldCheck,
  Cpu,
  Layers,
  Sparkles,
  BookOpen,
  Calendar,
  X,
  CheckCircle,
  HelpCircle,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CERTIFICATIONS_DATA } from '../data';
import { Certification } from '../types';

export default function Sertifikat() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'cloud-ai' | 'web-dev' | 'data-science' | 'cyber-net' | 'others'>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  // Filter certifications
  const filteredCerts = CERTIFICATIONS_DATA.filter((cert) => {
    const matchesSearch =
      cert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cert.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (cert.skills || []).some((skill) => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (cert.credentialId || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || cert.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCategoryDetails = (cat: string) => {
    switch (cat) {
      case 'cloud-ai':
        return { label: 'Cloud & AI', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', icon: Sparkles };
      case 'web-dev':
        return { label: 'Web Development', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20', icon: Layers };
      case 'data-science':
        return { label: 'Data Science', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', icon: Cpu };
      case 'cyber-net':
        return { label: 'Cybersecurity & Net', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20', icon: ShieldCheck };
      default:
        return { label: 'Lainnya', color: 'bg-neutral-500/10 text-neutral-400 border-neutral-800', icon: BookOpen };
    }
  };

  const categoriesList: { id: typeof selectedCategory; label: string }[] = [
    { id: 'all', label: 'Semua Lisensi' },
    { id: 'cloud-ai', label: 'Cloud & AI' },
    { id: 'web-dev', label: 'Web Dev' },
    { id: 'data-science', label: 'Data Science' },
    { id: 'cyber-net', label: 'Security & Network' },
    { id: 'others', label: 'Lainnya' },
  ];

  return (
    <section id="certifications" className="py-24 border-t border-neutral-900 bg-[#07080a] relative overflow-hidden">
      {/* Background Graphic Accent */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center md:text-left mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3 justify-center md:justify-start">
            <Award size={12} className="text-indigo-400 animate-pulse" />
            <span>Sertifikasi & Lisensi</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Sertifikasi Profesional
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 max-w-2xl text-left">
            Kumpulan lisensi kompetensi, kelulusan kursus teknologi dari Dicoding Indonesia, Cisco, AWS, IBM SkillsBuild, Google, dan kontes kepemimpinan robotik tingkat nasional.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col lg:flex-row gap-5 items-center mb-10 w-full">
          <div className="relative w-full lg:flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari sertifikasi, penerbit, keahlian atau ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl py-3 pl-11 pr-4 text-sm text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-sans font-medium hover:border-neutral-800/80"
              id="cert-search-input"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full lg:w-auto scrollbar-none pb-2 lg:pb-0" id="cert-category-filters">
            {categoriesList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all border ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-500 text-white border-indigo-500 font-bold shadow-md shadow-indigo-500/10'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-850 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Certifications Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
          {filteredCerts.length > 0 ? (
            filteredCerts.map((cert) => {
              const catInfo = getCategoryDetails(cert.category);
              const CatIcon = catInfo.icon;
              return (
                <div
                  key={cert.id}
                  onClick={() => setSelectedCert(cert)}
                  className="bg-neutral-900/20 hover:bg-neutral-900/50 border border-neutral-850/70 hover:border-neutral-700/80 p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between h-[230px] cursor-pointer group relative overflow-hidden"
                  id={`cert-item-${cert.id}`}
                >
                  {/* Category Accent Line */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-800 via-neutral-900 to-neutral-900 group-hover:from-indigo-500 group-hover:to-teal-500 transition-all" />

                  {/* Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full border ${catInfo.color}`}>
                        <CatIcon size={10} />
                        <span>{catInfo.label}</span>
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1 font-semibold">
                        <Calendar size={10} />
                        <span>{cert.issueDate}</span>
                      </span>
                    </div>

                    <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight line-clamp-2 leading-snug">
                      {cert.title}
                    </h3>
                    <p className="text-neutral-400 text-xs mt-1.5 font-medium line-clamp-1">
                      {cert.issuer}
                    </p>
                  </div>

                  {/* Footer & Skills */}
                  <div className="pt-3 border-t border-neutral-850/50 flex flex-col gap-2 bg-transparent select-none">
                    {cert.skills && cert.skills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5 overflow-hidden max-h-[22px]">
                        {cert.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="text-[9px] font-mono px-2 py-0.5 rounded-md bg-neutral-950 border border-neutral-850 text-neutral-400">
                            {skill}
                          </span>
                        ))}
                        {cert.skills.length > 3 && (
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-neutral-950 text-neutral-500 font-bold">
                            +{cert.skills.length - 3}
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="h-[22px]" />
                    )}

                    <div className="flex items-center justify-between text-xs text-neutral-500 font-mono mt-1">
                      <span className="text-[10px] text-indigo-400 font-medium group-hover:underline flex items-center gap-1">
                        Lihat Kredensial
                        <ExternalLink size={10} />
                      </span>
                      {cert.credentialId && (
                        <span className="text-[9px] text-neutral-500 truncate max-w-[120px]">
                          ID: {cert.credentialId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/10">
              <HelpCircle size={32} className="mx-auto text-neutral-600 mb-3" />
              <p className="text-neutral-550 text-sm">Tidak ada sertifikasi yang cocok dengan pencarian Anda.</p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="text-indigo-400 text-xs font-mono mt-3.5 border border-indigo-900/50 bg-indigo-950/20 px-4 py-2 rounded-lg hover:bg-indigo-900/30 hover:text-white transition-all cursor-pointer"
              >
                Reset Pencarian
              </button>
            </div>
          )}
        </div>

        {/* Certificate details modal */}
        <AnimatePresence>
          {selectedCert && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setSelectedCert(null)}
              id="cert-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
                id="cert-modal-content"
              >
                {/* Visual Top Bar */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400" />
                
                <div className="p-6 sm:p-7 text-left">
                  {/* Category & Close */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1 rounded-full border ${getCategoryDetails(selectedCert.category).color}`}>
                      {getCategoryDetails(selectedCert.category).label}
                    </span>
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="text-neutral-500 hover:text-white transition-colors cursor-pointer bg-neutral-900 hover:bg-neutral-800 p-1 rounded-lg border border-neutral-800"
                    >
                      <X size={16} />
                    </button>
                  </div>

                  {/* Title & Issuer */}
                  <div className="mb-6">
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white tracking-tight select-all">
                      {selectedCert.title}
                    </h3>
                    <p className="text-neutral-400 text-sm mt-1.5 bg-neutral-900 border border-neutral-850 px-3 py-1.5 rounded-lg inline-block">
                      Penerbit: <strong className="text-neutral-100">{selectedCert.issuer}</strong>
                    </p>
                  </div>

                  {/* Info table block */}
                  <div className="grid grid-cols-2 gap-4 py-4 mb-6 border-y border-neutral-900">
                    <div>
                      <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Tanggal Terbit</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <CheckCircle size={13} className="text-emerald-400" />
                        <span className="text-xs text-neutral-200 font-bold font-mono">{selectedCert.issueDate}</span>
                      </div>
                    </div>
                    
                    {selectedCert.expiryDate && (
                      <div>
                        <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">Masa Berlaku</p>
                        <p className="text-xs text-neutral-200 font-bold font-mono mt-1">{selectedCert.expiryDate}</p>
                      </div>
                    )}

                    {selectedCert.credentialId && (
                      <div className="col-span-2">
                        <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">ID Kredensial</p>
                        <p className="text-xs text-indigo-400 font-bold font-mono mt-1 break-all bg-neutral-900/60 p-2 rounded border border-neutral-850 select-all">
                          {selectedCert.credentialId}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Skills Tag block */}
                  {selectedCert.skills && selectedCert.skills.length > 0 && (
                    <div className="mb-7">
                      <p className="text-[10px] text-neutral-550 font-mono uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                        <Tag size={12} className="text-indigo-400" />
                        <span>Keahlian yang Divalidasi</span>
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedCert.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="text-xs font-mono px-3 py-1 rounded-lg bg-neutral-900 border border-neutral-850/80 text-neutral-300 font-medium hover:border-neutral-700 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Button trigger */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedCert(null)}
                      className="flex-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-300 text-xs px-4 py-3.5 rounded-xl transition-all font-mono tracking-wider text-center"
                    >
                      Batal
                    </button>
                    <a
                      href={`https://www.linkedin.com/in/mahmuda-904b02206/details/certifications/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[2] flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs px-4 py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-505/20"
                    >
                      <span>Verifikasi Kredensial</span>
                      <ExternalLink size={13} />
                    </a>
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
