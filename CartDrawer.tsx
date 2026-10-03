import React, { useState } from 'react';
import { CartItem } from '../types';
import {
  BUSINESS_WHATSAPP_NUMBER,
  BUSINESS_WHATSAPP_CLEAN,
  formatMultiItemOrderMessage,
  MultiItemOrderParams
} from '../utils/whatsapp';
import { X, Trash2, ShoppingBag, MessageCircle, ArrowRight, ShieldCheck, Copy, Check } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerName, setCustomerName] = useState(
    () => localStorage.getItem('ceyo_customer_name') || ''
  );
  const [customerPhone, setCustomerPhone] = useState(
    () => localStorage.getItem('ceyo_customer_phone') || ''
  );
  const [deliveryAddress, setDeliveryAddress] = useState(
    () => localStorage.getItem('ceyo_customer_address') || ''
  );
  const [city, setCity] = useState(
    () => localStorage.getItem('ceyo_customer_city') || 'Colombo'
  );
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const totalAmountLKR = items.reduce((acc, item) => acc + item.priceLKR * item.quantity, 0);

  const orderParams: MultiItemOrderParams = {
    customerName: customerName || 'Customer',
    customerPhone: customerPhone || 'Not specified',
    items: items.map((i) => ({
      productName: i.name,
      size: i.selectedSize,
      color: i.selectedColor,
      quantity: i.quantity,
      priceLKR: i.priceLKR
    })),
    deliveryAddress: deliveryAddress || 'Address on WhatsApp',
    totalAmountLKR,
    city,
    notes
  };

  const previewMessage = formatMultiItemOrderMessage(orderParams);

  const handleSendOrderWhatsApp = () => {
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name for delivery.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Please enter your contact phone number.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter your delivery street address.');
      return;
    }

    setErrorMsg('');

    try {
      localStorage.setItem('ceyo_customer_name', customerName);
      localStorage.setItem('ceyo_customer_phone', customerPhone);
      localStorage.setItem('ceyo_customer_address', deliveryAddress);
      localStorage.setItem('ceyo_customer_city', city);
    } catch {
      // Ignore
    }

    const finalMessage = formatMultiItemOrderMessage({
      customerName,
      customerPhone,
      items: items.map((i) => ({
        productName: i.name,
        size: i.selectedSize,
        color: i.selectedColor,
        quantity: i.quantity,
        priceLKR: i.priceLKR
      })),
      deliveryAddress,
      totalAmountLKR,
      city,
      notes
    });

    const url = `https://wa.me/${BUSINESS_WHATSAPP_CLEAN}?text=${encodeURIComponent(finalMessage)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(previewMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end animate-fadeIn">
      <div
        className="w-full max-w-md bg-[#121217] border-l border-zinc-800 h-full flex flex-col shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Bag"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-[#16161c] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-display text-base font-bold text-white tracking-wide">
              YOUR SHOPPING BAG ({items.reduce((s, i) => s + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close bag drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-zinc-500">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-display text-base font-bold text-white mb-1">Your bag is empty</h3>
              <p className="text-xs text-zinc-400 mb-6 max-w-xs mx-auto">
                Explore our heavyweight drop tees and pure linen resort collection.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-amber-400 hover:bg-amber-300 text-black text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                Shop Collection
              </button>
            </div>
          ) : !showCheckoutForm ? (
            <>
              {/* Item List */}
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 bg-zinc-900/80 border border-zinc-800/80 rounded-xl flex gap-3.5 items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover bg-zinc-950 shrink-0 border border-zinc-700/60"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                      <p className="text-[11px] text-zinc-400 mt-0.5">
                        {item.selectedColor} · Size: <span className="text-amber-400 font-semibold">{item.selectedSize}</span>
                      </p>
                      <p className="text-xs font-semibold text-white mt-1 tabular-nums">
                        Rs. {(item.priceLKR * item.quantity).toLocaleString()} LKR
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="flex items-center border border-zinc-700 rounded-lg bg-zinc-950">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer min-h-[32px] min-w-[32px]"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-white tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center text-xs text-zinc-300 hover:bg-zinc-800 cursor-pointer min-h-[32px] min-w-[32px]"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-2 text-zinc-500 hover:text-red-400 cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                        title="Remove item"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Free Islandwide Delivery threshold notice */}
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-xl text-xs text-zinc-400 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Orders confirmed instantly on official WhatsApp: <strong className="text-zinc-200">{BUSINESS_WHATSAPP_NUMBER}</strong></span>
              </div>
            </>
          ) : (
            /* Checkout Details Step */
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  Customer Order Details
                </span>
                <button
                  type="button"
                  onClick={() => setShowCheckoutForm(false)}
                  className="text-xs text-zinc-400 hover:text-white underline cursor-pointer"
                >
                  ← Edit Items
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 text-xs bg-red-950/60 border border-red-800 text-red-200 rounded-lg">
                  ⚠️ {errorMsg}
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Customer Name *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Customer Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="077 XXX XXXX"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Delivery Address *
                  </label>
                  <input
                    type="text"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Street Address / House No."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    City / Area (Sri Lanka)
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Colombo, Kandy, Galle, etc."
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1">
                    Order Notes (Optional)
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Special requests or timing"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px]"
                  />
                </div>
              </div>

              {/* Message Preview */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-1">
                  <span>PREVIEW WHATSAPP MESSAGE</span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="text-amber-400 hover:text-amber-300 cursor-pointer flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <pre className="p-2.5 bg-black/60 border border-zinc-800 rounded-lg text-[11px] text-zinc-300 font-mono whitespace-pre-wrap max-h-32 overflow-y-auto">
                  {previewMessage}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Total and Order CTA */}
        {items.length > 0 && (
          <div className="p-5 border-t border-zinc-800 bg-[#16161c] space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-zinc-400">Total Order Amount:</span>
              <span className="font-display text-lg font-bold text-amber-400 tabular-nums">
                Rs. {totalAmountLKR.toLocaleString()} LKR
              </span>
            </div>

            {!showCheckoutForm ? (
              <button
                type="button"
                onClick={() => setShowCheckoutForm(true)}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>ORDER VIA WHATSAPP ({BUSINESS_WHATSAPP_NUMBER})</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSendOrderWhatsApp}
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-emerald-950/40 flex items-center justify-center gap-2 cursor-pointer min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>CONFIRM & SEND ON WHATSAPP</span>
              </button>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
