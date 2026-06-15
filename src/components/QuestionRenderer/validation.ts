import type { Question, Answers, Errors } from './types'

export function validateAnswers(questions: Question[], answers: Answers): Errors {
  const errors: Errors = {}

  for (const question of questions) {
    const rules = question.validation
    if (!rules) continue

    const value = answers[question.id]

    // Checkbox: value is string[]
    if (question.type === 'checkbox') {
      const arr = (value as string[]) ?? []
      if (rules.required && arr.length === 0) {
        errors[question.id] = 'Please select at least one option.'
      }
      continue
    }

    // All other types: value is string
    const str = (value as string) ?? ''

    if (rules.required && str.trim() === '') {
      errors[question.id] = 'This field is required.'
      continue
    }

    if (str.trim() === '') continue // no further checks on empty optional fields

    if (rules.minLength !== undefined && str.length < rules.minLength) {
      errors[question.id] = `Must be at least ${rules.minLength} characters.`
      continue
    }

    if (rules.maxLength !== undefined && str.length > rules.maxLength) {
      errors[question.id] = `Must be no more than ${rules.maxLength} characters.`
      continue
    }

    if (rules.pattern !== undefined) {
      const regex = new RegExp(rules.pattern)
      if (!regex.test(str)) {
        errors[question.id] = 'Please match the required format.'
        continue
      }
    }
  }

  return errors
}

export function buildInitialAnswers(questions: Question[]): Record<string, string | string[]> {
  const answers: Record<string, string | string[]> = {}
  for (const q of questions) {
    answers[q.id] = q.type === 'checkbox' ? [] : ''
  }
  return answers
}
