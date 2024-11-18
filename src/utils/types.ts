export interface QuestionData {
  question: string;
  possibleAnswers: string[];
  correctAnswer: string;
}

export interface Questions {
  [key: string]: QuestionData;
}

export interface FinalAnswers {
  [key: string]: string;
}

export interface IAnswersContext {
  answers: FinalAnswers;
  updateAnswers: (question: string, answer: string) => void;
}
