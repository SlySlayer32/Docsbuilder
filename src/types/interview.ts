export interface SelectionOption {
  id: string;
  label: string;
  icon?: string;
  description?: string;
}

export interface Question {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple';
  options: SelectionOption[];
  allowDetails?: boolean;
}

export interface Section {
  id: string;
  title: string;
  icon: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  selectedOptions: string[];
  details?: string;
}

export interface Project {
  id: string;
  name: string;
  template?: string;
  answers: Answer[];
  createdAt: string;
  updatedAt: string;
}

export interface DocFile {
  path: string;
  content: string;
}
