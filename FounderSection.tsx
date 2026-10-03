import React, { useState, useEffect, useRef } from 'react';
import { FOUNDER_INFO } from '../data/products';
import { BUSINESS_WHATSAPP_NUMBER, buildWhatsAppUrl } from '../utils/whatsapp';
import { MessageCircle, ShieldCheck, Sparkles, Upload, RefreshCw, CheckCircle2 } from 'lucide-react';

interface FounderSectionProps {
  onExploreCollection: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onExploreCollection }) => {
  // Allow user to use the default official founder photo or provide their uploaded file
  const [photoSrc, setPhotoSrc] = useState<string>(FOUNDER_INFO.imagePath);
  const [isCustomPhoto, setIsCustomPhoto] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('ceyo_founder_custom_photo');
    if (saved) {
      setPhotoSrc(saved);
      setIsCustomPhoto(true);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setPhotoSrc(result);
          setIsCustomPhoto(true);
          try {
            localStorage.setItem('ceyo_founder_custom_photo', result);
          } catch {
            // Storage quota exceeded or disabled
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = () => {
    setPhotoSrc(FOUNDER_INFO.imagePath);
    setIsCustomPhoto(false);
    localStorage.removeItem('ceyo_founder_custom_photo');
  };

  const whatsappDirectFounderUrl = buildWhatsAppUrl(
    `Hello Ranshika (Founder of CEYO CLOTHING), I am reaching out through the official CEYO website. I'd love to learn more about your upcoming drops and bespoke orders.`
  );

  return (
    <section id="founder" className="relative py-16 sm:py-24 bg-[#0a0a0d] border-t border-zinc-800/80 overflow-hidden">
      {/* Subtle ambient lighting mesh */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The Vision & Craft</span>
          <span aria-hidden="true" className="text-zinc-700">·</span>
          <span className="text-zinc-400 font-normal">About CEYO CLOTHING</span>
        </div>

        {/* Main Content Card: Split Desktop / Stacked Mobile */}
        <div className="bg-[#111116] border border-zinc-800/90 rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            
            {/* Left Column: Official Founder Portrait Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-sm mx-auto group">
                
                {/* Outer frame styling with luxury hairline border */}
                <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border-2 border-amber-500/30 p-1.5 shadow-2xl shadow-amber-950/20">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-zinc-950">
                    <img
                      src={photoSrc}
                      alt="Ranshika, Founder of CEYO CLOTHING"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Subtle contrast gradient scrim at base of photo */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                    {/* Verified founder label overlaid at bottom of photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs bg-black/60 backdrop-blur-md px-3 py-2 rounded-lg border border-white/10">
                      <div className="flex items-center gap-1.5 font-medium">
                        <ShieldCheck className="w-4 h-4 text-amber-400" />
                        <span>Official Founder Photo</span>
                      </div>
                      <span className="text-[11px] text-zinc-400">CEYO Ceylon</span>
                    </div>
                  </div>
                </div>

                {/* Founder Photo management affordance (Optional upload / reset) */}
                <div className="mt-3 flex items-center justify-between gap-2 text-xs text-zinc-400 px-1">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-amber-300 transition-colors py-1 cursor-pointer"
                    title="Upload or update founder photo"
                  >
                    <Upload className="w-3 h-3" />
                    <span>{isCustomPhoto ? 'Change Photo' : 'Upload Founder Photo'}</span>
                  </button>

                  {isCustomPhoto && (
                    <button
                      type="button"
                      onClick={handleResetPhoto}
                      className="inline-flex items-center gap-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors py-1 cursor-pointer"
                      title="Reset to default official portrait"
                    >
                      <RefreshCw className="w-3 h-3" />
                      <span>Reset</span>
                    </button>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>

              </div>
            </div>

            {/* Right Column: Founder Details & Story */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              {/* Text requirements strictly enforced: "Ranshika" & "Founder of CEYO CLOTHING" */}
              <div className="border-b border-zinc-800 pb-5 mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs font-medium mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Leadership & Design Direction</span>
                </div>
                
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-2">
                  Ranshika
                </h2>
                
                <p className="font-display text-lg sm:text-xl font-semibold tracking-wide text-amber-400 uppercase">
                  Founder of CEYO CLOTHING
                </p>
                
                <p className="text-xs text-zinc-400 mt-1">
                  Colombo, Sri Lanka · Est. 2024 · Direct WhatsApp Concierge: {BUSINESS_WHATSAPP_NUMBER}
                </p>
              </div>

              {/* Founder quote */}
              <blockquote className="relative text-base sm:text-lg text-zinc-200 font-normal leading-relaxed italic border-l-2 border-amber-500/60 pl-4 my-4">
                &ldquo;{FOUNDER_INFO.quote}&rdquo;
              </blockquote>

              {/* Founder narrative paragraphs */}
              <div className="space-y-3.5 text-sm text-zinc-300 leading-relaxed font-light my-4">
                {FOUNDER_INFO.story.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* 3 Core Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 my-6 pt-4 border-t border-zinc-800/80">
                {FOUNDER_INFO.pillars.map((pillar, i) => (
                  <div key={i} className="bg-zinc-900/70 border border-zinc-800 rounded-xl p-3.5">
                    <h3 className="text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-normal">
                      {pillar.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Direct Actions: Explore & Chat with Founder */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onExploreCollection}
                  className="px-6 py-3 bg-white hover:bg-zinc-200 text-black text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 min-h-[44px]"
                >
                  <span>Explore CEYO Collection</span>
                </button>

                <a
                  href={whatsappDirectFounderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-semibold tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 active:scale-98 min-h-[44px]"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat With Ranshika on WhatsApp</span>
                </a>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
