import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  price: number;
  productId: string;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, rating, price, productId, onAddToCart }) => {
  const renderStars = () => {
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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
      <Link href={`/product/${productId}`}>
        <div className="relative w-full h-48 cursor-pointer">
          <Image 
            src={imageUrl} 
            alt={title} 
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${productId}`}>
          <div className="font-semibold text-gray-800 mb-2 hover:text-blue-600 cursor-pointer">{title}</div>
        </Link>
        <div className="flex items-center mb-2">
          {renderStars()}
          <span className="text-gray-500 text-sm ml-2">({rating.toFixed(1)})</span>
        </div>
        <p className="text-gray-800 text-lg font-bold mb-3">${price.toFixed(0)}</p>
        <button
          type="button"
          onClick={onAddToCart}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-300 ease-in-out"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
