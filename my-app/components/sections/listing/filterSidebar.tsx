import React, { useState, useEffect } from 'react';

interface FilterSidebarProps {
  categories: string[];
  brands: string[];
  onFilterChange: (filters: {
    categories: string[];
    priceRange: { min: number; max: number };
    brands: string[];
  }) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ categories, brands, onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      categories: selectedCategories,
      priceRange,
      brands: selectedBrands,
    });
  }, [selectedCategories, priceRange, selectedBrands]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = parseInt(e.target.value, 10);
    setPriceRange(prev => ({ ...prev, max: newMax }));
  };

  return (
    <aside className="w-full md:w-64 bg-blue-600 p-6 rounded-lg text-white">
      <h3 className="font-bold text-xl mb-6">Filters</h3>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              className="h-4 w-4 text-blue-300"
              defaultChecked
            />
            <span className="ml-3">All</span>
          </label>
          {categories.map(category => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                className="h-4 w-4 text-blue-300"
                onChange={() => handleCategoryChange(category)}
              />
              <span className="ml-3">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange.max}
          onChange={handlePriceChange}
          className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>{priceRange.min}</span>
          <span>{priceRange.max}</span>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
