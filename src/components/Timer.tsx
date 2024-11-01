import React from 'react';
import { Timer as TimerIcon } from 'lucide-react';

interface TimerProps {
  timeLeft: number;
  onTimeUp: () => void;
  label?: string;
  variant?: 'primary' | 'secondary';
}

export const Timer: React.FC<TimerProps> = ({ 
  timeLeft, 
  onTimeUp, 
  label = '', 
  variant = 'primary' 
}) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const getVariantClasses = () => {
    if (variant === 'secondary') {
      return 'bg-gray-100 border border-gray-200';
    }
    return 'bg-white shadow-md';
  };

  return (
    <div className={`flex items-center gap-2 text-xl font-semibold ${getVariantClasses()} p-3 rounded-lg`}>
      <TimerIcon className={`w-5 h-5 ${variant === 'primary' ? 'text-blue-600' : 'text-gray-600'}`} />
      {label && <span className="text-sm text-gray-500 mr-1">{label}:</span>}
      <span className={`${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'} min-w-[4rem] text-base`}>
        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
      </span>
    </div>
  );
};