import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { QuestionRenderer } from './QuestionRenderer'
import type { Question } from './types'

// ── Fixtures ─────────────────────────────────────────────────────────────────

const textQuestion: Question[] = [
  {
    id: 'fullName',
    label: 'Full Name',
    type: 'text',
    validation: { required: true, minLength: 3 },
  },
]

const textareaQuestion: Question[] = [
  {
    id: 'bio',
    label: 'Short Bio',
    type: 'textarea',
    validation: { required: true, minLength: 10 },
  },
]

const selectQuestion: Question[] = [
  {
    id: 'country',
    label: 'Country',
    type: 'select',
    options: [
      { label: 'Kenya', value: 'ke' },
      { label: 'Nigeria', value: 'ng' },
      { label: 'Ghana', value: 'gh' },
    ],
    validation: { required: true },
  },
]

const radioQuestion: Question[] = [
  {
    id: 'track',
    label: 'Learning Track',
    type: 'radio',
    options: [
      { label: 'Frontend', value: 'frontend' },
      { label: 'Backend', value: 'backend' },
      { label: 'Full Stack', value: 'fullstack' },
    ],
    validation: { required: true },
  },
]

const checkboxQuestion: Question[] = [
  {
    id: 'skills',
    label: 'Skills',
    type: 'checkbox',
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
    ],
    validation: { required: true },
  },
]

const allQuestions: Question[] = [
  ...textQuestion,
  ...textareaQuestion,
  ...selectQuestion,
  ...radioQuestion,
  ...checkboxQuestion,
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function submitButton() {
  return screen.getByRole('button', { name: /submit/i })
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('QuestionRenderer — rendering', () => {
  it('1. renders text questions correctly', () => {
    render(<QuestionRenderer questions={textQuestion} onSubmit={vi.fn()} />)
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /full name/i })).toHaveAttribute('type', 'text')
  })

  it('2. renders textarea questions correctly', () => {
    render(<QuestionRenderer questions={textareaQuestion} onSubmit={vi.fn()} />)
    const ta = screen.getByLabelText(/short bio/i)
    expect(ta.tagName.toLowerCase()).toBe('textarea')
  })

  it('3. renders select with all options', () => {
    render(<QuestionRenderer questions={selectQuestion} onSubmit={vi.fn()} />)
    expect(screen.getByRole('combobox', { name: /country/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /kenya/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /nigeria/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /ghana/i })).toBeInTheDocument()
  })

  it('4. renders radio questions with all options', () => {
    render(<QuestionRenderer questions={radioQuestion} onSubmit={vi.fn()} />)
    expect(screen.getByRole('radio', { name: /frontend/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /backend/i })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: /full stack/i })).toBeInTheDocument()
  })

  it('5. renders checkbox questions with all options', () => {
    render(<QuestionRenderer questions={checkboxQuestion} onSubmit={vi.fn()} />)
    expect(screen.getByRole('checkbox', { name: /html/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /css/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /javascript/i })).toBeInTheDocument()
  })
})

describe('QuestionRenderer — submit disabled when invalid', () => {
  it('6. blocks submission when required text input is empty', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={textQuestion} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    expect(submitButton()).toBeDisabled()
  })

  it('7. blocks submission when required textarea is empty', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={textareaQuestion} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    expect(submitButton()).toBeDisabled()
  })

  it('8. blocks submission when required select has no value', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={selectQuestion} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    expect(submitButton()).toBeDisabled()
  })

  it('9. blocks submission when required radio has no selection', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={radioQuestion} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    expect(submitButton()).toBeDisabled()
  })

  it('10. blocks submission when required checkbox has no selection', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={checkboxQuestion} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    expect(submitButton()).toBeDisabled()
  })
})

describe('QuestionRenderer — error messages', () => {
  it('11. shows error messages for invalid fields after submit', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={allQuestions} onSubmit={vi.fn()} />)
    await user.click(submitButton())
    const errors = screen.getAllByRole('alert')
    expect(errors.length).toBeGreaterThan(0)
  })
})

