import React, { useState } from 'react';
import { Product } from '../types';
import { X, MessageCircle, ShoppingBag, ShieldCheck, Truck, RefreshCw, Sparkles, Check } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onOrderViaWhatsApp: (product: Product, color: string, size: string, quantity: number) => void;
  onAddToCart: (product: Product, color: string, size: string, quantity: number) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onOrderViaWhatsApp,
  onAddToCart
}) => {
  if (!isOpen || !product) return null;

  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'sizing' | 'delivery'>('details');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const handleAddToCartClick = () => {
    onAddToCart(product, selectedColor, selectedSize, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 2000);
  };

  const handleWhatsAppOrderClick = () => {
    onOrderViaWhatsApp(product, selectedColor, selectedSize, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-[#111116] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        {/* Top bar with close button */}
        <div className="flex items-center justify-between px-5 sm:px-8 py-3.5 border-b border-zinc-800/80 bg-[#16161d]">
          <div className="flex items-center gap-2 text-xs text-zinc-400">
            <span className="text-amber-400 font-semibold uppercase tracking-wider">CEYO CLOTHING</span>
            <span aria-hidden="true">·</span>
            <span className="capitalize">{product.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Image showcase */}
            <div className="md:col-span-6 flex flex-col gap-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                {product.tag && (
                  <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-white/10 px-3 py-1 rounded-md text-xs font-semibold text-amber-300 uppercase tracking-wider">
                    {product.tag}
                  </div>
                )}
              </div>

              {/* Guarantees Box */}
              <div className="grid grid-cols-3 gap-2.5 p-3.5 bg-zinc-900/60 rounded-xl border border-zinc-800/80 text-center">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] text-zinc-300 font-medium">Islandwide COD</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-x border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-zinc-300 font-medium">100% Authentic CEYO</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RefreshCw className="w-4 h-4 text-blue-400" />
                  <span className="text-[10px] text-zinc-300 font-medium">Hassle-Free Exchange</span>
                </div>
              </div>
            </div>

            {/* Right Column: Purchasing module */}
            <div className="md:col-span-6 flex flex-col justify-between">
              <div>
                <h1 id="product-modal-title" className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                  {product.name}
                </h1>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 my-3">
                  <span className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Rs. {product.priceLKR.toLocaleString()}
                  </span>
                  <span className="text-sm font-semibold text-zinc-400 uppercase">LKR</span>
                  {product.originalPriceLKR && (
                    <span className="text-sm text-zinc-500 line-through tabular-nums ml-2">
                      Rs. {product.originalPriceLKR.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Short Description */}
                <p className="text-sm text-zinc-300 leading-relaxed font-light mb-5">
                  {product.description}
                </p>

                {/* Color Selection */}
                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-2">
                    <span>SELECT COLOR</span>
                    <span className="text-amber-400 font-normal">{selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-2.5">
                    {product.colors.map((c) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setSelectedColor(c.name)}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer min-h-[44px] ${
                          selectedColor === c.name
                            ? 'bg-zinc-800 border-amber-400 text-white ring-1 ring-amber-400'
                            : 'bg-zinc-900 border-zinc-700/60 text-zinc-300 hover:border-zinc-500'
                        }`}
                      >
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-black/40"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-5">
                  <div className="flex items-center justify-between text-xs font-semibold text-zinc-300 mb-2">
                    <span>SELECT SIZE</span>
                    <button
                      type="button"
                      onClick={() => setActiveTab('sizing')}
                      className="text-amber-400 text-xs hover:underline cursor-pointer"
                    >
                      Size Chart
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setSelectedSize(s)}
                        className={`py-2.5 text-xs font-bold rounded-xl transition-all cursor-pointer min-h-[44px] flex items-center justify-center ${
                          selectedSize === s
                            ? 'bg-amber-400 text-black shadow-md'
                            : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity Stepper */}
                <div className="mb-6 flex items-center gap-4">
                  <span className="text-xs font-semibold text-zinc-300">QUANTITY:</span>
                  <div className="flex items-center border border-zinc-700 rounded-xl bg-zinc-900 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 font-bold transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-white tabular-nums">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center text-zinc-300 hover:bg-zinc-800 font-bold transition-colors cursor-pointer min-h-[44px] min-w-[44px]"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-zinc-400">
                    Subtotal: <strong className="text-amber-400 tabular-nums">Rs. {(product.priceLKR * quantity).toLocaleString()} LKR</strong>
                  </span>
                </div>

                {/* Tabs for Specification / Sizing / Delivery */}
                <div className="border-t border-zinc-800 pt-4 mb-4">
                  <div className="flex border-b border-zinc-800 mb-3 gap-4">
                    <button
                      onClick={() => setActiveTab('details')}
                      className={`pb-2 text-xs font-semibold transition-colors cursor-pointer ${
                        activeTab === 'details'
                          ? 'text-amber-400 border-b-2 border-amber-400'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Fabric & Fit
                    </button>
                    <button
                      onClick={() => setActiveTab('sizing')}
                      className={`pb-2 text-xs font-semibold transition-colors cursor-pointer ${
                        activeTab === 'sizing'
                          ? 'text-amber-400 border-b-2 border-amber-400'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Size Specs
                    </button>
                    <button
                      onClick={() => setActiveTab('delivery')}
                      className={`pb-2 text-xs font-semibold transition-colors cursor-pointer ${
                        activeTab === 'delivery'
                          ? 'text-amber-400 border-b-2 border-amber-400'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Delivery & COD
                    </button>
                  </div>

                  <div className="text-xs text-zinc-300 min-h-[60px]">
                    {activeTab === 'details' && (
                      <div className="space-y-1.5">
                        <p><strong className="text-zinc-400">Fabric Composition:</strong> {product.fabric}</p>
                        <p><strong className="text-zinc-400">Cut & Fit:</strong> {product.fit}</p>
                        <p><strong className="text-zinc-400">Care Instructions:</strong> Gentle machine wash cold, hang dry in shade, warm iron.</p>
                      </div>
                    )}
                    {activeTab === 'sizing' && (
                      <div className="space-y-1">
                        <p><strong>Small (S):</strong> Chest 38-40" · Length 28"</p>
                        <p><strong>Medium (M):</strong> Chest 40-42" · Length 29"</p>
                        <p><strong>Large (L):</strong> Chest 42-44" · Length 30"</p>
                        <p><strong>XL:</strong> Chest 44-46" · Length 31"</p>
                        <p className="text-[11px] text-zinc-400">For oversized tees, stay true-to-size for the intended drop-shoulder fit.</p>
                      </div>
                    )}
                    {activeTab === 'delivery' && (
                      <div className="space-y-1 text-zinc-300">
                        <p><strong>Colombo & Suburbs:</strong> 1 - 2 business days</p>
                        <p><strong>Outstation & Islandwide:</strong> 2 - 3 business days via prompt courier</p>
                        <p><strong>Payment Options:</strong> Cash on Delivery (COD), Direct Bank Transfer, or Koko / MintPay installment via WhatsApp.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>

              {/* Action Buttons: 1. ORDER VIA WHATSAPP (Primary) + 2. Add to Bag */}
              <div className="space-y-2.5 pt-3 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={handleWhatsAppOrderClick}
                  className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-xl shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
                  aria-label={`Order via WhatsApp to ${BUSINESS_WHATSAPP_NUMBER}`}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>ORDER VIA WHATSAPP ({BUSINESS_WHATSAPP_NUMBER})</span>
                </button>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCartClick}
                    className="flex-1 py-3 px-4 bg-zinc-800 hover:bg-zinc-700 active:scale-98 text-zinc-100 font-semibold text-xs tracking-wider uppercase rounded-xl transition-all border border-zinc-700 flex items-center justify-center gap-2 cursor-pointer min-h-[44px]"
                  >
                    {addedAnimation ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Added to Bag!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
