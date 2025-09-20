import React, { useState, useEffect } from 'react';
import Stopwatch from './Stopwatch';
import CategorySelector from './CategorySelector';
import StepInput from './StepInput';
import ProductivityTable from './ProductivityTable';
import type { Category } from './CategorySelector';
import type { ProductivityRecord } from '../utils/productivity';
import { createProductivityRecord } from '../utils/productivity';
import { saveRecordsToStorage, loadRecordsFromStorage } from '../utils/storage';

const ProductivityCounter: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('実装');
  const [steps, setSteps] = useState<number>(0);
  const [records, setRecords] = useState<ProductivityRecord[]>([]);
  const [nextId, setNextId] = useState<number>(1);

  // Load records from localStorage on component mount
  useEffect(() => {
    const savedRecords = loadRecordsFromStorage();
    if (savedRecords.length > 0) {
      setRecords(savedRecords);
      const maxId = Math.max(...savedRecords.map(r => r.id));
      setNextId(maxId + 1);
    }
  }, []);

  // Save records to localStorage whenever records change
  useEffect(() => {
    if (records.length > 0) {
      saveRecordsToStorage(records);
    }
  }, [records]);

  const handleSaveRecord = (elapsedTime: number) => {
    const newRecord = createProductivityRecord(nextId, selectedCategory, elapsedTime, steps);
    setRecords(prev => [...prev, newRecord]);
    setNextId(prev => prev + 1);
    // Reset form
    setSteps(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-6">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-800 to-gray-600 mb-4">
            生産性カウンターツール
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            作業時間とStep数から生産性(SLOC)を可視化し、<br className="hidden sm:block" />
            効率的な開発プロセスをサポートします
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <Stopwatch onSave={handleSaveRecord} />
            
            <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-3 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                設定
              </h2>
              <CategorySelector
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
              <StepInput
                steps={steps}
                onStepsChange={setSteps}
                category={selectedCategory}
              />
            </div>
          </div>

          <div>
            <ProductivityTable records={records} />
          </div>
        </div>

        <footer className="text-center text-gray-500 text-sm">
          <p>© 2025 生産性カウンターツール - 開発効率の可視化をサポート</p>
        </footer>
      </div>
    </div>
  );
};

export default ProductivityCounter;