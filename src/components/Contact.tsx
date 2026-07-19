import React, { useState } from 'react';
import { Mail, Github, Linkedin, Download, MapPin, Copy, Check, Send, MessageSquare, CircleDot, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ContactProps {
  githubUrl: string;
  linkedinUrl: string;
  email: string;
}

export default function Contact({ githubUrl, linkedinUrl, email, }: ContactProps) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (!formData.name || !formData.email || !formData.message) return;

  setIsSubmitting(true);
  setSubmitStatus("idle");

  const form = new FormData();

  form.append("access_key", "dd5d6da9-8516-4da7-8a53-3fba3f3371a9");
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("subject", formData.subject || "Pesan dari Portfolio");
  form.append("message", formData.message);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: form,
    });

    const result = await response.json();

    if (result.success) {
      setSubmitStatus("success");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitStatus("idle"), 5000);
    } else {
      setSubmitStatus("error");
    }
  } catch (error) {
    setSubmitStatus("error");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <section id="contact" className="py-24 border-t border-neutral-900 bg-neutral-950/40 relative">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-mono tracking-wider uppercase mb-3">
            <CircleDot size={12} className="text-indigo-400" />
            <span>Hubungi Saya</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Mari Berkolaborasi!
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2">
            Apakah Anda memiliki proyek baru, memerlukan tenaga ahli lepas, atau hanya ingin menyapa? Hubungi saya kapan saja. Saya akan merespons sesegera mungkin.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-5xl mx-auto items-stretch">
          
          {/* Left Block: Info Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6 justify-between text-left">
            <div className="flex flex-col gap-6">
              
              {/* Direct Mail card */}
              <div className="bg-neutral-900/35 border border-neutral-800/60 p-6 rounded-xl relative overflow-hidden group">
                <p className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-wider mb-2">Saluran Utama</p>
                <h3 className="text-xs font-mono font-medium text-neutral-400 mb-3">Kirim surel langsung secara personal:</h3>
                
                <div className="flex items-center justify-between bg-neutral-950 border border-neutral-800 p-3.5 rounded-lg">
                  <span className="text-xs sm:text-sm text-neutral-200 font-mono font-bold truncate select-all">{email}</span>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 px-2.5 bg-neutral-900 hover:bg-neutral-800 text-[10px] font-mono text-neutral-300 rounded border border-neutral-800 hover:border-neutral-700 flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check size={11} className="text-emerald-400" />
                        <span className="text-emerald-400">Tersalin</span>
                      </>
                    ) : (
                      <>
                        <Copy size={11} />
                        <span>Salin</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Info Details card */}
              <div className="bg-neutral-900/35 border border-neutral-800/60 p-6 rounded-xl flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase">
                      Lokasi Saat Ini
                    </h4>
                    
                    <p className="text-sm text-white font-semibold mt-1">
                      Penajam Paser Utara
                    </p>
                    
                    <p className="text-xs text-neutral-500">
                      East Kalimantan, Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-400">
                    <Mail size={16} />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-500 uppercase">Waktu Respons Rata-rata</h4>
                    <p className="text-xs sm:text-sm text-white font-semibold mt-1"> 1 - 2 Hari Kerja</p>
                  </div>
                </div>
              </div>

            </div>

            {/* GitHub Call Card */}
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900/35 hover:bg-neutral-900/65 border border-neutral-800/55 hover:border-neutral-700 p-6 rounded-xl flex items-center justify-between gap-4 group transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-neutral-300">
                  <Github size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-mono font-bold text-neutral-400">Jejak Karya di GitHub</h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">@mahmuda1004</p>
                </div>
              </div>
              <ArrowUpRight size={18} className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
            {/* LinkedIn */}
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-neutral-900/35 hover:bg-neutral-900/65 border border-neutral-800/55 hover:border-neutral-700 p-6 rounded-xl flex items-center justify-between gap-4 group transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-neutral-950 border border-neutral-800 flex items-center justify-center text-sky-400">
                  <Linkedin size={18} />
                </div>
            
                <div>
                  <h4 className="text-xs font-mono font-bold text-neutral-400">
                    LinkedIn
                  </h4>
                  <p className="text-[11px] text-neutral-500 mt-0.5">
                    @mahmuda1004
                  </p>
                </div>
              </div>
            
              <ArrowUpRight
                size={18}
                className="text-neutral-500 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              />
            </a>
          </div>

          {/* Right Block: Message Form */}
          <div className="lg:col-span-7 bg-neutral-900/25 border border-neutral-800/60 p-6 sm:p-8 rounded-2xl text-left">
            <div className="flex items-center gap-2 mb-6 text-neutral-400">
              <MessageSquare size={16} className="text-neutral-500" />
              <h3 className="text-xs font-mono uppercase tracking-wider font-bold">Kirim Pesan Instan</h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-500 uppercase" htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama Anda..."
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3.5 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-neutral-500 uppercase" htmlFor="email">Alamat Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@contoh.com"
                    className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3.5 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-500 uppercase" htmlFor="subject">Subjek Projek</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Kategori kolaborasi, konsultasi, dsb..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3.5 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-neutral-500 uppercase" htmlFor="message">Uraian Pesan</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Ceritakan tentang proposal kolaborasi Anda..."
                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-neutral-700 rounded-lg py-2.5 px-3.5 text-xs text-neutral-300 placeholder-neutral-600 focus:outline-none resize-none transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`w-full flex items-center justify-center gap-2 font-semibold text-xs py-3 rounded-lg transition-all border shadow ${
                    submitStatus === 'success'
                      ? 'bg-emerald-950/40 border-emerald-900/60 text-emerald-400'
                      : 'bg-white hover:bg-neutral-200 text-black border-transparent hover:scale-[1.01] cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-dashed border-neutral-600 rounded-full animate-spin" />
                      <span>Mengirimkan Pesan...</span>
                    </>
                  ) : submitStatus === 'success' ? (
                    <>
                      <Check size={14} />
                      <span>Pesan Terkirim dengan Sukses!</span>
                    </>
                  ) : (
                    <>
                      <Send size={13} />
                      <span>Kirim Pesan Sekarang</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 p-3 bg-emerald-950/20 border border-emerald-800/40 text-emerald-400 text-[11px] font-medium rounded-lg text-center"
                >
                  Terima kasih! Pesan Anda telah diterima. Saya akan segera menghubungi Anda kembali.
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
