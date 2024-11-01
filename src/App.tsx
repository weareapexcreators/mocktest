import React, { useState, useEffect } from 'react';
import { Brain } from 'lucide-react';
import { questions } from './data/questions';
import { historyQuestions } from './data/historyQuestions';
import { currentAffairsQuestions } from './data/currentAffairsQuestions';
import { Timer } from './components/Timer';
import { QuestionComponent } from './components/Question';
import { Result } from './components/Result';
import { StartScreen } from './components/StartScreen';
import type { QuizType } from './data/quizTypes';

function App() {
  const [quizType, setQuizType] = useState<QuizType | null>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(30);
  const [totalTimeLeft, setTotalTimeLeft] = useState(300); // 5 minutes in seconds
  const [examComplete, setExamComplete] = useState(false);

  const getQuestions = () => {
    switch (quizType) {
      case 'history':
        return historyQuestions;
      case 'currentAffairs':
        return currentAffairsQuestions;
      default:
        return questions;
    }
  };

  const currentQuestions = getQuestions();

  useEffect(() => {
    if (isStarted && !examComplete) {
      // Question timer
      const questionTimer = setInterval(() => {
        setQuestionTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentQuestion < currentQuestions.length - 1) {
              setCurrentQuestion((prev) => prev + 1);
              return 30;
            } else {
              handleSubmit();
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);

      // Total quiz timer
      const totalTimer = setInterval(() => {
        setTotalTimeLeft((prev) => {
          if (prev <= 1) {
            handleSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => {
        clearInterval(questionTimer);
        clearInterval(totalTimer);
      };
    }
  }, [isStarted, examComplete, currentQuestion, currentQuestions.length]);

  const handleStart = (type: QuizType) => {
    setQuizType(type);
    setIsStarted(true);
    setQuestionTimeLeft(30);
    setTotalTimeLeft(300);
    setUserAnswers(new Array(currentQuestions.length).fill(null));
  };

  const handleAnswer = (answerId: number) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = answerId;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < currentQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setQuestionTimeLeft(30);
    } else {
      handleSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setQuestionTimeLeft(30);
    }
  };

  const handleSubmit = () => {
    setExamComplete(true);
  };

  const handleRetry = () => {
    setQuizType(null);
    setCurrentQuestion(0);
    setUserAnswers([]);
    setQuestionTimeLeft(30);
    setTotalTimeLeft(300);
    setExamComplete(false);
    setIsStarted(false);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center py-8 px-4">
        <StartScreen onStart={handleStart} />
      </div>
    );
  }

  if (examComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-8 px-4">
        <Result
          questions={currentQuestions}
          userAnswers={userAnswers}
          onRetry={handleRetry}
          onHome={() => handleRetry()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center py-8 px-4">
      <div className="w-full max-w-2xl mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Brain className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Knowledge Assessment
            </h1>
          </div>
          <div className="flex gap-4">
            <Timer
              timeLeft={questionTimeLeft}
              onTimeUp={() => {}}
              label="Question"
            />
            <Timer
              timeLeft={totalTimeLeft}
              onTimeUp={() => {}}
              label="Total"
              variant="secondary"
            />
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4 shadow-md">
          <div className="flex justify-between text-sm text-gray-600">
            <span>
              Question {currentQuestion + 1} of {currentQuestions.length}
            </span>
            <span>{userAnswers.filter((a) => a !== null).length} answered</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) / currentQuestions.length) * 100
                }%`,
              }}
            />
          </div>
        </div>

        <QuestionComponent
          question={currentQuestions[currentQuestion]}
          selectedAnswer={userAnswers[currentQuestion]}
          onSelectAnswer={handleAnswer}
        />

        <div className="flex justify-between w-full mt-6">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className={`px-6 py-2 rounded-lg font-semibold ${
              currentQuestion === 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600"
          >
            {currentQuestion === currentQuestions.length - 1
              ? 'Submit'
              : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
