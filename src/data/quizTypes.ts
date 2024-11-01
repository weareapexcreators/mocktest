export type QuizType = 'gk' | 'history' | 'currentAffairs';

export const quizTypes = [
  { id: 'gk', name: 'General Knowledge', icon: '🧠' },
  { id: 'history', name: 'History', icon: '📚' },
  { id: 'currentAffairs', name: 'Current Affairs', icon: '📰' },
] as const;