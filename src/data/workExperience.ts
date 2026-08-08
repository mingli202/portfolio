import type { ExperienceListItem } from "../types";

export const workExperience: ExperienceListItem[] = [
  {
    title: "Embedded Software Developer Intern",
    subtitle: "Eaton",
    startDate: "May 2026",
    endDate: "Aug 2026",
    location: "Brossard, Canada",
    skills: ["Go", "React", "Tanstack", "Docker", "Nginx"],
    additionalInfo: [
      "Wrote a OpenADR 2.0b compliant VEN client microservice in go",
      "Forked xgen to accurately parse the OpenADR xml schema",
      "Coded a webapp for configuring and managing VEN client data",
      "Deployed the microservice with Docker + nginx",
      "Integrated with the other EdgeX apps via NATS message bus",
      "Made an internal tool in go for managing stacked PRs",
      "Introduced modern agentic workflows to my team to boost productivity",
    ],
    imageUrl: "eaton_logo.jpeg",
  },
  {
    title: "C#/Web Developer Intern",
    subtitle: "Genetec Inc.",
    startDate: "Jan 2026",
    endDate: "April 2025",
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
