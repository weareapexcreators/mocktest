import React from 'react';
import { Brain, Timer, CheckCircle, Award, Rocket } from 'lucide-react';
import { quizTypes } from '../data/quizTypes';
import type { QuizType } from '../data/quizTypes';

interface StartScreenProps {
  onStart: (quizType: QuizType) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
      <div className="text-center mb-12">
        <div className="relative inline-block">
          <Brain className="w-20 h-20 text-blue-600 mb-6" />
          <div className="absolute -top-2 -right-2 bg-yellow-400 rounded-full p-2">
            <Award className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Professional Knowledge Assessment</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Test your expertise across various domains with our comprehensive assessment platform.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {quizTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => onStart(type.id)}
            className="group relative flex flex-col items-center p-8 bg-gray-50 rounded-xl hover:bg-blue-50 transition-all duration-300 border-2 border-gray-200 hover:border-blue-500"
          >
            <div className="absolute top-4 right-4">
              <Rocket className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-5xl mb-4">{type.icon}</span>
            <h2 className="text-xl font-bold text-gray-800 mb-3">{type.name}</h2>
            
            <div className="mt-4 space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>10 Comprehensive Questions</span>
              </div>
              <div className="flex items-center gap-2">
                <Timer className="w-4 h-4 text-blue-500" />
                <span>5 Minutes Total Duration</span>
              </div>
            </div>

            <div className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              Start Assessment
            </div>
          </button>
        ))}
      </div>

      <div className="text-center text-gray-600 border-t pt-8">
        <h3 className="font-semibold mb-2">Assessment Guidelines</h3>
        <ul className="text-sm space-y-1">
          <li>• Each question has a 30-second time limit</li>
          <li>• Total assessment duration: 5 minutes</li>
          <li>• No negative marking</li>
          <li>• Results provided immediately upon completion</li>
        </ul>
      </div>
    </div>
  );
};