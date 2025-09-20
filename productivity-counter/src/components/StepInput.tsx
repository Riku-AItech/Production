import React from 'react';
import type { Category } from './CategorySelector';

interface StepInputProps {
  steps: number;
  onStepsChange: (steps: number) => void;
  category: Category;
}

const StepInput: React.FC<StepInputProps> = ({ steps, onStepsChange, category }) => {
  const isImplementationCategory = category === '実装';

  return (
    <div className="mb-6">
      <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Step数
      </label>
      <div className="relative">
        <input
          type="number"
          min="0"
          value={steps}
          onChange={(e) => onStepsChange(parseInt(e.target.value) || 0)}
          disabled={!isImplementationCategory}
          className={`
            w-full px-4 py-3 border-2 rounded-xl shadow-sm transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500
            ${!isImplementationCategory 
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed border-gray-200' 
              : 'bg-white border-gray-300 hover:border-gray-400 focus:bg-blue-50'
            }
          `}
          placeholder={isImplementationCategory ? "Step数を入力してください" : "実装カテゴリでのみ入力可能"}
        />
        {isImplementationCategory && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
          </div>
        )}
      </div>
      {!isImplementationCategory && (
        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-700 flex items-center">
            <svg className="w-4 h-4 mr-2 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            Step数の入力は「実装」カテゴリでのみ有効です
          </p>
        </div>
      )}
    </div>
  );
};

export default StepInput;