import { useState } from 'react'
import { QuestionRenderer } from './components/QuestionRenderer'
import type { Answers } from './components/QuestionRenderer'
import { sampleQuestions } from './sampleQuestions'
import './App.css'

export default function App() {
  const [submittedData, setSubmittedData] = useState<Answers | null>(null)
  const [allowPasting, setAllowPasting] = useState(true)

  function handleSubmit(answers: Answers) {
    setSubmittedData(answers)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">QuestionRenderer</h1>
        <p className="app-subtitle">
          A dynamic, accessible form renderer built with React + TypeScript.
        </p>

        <div className="paste-toggle">
          <label className="paste-toggle-label">
            <input
              type="checkbox"
              checked={allowPasting}
              onChange={e => setAllowPasting(e.target.checked)}
            />
            <span>Allow pasting into text fields</span>
          </label>
          <span className={"paste-badge " + (allowPasting ? 'paste-badge--on' : 'paste-badge--off')}>
            {allowPasting ? 'Paste ON' : 'Paste OFF'}
          </span>
        </div>
      </header>

      <main className="app-main">
        {submittedData ? (
          <div className="success-panel">
            <div className="success-icon">✓</div>
            <h2 className="success-title">Form Submitted</h2>
            <p className="success-sub">Here is what was collected:</p>
            <pre className="success-code">{JSON.stringify(submittedData, null, 2)}</pre>
            <button
              className="success-reset"
              onClick={() => setSubmittedData(null)}
            >
              Reset form
            </button>
          </div>
        ) : (
          <div className="form-card">
            <QuestionRenderer
              questions={sampleQuestions}
              onSubmit={handleSubmit}
              allowPasting={allowPasting}
            />
          </div>
        )}
      </main>
    </div>
  )
}
