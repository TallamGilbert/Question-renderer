import type { Question } from "./components/QuestionRenderer";

export const sampleQuestions: Question[] = [
  {
    id: "fullName",
    label: "Full Name",
    type: "text",
    placeholder: "e.g. Gilbert Smith",
    validation: {
      required: true,
      minLength: 3,
      maxLength: 80,
    },
  },
  {
    id: "motivation",
    label: "Why do you want to join the program?",
    type: "textarea",
    placeholder: "Tell us in at least 50 characters...",
    validation: {
      required: true,
      minLength: 50,
    },
  },
  {
    id: "educationLevel",
    label: "What is your highest education level?",
    type: "select",
    options: [
      { label: "High School", value: "highschool" },
      { label: "Diploma", value: "diploma" },
      { label: "Bachelor's Degree", value: "bachelors" },
      { label: "Master's Degree", value: "masters" },
      { label: "Other", value: "other" },
    ],
    validation: { required: true },
  },
  {
    id: "preferredTrack",
    label: "Preferred Learning Track",
    type: "radio",
    options: [
      { label: "Full Stack", value: "fullstack" },
      { label: "Frontend Only", value: "frontend" },
      { label: "Backend Only", value: "backend" },
      { label: "Mobile", value: "mobile" },
    ],
    validation: { required: true },
  },
  {
    id: "skills",
    label: "What Skills You Already Have",
    type: "checkbox",
    options: [
      { label: "HTML", value: "html" },
      { label: "CSS", value: "css" },
      { label: "JavaScript", value: "javascript" },
      { label: "TypeScript", value: "typescript" },
      { label: "React", value: "react" },
      { label: "Node.js", value: "nodejs" },
    ],
    validation: { required: true },
  },
];
