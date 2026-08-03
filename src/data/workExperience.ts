import type { ExperienceListItem } from "../types";

export const workExperience: ExperienceListItem[] = [
  {
    title: "ECS Software Developer Intern",
    subtitle: "Eaton",
    startDate: "May 2026",
    endDate: "Aug 2026",
    location: "Brossard, Canada",
    skills: ["Go", "React"],
    additionalInfo: [
      "Wrote a OpenADR 2.0b compliant VEN client microservice",
      "Coded a webapp for configuring and displaying VEN client data",
      "Made an internal tool in go for managing stacked PRs (before the official github stacked PRs was out)",
      "Introduced modern agentic workflows to my team to boost productivity",
    ],
    imageUrl: "eaton_logo.jpeg",
  },
  {
    title: "C#/Web Developer Intern",
    subtitle: "Genetec Inc.",
    startDate: "Jan 2026",
    endDate: "Avril 2025",
    location: "Montreal, Canada",
    skills: ["Angular", "C#", ".NET", "Azure", "PowerShell"],
    additionalInfo: [
      "Revamped feedback experience",
      "Fixed cache invalidation bugs",
      "Took a class on data programming designs",
    ],
    imageUrl: "genetec_logo.jpg",
  },
  {
    title: "C#/Web Developer Intern",
    subtitle: "Genetec Inc.",
    startDate: "May 2025",
    endDate: "Aug 2025",
    location: "Montreal, Canada",
    skills: ["Angular", "C#", "Azure", "PowerShell"],
    additionalInfo: [
      "Designed frontend UI for the Webapp application and tested with Jest",
      "Collaborated with various teams during feature development and bug fixing",
      "Wrote Azure DevOps pipelines to automate product releases",
      "Added Finnish language to the webapp",
    ],
    imageUrl: "genetec_logo.jpg",
  },
];
