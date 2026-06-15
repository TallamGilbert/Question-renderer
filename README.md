# QuestionRenderer

A reusable, accessible React component that renders dynamic forms from a data array. Supports validation, error messages, paste control, and multiple question types.

---

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Running tests

```bash
npm test            # run once
npm run test:watch  # watch mode
```

All 17 required tests are in `src/components/QuestionRenderer/QuestionRenderer.test.tsx`.

---

## Example question data

```ts
const questions: Question[] = [
  {
    id: 'fullName',
    label: 'Full Name',
    type: 'text',
    placeholder: 'e.g. Lennox Omondi',
    validation: { required: true, minLength: 3, maxLength: 80 },
  },
  {
    id: 'motivation',
    label: 'Why do you want to join?',
    type: 'textarea',
    validation: { required: true, minLength: 50 },
  },
  {
    id: 'educationLevel',
    label: 'Highest Education Level',
    type: 'select',
    options: [
      { label: "Bachelor's Degree", value: 'bachelors' },
      { label: "Master's Degree", value: 'masters' },
    ],
    validation: { required: true },
  },
  {
    id: 'preferredTrack',
    label: 'Preferred Track',
    type: 'radio',
    options: [
      { label: 'Full Stack', value: 'fullstack' },
      { label: 'Frontend', value: 'frontend' },
    ],
    validation: { required: true },
  },
  {
    id: 'skills',
    label: 'Skills You Already Have',
    type: 'checkbox',
    options: [
      { label: 'HTML', value: 'html' },
      { label: 'CSS', value: 'css' },
      { label: 'JavaScript', value: 'javascript' },
    ],
    validation: { required: true },
  },
]
```

Usage:

```tsx
<QuestionRenderer
  questions={questions}
  onSubmit={(answers) => console.log(answers)}
  allowPasting={true}
/>
```

---

## Question types

| Type       | Renders                                   | Answer type |
|------------|-------------------------------------------|-------------|
| `text`     | `<input type="text" />`                   | `string`    |
| `textarea` | `<textarea />`                            | `string`    |
| `select`   | `<select />` with `<option />` elements   | `string`    |
| `radio`    | One `<input type="radio" />` per option   | `string`    |
| `checkbox` | One `<input type="checkbox" />` per option| `string[]`  |

Every question accepts an optional `validation` object:

```ts
validation?: {
  required?: boolean
  minLength?: number   // text and textarea only
  maxLength?: number   // text and textarea only
  pattern?: string     // regex string, text and textarea only
}
```

---

## How allowPasting works

The `allowPasting` prop (boolean, default `true`) controls whether users can paste into `text` and `textarea` fields.

- `allowPasting={true}` — paste works normally.
- `allowPasting={false}` — `onPaste` calls `e.preventDefault()`, blocking all paste events.

Useful for assessments or coding tests where copy-paste should be restricted.

---

## Submitted data format

Answers are keyed by question `id`. Checkbox answers are always arrays; all other types are strings.

```json
{
  "fullName": "Lennox Omondi",
  "motivation": "I want to join because I am serious about becoming a software engineer...",
  "educationLevel": "bachelors",
  "preferredTrack": "fullstack",
  "skills": ["html", "css", "javascript"]
}
```

---

## Architecture

```
src/
  components/
    QuestionRenderer/
      types.ts                   <- Question and prop type definitions
      validation.ts              <- Pure validateAnswers() function
      QuestionRenderer.tsx       <- Main component
      QuestionRenderer.css       <- Component styles
      QuestionRenderer.test.tsx  <- 17 required tests
      index.ts                   <- Barrel export
  sampleQuestions.ts             <- Demo data
  App.tsx                        <- Demo page
  App.css                        <- Demo page styles
```

---

## Assumptions

- The `pattern` validation rule accepts a raw regex string compiled at runtime via `new RegExp(pattern)`.
- The submit button is only disabled after the first submission attempt so users are not blocked from trying.
- Checkbox answers default to `[]` and are always submitted as arrays, even when empty.
- `allowPasting` defaults to `true` to match the more common non-assessment use case.
