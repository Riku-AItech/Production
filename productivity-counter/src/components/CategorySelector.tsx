import React from 'react';

export type Category = '実装' | 'プロンプト設計' | 'その他';

interface CategorySelectorProps {
  selectedCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  const categories: Category[] = ['実装', 'プロンプト設計', 'その他'];

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <svg className="w-4 h-4 mr-2 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
        カテゴリ
      </label>
      <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-3 sm:space-y-0">
        {categories.map((category) => (
          <label key={category} className="flex items-center group cursor-pointer">
            <div className="relative">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={(e) => onCategoryChange(e.target.value as Category)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 cursor-pointer"
              />
              {selectedCategory === category && (
                <div className="absolute inset-0 bg-indigo-600 rounded-full animate-pulse opacity-25"></div>
              )}
            </div>
            <span className={`ml-3 text-sm font-medium transition-colors duration-200 ${
              selectedCategory === category 
                ? 'text-indigo-700 font-semibold' 
                : 'text-gray-700 group-hover:text-indigo-600'
            }`}>
              {category}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;