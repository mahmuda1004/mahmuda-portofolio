import React, { useState } from 'react';
import {
  Code,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  Cpu,
  Server,
  Database,
  Activity,
  Github,
  Award,
  CircleDot
} from 'lucide-react';
import { Skill } from '../types';
import { CORE_SKILLS } from '../data';

// Map string icon names to real Lucide icons safely
const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Code,
  Terminal,
  Globe,
  Layers,
  Sparkles,
  Cpu,
  Server,
  Database,
  Activity,
  Github,
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'languages' | 'frontend' | 'backend' | 'tools'>('all');
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  const categories = [
    { id: 'all', label: 'Semua Tek' },
    { id: 'languages', label: 'Bahasa Pemrograman' },
    { id: 'frontend', label: 'Frontend Stack' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'tools', label: 'Sistem & Tools' },
  ];

  const filteredSkills = CORE_SKILLS.filter(
    (skill) => activeCategory === 'all' || skill.category === activeCategory
  );

  const SkillIcon = ({ name, className }: { name: string; className?: string }) => {
    const Component = ICON_MAP[name] || Code;
    return <Component size={20} className={className} />;
  };

  return (
    <section id="skills" className="py-24 border-t border-neutral-900 bg-neutral-950/40 relative">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
            <CircleDot size={12} className="text-indigo-400" />
            <span>Keahlian Teknis</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Peralatan & Teknologi
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2">
            Di bawah ini adalah ekosistem pengembangan perangkat lunak yang saya gunakan secara profesional untuk merealisasikan performa optimal dan estetika premium.
          </p>
        </div>

        {/* Tab Filter buttons */}
        <div className="flex flex-wrap gap-1.5 justify-center mb-14 bg-neutral-900/45 p-1.5 rounded-xl border border-neutral-800/80 max-w-lg mx-auto">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-neutral-800 text-white font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              onMouseEnter={() => setSelectedSkill(skill)}
              onMouseLeave={() => setSelectedSkill(null)}
              className="bg-neutral-900/35 hover:bg-neutral-900/75 border border-neutral-800/60 hover:border-neutral-700/80 p-5 rounded-xl transition-all duration-250 flex flex-col justify-between group cursor-default relative overflow-hidden"
            >
              {/* Top Row: Icon & Category label */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400 group-hover:text-indigo-400 group-hover:bg-neutral-900 transition-all">
                  <SkillIcon name={skill.icon} />
                </div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase font-bold tracking-wider">
                  {skill.category}
                </span>
              </div>

              {/* Title & Experience */}
              <div className="text-left">
                <h4 className="font-sans font-bold text-base text-white">{skill.name}</h4>
                <p className="text-xs text-neutral-500 mt-1">{skill.yearsOfExp} Tahun Pengalaman</p>
              </div>

              {/* Slider meter block */}
              <div className="mt-5 pt-3 border-t border-neutral-800/40">
                <div className="flex justify-between items-center text-[10px] font-mono mb-1.5">
                  <span className="text-neutral-500 uppercase tracking-wide">Kefasihan</span>
                  <span className="text-indigo-400 font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                  <div
                    className="h-full bg-indigo-500 group-hover:bg-gradient-to-r group-hover:from-indigo-500 group-hover:to-teal-400 transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Stats helper bottom card */}
        <div className="mt-14 p-6 bg-neutral-900/25 border border-neutral-800/65 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-3xl mx-auto text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-950/40 border border-indigo-900/30 flex items-center justify-center text-indigo-400 shrink-0">
              <Award size={20} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white tracking-tight">Kualifikasi Rekayasa Tingkat Lanjut</h4>
              <p className="text-xs text-neutral-400 leading-relaxed mt-1">
                Kefasihan teknis didasarkan pada implementasi kasus produksi nyata di industri, pengajaran modul, dan analisis arsitektural berskala tinggi.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-white font-medium text-xs px-5 py-2.5 rounded-lg whitespace-nowrap transition-all"
          >
            Konsultasikan Teknis
          </a>
        </div>

      </div>
    </section>
  );
}
