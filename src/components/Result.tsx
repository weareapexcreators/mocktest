import React from 'react';
import { Trophy, XCircle, CheckCircle, Home } from 'lucide-react';
import type { Question } from '../data/questions';

interface ResultProps {
  questions: Question[];
  userAnswers: (number | null)[];
  onRetry: () => void;
  onHome: () => void;
}

export const Result: React.FC<ResultProps> = ({ 
  questions, 
  userAnswers, 
  onRetry,
  onHome
}) => {
  const correctAnswers = questions.reduce(
    (sum, question, index) => 
      sum + (question.correctAnswer === userAnswers[index] ? 1 : 0),
    0
  );

  const percentage = (correctAnswers / questions.length) * 100;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl w-full">
      <div className="text-center mb-8">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Assessment Complete!</h2>
        <p className="text-lg text-gray-600">
          You scored {correctAnswers} out of {questions.length} ({percentage.toFixed(1)}%)
        </p>
      </div>

      <div className="space-y-4 mb-8">
        {questions.map((question, index) => (
          <div key={index} className="border-b pb-4">
            <div className="flex items-start gap-3">
              {userAnswers[index] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
              )}
              <div>
                <p className="font-medium text-gray-800">{question.question}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Correct answer: {question.options[question.correctAnswer]}
                </p>
                {userAnswers[index] !== null && userAnswers[index] !== question.correctAnswer && (
                  <p className="text-sm text-red-500 mt-1">
                    Your answer: {question.options[userAnswers[index]]}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onHome}
          className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </button>
        <button
          onClick={onRetry}
          className="flex-1 bg-blue-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};