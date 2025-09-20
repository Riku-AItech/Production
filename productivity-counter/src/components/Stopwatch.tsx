import React, { useState, useEffect } from 'react';

interface StopwatchProps {
  onSave?: (elapsedTime: number) => void;
}

const Stopwatch: React.FC<StopwatchProps> = ({ onSave }) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0); // 経過時間（秒単位）
  const [isRunning, setIsRunning] = useState<boolean>(false); // ストップウォッチの動作状態

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | undefined;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime: number) => prevTime + 1);
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const formatTime = (time: number) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSave = () => {
    if (onSave && elapsedTime > 0) {
      onSave(elapsedTime);
      setElapsedTime(0);
      setIsRunning(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-white to-gray-50 shadow-xl rounded-2xl p-8 mb-6 border border-gray-100">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center">
        <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        ストップウォッチ
      </h2>
      <div className="text-center">
        <div className="text-6xl font-mono font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-8 tracking-wider">
          {formatTime(elapsedTime)}
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => setIsRunning(true)}
            disabled={isRunning}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8 5v10l7-5z"/>
              </svg>
              Start
            </span>
          </button>
          <button
            onClick={() => setIsRunning(false)}
            disabled={!isRunning}
            className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"/>
              </svg>
              Stop
            </span>
          </button>
          <button
            onClick={() => setElapsedTime(0)}
            className="px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </span>
          </button>
          <button
            onClick={handleSave}
            disabled={elapsedTime === 0}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-semibold"
          >
            <span className="flex items-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              記録
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stopwatch;