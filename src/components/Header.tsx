import { useState, useEffect } from 'react';
import { Menu, X, Github, ExternalLink, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface HeaderProps {
  githubUrl: string;
}

export default function Header({ githubUrl }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      
      const sections = ['home', 'projects', 'skills', 'timeline', 'certifications', 'achievements', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'certifications', label: 'Sertifikat' },
    { id: 'achievements', label: 'Pencapaian' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="portfolio-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800 py-4 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center gap-2.5 font-display text-lg font-bold text-white tracking-tight cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-neutral-300 group-hover:bg-neutral-800 group-hover:text-white transition-all">
            <Code size={16} />
          </div>
          <span className="bg-gradient-to-r from-neutral-100 via-neutral-200 to-neutral-400 bg-clip-text text-transparent">
            mahmuda<span className="text-indigo-400 font-mono text-base">1004</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-neutral-900/40 p-1 rounded-full border border-neutral-800/60">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all ${
                activeSection === item.id
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Quick Links */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900/60 px-3.5 py-1.5 rounded-lg transition-all"
          >
            <Github size={14} />
            <span>GitHub</span>
            <ExternalLink size={11} className="text-neutral-500" />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 md:hidden text-neutral-400 hover:text-white bg-neutral-900/80 rounded-lg border border-neutral-800 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-neutral-950 border-b border-neutral-800 px-6 py-6 flex flex-col gap-4 md:hidden shadow-xl"
          >
            <div className="flex flex-col gap-1.5">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    activeSection === item.id
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/55'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <hr className="border-neutral-800" />

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full text-center text-sm text-neutral-300 border border-neutral-800 bg-neutral-900 py-3 rounded-lg hover:bg-neutral-800 transition-all font-medium"
            >
              <Github size={16} />
              <span>Kunjungi GitHub Profil</span>
              <ExternalLink size={13} className="text-neutral-500" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
