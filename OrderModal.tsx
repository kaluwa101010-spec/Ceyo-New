import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import {
  BUSINESS_WHATSAPP_NUMBER,
  BUSINESS_WHATSAPP_CLEAN,
  formatSingleOrderMessage,
  SingleProductOrderParams
} from '../utils/whatsapp';
import { X, MessageCircle, MapPin, User, Phone, CheckCircle, Copy, Check, ShieldCheck } from 'lucide-react';

interface OrderModalProps {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  initialQuantity?: number;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({
  product,
  selectedColor: initialColor,
  selectedSize: initialSize,
  initialQuantity = 1,
  isOpen,
  onClose
}) => {
  const [color, setColor] = useState(initialColor);
  const [size, setSize] = useState(initialSize);
  const [quantity, setQuantity] = useState(initialQuantity);

  // Customer form fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [city, setCity] = useState('Colombo');
  const [notes, setNotes] = useState('');

  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Pre-load customer details from localStorage if previously placed an order
  useEffect(() => {
    setColor(initialColor);
    setSize(initialSize);
    setQuantity(initialQuantity);

    const savedName = localStorage.getItem('ceyo_customer_name') || '';
    const savedPhone = localStorage.getItem('ceyo_customer_phone') || '';
    const savedAddress = localStorage.getItem('ceyo_customer_address') || '';
    const savedCity = localStorage.getItem('ceyo_customer_city') || 'Colombo';

    if (savedName) setCustomerName(savedName);
    if (savedPhone) setCustomerPhone(savedPhone);
    if (savedAddress) setDeliveryAddress(savedAddress);
    if (savedCity) setCity(savedCity);
  }, [initialColor, initialSize, initialQuantity, isOpen]);

  if (!isOpen) return null;

  const totalAmountLKR = product.priceLKR * quantity;

  // Build the strict order parameters required by user prompt
  const orderParams: SingleProductOrderParams = {
    customerName: customerName || 'Customer',
    customerPhone: customerPhone || 'Phone Not Provided',
    productName: product.name,
    size: size,
    color: color,
    quantity: quantity,
    deliveryAddress: deliveryAddress || 'Address to be specified on WhatsApp',
    totalAmountLKR: totalAmountLKR,
    city: city,
    notes: notes
  };

  const formattedMessage = formatSingleOrderMessage(orderParams);

  const handleOrderViaWhatsApp = () => {
    // Basic validation
    if (!customerName.trim()) {
      setErrorMsg('Please enter your full name for the order delivery.');
      return;
    }
    if (!customerPhone.trim()) {
      setErrorMsg('Please enter your phone number (e.g. 077XXXXXXX) so we can confirm your order.');
      return;
    }
    if (!deliveryAddress.trim()) {
      setErrorMsg('Please enter your street / delivery address.');
      return;
    }

    setErrorMsg('');

    // Save to localStorage for repeat convenience
    try {
      localStorage.setItem('ceyo_customer_name', customerName);
      localStorage.setItem('ceyo_customer_phone', customerPhone);
      localStorage.setItem('ceyo_customer_address', deliveryAddress);
      localStorage.setItem('ceyo_customer_city', city);
    } catch {
      // Ignore storage errors
    }

    const finalOrderParams: SingleProductOrderParams = {
      customerName,
      customerPhone,
      productName: product.name,
      size,
      color,
      quantity,
      deliveryAddress,
      totalAmountLKR,
      city,
      notes
    };

    const finalMessage = formatSingleOrderMessage(finalOrderParams);
    const whatsappUrl = `https://wa.me/${BUSINESS_WHATSAPP_CLEAN}?text=${encodeURIComponent(finalMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(formattedMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-[#121217] border border-zinc-800 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-zinc-800 bg-[#16161d]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 id="order-modal-title" className="text-sm sm:text-base font-bold text-white tracking-wide">
                ORDER VIA WHATSAPP
              </h2>
              <p className="text-[11px] text-zinc-400">
                Official Business Number: <span className="text-emerald-400 font-semibold">{BUSINESS_WHATSAPP_NUMBER}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Close order modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 max-h-[75vh] overflow-y-auto space-y-5">
          
          {/* Product Summary Mini Card */}
          <div className="flex gap-4 p-3.5 bg-zinc-900/90 border border-zinc-800/80 rounded-xl items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-zinc-950 shrink-0 border border-zinc-700/50"
              referrerPolicy="no-referrer"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-white truncate">{product.name}</h3>
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-400 mt-1">
                <span>Color: <strong className="text-zinc-200">{color}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Size: <strong className="text-zinc-200">{size}</strong></span>
                <span aria-hidden="true">·</span>
                <span>Qty: <strong className="text-zinc-200">{quantity}</strong></span>
              </div>
              <p className="text-sm font-bold text-amber-400 mt-1.5 tabular-nums">
                Rs. {totalAmountLKR.toLocaleString()} LKR
              </p>
            </div>
          </div>

          {/* Quick Options Adjustment: Size & Color */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800/50">
            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Change Size
              </label>
              <div className="flex flex-wrap gap-1.5">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSize(s)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer min-h-[32px] ${
                      size === s
                        ? 'bg-amber-400 text-black shadow-sm'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-zinc-400 uppercase tracking-wider mb-1.5">
                Quantity
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold flex items-center justify-center cursor-pointer transition-colors"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-white tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold flex items-center justify-center cursor-pointer transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Customer Details Form: Required for WhatsApp message */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Customer Details for WhatsApp Delivery Confirmation</span>
            </h4>

            {errorMsg && (
              <div className="p-3 text-xs bg-red-950/60 border border-red-800/80 text-red-200 rounded-xl">
                ⚠️ {errorMsg}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Customer Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Dilshan Perera"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Customer Phone Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. 077 123 4567"
                    className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">
                Delivery Address (House/Street/Apartment) *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="e.g. No. 45/2, Galle Road, Colombo 03"
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  City / District (Sri Lanka)
                </label>
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 min-h-[44px] cursor-pointer"
                >
                  <option value="Colombo 01-15">Colombo (1-15)</option>
                  <option value="Colombo Suburbs (Dehiwala, Nugegoda, Rajagiriya)">Colombo Suburbs</option>
                  <option value="Gampaha / Negombo">Gampaha / Negombo</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Galle">Galle</option>
                  <option value="Matara">Matara</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Other Islandwide Destination">Other Islandwide</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1">
                  Special Notes / Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Near clock tower, COD requested, etc."
                  className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 min-h-[44px]"
                />
              </div>
            </div>

          </div>

          {/* WhatsApp Message Preview Box */}
          <div>
            <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
              <span className="font-semibold uppercase tracking-wider text-zinc-300">
                Prepared WhatsApp Order Message
              </span>
              <button
                type="button"
                onClick={handleCopyMessage}
                className="inline-flex items-center gap-1 text-[11px] text-amber-400 hover:text-amber-300 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Text'}</span>
              </button>
            </div>
            <pre className="p-3.5 bg-black/60 border border-zinc-800 rounded-xl text-zinc-300 text-xs font-mono whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto select-all">
              {formattedMessage}
            </pre>
          </div>

          {/* Security & Delivery Notice */}
          <div className="flex items-start gap-2 text-xs text-zinc-400 p-3 bg-zinc-900/40 rounded-xl border border-zinc-800/60">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-zinc-200">Official Direct WhatsApp Ordering</p>
              <p className="text-[11px] text-zinc-400">
                Clicking the button will open WhatsApp directly to <strong>{BUSINESS_WHATSAPP_NUMBER}</strong> with all order details formatted. Our team replies promptly with confirmation and dispatch timeline.
              </p>
            </div>
          </div>

        </div>

        {/* Footer Actions - Optimized for Mobile & Touch */}
        <div className="px-5 sm:px-6 py-4 bg-[#16161d] border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-auto text-center sm:text-left">
            <span className="text-xs text-zinc-400 block">Total Due (LKR):</span>
            <span className="text-lg font-bold text-amber-400 tabular-nums">
              Rs. {totalAmountLKR.toLocaleString()} LKR
            </span>
          </div>

          <div className="w-full sm:w-auto flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:inline-flex px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white rounded-xl hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleOrderViaWhatsApp}
              className="w-full sm:w-auto px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white font-bold text-xs sm:text-sm tracking-wider uppercase rounded-xl transition-all shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
            >
              <MessageCircle className="w-5 h-5" />
              <span>SEND ORDER VIA WHATSAPP</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
