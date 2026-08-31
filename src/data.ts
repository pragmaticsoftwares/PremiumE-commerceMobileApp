export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviewCount: number;
  images: string[];
  category: string;
  tags: string[];
  colors: string[];
  sizes?: string[];
  inStock: boolean;
  description: string;
  specs: Record<string, string>;
  isFeatured?: boolean;
  isNew?: boolean;
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'shipped' | 'out-for-delivery' | 'delivered' | 'cancelled';
  items: { product: Product; qty: number; color: string }[];
  total: number;
  address: Address;
  trackingId: string;
  estimatedDelivery: string;
}

export interface Address {
  id: string;
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault?: boolean;
  type: 'home' | 'work' | 'other';
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  productCount: number;
  image: string;
}

export interface Coupon {
  code: string;
  discount: number;
  type: 'percent' | 'flat';
  minOrder: number;
  description: string;
}

export const categories: Category[] = [
  { id: 'electronics', name: 'Electronics', icon: '⚡', color: '#EEF0FF', productCount: 240, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop&auto=format' },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: '#FFF0F3', productCount: 580, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop&auto=format' },
  { id: 'home', name: 'Home & Living', icon: '🏠', color: '#FFFBEB', productCount: 320, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=200&h=200&fit=crop&auto=format' },
  { id: 'beauty', name: 'Beauty', icon: '✨', color: '#FDF4FF', productCount: 180, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop&auto=format' },
  { id: 'sports', name: 'Sports', icon: '🏃', color: '#F0FFF4', productCount: 210, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&h=200&fit=crop&auto=format' },
  { id: 'books', name: 'Books', icon: '📚', color: '#FFF7ED', productCount: 950, image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=200&h=200&fit=crop&auto=format' },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'AirFlow Pro Headphones',
    brand: 'SoundWave',
    price: 129.99,
    originalPrice: 179.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 2847,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1491927570842-0261e477d937?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'electronics',
    tags: ['wireless', 'noise-cancelling', 'bluetooth'],
    colors: ['Midnight Black', 'Pearl White', 'Rose Gold'],
    inStock: true,
    description: 'Experience studio-quality sound with 30 hours of battery life. Advanced ANC blocks up to 98% of ambient noise so you can focus on what matters.',
    specs: { 'Battery Life': '30 hours', 'Connectivity': 'Bluetooth 5.2', 'Driver Size': '40mm', 'Weight': '250g', 'Charging': 'USB-C' },
    isFeatured: true,
  },
  {
    id: '2',
    name: 'CloudStep Runner X',
    brand: 'FlexFit',
    price: 89.99,
    originalPrice: 119.99,
    discount: 25,
    rating: 4.6,
    reviewCount: 1423,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'sports',
    tags: ['running', 'lightweight', 'breathable'],
    colors: ['Electric Blue', 'Volt Green', 'Stealth Grey'],
    sizes: ['6', '7', '8', '9', '10', '11', '12'],
    inStock: true,
    description: 'Ultra-lightweight running shoes with responsive CloudStep foam cushioning for maximum energy return on every stride.',
    specs: { 'Upper': 'Engineered Mesh', 'Midsole': 'CloudStep Foam', 'Weight': '240g (size 9)', 'Drop': '8mm', 'Stack Height': '28mm heel / 20mm forefoot' },
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Vela Smart Watch Ultra',
    brand: 'VelaTime',
    price: 249.99,
    originalPrice: 299.99,
    discount: 17,
    rating: 4.9,
    reviewCount: 4102,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'electronics',
    tags: ['smartwatch', 'health', 'gps'],
    colors: ['Graphite', 'Silver', 'Gold'],
    inStock: true,
    description: 'Advanced health monitoring with ECG, blood oxygen, and continuous heart rate. 18-day battery life with always-on display.',
    specs: { 'Display': '1.4" AMOLED', 'Battery': '18 days', 'Water Resistance': '5 ATM', 'GPS': 'Built-in', 'Health Sensors': 'ECG, SpO2, HR' },
    isFeatured: true,
    isNew: true,
  },
  {
    id: '4',
    name: 'Luma Desk Lamp Arc',
    brand: 'Luma Studio',
    price: 49.99,
    originalPrice: 69.99,
    discount: 29,
    rating: 4.5,
    reviewCount: 876,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'home',
    tags: ['minimalist', 'led', 'dimmable'],
    colors: ['Matte White', 'Matte Black'],
    inStock: true,
    description: 'Architect-inspired LED desk lamp with 5 color temperatures, stepless dimming, and USB charging port.',
    specs: { 'Light Source': 'LED', 'Color Temperature': '2700K–6500K', 'Lumens': '800 lm', 'Power': '12W', 'Certification': 'Eye-care certified' },
  },
  {
    id: '5',
    name: 'Zen Flow Yoga Mat',
    brand: 'ZenBody',
    price: 39.99,
    originalPrice: 54.99,
    discount: 27,
    rating: 4.7,
    reviewCount: 2210,
    images: [
      'https://images.unsplash.com/photo-1601925228100-6c0f0fb9d89e?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'sports',
    tags: ['yoga', 'eco-friendly', 'non-slip'],
    colors: ['Sage Green', 'Lavender', 'Terracotta', 'Slate Blue'],
    inStock: true,
    description: 'Premium natural rubber yoga mat with alignment lines, superior grip, and eco-friendly materials. 6mm cushioning for joint support.',
    specs: { 'Material': 'Natural Rubber + PU', 'Thickness': '6mm', 'Dimensions': '183 × 61 cm', 'Weight': '2.5 kg', 'Texture': 'Microfiber top' },
  },
  {
    id: '6',
    name: 'Nova Puffer Jacket',
    brand: 'ArctaWear',
    price: 159.99,
    originalPrice: 219.99,
    discount: 27,
    rating: 4.6,
    reviewCount: 934,
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'fashion',
    tags: ['winter', 'insulated', 'water-resistant'],
    colors: ['Midnight Navy', 'Forest Green', 'Stone Beige'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    inStock: true,
    description: 'Lightweight 650-fill down puffer jacket with DWR coating. Packs down into its own pocket for easy travel.',
    specs: { 'Fill Power': '650 fill down', 'Shell': '100% Recycled Nylon', 'Water Resistance': 'DWR coating', 'Packability': 'Packs to pocket size', 'Fit': 'Regular' },
  },
  {
    id: '7',
    name: 'Urban Trek 32L Backpack',
    brand: 'TrailCo',
    price: 79.99,
    originalPrice: 109.99,
    discount: 27,
    rating: 4.4,
    reviewCount: 1547,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'fashion',
    tags: ['backpack', 'travel', 'laptop'],
    colors: ['Charcoal', 'Navy', 'Olive'],
    inStock: true,
    description: '32L carry-on backpack with laptop sleeve, organizational pockets, and ergonomic back panel system.',
    specs: { 'Volume': '32L', 'Laptop Sleeve': 'Up to 16"', 'Material': '900D Polyester', 'Weight': '1.1 kg', 'Carry-on': 'Airline approved' },
  },
  {
    id: '8',
    name: 'Lumière Face Serum',
    brand: 'Lumière Paris',
    price: 64.99,
    originalPrice: 89.99,
    discount: 28,
    rating: 4.8,
    reviewCount: 3821,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop&auto=format',
    ],
    category: 'beauty',
    tags: ['skincare', 'vitamin-c', 'brightening'],
    colors: ['Standard'],
    inStock: true,
    description: '20% Vitamin C serum with hyaluronic acid and niacinamide. Visibly reduces dark spots and boosts radiance in 4 weeks.',
    specs: { 'Key Ingredients': 'Vit C 20%, HA, Niacinamide', 'Volume': '30ml', 'Skin Type': 'All skin types', 'Usage': 'AM / PM', 'Fragrance': 'Fragrance-free' },
    isNew: true,
  },
];

export const reviews = [
  { id: '1', user: 'Sarah K.', rating: 5, date: '2 days ago', comment: 'Absolutely love this! The quality is outstanding and delivery was super fast. Highly recommend.', avatar: 'SK', helpful: 24 },
  { id: '2', user: 'Marcus T.', rating: 4, date: '1 week ago', comment: 'Great product overall. Build quality feels premium. Took off one star as the color is slightly different from photos.', avatar: 'MT', helpful: 18 },
  { id: '3', user: 'Priya R.', rating: 5, date: '2 weeks ago', comment: 'Exceeded my expectations! Worth every penny. The packaging was also really beautiful.', avatar: 'PR', helpful: 41 },
];

export const addresses: Address[] = [
  {
    id: 'a1',
    name: 'Alex Morgan',
    line1: '47 Maple Street, Apt 2B',
    city: 'Brooklyn',
    state: 'New York',
    zip: '11201',
    phone: '+1 (917) 555-0142',
    isDefault: true,
    type: 'home',
  },
  {
    id: 'a2',
    name: 'Alex Morgan',
    line1: '350 Fifth Avenue, Floor 12',
    city: 'New York',
    state: 'New York',
    zip: '10118',
    phone: '+1 (917) 555-0142',
    type: 'work',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2024-9847',
    date: 'Aug 28, 2026',
    status: 'out-for-delivery',
    items: [{ product: products[0], qty: 1, color: 'Midnight Black' }, { product: products[4], qty: 2, color: 'Sage Green' }],
    total: 209.97,
    address: addresses[0],
    trackingId: 'FX4829301US',
    estimatedDelivery: 'Today by 8 PM',
  },
  {
    id: 'ORD-2024-9612',
    date: 'Aug 15, 2026',
    status: 'delivered',
    items: [{ product: products[2], qty: 1, color: 'Graphite' }],
    total: 249.99,
    address: addresses[0],
    trackingId: 'FX4712890US',
    estimatedDelivery: 'Aug 18, 2026',
  },
  {
    id: 'ORD-2024-9301',
    date: 'Jul 30, 2026',
    status: 'delivered',
    items: [{ product: products[1], qty: 1, color: 'Electric Blue' }, { product: products[6], qty: 1, color: 'Charcoal' }],
    total: 169.98,
    address: addresses[0],
    trackingId: 'FX4623011US',
    estimatedDelivery: 'Aug 2, 2026',
  },
];

export const coupons: Coupon[] = [
  { code: 'SAVE20', discount: 20, type: 'percent', minOrder: 100, description: '20% off on orders above $100' },
  { code: 'FIRST50', discount: 50, type: 'flat', minOrder: 200, description: '$50 off your first order above $200' },
  { code: 'SUMMER15', discount: 15, type: 'percent', minOrder: 50, description: '15% off summer collection' },
];

export const notifications = [
  { id: '1', title: 'Your order is out for delivery!', body: 'ORD-2024-9847 will arrive today by 8 PM. Track your order.', time: '10 min ago', read: false, type: 'order' },
  { id: '2', title: 'Flash Sale – 40% off Electronics', body: 'Hurry! Limited time offer on top electronics brands. Shop now.', time: '2 hours ago', read: false, type: 'offer' },
  { id: '3', title: 'New arrivals in Fashion', body: 'Check out 120+ new styles added this week. Free shipping on ₹599+.', time: '1 day ago', read: true, type: 'promo' },
  { id: '4', title: 'Your review helped 41 people', body: 'Your review on Zen Flow Yoga Mat was marked helpful by 41 users.', time: '2 days ago', read: true, type: 'social' },
  { id: '5', title: 'Price drop alert!', body: 'Vela Smart Watch Ultra dropped from $299.99 to $249.99. You saved this item.', time: '3 days ago', read: true, type: 'price' },
];

export const banners = [
  { id: '1', title: 'Summer\nSale', subtitle: 'Up to 50% off', cta: 'Shop Now', bg: '#5B4EFF', image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=300&fit=crop&auto=format' },
  { id: '2', title: 'New Season\nArrivals', subtitle: 'Fresh styles just landed', cta: 'Explore', bg: '#FF4D6A', image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=300&fit=crop&auto=format' },
  { id: '3', title: 'Free\nShipping', subtitle: 'On orders above $50', cta: 'Go Shopping', bg: '#22C55E', image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=300&fit=crop&auto=format' },
];
