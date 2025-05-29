'use client';

import { useState, useEffect } from 'react';

interface InfoBarProps {
  totalNotes: number;
  editedNotes: number;
}

export default function InfoBar({ totalNotes, editedNotes }: InfoBarProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  // Update time every second
  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };
    
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-white/80 backdrop-blur-sm shadow-lg rounded-xl p-4 mb-8">
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="flex flex-col">
          <span className="text-2xl font-semibold">{currentTime}</span>
          <span className="text-sm text-gray-600">{currentDate}</span>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600">Total Notes</span>
            <span className="text-2xl font-semibold">{totalNotes}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600">Saved Notes</span>
            <span className="text-2xl font-semibold">{editedNotes}</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-sm text-gray-600">Unsaved</span>
            <span className="text-2xl font-semibold">{totalNotes - editedNotes}</span>
          </div>
        </div>
      </div>
    </div>
  );
} 