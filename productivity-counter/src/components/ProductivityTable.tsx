import React from 'react';
import type { ProductivityRecord } from '../utils/productivity';

interface ProductivityTableProps {
  records: ProductivityRecord[];
}

const ProductivityTable: React.FC<ProductivityTableProps> = ({ records }) => {
  if (records.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
          <svg className="w-6 h-6 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          生産性記録
        </h2>
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500 text-lg">まだ記録がありません</p>
          <p className="text-gray-400 text-sm mt-2">ストップウォッチで時間を計測して記録ボタンを押してください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
        <svg className="w-6 h-6 mr-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        生産性記録
        <span className="ml-3 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
          {records.length}件
        </span>
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tl-xl">
                No
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                カテゴリ
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                時間(H)
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">
                Step数
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider rounded-tr-xl">
                SLOC (Step/H)
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {records.map((record, index) => (
              <tr key={record.id} className={`transition-colors duration-200 hover:bg-blue-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">
                    {index + 1}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                    record.category === '実装' ? 'bg-green-100 text-green-800' :
                    record.category === 'プロンプト設計' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {record.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900 bg-gray-50 rounded">
                  {record.timeInHours.toFixed(3)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {record.category === '実装' ? (
                    <span className="inline-flex items-center">
                      <svg className="w-4 h-4 mr-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      {record.steps}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold">
                  {record.sloc !== null ? (
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 rounded-full">
                      {record.sloc.toFixed(1)}
                    </span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductivityTable;