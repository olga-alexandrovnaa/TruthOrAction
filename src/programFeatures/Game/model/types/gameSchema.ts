export interface GameSchema {
  questions: {text: string; used: boolean}[];
  actions: {text: string; used: boolean}[];
  error?: boolean;
  isLoading: boolean;
  currentText: string;
  currentTaskType: 'question' | 'action';
}
