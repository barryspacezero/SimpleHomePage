import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  imageUrl: string;
  title: string;
  rating: number;
  price: number;
  onAddToCart: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, rating, price, onAddToCart }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="text-blue-500">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="text-gray-300">&#9733;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md">
      <div className="relative w-full h-48">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <div className="p-4">
        <div className="font-semibold text-gray-800 mb-1">{title}</div>
        <p className="text-gray-800 text-lg font-bold mb-3">${price.toFixed(0)}</p>
        <button
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
