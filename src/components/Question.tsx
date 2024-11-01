import React from 'react';
import type { Question } from '../data/questions';

interface QuestionProps {
  question: Question;
  selectedAnswer: number | null;
  onSelectAnswer: (answerId: number) => void;
}

export const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  selectedAnswer,
  onSelectAnswer,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {question.question}
      </h2>
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onSelectAnswer(index)}
            className={`w-full text-left p-3 rounded-lg transition-all ${
              selectedAnswer === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};