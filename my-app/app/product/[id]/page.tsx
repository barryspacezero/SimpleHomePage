"use client";

import { useState, useEffect, use } from 'react';
import { useCart } from '@/contexts/CartContext';
import { ProductService, type Product } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Unwrap the params Promise
  const { id } = use(params);

  // Fetch product data when component mounts
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const productData = await ProductService.getProductById(id);
        setProduct(productData);
      } catch (err) {
        setError('Failed to load product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-white">Logo</Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center bg-white p-12 rounded-lg">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading product...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-white">Logo</Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center bg-white p-12 rounded-lg">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
            <p className="text-gray-600 mb-4">{error}</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Product not found
  if (!product) {
    return (
      <div className="bg-gray-100 min-h-screen">
        <header className="bg-blue-600 sticky top-0 z-10">
          <div className="container mx-auto px-6 py-4">
            <Link href="/" className="text-2xl font-bold text-white">Logo</Link>
          </div>
        </header>
        <div className="container mx-auto px-6 py-8">
          <div className="text-center bg-white p-12 rounded-lg">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product with ID &quot;{id}&quot; does not exist.</p>
            <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
              ← Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Mock additional images for carousel
  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
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
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-yellow-400">★</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">★</span>);
      }
    }
    return stars;
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-600 sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <Link href="/" className="text-2xl font-bold text-white">Logo</Link>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <nav className="mb-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800">Home</Link>
          <span className="mx-2 text-gray-500">/</span>
          <span className="text-gray-700">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="relative w-full h-96 bg-white rounded-lg overflow-hidden">
              <Image
                src={images[selectedImageIndex]}
                alt={product.name}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            <div className="flex space-x-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setSelectedImageIndex(index)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-blue-600' : 'border-gray-300'
                  }`}
                  aria-label={`View image ${index + 1}`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex">{renderStars(product.rating)}</div>
              <span className="ml-2 text-gray-600">({product.rating.toFixed(1)})</span>
            </div>

            <div className="text-3xl font-bold text-gray-800 mb-4">
              ${product.price.toFixed(2)}
            </div>

            <div className="mb-4">
              <span className="text-sm text-gray-600">Category: </span>
              <span className="text-sm font-medium text-blue-600">{product.category}</span>
            </div>

            <div className="mb-6">
              <span className="text-sm text-gray-600">Brand: </span>
              <span className="text-sm font-medium">{product.brand}</span>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Quantity
              </label>
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="text-lg font-medium w-8 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition duration-300 ease-in-out"
            >
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </button>
          </div>
        </div>

        <div className="mt-12 bg-white p-6 rounded-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">Customer Reviews</h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <div className="flex">{renderStars(5)}</div>
                <span className="ml-2 font-medium">John D.</span>
              </div>
              <p className="text-gray-700">Great product! Exactly as described and fast shipping.</p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <div className="flex">{renderStars(4)}</div>
                <span className="ml-2 font-medium">Sarah M.</span>
              </div>
              <p className="text-gray-700">Good quality, would recommend to others.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}