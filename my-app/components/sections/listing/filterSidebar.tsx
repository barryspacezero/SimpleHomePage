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
  }, [selectedCategories, priceRange, selectedBrands, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [category] // Only allow one category at a time for radio behavior
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

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange({ min: 0, max: 1000 });
    setSelectedBrands([]);
  };

  return (
    <aside className="w-full md:w-64 bg-blue-600 p-6 rounded-lg text-white">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-xl">Filters</h3>
        <button
          type="button"
          onClick={clearAllFilters}
          className="text-blue-200 hover:text-white text-sm"
        >
          Clear All
        </button>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Category</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              className="h-4 w-4 text-blue-300"
              checked={selectedCategories.length === 0}
              onChange={() => setSelectedCategories([])}
              aria-label="All categories"
            />
            <span className="ml-3">All</span>
          </label>
          {categories.map(category => (
            <label key={category} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                className="h-4 w-4 text-blue-300"
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
                aria-label={`Filter by ${category}`}
              />
              <span className="ml-3">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-semibold mb-3">Price Range</h4>
        <input
          type="range"
          min="0"
          max="1000"
          value={priceRange.max}
          onChange={handlePriceChange}
          className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
          aria-label="Maximum price filter"
        />
        <div className="flex justify-between text-sm mt-2">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Brand</h4>
        <div className="space-y-2">
          {brands.map(brand => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-blue-300 text-blue-300 focus:ring-blue-300"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                aria-label={`Filter by ${brand} brand`}
              />
              <span className="ml-3">{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
