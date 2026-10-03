import React from 'react';
import { Product } from '../types';
import { MessageCircle, Eye, ShoppingBag } from 'lucide-react';
import { BUSINESS_WHATSAPP_NUMBER } from '../utils/whatsapp';

interface ProductCardProps {
  product: Product;
  onOpenDetails: (product: Product) => void;
  onQuickOrderWhatsApp: (product: Product, color: string, size: string) => void;
  onAddToCart: (product: Product, color: string, size: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenDetails,
  onQuickOrderWhatsApp,
  onAddToCart
}) => {
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = React.useState(product.sizes[1] || product.sizes[0] || 'M');

  return (
    <div className="group bg-[#111115] border border-zinc-800/90 hover:border-zinc-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col h-full shadow-lg hover:shadow-2xl">
      
      {/* Product Image Stage */}
      <div
        onClick={() => onOpenDetails(product)}
        className="relative aspect-[4/3] sm:aspect-square w-full bg-zinc-950 overflow-hidden cursor-pointer"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />

        {/* Tag (Bestseller, Limited Run, etc.) - Clean unboxed style */}
        {product.tag && (
          <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-md text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
            {product.tag}
          </div>
        )}

        {/* Quick View Button on Desktop Hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(product);
            }}
            className="px-4 py-2 bg-white/95 hover:bg-white text-black font-semibold text-xs rounded-xl shadow-lg flex items-center gap-1.5 transition-transform active:scale-95"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Category & Material Line */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5">
            <span className="uppercase tracking-widest text-[11px] font-medium text-amber-400/90">
              {product.category}
            </span>
            <span className="text-[11px] text-zinc-500">In Stock</span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenDetails(product)}
            className="font-display text-base font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          {/* Fabric Details */}
          <p className="text-xs text-zinc-400 mt-1 line-clamp-1 font-light">
            {product.fabric}
          </p>

          {/* Price line in LKR */}
          <div className="flex items-baseline gap-2 mt-2.5">
            <span className="text-base sm:text-lg font-bold text-white tabular-nums">
              Rs. {product.priceLKR.toLocaleString()}
            </span>
            <span className="text-xs text-zinc-400 uppercase">LKR</span>
            {product.originalPriceLKR && (
              <span className="text-xs text-zinc-500 line-through tabular-nums ml-1">
                Rs. {product.originalPriceLKR.toLocaleString()}
              </span>
            )}
          </div>

          {/* Color & Size Selectors for Fast Ordering */}
          <div className="mt-3 pt-3 border-t border-zinc-800/80 space-y-2">
            
            {/* Color Swatches */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Color: <strong className="text-zinc-300">{selectedColor}</strong></span>
              <div className="flex items-center gap-1.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    onClick={() => setSelectedColor(c.name)}
                    style={{ backgroundColor: c.hex }}
                    className={`w-4 h-4 rounded-full border transition-transform cursor-pointer ${
                      selectedColor === c.name
                        ? 'border-amber-400 scale-125 ring-2 ring-amber-400/30'
                        : 'border-zinc-600 hover:scale-110'
                    }`}
                    title={c.name}
                    aria-label={`Select ${c.name} color`}
                  />
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-zinc-400">Size:</span>
              <div className="flex items-center gap-1">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSize(s)}
                    className={`min-w-6 h-6 px-1 text-[11px] font-semibold rounded transition-colors cursor-pointer ${
                      selectedSize === s
                        ? 'bg-amber-400 text-black'
                        : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Action Buttons: ORDER VIA WHATSAPP (Primary) + Bag */}
        <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-2">
          
          <button
            type="button"
            onClick={() => onQuickOrderWhatsApp(product, selectedColor, selectedSize)}
            className="flex-1 min-h-[44px] px-3 py-2.5 bg-emerald-600 hover:bg-emerald-500 active:scale-98 text-white rounded-xl text-xs font-bold tracking-wider uppercase transition-all shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1.5 cursor-pointer"
            aria-label={`Order ${product.name} via WhatsApp to ${BUSINESS_WHATSAPP_NUMBER}`}
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span className="truncate">ORDER VIA WHATSAPP</span>
          </button>

          <button
            type="button"
            onClick={() => onAddToCart(product, selectedColor, selectedSize)}
            className="min-h-[44px] min-w-[44px] p-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl transition-colors flex items-center justify-center cursor-pointer active:scale-95"
            title="Add to shopping bag"
            aria-label="Add to bag"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>

        </div>

      </div>

    </div>
  );
};
