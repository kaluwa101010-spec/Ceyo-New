import React from 'react';
import { ShoppingBag, Sparkles, MessageCircle, Compass } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER, buildGeneralEnquiryUrl } from '../utils/whatsapp';

interface MobileBottomNavProps {
  cartCount: number;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenCart: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  cartCount,
  activeSection,
  onNavigate,
  onOpenCart
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0d0d12]/95 backdrop-blur-xl border-t border-zinc-800/90 px-2 py-1 safe-area-pb"
      aria-label="Mobile Bottom Navigation"
    >
      <div className="grid grid-cols-4 items-center h-14 max-w-md mx-auto">
        
        {/* Tab 1: Shop */}
        <button
          type="button"
          onClick={() => onNavigate('collection')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors ${
            activeSection === 'collection' ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Shop Collection"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Collection</span>
        </button>

        {/* Tab 2: Founder (Ranshika) */}
        <button
          type="button"
          onClick={() => onNavigate('founder')}
          className={`flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer transition-colors relative ${
            activeSection === 'founder' ? 'text-amber-400' : 'text-zinc-400 hover:text-zinc-200'
          }`}
          aria-label="Founder Ranshika and Story"
        >
          <Sparkles className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">Founder</span>
          <span className="absolute top-1 right-5 w-1.5 h-1.5 rounded-full bg-amber-400" />
        </button>

        {/* Tab 3: Bag */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer text-zinc-400 hover:text-zinc-200 relative transition-colors"
          aria-label={`View Cart with ${cartCount} items`}
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 min-w-4 h-4 px-1 bg-amber-400 text-black font-bold text-[9px] rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-semibold tracking-tight">Bag</span>
        </button>

        {/* Tab 4: WhatsApp Direct (+94773129477) */}
        <a
          href={buildGeneralEnquiryUrl('Mobile site visitor inquiry')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center h-full min-h-[44px] cursor-pointer text-emerald-400 hover:text-emerald-300 transition-colors"
          aria-label={`Chat on WhatsApp at ${BUSINESS_WHATSAPP_NUMBER}`}
        >
          <MessageCircle className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-semibold tracking-tight">WhatsApp</span>
        </a>

      </div>
    </nav>
  );
};
