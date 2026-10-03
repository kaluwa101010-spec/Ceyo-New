import React from 'react';
import { MessageCircle, FileText, CheckCircle2, Truck, ShieldCheck } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER, buildGeneralEnquiryUrl } from '../utils/whatsapp';

export const OrderingGuide: React.FC = () => {
  return (
    <section id="ordering" className="py-16 sm:py-20 bg-[#0e0e12] border-t border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-400">
            Effortless Checkout
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            How to Order via WhatsApp
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2 font-light">
            Skip complex cart checkouts. Place your order directly with our official concierge at{' '}
            <strong className="text-emerald-400">{BUSINESS_WHATSAPP_NUMBER}</strong> in 3 simple steps.
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          
          <div className="bg-[#141419] border border-zinc-800/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 font-display font-bold flex items-center justify-center text-sm mb-4">
              01
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Select Garment & Size
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Choose your preferred item, colorway, and size from our catalog. Click the &ldquo;ORDER VIA WHATSAPP&rdquo; button on any product.
            </p>
          </div>

          <div className="bg-[#141419] border border-zinc-800/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 font-display font-bold flex items-center justify-center text-sm mb-4">
              02
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              Fill Delivery Info
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Enter your Name, Contact Phone, and Delivery Address. The system automatically formats your full order message in Sri Lankan Rupees (LKR).
            </p>
          </div>

          <div className="bg-[#141419] border border-zinc-800/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-display font-bold flex items-center justify-center text-sm mb-4">
              03
            </div>
            <h3 className="font-display text-base font-bold text-white mb-2">
              WhatsApp Confirmation
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              WhatsApp opens automatically to <strong className="text-zinc-200">{BUSINESS_WHATSAPP_NUMBER}</strong> with all fields filled. Our team confirms availability and dispatches your order.
            </p>
          </div>

        </div>

        {/* Message Template Highlights Card */}
        <div className="mt-10 max-w-3xl mx-auto p-5 sm:p-6 bg-[#121217] border border-zinc-800 rounded-2xl">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-3">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Complete Order Details Prepared by the System:</span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-zinc-300">
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Customer Name</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Customer Phone</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Product Name</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Size & Color</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Quantity</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Delivery Address</span>
            </div>
            <div className="p-2.5 bg-zinc-900 rounded-lg border border-zinc-800 flex items-center gap-2 col-span-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Total Amount in LKR</span>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-zinc-400">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Islandwide Delivery: 1-2 Days (Colombo) · 2-3 Days (Outstation)</span>
            </div>
            <a
              href={buildGeneralEnquiryUrl('Need help with ordering')}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Ask a Question on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
