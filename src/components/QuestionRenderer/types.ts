export type QuestionType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox'

export interface QuestionOption {
  label: string
  value: string
}

export interface ValidationRules {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
}

export interface Question {
  id: string
  label: string
  type: QuestionType
  placeholder?: string
  options?: QuestionOption[]
  validation?: ValidationRules
}

export type AnswerValue = string | string[]
export type Answers = Record<string, AnswerValue>
export type Errors = Record<string, string>

export interface QuestionRendererProps {
  questions: Question[]
  onSubmit: (answers: Answers) => void
  allowPasting?: boolean
}
