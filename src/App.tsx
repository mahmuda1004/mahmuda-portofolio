import { useState, useEffect } from 'react';
import { GitHubProfile } from './types';
import { FALLBACK_PROFILE } from './data';
import Header from './components/Header';
import Hero from './components/Hero';
import GithubShowcase from './components/GithubShowcase';
import Skills from './components/Skills';
import Timeline from './components/Timeline';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);

  // Fetch live GitHub stats on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('https://api.github.com/users/mahmuda1004');
        if (response.ok) {
          const data = await response.json();
          setProfile({
            login: data.login || 'mahmuda1004',
            name: data.name || 'Mahmuda',
            avatar_url: data.avatar_url || FALLBACK_PROFILE.avatar_url,
            bio: data.bio || FALLBACK_PROFILE.bio,
            public_repos: data.public_repos ?? FALLBACK_PROFILE.public_repos,
            followers: data.followers ?? FALLBACK_PROFILE.followers,
            following: data.following ?? FALLBACK_PROFILE.following,
            html_url: data.html_url || FALLBACK_PROFILE.html_url,
            company: data.company || FALLBACK_PROFILE.company,
            location: data.location || FALLBACK_PROFILE.location,
            blog: data.blog || FALLBACK_PROFILE.blog,
          });
        }
      } catch (err) {
        console.warn('Could not load dynamic GitHub profile, using default portfolio configuration', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 85,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#07080a] text-neutral-200 selection:bg-indigo-500/30 selection:text-indigo-200">
      
      {/* Sticky Navigation Header */}
      <Header githubUrl={profile.html_url} />

      {/* Main Single-View Frame */}
      <main className="relative">
        
        {/* SECTION 1: HERO */}
        <Hero profile={profile} scrollToSection={scrollToSection} />

        {/* SECTION 2: FEATURED PROJECTS (GITHUB SHOWCASE) */}
        <GithubShowcase profile={profile} />

        {/* SECTION 3: CORE SKILLS MATRIX */}
        <Skills />

        {/* SECTION 4: EDUCATION & EXPERIENCE TIMELINE */}
        <Timeline />

        {/* SECTION 5: CONTACT DESK & SOCIAL FEED */}
        <Contact githubUrl={profile.html_url} email="mahmuda1004@gmail.com" />

      </main>

      {/* Base Minimalist Footer */}
      <Footer />
      
    </div>
  );
}
