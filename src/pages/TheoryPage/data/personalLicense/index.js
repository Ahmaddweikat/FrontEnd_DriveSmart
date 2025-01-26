import { questions as Form1Questions } from "./Form1";
import { questions as Form2Questions } from "./Form2";
import { questions as Form3Questions } from "./Form3";

export const personalLicenseForms = [
  {
    id: 1,
    formType: "form1",
    title: "Form number 1",
    questions: Form1Questions,
    timeLimit: "40 minutes",
  },
  {
    id: 2,
    formType: "form2",
    title: "Form number 2",
    questions: Form2Questions,
    timeLimit: "40 minutes",
  },
  {
    id: 3,
    formType: "form3",
    title: "Form number 3",
    questions: Form3Questions,
    timeLimit: "40 minutes",
  },
];
