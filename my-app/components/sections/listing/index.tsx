"use client";

import React, { useState, useMemo, useCallback } from 'react';
import ProductCard from '../../common/productCard';
import FilterSidebar from './filterSidebar';
import productsData from './dummydata';

// Define the structure of a product
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
}

// Define the structure for filters
interface Filters {
  categories: string[];
  priceRange: { min: number; max: number };
  brands: string[];
}

// Header Component
const Header = () => (
  <header className="bg-blue-600 sticky top-0 z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white">Logo</div>
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search for products..."
            className="w-full pl-10 pr-4 py-2 bg-blue-500 text-white placeholder-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <div className="flex items-center text-white">
          <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-medium">Cart</span>
        </div>
      </div>
    </div>
  </header>
);

// Footer Component
const Footer = () => (
  <footer className="bg-blue-800 mt-12">
    <div className="container mx-auto px-6 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-semibold mb-4">Filters</h4>
          <ul className="text-blue-200 space-y-2">
            <li>All</li>
            <li>Electronics</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">About Us</h4>
          <ul className="text-blue-200 space-y-2">
            <li>About Us</li>
            <li>Contact</li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">f</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">t</span>
            </div>
            <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
              <span className="text-white text-sm">i</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-blue-700 mt-8 pt-6">
        <p className="text-blue-200">© 2024 American</p>
      </div>
    </div>
  </footer>
);

// Main Product Listing Page Component
const ProductListing: React.FC = () => {
  const [products] = useState<Product[]>(productsData);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    brands: [],
  });

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = [...products];

    // Filter by category
    if (filters.categories.length > 0) {
      tempProducts = tempProducts.filter(p => filters.categories.includes(p.category));
    }

    // Filter by price
    tempProducts = tempProducts.filter(p => p.price <= filters.priceRange.max);

    // Filter by brand
    if (filters.brands.length > 0) {
      tempProducts = tempProducts.filter(p => filters.brands.includes(p.brand));
    }

    return tempProducts;
  }, [filters, products]);

  const handleFilterChange = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const handleAddToCart = (productId: string) => {
    console.log(`Product ${productId} added to cart.`);
    // Here you would typically handle global state for the cart
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header />
      <main className="container mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full lg:w-1/4">
            <FilterSidebar
              categories={categories}
              brands={brands}
              onFilterChange={handleFilterChange}
            />
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Product Listing</h2>


            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  title={product.name}
                  price={product.price}
                  imageUrl={product.image}
                  rating={product.rating}
                  onAddToCart={() => handleAddToCart(product.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
