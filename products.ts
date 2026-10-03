import { Product } from '../types';

export const FOUNDER_INFO = {
  name: 'Ranshika',
  title: 'Founder of CEYO CLOTHING',
  brand: 'CEYO CLOTHING',
  imagePath: '/src/assets/images/founder_ranshika_ceyo_1791040565205.jpg',
  quote:
    'We founded CEYO CLOTHING with an uncompromising obsession: to engineer contemporary streetwear and luxury tropical staples cut from world-class breathable textiles, designed right here in Sri Lanka for effortless confidence and timeless longevity.',
  story: [
    'CEYO CLOTHING was born from a vision by Ranshika to redefine modern casual elegance in Sri Lanka. Rooted in rich textile heritage and shaped by global minimalist streetwear, our garments celebrate effortless proportion, tailored ease, and bespoke hand-finishing.',
    'Every piece in our catalog is engineered to withstand tropical warmth while maintaining a structured, architectural drape. From heavyweight 260GSM combed organic cottons to pure natural European flax linen, we partner with master pattern-makers and ethical local workshops across Colombo and Kandy.',
    'We believe in conscious luxury: small-batch production, zero mass-market compromise, and direct personal attention on every single WhatsApp order. When you wear CEYO, you wear an authentic piece of modern Sri Lankan craft.'
  ],
  pillars: [
    {
      title: 'Ethically Crafted in Sri Lanka',
      desc: 'Small-batch artisanal cutting, precision French seams, and local master tailoring.'
    },
    {
      title: 'Breathable Natural Textiles',
      desc: '100% natural European flax linen and combed heavy-knit organic cotton.'
    },
    {
      title: 'Direct WhatsApp Concierge',
      desc: 'Personalized customer sizing support and instant order confirmation via +94773129477.'
    }
  ]
};

export const PRODUCTS: Product[] = [
  {
    id: 'ceyo-tee-01',
    name: 'Ceylon Sand Heavyweight Oversized Tee',
    category: 'tees',
    priceLKR: 4850,
    originalPriceLKR: 5600,
    image: '/src/assets/images/ceyo_oversized_tee_1791040601360.jpg',
    description:
      'Engineered with an architectural boxy drop-shoulder cut in 260 GSM combed organic cotton. Features custom reinforced ribbed neck collar and subtle tonal CEYO embroidery on the chest.',
    fabric: '260 GSM 100% Combed Heavy Organic Cotton (Pre-shrunk)',
    fit: 'Relaxed Oversized Fit (Order true to size for signature drape)',
    colors: [
      { name: 'Sand Beige', hex: '#D7C7B3' },
      { name: 'Midnight Onyx', hex: '#18181B' },
      { name: 'Washed Olive', hex: '#5B6554' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: true,
    tag: 'Bestseller'
  },
  {
    id: 'ceyo-shirt-01',
    name: 'Artisan Washed Pure Linen Resort Shirt',
    category: 'shirts',
    priceLKR: 7450,
    originalPriceLKR: 8900,
    image: '/src/assets/images/ceyo_linen_shirt_1791040615494.jpg',
    description:
      'A warm-weather luxury staple. Cut from 100% pure washed linen with an airy camp collar, genuine mother-of-pearl buttons, and side-slit vents for effortless vacation and evening styling.',
    fabric: '100% Pure Natural Washed European Flax Linen (165 GSM)',
    fit: 'Bespoke Relaxed Fit (Ventilated drape designed for tropical climate)',
    colors: [
      { name: 'Sage Green', hex: '#6B7A68' },
      { name: 'Raw Ivory', hex: '#F4EFE6' },
      { name: 'Ceylon Sand', hex: '#C2B49F' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'Signature Linen'
  },
  {
    id: 'ceyo-polo-01',
    name: 'Signature Textured Knit Minimalist Polo',
    category: 'polos',
    priceLKR: 6800,
    image: '/src/assets/images/ceyo_polo_shirt_1791040629288.jpg',
    description:
      'A refined, buttonless Johnny-collar knitted polo woven in fine micro-gauge breathable cotton. Sculpted cuffs and ribbed hem deliver an impeccable silhouette for smart-casual wear.',
    fabric: '100% Ultra-Soft Compact Combed Cotton Knit',
    fit: 'Modern Tailored Fit (Clean shoulder line with ribbed waist)',
    colors: [
      { name: 'Midnight Navy', hex: '#1E293B' },
      { name: 'Deep Espresso', hex: '#292524' },
      { name: 'Chalk White', hex: '#E2E8F0' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: true,
    tag: 'New Season'
  },
  {
    id: 'ceyo-tee-02',
    name: 'CEYO Studio Noir Heavyweight Drop-Tee',
    category: 'tees',
    priceLKR: 4950,
    image: '/src/assets/images/ceyo_oversized_tee_1791040601360.jpg',
    description:
      'Our dark edition heavyweight tee crafted in saturated jet black. Garment washed for an ultra-soft handle with zero shrinkage and high colorfast durability.',
    fabric: '280 GSM Heavy French Terry Cotton Blend',
    fit: 'Structured Boxy Streetwear Silhouette',
    colors: [
      { name: 'Jet Black', hex: '#0F0F11' },
      { name: 'Smoked Charcoal', hex: '#374151' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    featured: false,
    tag: 'Limited Edition'
  },
  {
    id: 'ceyo-shirt-02',
    name: 'Colombo Coastal Cuban Collar Linen Shirt',
    category: 'shirts',
    priceLKR: 7800,
    originalPriceLKR: 9200,
    image: '/src/assets/images/ceyo_linen_shirt_1791040615494.jpg',
    description:
      'Inspired by the breezy coastlines of Sri Lanka. Lightweight pure linen tailored with a retro spread collar, chest patch pocket, and relaxed rolled cuffs.',
    fabric: '100% European Flax Linen (Enzyme Washed)',
    fit: 'Relaxed Resort Silhouette',
    colors: [
      { name: 'Raw Ivory', hex: '#F5F2EB' },
      { name: 'Midnight Navy', hex: '#1E293B' },
      { name: 'Sage Green', hex: '#6B7A68' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    tag: 'Summer Essential'
  },
  {
    id: 'ceyo-polo-02',
    name: 'Artisan Ribbed Waffle Knit Polo',
    category: 'polos',
    priceLKR: 6900,
    image: '/src/assets/images/ceyo_polo_shirt_1791040629288.jpg',
    description:
      'Distinctive waffle texture provides dimensional depth and superior breathability in warm evenings. Features a classic 2-button placket and matte horn buttons.',
    fabric: 'Breathable Cotton Waffle Texture (220 GSM)',
    fit: 'Regular Tailored Fit',
    colors: [
      { name: 'Ceylon Sand', hex: '#C2B49F' },
      { name: 'Midnight Navy', hex: '#1E293B' },
      { name: 'Jet Black', hex: '#0F0F11' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    featured: false,
    tag: 'Trending'
  }
];
