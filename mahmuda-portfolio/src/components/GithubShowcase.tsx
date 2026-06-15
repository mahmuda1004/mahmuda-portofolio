import React, { useState, useEffect } from 'react';
import {
  Search,
  Star,
  GitFork,
  ExternalLink,
  ChevronRight,
  BookOpen,
  Calendar,
  Layers,
  Sparkles,
  Award,
  CircleDot,
  ArrowUpRight,
  FileText
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { GitHubRepo, GitHubProfile } from '../types';
import { FEATURED_PROJECTS_CUSTOM, CURATED_READMES_FALLBACK } from '../data';

interface ShowcaseProps {
  profile: GitHubProfile;
}

export default function GithubShowcase({ profile }: ShowcaseProps) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [sortBy, setSortBy] = useState<'stars' | 'updated' | 'size'>('stars');
  
  // Custom states for background project README and cover banner resolution
  const [selectedProject, setSelectedProject] = useState<GitHubRepo | null>(null);
  const [repoBanners, setRepoBanners] = useState<Record<string, string>>({});
  const [repoReadmes, setRepoReadmes] = useState<Record<string, string>>({});
  const [modalReadme, setModalReadme] = useState<string>('');
  const [modalLoading, setModalLoading] = useState<boolean>(false);

  // Fetch real public repositories from GitHub API
  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://api.github.com/users/mahmuda1004/repos?sort=updated&per_page=100');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        
        // Filter out fork repositories and keep original ones, then convert to our standard model
        const originalRepos: GitHubRepo[] = data
          .filter((r: any) => !r.fork)
          .map((r: any) => ({
            id: r.id,
            name: r.name,
            description: r.description,
            html_url: r.html_url,
            homepage: r.homepage,
            stargazers_count: r.stargazers_count,
            watchers_count: r.watchers_count,
            forks_count: r.forks_count,
            language: r.language,
            topics: r.topics || [],
            updated_at: r.updated_at,
            created_at: r.created_at,
            size: r.size,
          }));

        if (originalRepos.length > 0) {
          setRepos(originalRepos);
          setError(false);
        } else {
          // Fallback to pre-built high-quality static projects if public repos list is empty
          setRepos(FEATURED_PROJECTS_CUSTOM);
        }
      } catch (err) {
        console.error('GitHub fetch failed, loading curated fallback projects instead', err);
        setError(true);
        // Load beautifully structured custom projects as a fallback
        setRepos(FEATURED_PROJECTS_CUSTOM);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  // Background Loader: Scan and fetch project README files and extract cover image graphics
  useEffect(() => {
    if (repos.length === 0) return;

    const loadedBanners: Record<string, string> = {};
    const loadedReadmes: Record<string, string> = {};

    const loadDetailsInBg = async () => {
      // Background load the top 15 repositories to keep traffic optimized other than immediate selects
      const batch = repos.slice(0, 15);
      await Promise.allSettled(
        batch.map(async (repo) => {
          const branches = ['main', 'master'];
          let text = '';
          let activeBranch = 'main';

          for (const branch of branches) {
            try {
              const res = await fetch(`https://raw.githubusercontent.com/mahmuda1004/${repo.name}/${branch}/README.md`);
              if (res.ok) {
                text = await res.text();
                activeBranch = branch;
                break;
              }
            } catch (e) {
              // ignore and try master
            }
          }

          // Integrate curated readmes local fallback
          if (!text && CURATED_READMES_FALLBACK[repo.name]) {
            text = CURATED_READMES_FALLBACK[repo.name];
          }

          if (text) {
            loadedReadmes[repo.name] = text;

            // Simple RegExp parse to extract first image URL in markdown format
            const markdownImgRegex = /!\[.*?\]\((.*?)\)/;
            const htmlImgRegex = /<img.*?src=["'](.*?)["']/;
            
            const markdownMatch = text.match(markdownImgRegex);
            const htmlMatch = text.match(htmlImgRegex);
            
            let rawImgUrl = '';
            if (markdownMatch && markdownMatch[1]) {
              rawImgUrl = markdownMatch[1];
            } else if (htmlMatch && htmlMatch[1]) {
              rawImgUrl = htmlMatch[1];
            }

            if (rawImgUrl) {
              let bannerUrl = '';
              if (rawImgUrl.startsWith('http')) {
                bannerUrl = rawImgUrl;
              } else {
                // Absolute-ize the relative image paths relative to raw GitHub CDN
                const cleanPath = rawImgUrl.replace(/^(\.\/|\/)/, '');
                bannerUrl = `https://raw.githubusercontent.com/mahmuda1004/${repo.name}/${activeBranch}/${cleanPath}`;
              }
              loadedBanners[repo.name] = bannerUrl;
            }
          }
        })
      );

      setRepoBanners((prev) => ({ ...prev, ...loadedBanners }));
      setRepoReadmes((prev) => ({ ...prev, ...loadedReadmes }));
    };

    loadDetailsInBg();
  }, [repos]);

  // Lazy-load specific README when project clicked
  useEffect(() => {
    if (!selectedProject) {
      setModalReadme('');
      return;
    }

    const repoName = selectedProject.name;
    if (repoReadmes[repoName]) {
      setModalReadme(repoReadmes[repoName]);
      return;
    }

    const fetchSingleReadme = async () => {
      setModalLoading(true);
      const branches = ['main', 'master'];
      let text = '';

      for (const branch of branches) {
        try {
          const res = await fetch(`https://raw.githubusercontent.com/mahmuda1004/${repoName}/${branch}/README.md`);
          if (res.ok) {
            text = await res.text();
            break;
          }
        } catch (e) {
          // ignore
        }
      }

      // Fallback if network fails
      if (!text && CURATED_READMES_FALLBACK[repoName]) {
        text = CURATED_READMES_FALLBACK[repoName];
      }

      if (text) {
        setRepoReadmes((prev) => ({ ...prev, [repoName]: text }));
        setModalReadme(text);
      } else {
        setModalReadme(''); 
      }
      setModalLoading(false);
    };

    fetchSingleReadme();
  }, [selectedProject, repoReadmes]);

  // Compute unique languages list
  const allLanguages = ['All', ...Array.from(new Set(repos.map((r) => r.language).filter(Boolean))) as string[]];

  // Filter & Sort Repositories
  const filteredRepos = repos
    .filter((repo) => {
      const matchesSearch =
        repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (repo.description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        repo.topics.some((top) => top.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesLanguage = selectedLanguage === 'All' || repo.language === selectedLanguage;

      return matchesSearch && matchesLanguage;
    })
    .sort((a, b) => {
      if (sortBy === 'stars') {
        return b.stargazers_count - a.stargazers_count;
      } else if (sortBy === 'updated') {
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      } else {
        return b.size - a.size;
      }
    });

  // Highlighted Top Projects (Spotlight Deck)
  const spotlightProjects = repos.slice(0, 3);

  const getLanguageColor = (lang: string | null) => {
    if (!lang) return 'bg-neutral-605';
    const colors: Record<string, string> = {
      JavaScript: 'bg-yellow-400',
      TypeScript: 'bg-indigo-400',
      HTML: 'bg-orange-500',
      CSS: 'bg-teal-400',
      Python: 'bg-blue-400',
      Vue: 'bg-emerald-500',
      C: 'bg-gray-400',
      'C++': 'bg-pink-400',
    };
    return colors[lang] || 'bg-neutral-400';
  };

  const getBannerGradient = (lang: string | null) => {
    if (!lang) return 'from-neutral-900 via-neutral-950 to-neutral-950';
    const gradients: Record<string, string> = {
      JavaScript: 'from-amber-600/10 via-amber-700/5 to-neutral-950',
      TypeScript: 'from-indigo-600/20 via-blue-500/5 to-neutral-950',
      HTML: 'from-orange-500/20 via-amber-500/5 to-neutral-950',
      CSS: 'from-teal-500/20 via-emerald-500/5 to-neutral-950',
      Python: 'from-sky-500/20 via-blue-500/5 to-neutral-950',
      Vue: 'from-emerald-500/20 via-teal-500/5 to-neutral-950',
    };
    return gradients[lang] || 'from-neutral-900 via-neutral-800/25 to-neutral-950';
  };

  const formatBytes = (kb: number) => {
    if (kb < 1024) return `${kb} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const formatDate = (isoString: string) => {
    return new Date(isoString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <section id="projects" className="py-24 border-t border-neutral-905 bg-[#07080a]">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
              <CircleDot size={12} className="text-indigo-400" />
              <span>Karya & Portofolio</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Galeri Kode Unggulan
            </h2>
            <p className="text-neutral-500 text-sm sm:text-base mt-2 max-w-lg">
              Sinkronisasi real-time otomatis dari aktivitas GitHub saya. Jelajahi arsitektur, screenshot README, dan alur kerja fungsional secara instan.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 bg-neutral-900/40 p-1.5 rounded-xl border border-neutral-800 self-start md:self-end">
            <button
              onClick={() => setSortBy('stars')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all uppercase tracking-wider ${
                sortBy === 'stars' ? 'bg-indigo-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Star Terbanyak
            </button>
            <button
              onClick={() => setSortBy('updated')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all uppercase tracking-wider ${
                sortBy === 'updated' ? 'bg-indigo-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Terbaru
            </button>
            <button
              onClick={() => setSortBy('size')}
              className={`px-4 py-2 rounded-lg text-xs font-mono transition-all uppercase tracking-wider ${
                sortBy === 'size' ? 'bg-indigo-500 text-white font-bold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              Ukuran Kode
            </button>
          </div>
        </div>

        {/* Top Highlight Cards / Spotlight */}
        {repos.length > 0 && (
          <div className="mb-14 text-left">
            <div className="flex items-center gap-2 mb-6">
              <Award size={16} className="text-amber-400 animate-pulse" />
              <h3 className="text-xs font-mono text-neutral-400 uppercase tracking-widest font-bold">Sorotan Utama (Buku Petunjuk & Banner Image MD)</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {spotlightProjects.map((p, index) => (
                <div
                  key={p.id}
                  onClick={() => setSelectedProject(p)}
                  className="bg-neutral-900/40 border border-neutral-800 hover:border-neutral-700/80 rounded-2xl flex flex-col h-[340px] cursor-pointer relative overflow-hidden group transition-all duration-300"
                >
                  {/* Decorative glowing glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all pointer-events-none" />
                  
                  {/* Banner Image Frame */}
                  <div className="h-40 w-full relative overflow-hidden border-b border-neutral-900/80 shrink-0 select-none bg-neutral-950">
                    {repoBanners[p.name] ? (
                      <img
                        src={repoBanners[p.name]}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getBannerGradient(p.language)} flex items-center justify-center relative`}>
                        <span className="font-mono text-[10px] text-neutral-700 font-bold select-none whitespace-pre uppercase tracking-widest opacity-40 group-hover:scale-105 transition-all duration-500">
                          {`< ${p.language || 'PROJECT'} />`}
                        </span>
                      </div>
                    )}
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-semibold text-indigo-400 uppercase bg-neutral-950/80 backdrop-blur border border-neutral-800 px-2 py-0.5 rounded shadow">
                      Spotlight #0{index + 1}
                    </span>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex flex-col justify-between flex-grow text-left">
                    <div>
                      <div className="flex items-center justify-between gap-2">
                        <h4 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight line-clamp-1">
                          {p.name}
                        </h4>
                        <ArrowUpRight size={14} className="text-neutral-500 group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                      <p className="text-neutral-400 text-xs leading-relaxed mt-2 line-clamp-2">
                        {p.description || 'Tidak ada deskripsi yang disediakan.'}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-neutral-800/40">
                      <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                        <div className={`w-2 h-2 rounded-full ${getLanguageColor(p.language)}`} />
                        <span className="font-medium font-mono text-[11px]">{p.language || 'Code'}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs text-neutral-400">
                          <Star size={11} className="text-amber-405 fill-amber-400/25 text-amber-400" />
                          <span className="font-mono">{p.stargazers_count}</span>
                        </span>
                        <span className="flex items-center gap-1 text-xs text-neutral-400 font-mono">
                          <GitFork size={11} className="text-indigo-400" />
                          <span>{p.forks_count}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row gap-4 items-center mb-8 w-full mt-10">
          <div className="relative w-full md:flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Cari repositori, topik, teknologi..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-3 pl-10 pr-4 text-sm text-neutral-205 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-all font-sans font-medium"
            />
          </div>

          <div className="flex gap-1.5 overflow-x-auto w-full md:w-auto scrollbar-none pb-1 md:pb-0">
            {allLanguages.map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium font-mono whitespace-nowrap transition-all border ${
                  selectedLanguage === lang
                    ? 'bg-neutral-100 text-black border-neutral-100'
                    : 'bg-neutral-900 text-neutral-400 border-neutral-800/80 hover:text-white hover:border-neutral-700'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Repository Grid Board */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10">
            {[1, 2, 3, 4, 5, 6].map((it) => (
              <div
                key={it}
                className="bg-neutral-900/40 border border-neutral-800/60 p-6 rounded-2xl h-48 animate-pulse flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="h-4 bg-neutral-800 rounded w-1/2" />
                  <div className="h-3 bg-neutral-800 rounded w-4/5" />
                </div>
                <div className="h-3 bg-neutral-800 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              {filteredRepos.length > 0 ? (
                filteredRepos.map((repo) => (
                  <div
                    key={repo.id}
                    onClick={() => setSelectedProject(repo)}
                    className="bg-neutral-900/35 hover:bg-neutral-900/60 border border-neutral-800/60 hover:border-neutral-700 rounded-xl flex flex-col h-[280px] transition-all duration-200 cursor-pointer group overflow-hidden"
                  >
                    {/* Top image banner line */}
                    <div className="h-24 w-full relative overflow-hidden bg-neutral-950 border-b border-neutral-900/60 shrink-0 select-none">
                      {repoBanners[repo.name] ? (
                        <img
                          src={repoBanners[repo.name]}
                          alt={repo.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                        />
                      ) : (
                        <div className={`w-full h-full bg-gradient-to-br ${getBannerGradient(repo.language)} flex items-center justify-center`}>
                          <span className="font-mono text-[9px] text-neutral-700 font-bold tracking-widest uppercase">
                            {`// ${repo.name}`}
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-4 flex flex-col justify-between flex-grow text-left">
                      <div>
                        <div className="flex items-center gap-1 text-neutral-510 mb-1.5ClassName">
                          <BookOpen size={11} className="text-neutral-500" />
                          <span className="text-[9px] font-mono select-none tracking-wide text-neutral-500 font-bold uppercase truncate">
                            mahmuda1004 /
                          </span>
                        </div>
                        <h4 className="font-display text-sm font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight line-clamp-1">
                          {repo.name}
                        </h4>
                        <p className="text-neutral-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                          {repo.description || 'Tidak ada deskripsi yang disediakan.'}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-neutral-800/40 flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${getLanguageColor(repo.language)}`} />
                          <span className="text-[10px] font-mono text-neutral-400 font-semibold">{repo.language || 'Code'}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="flex items-center gap-0.5 text-[10px] text-neutral-500 font-mono">
                            <Star size={10} className="text-neutral-500" />
                            <span>{repo.stargazers_count}</span>
                          </span>
                          <span className="flex items-center gap-0.5 text-[10px] text-neutral-500 font-mono">
                            <GitFork size={10} className="text-neutral-500" />
                            <span>{repo.forks_count}</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-1 md:col-span-3 py-16 text-center border border-dashed border-neutral-800 rounded-2xl bg-neutral-900/20">
                  <p className="text-neutral-500 text-sm">Tidak ada repositori yang cocok dengan kata kunci atau filter bahasa.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedLanguage('All');
                    }}
                    className="text-indigo-400 text-xs font-mono font-medium mt-3 border border-indigo-900 bg-indigo-950/20 px-3.5 py-1.5 rounded-lg hover:bg-indigo-900/30 hover:text-white transition-all pointers-auto cursor-pointer"
                  >
                    Reset Filter
                  </button>
                </div>
              )}
            </div>

            {/* Disclaimer */}
            {error && (
              <p className="text-[10px] font-mono text-neutral-500 mt-6 text-center uppercase tracking-wider">
                💡 GitHub API limit tercapai. Menampilkan data repo portofolio yang terkurasi.
              </p>
            )}
          </>
        )}

        {/* Detailed Project Information Modal Overlay */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-neutral-950 border border-neutral-800 rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Visual Accent header */}
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-teal-400" />
                
                <div className="p-6 sm:p-7 text-left">
                  {/* Repo directory line */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-mono text-neutral-400 bg-neutral-900 border border-neutral-800 px-2.5 py-1 rounded">
                      mahmuda1004 / {selectedProject.name}
                    </span>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-neutral-500 hover:text-white text-xs font-mono cursor-pointer transition-colors"
                    >
                      [Tutup Window]
                    </button>
                  </div>

                  {/* Title */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight mb-2 select-all">
                    {selectedProject.name}
                  </h3>

                  {/* Quick Catalog stats list */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 mb-5 border-y border-neutral-900">
                    <div className="bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-850">
                      <p className="text-[9px] text-neutral-500 font-mono uppercase">Bahasa Utama</p>
                      <div className="flex items-center gap-1.5 mt-1">
                        <div className={`w-1.5 h-1.5 rounded-full ${getLanguageColor(selectedProject.language)}`} />
                        <span className="text-xs text-neutral-200 font-bold font-mono">{selectedProject.language || 'Code'}</span>
                      </div>
                    </div>
                    
                    <div className="bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-850">
                      <p className="text-[9px] text-neutral-500 font-mono uppercase">Ukuran</p>
                      <p className="text-xs text-neutral-200 font-bold font-mono mt-1">{formatBytes(selectedProject.size)}</p>
                    </div>

                    <div className="bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-850">
                      <p className="text-[9px] text-neutral-500 font-mono uppercase">Bintang GitHub</p>
                      <div className="flex items-center gap-1.5 text-xs text-neutral-200 font-bold font-mono mt-1">
                        <Star size={11} className="text-amber-400 fill-amber-400/20" />
                        <span>{selectedProject.stargazers_count} Bintang</span>
                      </div>
                    </div>

                    <div className="bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-850">
                      <p className="text-[9px] text-neutral-500 font-mono uppercase">Diperbarui</p>
                      <p className="text-xs text-neutral-205 font-bold font-mono mt-1">{formatDate(selectedProject.updated_at)}</p>
                    </div>
                  </div>

                  {/* Dynamic markdown README container */}
                  <div className="mb-6">
                    <div className="flex items-center gap-1.5 mb-2.5 text-neutral-400 font-mono text-[10px] uppercase font-bold tracking-wider">
                      <FileText size={12} className="text-indigo-400" />
                      <span>README.md dan Visualisasi Dokumen</span>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-900 p-4 sm:p-5 rounded-xl max-h-[300px] overflow-y-auto scrollbar-thin text-neutral-300">
                      {modalLoading ? (
                        <div className="flex flex-col items-center justify-center py-12 gap-3.5">
                          <div className="w-6 h-6 border-2 border-indigo-405 border-dashed border-indigo-450 rounded-full animate-spin border-t-transparent" />
                          <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest animate-pulse">Memuat Dokumen README.md...</p>
                        </div>
                      ) : modalReadme ? (
                        <div className="prose prose-invert max-w-none text-left font-sans">
                          <Markdown
                            components={{
                              h1: ({ children }) => <h1 className="text-sm sm:text-base font-bold text-white mt-4 mb-2 pb-1.5 border-b border-neutral-900/70 select-text">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-xs sm:text-sm font-bold text-neutral-100 mt-3.5 mb-2 select-text">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-xs font-bold text-neutral-200 mt-3 mb-1.5 select-text">{children}</h3>,
                              p: ({ children }) => <p className="text-xs sm:text-[13px] text-neutral-400 leading-relaxed mb-3 select-text">{children}</p>,
                              ul: ({ children }) => <ul className="list-disc list-inside text-xs sm:text-[13px] text-neutral-400 space-y-1 mb-3 pl-2 select-text">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside text-xs sm:text-[13px] text-neutral-400 space-y-1 mb-3 pl-2 select-text">{children}</ol>,
                              li: ({ children }) => <li className="text-neutral-405 select-text">{children}</li>,
                              a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 underline font-mono text-[11px] select-all">{children}</a>,
                              code: ({ className, children }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match;
                                return isInline ? (
                                  <code className="bg-neutral-900 border border-neutral-850 text-indigo-300 font-mono text-[11px] rounded px-1.5 py-0.5 select-all">{children}</code>
                                ) : (
                                  <pre className="bg-neutral-900/60 border border-neutral-850 p-3 rounded-lg overflow-x-auto my-3 font-mono text-[11px] text-neutral-300 leading-relaxed select-all">
                                    <code>{children}</code>
                                  </pre>
                                );
                              },
                              img: ({ src, alt }) => {
                                // Double safeguard relative paths for markdown images rendered on demand
                                let absoluteSrc = src;
                                if (src && !src.startsWith('http')) {
                                  const clean = src.replace(/^(\.\/|\/)/, '');
                                  absoluteSrc = `https://raw.githubusercontent.com/mahmuda1004/${selectedProject.name}/main/${clean}`;
                                }
                                return absoluteSrc ? (
                                  <img 
                                    src={absoluteSrc} 
                                    alt={alt || 'Project screenshot'} 
                                    className="max-h-48 mx-auto rounded-lg object-contain my-3 border border-neutral-900 bg-[#07080a] p-1 shadow"
                                    referrerPolicy="no-referrer"
                                  />
                                ) : null;
                              }
                            }}
                          >
                            {modalReadme}
                          </Markdown>
                        </div>
                      ) : (
                        <div className="text-center py-10">
                          <p className="text-xs text-neutral-500 font-mono italic">
                            {selectedProject.description || 'Tidak ada file dokumentasi README.md yang terdeteksi pada branch utama.'}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Anchor Actions */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedProject.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs px-4 py-3 rounded-lg transition-all"
                    >
                      <Sparkles size={13} />
                      <span>Buka Kode di GitHub</span>
                      <ExternalLink size={12} />
                    </a>
                    {selectedProject.homepage && (
                      <a
                        href={selectedProject.homepage}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-neutral-200 font-medium text-xs px-4 py-3 rounded-lg transition-all"
                      >
                        <Layers size={13} className="text-neutral-400" />
                        <span>Buka Live Demo</span>
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
