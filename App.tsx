import React, { useState, useEffect } from 'react';
import { Product, CartItem } from './types';
import { PRODUCTS } from './data/products';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { FounderSection } from './components/FounderSection';
import { OrderModal } from './components/OrderModal';
import { CartDrawer } from './components/CartDrawer';
import { OrderingGuide } from './components/OrderingGuide';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Footer } from './components/Footer';
import { BUSINESS_WHATSAPP_NUMBER, buildGeneralEnquiryUrl } from './utils/whatsapp';
import { Sparkles, MessageCircle, SlidersHorizontal } from 'lucide-react';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeSection, setActiveSection] = useState<string>('hero');

  // Product detail modal state
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  // WhatsApp Single Product Order modal state
  const [orderModalData, setOrderModalData] = useState<{
    product: Product;
    color: string;
    size: string;
    quantity: number;
  } | null>(null);

  // Shopping Bag / Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ceyo_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('ceyo_cart', JSON.stringify(cartItems));
    } catch {
      // Ignore
    }
  }, [cartItems]);

  // Track active section for mobile tab highlight
  useEffect(() => {
    const handleScroll = () => {
      const founderEl = document.getElementById('founder');
      const collectionEl = document.getElementById('collection');
      const scrollPos = window.scrollY + 200;

      if (founderEl && scrollPos >= founderEl.offsetTop && scrollPos < founderEl.offsetTop + founderEl.offsetHeight) {
        setActiveSection('founder');
      } else if (collectionEl && scrollPos >= collectionEl.offsetTop) {
        setActiveSection('collection');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'tees') {
      setSelectedCategory('tees');
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'linen') {
      setSelectedCategory('shirts');
      const el = document.getElementById('collection');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Add to Bag handler
  const handleAddToCart = (
    product: Product,
    selectedColor: string,
    selectedSize: string,
    quantity: number = 1
  ) => {
    const itemId = `${product.id}-${selectedColor}-${selectedSize}`;
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          priceLKR: product.priceLKR,
          image: product.image,
          selectedColor,
          selectedSize,
          quantity
        }
      ];
    });
  };

  // Update Cart Quantity
  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f4f5] flex flex-col font-sans selection:bg-amber-400 selection:text-black">
      
      {/* Top Navbar */}
      <Navbar
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigateToSection={scrollToSection}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Campaign Hero Banner */}
        <Hero
          onExploreClick={() => scrollToSection('collection')}
          onFounderClick={() => scrollToSection('founder')}
        />

        {/* Featured Products Collection */}
        <section id="collection" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-400 mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Curated Edit</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>All Prices in LKR</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
                CEYO Signature Collection
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl font-light">
                Direct WhatsApp ordering to <strong className="text-emerald-400">{BUSINESS_WHATSAPP_NUMBER}</strong>. Islandwide delivery with Cash on Delivery available.
              </p>
            </div>

            {/* Category Filter Tabs - Button Segmented Controls per Section 1.A */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-900 border border-zinc-800 rounded-xl">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  selectedCategory === 'all'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                All Pieces ({PRODUCTS.length})
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('tees')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  selectedCategory === 'tees'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Oversized Tees
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('shirts')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  selectedCategory === 'shirts'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Pure Linen
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory('polos')}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer min-h-[38px] whitespace-nowrap ${
                  selectedCategory === 'polos'
                    ? 'bg-amber-400 text-black shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Knit Polos
              </button>
            </div>
          </div>

          {/* Product Grid: 1-col mobile, 2-col tablet, 3-col desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={(p) => setActiveProduct(p)}
                onQuickOrderWhatsApp={(p, color, size) => {
                  setOrderModalData({
                    product: p,
                    color,
                    size,
                    quantity: 1
                  });
                }}
                onAddToCart={(p, color, size) => handleAddToCart(p, color, size, 1)}
              />
            ))}
          </div>

        </section>

        {/* Official Founder Section: "Ranshika" & "Founder of CEYO CLOTHING" */}
        <FounderSection onExploreCollection={() => scrollToSection('collection')} />

        {/* How to Order on WhatsApp Guide */}
        <OrderingGuide />

      </main>

      {/* Footer */}
      <Footer onNavigate={scrollToSection} />

      {/* Android Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        cartCount={cartCount}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Floating Quick WhatsApp Button on Desktop */}
      <aside aria-label="Customer Support" className="hidden md:block fixed bottom-6 right-6 z-30">
        <a
          href={buildGeneralEnquiryUrl('Website concierge assistance')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-2xl shadow-emerald-950/60 transition-transform hover:scale-105 active:scale-95 text-xs font-bold uppercase tracking-wider border border-emerald-400/40"
          aria-label={`Chat with CEYO CLOTHING on WhatsApp at ${BUSINESS_WHATSAPP_NUMBER}`}
        >
          <MessageCircle className="w-5 h-5 text-white" />
          <span>{BUSINESS_WHATSAPP_NUMBER}</span>
        </a>
      </aside>

      {/* Product Detail Modal */}
      <ProductModal
        product={activeProduct}
        isOpen={activeProduct !== null}
        onClose={() => setActiveProduct(null)}
        onOrderViaWhatsApp={(p, color, size, qty) => {
          setActiveProduct(null);
          setOrderModalData({
            product: p,
            color,
            size,
            quantity: qty
          });
        }}
        onAddToCart={(p, color, size, qty) => {
          handleAddToCart(p, color, size, qty);
        }}
      />

      {/* Order Via WhatsApp Modal with Complete Details Pre-fill */}
      {orderModalData && (
        <OrderModal
          product={orderModalData.product}
          selectedColor={orderModalData.color}
          selectedSize={orderModalData.size}
          initialQuantity={orderModalData.quantity}
          isOpen={true}
          onClose={() => setOrderModalData(null)}
        />
      )}

      {/* Cart Drawer for multi-item orders */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

    </div>
  );
}
