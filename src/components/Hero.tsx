import React, { useState } from 'react';
import { Terminal, ArrowRight, ChevronRight, Sparkles, Command, Github, FileText } from 'lucide-react';
import { motion } from 'motion/react';
import { GitHubProfile } from '../types';

interface HeroProps {
  profile: GitHubProfile;
  scrollToSection: (id: string) => void;
}

export default function Hero({ profile, scrollToSection }: HeroProps) {
  const [terminalHistory, setTerminalHistory] = useState<Array<{ type: 'input' | 'output'; text: string }>>([
    { type: 'output', text: 'Initializing developer_workspace v1.4.2...' },
    { type: 'output', text: 'Success! Welcome to Mahmuda\'s terminal console.' },
    { type: 'output', text: 'Type a command or click one of the pills below to start exploring.' }
  ]);
  const [terminalInput, setTerminalInput] = useState('');

  const runCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    const newHistory = [...terminalHistory, { type: 'input' as const, text: `$ ${cmd}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'output',
          text: 'Available subroutines: [about] [skills] [whoami] [projects] [clear]'
        });
        break;
      case 'about':
        newHistory.push({
          type: 'output',
          text: `Bio: ${profile.bio || 'Full-stack builder passionate about crafting high-end frontend experiences.'}`
        });
        break;
      case 'whoami':
        newHistory.push({
          type: 'output',
          text: `User details: { name: "${profile.name}", location: "Indonesia", status: "Open for Collaborations" }`
        });
        break;
      case 'skills':
        newHistory.push({
          type: 'output',
          text: 'Main competencies: [TypeScript, React/Next.js, Node/Express, Tailwind CSS, SQL, Docker]'
        });
        break;
      case 'projects':
        newHistory.push({
          type: 'output',
          text: 'Found 18 public repos. Listing highlighted items below on the projects panel automatically!'
        });
        setTimeout(() => {
          scrollToSection('projects');
        }, 800);
        break;
      case 'clear':
        setTerminalHistory([]);
        setTerminalInput('');
        return;
      default:
        newHistory.push({
          type: 'output',
          text: `Command not found: "${trimmed}". Type "help" for a list of active commands.`
        });
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      runCommand(terminalInput);
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden"
    >
      {/* Background soft ambient lights */}
      <div className="absolute top-1/4 -left-36 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-36 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 w-full">
        {/* Intro/Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          {/* Status Capsule */}
          <div className="inline-flex self-start items-center gap-2 bg-indigo-950/45 border border-indigo-800/40 px-3.5 py-1.5 rounded-full text-indigo-400 text-xs font-mono font-medium">
            <Sparkles size={12} className="animate-pulse" />
            <span>Open for Remote Work & Collaborations</span>
          </div>

          {/* Heading */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.08]">
            Designing the Future <br />
            Represented in{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-teal-300 to-indigo-500 bg-clip-text text-transparent">
              Clean Architectures
            </span>
          </h1>

          {/* Bio Description */}
          <p className="text-neutral-400 text-base sm:text-lg leading-relaxed max-w-xl">
            Halo, saya <strong className="text-white font-semibold">Mahmuda</strong>. Seorang software engineer dan pembuat antarmuka kreatif dengan komitmen penuh pada estetika minimalis modern, interaksi yang responsif, dan kode yang tangguh.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap gap-4 mt-2">
            <button
              onClick={() => scrollToSection('projects')}
              className="flex items-center gap-2 bg-white text-black hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all px-6 py-3 rounded-lg font-medium text-sm cursor-pointer shadow-lg shadow-white/5"
            >
              <span>Lihat Projek Unggulan</span>
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-2 bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all px-6 py-3 rounded-lg font-medium text-sm cursor-pointer"
            >
              <span>Hubungi Saya</span>
              <ChevronRight size={15} className="text-neutral-500" />
            </button>
          </div>

          {/* Simple Statistics indicators */}
          <div className="grid grid-cols-3 gap-6 pt-8 mt-4 border-t border-neutral-800/60 max-w-sm">
            <div>
              <p className="font-display text-2xl font-bold text-white">4+</p>
              <p className="text-xs text-neutral-500 font-medium">Tahun Pengalaman</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">18+</p>
              <p className="text-xs text-neutral-500 font-medium">GitHub Projek</p>
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-white">99%</p>
              <p className="text-xs text-neutral-500 font-medium">Kepuasan Klien</p>
            </div>
          </div>
        </div>

        {/* Dashboard/Terminal */}
        <div className="lg:col-span-5 w-full">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950/90 shadow-2xl relative overflow-hidden backdrop-blur-sm">
            {/* Terminal Header */}
            <div className="bg-neutral-900/80 px-4 py-3 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs font-mono text-neutral-400 ml-2 select-none flex items-center gap-1">
                  <Terminal size={12} /> console.sh
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-600 bg-neutral-950 px-2 py-0.5 rounded border border-neutral-800">
                UTC
              </div>
            </div>

            {/* Terminal Screen */}
            <div className="p-5 h-72 overflow-y-auto font-mono text-xs flex flex-col gap-2.5 scrollbar-thin scrollbar-thumb-neutral-800 scrollbar-track-transparent">
              {terminalHistory.map((item, index) => (
                <div
                  key={index}
                  className={`leading-relaxed text-left ${
                    item.type === 'input'
                      ? 'text-neutral-200 font-bold'
                      : 'text-neutral-400 whitespace-pre-line'
                  }`}
                >
                  {item.text}
                </div>
              ))}
            </div>

            {/* Terminal CLI Command Input Bar */}
            <div className="bg-neutral-900/30 px-4 py-3 border-t border-neutral-800 flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-xs font-bold font-mono">$</span>
              <input
                type="text"
                placeholder="type 'help', 'about', or 'skills'..."
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                onKeyDown={handleKeyPress}
                className="bg-transparent text-neutral-200 placeholder-neutral-600 text-xs font-mono font-medium focus:outline-none w-full"
              />
              <Command size={14} className="text-neutral-600" />
            </div>

            {/* Quick action triggers (pills) */}
            <div className="bg-neutral-900/70 p-3 border-t border-neutral-800 flex flex-wrap gap-1.5 justify-start">
              {['about', 'skills', 'projects', 'whoami', 'clear'].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => runCommand(cmd)}
                  className="bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-[10px] text-neutral-400 hover:text-white font-mono rounded px-2.5 py-1 tracking-wide transition-all"
                >
                  {cmd}()
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