describe('QuestionRenderer — submit enabled when valid', () => {
  it('12. enables submit when all required fields are filled correctly', async () => {
    const user = userEvent.setup()
    render(<QuestionRenderer questions={allQuestions} onSubmit={vi.fn()} />)

    // Text
    await user.type(screen.getByLabelText(/full name/i), 'Lennox Omondi')
    // Textarea
    await user.type(screen.getByLabelText(/short bio/i), 'I am a developer from Nairobi Kenya.')
    // Select
    await user.selectOptions(screen.getByRole('combobox', { name: /country/i }), 'ke')
    // Radio
    await user.click(screen.getByRole('radio', { name: /frontend/i }))
    // Checkbox
    await user.click(screen.getByRole('checkbox', { name: /html/i }))

    // Click submit once to trigger the disabled logic
    await user.click(submitButton())
    // After valid submit, button should not be disabled (form resets or stays enabled)
    expect(submitButton()).not.toBeDisabled()
  })
})

describe('QuestionRenderer — submitted answer types', () => {
  it('13. submits text, textarea, select, and radio answers as strings', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    const questions: Question[] = [
      { id: 'name', label: 'Name', type: 'text', validation: { required: true } },
      { id: 'note', label: 'Note', type: 'textarea', validation: { required: true } },
      {
        id: 'country',
        label: 'Country',
        type: 'select',
        options: [{ label: 'Kenya', value: 'ke' }],
        validation: { required: true },
      },
      {
        id: 'track',
        label: 'Track',
        type: 'radio',
        options: [{ label: 'Frontend', value: 'frontend' }],
        validation: { required: true },
      },
    ]
    render(<QuestionRenderer questions={questions} onSubmit={onSubmit} />)

    await user.type(screen.getByLabelText(/^name/i), 'Gilbert')
    await user.type(screen.getByLabelText(/note/i), 'Hello world!')
    await user.selectOptions(screen.getByRole('combobox', { name: /country/i }), 'ke')
    await user.click(screen.getByRole('radio', { name: /frontend/i }))
    await user.click(submitButton())

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: expect.any(String),
        note: expect.any(String),
        country: expect.any(String),
        track: expect.any(String),
      })
    )

    const args = onSubmit.mock.calls[0][0]
    expect(typeof args.name).toBe('string')
    expect(typeof args.note).toBe('string')
    expect(typeof args.country).toBe('string')
    expect(typeof args.track).toBe('string')
  })

  it('14. submits checkbox answers as an array', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()
    render(<QuestionRenderer questions={checkboxQuestion} onSubmit={onSubmit} />)

    await user.click(screen.getByRole('checkbox', { name: /html/i }))
    await user.click(screen.getByRole('checkbox', { name: /css/i }))
    await user.click(submitButton())

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        skills: expect.arrayContaining(['html', 'css']),
      })
    )

    const args = onSubmit.mock.calls[0][0]
    expect(Array.isArray(args.skills)).toBe(true)
  })
})

describe('QuestionRenderer — paste control', () => {
  it('15. blocks paste into text input when allowPasting is false', async () => {
    const user = userEvent.setup()
    render(
      <QuestionRenderer questions={textQuestion} onSubmit={vi.fn()} allowPasting={false} />
    )
    const input = screen.getByLabelText(/full name/i) as HTMLInputElement
    await user.click(input)
    await user.paste('pasted text')
    expect(input.value).toBe('')
  })

  it('16. blocks paste into textarea when allowPasting is false', async () => {
    const user = userEvent.setup()
    render(
      <QuestionRenderer questions={textareaQuestion} onSubmit={vi.fn()} allowPasting={false} />
    )
    const ta = screen.getByLabelText(/short bio/i) as HTMLTextAreaElement
    await user.click(ta)
    await user.paste('pasted text')
    expect(ta.value).toBe('')
  })

  it('17. allows paste into text and textarea when allowPasting is true', async () => {
    const user = userEvent.setup()
    const questions: Question[] = [
      { id: 'name', label: 'Name', type: 'text' },
      { id: 'bio', label: 'Bio', type: 'textarea' },
    ]
    render(
      <QuestionRenderer questions={questions} onSubmit={vi.fn()} allowPasting={true} />
    )

    const input = screen.getByLabelText(/^name/i) as HTMLInputElement
    await user.click(input)
    await user.paste('pasted into input')
    expect(input.value).toBe('pasted into input')

    const ta = screen.getByLabelText(/bio/i) as HTMLTextAreaElement
    await user.click(ta)
    await user.paste('pasted into textarea')
    expect(ta.value).toBe('pasted into textarea')
  })
})
