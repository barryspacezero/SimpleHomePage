// Product type definition
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
}

// Mock database - in a real app, this would be your database or API
const PRODUCTS_DB: Product[] = [
  {
    "id": "running-shoes-001",
    "name": "Performance Running Shoes",
    "price": 120.00,
    "image": "https://m.media-amazon.com/images/I/61rWcMP4s9L._SY695_.jpg",
    "category": "Footwear",
    "brand": "AeroRun",
    "rating": 4.5,
    "description": "Lightweight and breathable running shoes designed for optimal performance and comfort on long runs."
  },
  {
    "id": "wireless-headphones-001",
    "name": "Premium Wireless Headphones",
    "price": 199.99,
    "image": "https://m.media-amazon.com/images/I/61MGzdlzIJL._SL1500_.jpg",
    "category": "Electronics",
    "brand": "SoundWave",
    "rating": 4.8,
    "description": "Immersive sound experience with active noise cancellation and a comfortable over-ear design. Long-lasting battery."
  },
  {
    "id": "backpack-001",
    "name": "Urban Commuter Backpack",
    "price": 75.50,
    "image": "https://m.media-amazon.com/images/I/71maWXZscfL._SL1500_.jpg",
    "category": "Bags",
    "brand": "UrbanPack",
    "rating": 4.2,
    "description": "Durable and stylish backpack with multiple compartments, perfect for daily commutes and light travel."
  },
  {
    "id": "smartwatch-001",
    "name": "Fitness Tracker Smartwatch",
    "price": 249.00,
    "image": "https://m.media-amazon.com/images/I/61rmkmqD5VL._SL1500_.jpg",
    "category": "Electronics",
    "brand": "FitTech",
    "rating": 4.6,
    "description": "Monitor your health and fitness with advanced sensors, GPS, and smart notifications. Water-resistant design."
  },
  {
    "id": "sunglasses-001",
    "name": "Classic Aviator Sunglasses",
    "price": 55.00,
    "image": "https://m.media-amazon.com/images/I/51wwVl2r-WL._SX679_.jpg",
    "category": "Accessories",
    "brand": "Sunnies",
    "rating": 4.0,
    "description": "Timeless aviator style sunglasses with UV protection, suitable for all face shapes."
  },
  {
    "id": "digital-camera-001",
    "name": "Compact Digital Camera",
    "price": 329.99,
    "image": "https://m.media-amazon.com/images/I/71KO7VHuWuL._SL1500_.jpg",
    "category": "Electronics",
    "brand": "PixelPro",
    "rating": 4.3,
    "description": "Capture stunning photos and videos with this easy-to-use compact digital camera, featuring optical zoom."
  },
  {
    "id": "smartphone-001",
    "name": "Flagship Android Smartphone",
    "price": 899.00,
    "image": "https://m.media-amazon.com/images/I/61EoCnDyoQL._SL1500_.jpg",
    "category": "Electronics",
    "brand": "ConnectU",
    "rating": 4.7,
    "description": "Powerful smartphone with a vibrant display, advanced camera system, and long-lasting battery life."
  },
  {
    "id": "tshirt-001",
    "name": "Organic Cotton T-Shirt",
    "price": 29.99,
    "image": "https://m.media-amazon.com/images/I/51KB+4kAeXL.jpg",
    "category": "Apparel",
    "brand": "EcoWear",
    "rating": 4.1,
    "description": "Soft and comfortable t-shirt made from 100% organic cotton, perfect for everyday wear."
  },
  {
    "id": "running-shoes-002",
    "name": "Trail Running Shoes",
    "price": 135.00,
    "image": "https://m.media-amazon.com/images/I/91UZxIVQktL._SX695_.jpg",
    "category": "Footwear",
    "brand": "TerraTrek",
    "rating": 4.4,
    "description": "Rugged trail running shoes with enhanced grip and support for off-road adventures."
  },
  {
    "id": "wireless-headphones-002",
    "name": "Sport Wireless Earbuds",
    "price": 89.99,
    "image": "https://m.media-amazon.com/images/I/71QdB7hDCAL._SL1500_.jpg",
    "category": "Electronics",
    "brand": "SoundWave",
    "rating": 4.0,
    "description": "Sweat-resistant wireless earbuds with secure fit, ideal for workouts and active lifestyles."
  },
  {
    "id": "backpack-002",
    "name": "Hiking Daypack",
    "price": 99.00,
    "image": "https://m.media-amazon.com/images/I/31eJTTlRPuL._SY300_SX300_QL70_FMwebp_.jpg",
    "category": "Bags",
    "brand": "TerraTrek",
    "rating": 4.7,
    "description": "Lightweight and comfortable daypack with hydration compatibility, perfect for day hikes."
  }
];

// Product service functions
export class ProductService {
  // Get all products (for listing page)
  static async getAllProducts(): Promise<Product[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return PRODUCTS_DB;
  }

  // Get single product by ID (for product detail page)
  static async getProductById(id: string): Promise<Product | null> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 100));
    return PRODUCTS_DB.find(product => product.id === id) || null;
  }

  // Get products by category (for filtering)
  static async getProductsByCategory(category: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    return PRODUCTS_DB.filter(product => product.category === category);
  }

  // Search products (for search functionality)
  static async searchProducts(query: string): Promise<Product[]> {
    await new Promise(resolve => setTimeout(resolve, 100));
    const lowercaseQuery = query.toLowerCase();
    return PRODUCTS_DB.filter(product =>
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.brand.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get unique categories
  static async getCategories(): Promise<string[]> {
    const products = await this.getAllProducts();
    return [...new Set(products.map(p => p.category))];
  }

  // Get unique brands
  static async getBrands(): Promise<string[]> {
    const products = await this.getAllProducts();
    return [...new Set(products.map(p => p.brand))];
  }
}

// For backward compatibility, export the data array
export default PRODUCTS_DB;