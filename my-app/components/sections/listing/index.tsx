"use client";

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '../../common/productCard';
import FilterSidebar from './filterSidebar';
import productsData from './dummydata';
import { useCart } from '@/contexts/CartContext';

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

interface Filters {
  categories: string[];
  priceRange: { min: number; max: number };
  brands: string[];
  search: string;
}

const Header = ({ searchTerm, onSearchChange, cartItemCount }: {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  cartItemCount: number;
}) => (
  <header className="bg-blue-600 sticky top-0 z-10">
    <div className="container mx-auto px-6 py-4 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-white">Logo</Link>
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-blue-500 text-white placeholder-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>
      <div className="flex items-center space-x-6">
        <Link href="/cart" className="flex items-center text-white hover:text-blue-200">
          <svg className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="font-medium">Cart ({cartItemCount})</span>
        </Link>
      </div>
    </div>
  </header>
);

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

const ProductListing: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state, dispatch } = useCart();

  const [products] = useState<Product[]>(productsData);
  const [filters, setFilters] = useState<Filters>({
    categories: [],
    priceRange: { min: 0, max: 1000 },
    brands: [],
    search: '',
  });

  // Initialize filters from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const brandParam = searchParams.get('brand');
    const searchParam = searchParams.get('search');

    const newFilters = {
      categories: categoryParam ? [categoryParam] : [],
      priceRange: priceParam ?
        { min: 0, max: parseInt(priceParam.split('-')[1] || '1000') } :
        { min: 0, max: 1000 },
      brands: brandParam ? [brandParam] : [],
      search: searchParam || '',
    };

    // Only update if filters actually changed
    if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
      setFilters(newFilters);
    }
  }, [filters, searchParams]); // Removed filters from dependency array to avoid cascading renders

  // Update URL when filters change
  const updateURL = useCallback((newFilters: Filters) => {
    const params = new URLSearchParams();

    if (newFilters.categories.length > 0) {
      params.set('category', newFilters.categories[0]);
    }
    if (newFilters.priceRange.max < 1000) {
      params.set('price', `0-${newFilters.priceRange.max}`);
    }
    if (newFilters.brands.length > 0) {
      params.set('brand', newFilters.brands[0]);
    }
    if (newFilters.search) {
      params.set('search', newFilters.search);
    }

    const queryString = params.toString();
    router.push(queryString ? `/?${queryString}` : '/');
  }, [router]);

  const categories = useMemo(() => [...new Set(products.map(p => p.category))], [products]);
  const brands = useMemo(() => [...new Set(products.map(p => p.brand))], [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = [...products];

    // Filter by search term
    if (filters.search) {
      tempProducts = tempProducts.filter(p =>
        p.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.category.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.brand.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by category
    if (filters.categories.length > 0) {
      tempProducts = tempProducts.filter(p => filters.categories.includes(p.category));
    }

    // Filter by price
    tempProducts = tempProducts.filter(p =>
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Filter by brand
    if (filters.brands.length > 0) {
      tempProducts = tempProducts.filter(p => filters.brands.includes(p.brand));
    }

    return tempProducts;
  }, [filters, products]);

  const handleFilterChange = useCallback((newFilters: Omit<Filters, 'search'>) => {
    const updatedFilters = { ...newFilters, search: filters.search };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  }, [filters.search, updateURL]);

  const handleSearchChange = useCallback((searchTerm: string) => {
    const updatedFilters = { ...filters, search: searchTerm };
    setFilters(updatedFilters);
    updateURL(updatedFilters);
  }, [filters, updateURL]);

  const handleAddToCart = useCallback((productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      dispatch({
        type: 'ADD_ITEM',
        payload: {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
      });
    }
  }, [products, dispatch]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Header
        searchTerm={filters.search}
        onSearchChange={handleSearchChange}
        cartItemCount={state.items.reduce((sum, item) => sum + item.quantity, 0)}
      />
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
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Product Listing</h2>
              <span className="text-gray-600">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </span>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center bg-white p-12 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  type="button"
                  onClick={() => {
                    setFilters({ categories: [], priceRange: { min: 0, max: 1000 }, brands: [], search: '' });
                    router.push('/');
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    imageUrl={product.image}
                    rating={product.rating}
                    productId={product.id}
                    onAddToCart={() => handleAddToCart(product.id)}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductListing;
