## What this file is for

AI tools are allowed. Undeclared, unverified, or unowned AI use is not.

You are responsible for everything in this repository — whether AI helped produce it or not. If you cannot explain it, test it, or modify it, you do not own it.

## Did you use AI?

- [ ] No — all work in this repository is entirely my own.
- [ ✓] Yes — I used AI tools and have declared the details below.

> If **No**, skip to the [Declaration](#declaration) section and sign.  
> If **Yes**, complete every section below.

## Tools used

| Tool           | Provider  | What I used it for                                                                                                                                  |
| -------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Claude         | Anthropic | scaffolding the project structure, generating the initial QuestionRenderer component/ types/validation/tests/README, and explaining the assignment. |
| GitHub Copilot | Microsoft | used it to debug errors that I encountered from build failure                                                                                       |

> Common tools include: ChatGPT, Claude, Gemini, GitHub Copilot, Cursor, Windsurf, Perplexity, Tabnine, Grammarly, DeepL, and any other AI-powered assistant.  
> Basic IDE autocomplete (bracket closing, common keywords) does not need to be declared.

## How AI was used

Check every box that applies.

- [ ✓] Understanding the assignment or requirements
- [ ] Researching concepts or syntax
- [ ✓] Brainstorming approaches
- [ ✓] Generating code that I reviewed and modified
- [ ] Generating code that I used with minimal changes
- [ ✓] Debugging errors
- [ ] Improving code structure or readability
- [ ✓] Writing or improving tests
- [ ✓] Writing or improving documentation
- [ ] Other:

```
Describe any other use here:
Chatgpt for brainstorming and learning more about the project
```

## What AI influenced

List the specific files, functions, or sections where AI played a role.

| File or section | What AI contributed | What I changed, verified, or rewrote |
| --------------- | ------------------- | ------------------------------------ |
|                 |                     |                                      |
|                 |                     |                                      |

every file in src/components/QuestionRenderer/ and the demo app

> If AI only gave explanations and no final code or content was used, state that clearly.

## Key prompts and responses

List the most important AI interactions that shaped the final submission.

| What I asked AI | What AI suggested | Used in final work? | How I verified it |
| --------------- | ----------------- | ------------------- | ----------------- |
|                 |                   | Yes / No            |                   |
|                 |                   | Yes / No            |                   |

To scafold the project structure
Provide the code snippets
Asked it to explain the entire project requirements and what was needed to be done
Debug vercel build error I encountered

> If asked during a review, you must be able to show full chat logs or screenshots.

## Verification

### Commands I ran

```bash
npm install && npm run dev
npm test
npm run build

```

### What I manually checked

- [ ✓] The project runs without errors
- [ ✓] Core features work as expected
- [ ] Edge cases and error states are handled
- [✓ ] All tests pass
- [ ✓] The README instructions are accurate

### Bugs I found and fixed

| Bug or issue | How I found it | How I fixed it |
| ------------ | -------------- | -------------- |
|              |                |                |

The test configuration wasn't set up correctly for TypeScript to understand the test section. So this threw a build error on vercel

I fixed the TypeScript error by using as any type assertion on the config object, allowing Vitest's test configuration property to coexist with Vite's standard config.

> If you found no bugs, explain how you confirmed the work was correct.

## Understanding check

Answer in your own words. Do not paste AI explanations here.

**What does this project do and how does it work?**

```
This project is a form component that renders questions directly from an array of questions without touching the main code, it solves the issue of hard coding questions to the code itself making it easier for it to be updated.

It also has a paste control that can be tested by using the toggle on the UI of the form interface.
The project also validates input added by the user and has error messages where certain criteria has not been met.
```

**Which part are you most confident about?**

```
1. The part that I'm confident about is the pasting feature, you can disable and enable it and works dinamically.
2. The dynamic questions update on the form itself, it works when I edit the sample questions directly.
```

**Which part are you still unsure about?**

```
Because much of what I implemented in this project was new to me, I'm not yet fully confident with the syntax and how everything fits together. so I'm still learning the syntax and gaining confidence in writing and understanding the code.

```

## Declaration

- [ ✓] I did not submit AI-generated work that I do not understand.
- [ ✓] I did not fabricate test results or pass status.
- [ ✓] I did not submit another person's work as my own.
- [ ✓] I did not hide AI use where AI was used.
- [ ✓] I did not enter sensitive, private, or confidential data into any public AI tool.
- [✓ ] I understand I may be asked to explain or modify this work during a review.

**By committing this file, I confirm that this project is my responsibility and that I can defend it.**
