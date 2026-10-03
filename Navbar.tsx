import React from 'react';
import { ShoppingBag, MessageCircle, Menu, X, PhoneCall } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER, buildGeneralEnquiryUrl } from '../utils/whatsapp';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigateToSection: (sectionId: string) => void;
  activeSection?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onNavigateToSection,
  activeSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNavClick = (sectionId: string) => {
    onNavigateToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top micro announcement bar */}
      <div className="bg-[#121216] border-b border-zinc-800/60 text-zinc-300 text-xs py-2 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2 text-zinc-400">
            <span>🇱🇰 Islandwide Cash on Delivery Available</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <span>Direct WhatsApp Concierge: <strong className="text-zinc-200">{BUSINESS_WHATSAPP_NUMBER}</strong></span>
          </div>
          <div className="w-full sm:w-auto flex items-center justify-center sm:justify-end gap-3 text-[11px] sm:text-xs">
            <span className="text-amber-400 font-medium">✨ CEYO New Season Drop</span>
            <span aria-hidden="true" className="text-zinc-600">·</span>
            <a
              href={buildGeneralEnquiryUrl('General question & sizing')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation - Strict Top Bar Contract */}
      <header className="sticky top-0 z-30 bg-[#0d0d10]/95 backdrop-blur-md border-b border-zinc-800/80 px-4 lg:px-8 py-3.5 transition-colors">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left group cursor-pointer focus:outline-none"
            aria-label="CEYO CLOTHING Home"
          >
            <span className="font-display text-xl sm:text-2xl font-bold tracking-[0.15em] text-white group-hover:text-amber-400 transition-colors uppercase">
              CEYO
            </span>
            <span className="font-display text-xs sm:text-sm tracking-[0.3em] text-zinc-400 font-normal ml-2 uppercase">
              CLOTHING
            </span>
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-zinc-300">
            <button
              onClick={() => handleNavClick('collection')}
              className={`hover:text-white transition-colors cursor-pointer py-1 ${
                activeSection === 'collection' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              Collection
            </button>
            <button
              onClick={() => handleNavClick('tees')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Tees
            </button>
            <button
              onClick={() => handleNavClick('linen')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              Linen Resort
            </button>
            <button
              onClick={() => handleNavClick('founder')}
              className={`hover:text-white transition-colors cursor-pointer py-1 flex items-center gap-1.5 ${
                activeSection === 'founder' ? 'text-amber-400 border-b-2 border-amber-400' : ''
              }`}
            >
              <span>Founder & Story</span>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
            </button>
            <button
              onClick={() => handleNavClick('ordering')}
              className="hover:text-white transition-colors cursor-pointer py-1"
            >
              How to Order
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="flex items-center gap-3">
            <a
              href={buildGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 rounded-lg transition-colors whitespace-nowrap"
              aria-label="Direct WhatsApp Contact"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{BUSINESS_WHATSAPP_NUMBER}</span>
            </a>

            <button
              onClick={onOpenCart}
              className="relative p-2.5 sm:px-4 sm:py-2 text-xs font-medium text-white bg-zinc-800/90 hover:bg-zinc-700/90 border border-zinc-700/60 rounded-lg transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              aria-label={`View shopping bag (${cartCount} items)`}
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Bag</span>
              {cartCount > 0 && (
                <span className="inline-flex items-center justify-center min-w-5 h-5 px-1 text-[11px] font-bold text-black bg-amber-400 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-zinc-300 hover:text-white rounded-lg hover:bg-zinc-800/60 focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile dropdown menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-zinc-800/80 pb-2 space-y-1">
            <button
              onClick={() => handleNavClick('collection')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/60 flex items-center justify-between"
            >
              <span>Full Collection</span>
              <span className="text-xs text-zinc-400">All Products</span>
            </button>
            <button
              onClick={() => handleNavClick('tees')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/60 flex items-center justify-between"
            >
              <span>Heavyweight Tees</span>
              <span className="text-xs text-zinc-400">260 GSM</span>
            </button>
            <button
              onClick={() => handleNavClick('linen')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/60 flex items-center justify-between"
            >
              <span>Linen Resort Shirts</span>
              <span className="text-xs text-zinc-400">100% European Flax</span>
            </button>
            <button
              onClick={() => handleNavClick('founder')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-amber-300 font-semibold bg-amber-950/20 border border-amber-900/30 flex items-center justify-between"
            >
              <span>Founder: Ranshika</span>
              <span className="text-xs text-amber-400">CEYO Story →</span>
            </button>
            <button
              onClick={() => handleNavClick('ordering')}
              className="w-full text-left px-3 py-2.5 rounded-lg text-sm text-zinc-200 hover:bg-zinc-800/60"
            >
              WhatsApp Ordering Guide
            </button>
            <div className="pt-2">
              <a
                href={buildGeneralEnquiryUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 rounded-lg text-xs font-semibold"
              >
                <PhoneCall className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {BUSINESS_WHATSAPP_NUMBER}</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
