import React from 'react';
import { MessageCircle, ArrowDown, Sparkles, ShieldCheck } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER, buildGeneralEnquiryUrl } from '../utils/whatsapp';

interface HeroProps {
  onExploreClick: () => void;
  onFounderClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onFounderClick }) => {
  return (
    <section id="hero" className="relative min-h-[82vh] flex items-center justify-center overflow-hidden border-b border-zinc-800/80">
      
      {/* Background Campaign Imagery with Contrast Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/ceyo_hero_banner_1791040583252.jpg"
          alt="CEYO CLOTHING Luxury Resort and Streetwear Campaign"
          className="w-full h-full object-cover object-center filter brightness-90"
          referrerPolicy="no-referrer"
        />
        {/* Measured dark gradient scrim for 4.5:1 WCAG contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/75 to-[#0c0c0e]/40" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0c0c0e]/40 to-[#0c0c0e]/90" />
      </div>

      {/* Hero Foreground Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        
        {/* Quiet Brand Kicker - Zero-Pill Text Metadata */}
        <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-amber-400 mb-4 sm:mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Colombo · Ceylon Heritage</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>New Season Drop</span>
        </div>

        {/* Main Headline with Text-Wrap Balance */}
        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.08] max-w-4xl mx-auto" style={{ textWrap: 'balance' }}>
          ARCHITECTURAL CUTS. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500">
            TROPICAL LUXURY.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-sm sm:text-lg text-zinc-300 max-w-2xl mx-auto font-light leading-relaxed">
          Bespoke heavyweight streetwear and pure European flax linen essentials. Designed in Sri Lanka by <strong className="text-white font-medium">Ranshika</strong>, tailored for contemporary ease.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 max-w-md mx-auto">
          
          <button
            type="button"
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-98 text-black font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-xl shadow-amber-950/40 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
          >
            <span>Explore Collection</span>
            <ArrowDown className="w-4 h-4" />
          </button>

          <a
            href={buildGeneralEnquiryUrl('Ordering assistance')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600/90 hover:bg-emerald-500 active:scale-98 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all border border-emerald-500/50 flex items-center justify-center gap-2 min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 text-emerald-300" />
            <span>Order on WhatsApp: {BUSINESS_WHATSAPP_NUMBER}</span>
          </a>

        </div>

        {/* Founder Trust Teaser Bar */}
        <div className="mt-12 pt-6 border-t border-zinc-800/60 max-w-3xl mx-auto flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-zinc-400">
          <button
            type="button"
            onClick={onFounderClick}
            className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>Meet Founder Ranshika & Story</span>
          </button>
          <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">·</span>
          <div className="flex items-center gap-1.5 text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Official WhatsApp Ordering (+94773129477)</span>
          </div>
          <span aria-hidden="true" className="text-zinc-700 hidden sm:inline">·</span>
          <span>Cash on Delivery Islandwide</span>
        </div>

      </div>
    </section>
  );
};
