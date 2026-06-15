import { useState, useCallback } from 'react'
import type { Question, QuestionRendererProps, Answers } from './types'
import { validateAnswers, buildInitialAnswers } from './validation'
import './QuestionRenderer.css'

export function QuestionRenderer({ questions, onSubmit, allowPasting = true }: QuestionRendererProps) {
  const [answers, setAnswers] = useState<Answers>(() => buildInitialAnswers(questions))
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const currentErrors = validateAnswers(questions, answers)
  const isFormValid = Object.keys(currentErrors).length === 0

  const handleStringChange = useCallback((id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }))
  }, [])

  const handleCheckboxChange = useCallback((id: string, value: string, checked: boolean) => {
    setAnswers(prev => {
      const current = (prev[id] as string[]) ?? []
      const updated = checked
        ? [...current, value]
        : current.filter(v => v !== value)
      return { ...prev, [id]: updated }
    })
  }, [])

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      if (!allowPasting) {
        e.preventDefault()
      }
    },
    [allowPasting]
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validateAnswers(questions, answers)
    setErrors(validationErrors)
    setSubmitted(true)

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(answers)
    }
  }

  // Show errors live after first submit attempt
  const displayErrors = submitted ? currentErrors : errors

  function renderQuestion(question: Question) {
    const { id, label, type, placeholder, options, validation } = question
    const error = displayErrors[id]
    const hasError = Boolean(error)
    const errorId = `${id}-error`

    switch (type) {
      case 'text':
        return (
          <div className="qr-field" key={id}>
            <label className="qr-label" htmlFor={id}>
              {label}
              {validation?.required && <span className="qr-required" aria-hidden="true"> *</span>}
            </label>
            <input
              id={id}
              type="text"
              className={`qr-input ${hasError ? 'qr-input--error' : ''}`}
              value={(answers[id] as string) ?? ''}
              placeholder={placeholder}
              onChange={e => handleStringChange(id, e.target.value)}
              onPaste={handlePaste}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            />
            {hasError && (
              <span id={errorId} className="qr-error" role="alert">
                {error}
              </span>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div className="qr-field" key={id}>
            <label className="qr-label" htmlFor={id}>
              {label}
              {validation?.required && <span className="qr-required" aria-hidden="true"> *</span>}
            </label>
            <textarea
              id={id}
              className={`qr-textarea ${hasError ? 'qr-input--error' : ''}`}
              value={(answers[id] as string) ?? ''}
              placeholder={placeholder}
              onChange={e => handleStringChange(id, e.target.value)}
              onPaste={handlePaste}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            />
            {hasError && (
              <span id={errorId} className="qr-error" role="alert">
                {error}
              </span>
            )}
          </div>
        )

      case 'select':
        return (
          <div className="qr-field" key={id}>
            <label className="qr-label" htmlFor={id}>
              {label}
              {validation?.required && <span className="qr-required" aria-hidden="true"> *</span>}
            </label>
            <select
              id={id}
              className={`qr-select ${hasError ? 'qr-input--error' : ''}`}
              value={(answers[id] as string) ?? ''}
              onChange={e => handleStringChange(id, e.target.value)}
              aria-invalid={hasError}
              aria-describedby={hasError ? errorId : undefined}
            >
              <option value="">-- Select an option --</option>
              {options?.map(opt => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {hasError && (
              <span id={errorId} className="qr-error" role="alert">
                {error}
              </span>
            )}
          </div>
        )

      case 'radio':
        return (
          <div className="qr-field" key={id}>
            <fieldset className="qr-fieldset" aria-describedby={hasError ? errorId : undefined}>
              <legend className="qr-legend">
                {label}
                {validation?.required && <span className="qr-required" aria-hidden="true"> *</span>}
              </legend>
              <div className="qr-options">
                {options?.map(opt => (
                  <label key={opt.value} className="qr-option-label">
                    <input
                      type="radio"
                      name={id}
                      value={opt.value}
                      checked={(answers[id] as string) === opt.value}
                      onChange={e => handleStringChange(id, e.target.value)}
                      aria-invalid={hasError}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {hasError && (
                <span id={errorId} className="qr-error" role="alert">
                  {error}
                </span>
              )}
            </fieldset>
          </div>
        )

      case 'checkbox':
        return (
          <div className="qr-field" key={id}>
            <fieldset className="qr-fieldset" aria-describedby={hasError ? errorId : undefined}>
              <legend className="qr-legend">
                {label}
                {validation?.required && <span className="qr-required" aria-hidden="true"> *</span>}
              </legend>
              <div className="qr-options">
                {options?.map(opt => (
                  <label key={opt.value} className="qr-option-label">
                    <input
                      type="checkbox"
                      value={opt.value}
                      checked={((answers[id] as string[]) ?? []).includes(opt.value)}
                      onChange={e => handleCheckboxChange(id, opt.value, e.target.checked)}
                      aria-invalid={hasError}
                    />
                    <span>{opt.label}</span>
                  </label>
                ))}
              </div>
              {hasError && (
                <span id={errorId} className="qr-error" role="alert">
                  {error}
                </span>
              )}
            </fieldset>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <form className="qr-form" onSubmit={handleSubmit} noValidate>
      {questions.map(q => renderQuestion(q))}

      <div className="qr-submit-row">
        <button
          type="submit"
          className="qr-submit"
          disabled={submitted && !isFormValid}
        >
          Submit
        </button>
        {submitted && !isFormValid && (
          <p className="qr-submit-hint">Please fix the errors above before submitting.</p>
        )}
      </div>
    </form>
  )
}
