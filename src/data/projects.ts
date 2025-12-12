import { Icon } from "../lib/icons";
import type { ProjectItem } from "../types";

export const projects: ProjectItem[] = [
  {
    title: "Smart Courrier Robot",
    subtitle: "Design Principles and Methods final project.",
    description:
      "Autonomous robot that can deliver packages to delivery locations using a line tracking algorithm. Built in a team of 6 for my ECSE 211 final project.",
    startDate: "Nov 2025",
    skills: ["Python", "Raspberrypi"],
    links: [
      {
        type: Icon.Github,
        url: "https://github.com/BagetTeam/bakers-pi-final",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/plpx3dQ-prg?si=VfcLF-GpSGkB6wLK",
  },

  {
    title: "Mathracer",
    subtitle: "Multiplayer math game website.",
    description:
      "Made to compete with my friends and show that I'm better at math (most normal Asian behavior).",
    startDate: "April 2025",
    skills: [
      "NextJs",
      "TailwindCss",
      "TypeScript",
      "C#",
      ".NET",
      "GCP",
      "Docker",
    ],
    links: [
      {
        type: Icon.WebsiteLink,
        url: "https://mathracer-five.vercel.app/",
      },
      {
        type: Icon.Github,
        url: "https://github.com/mingli202/mathracer",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/qrN3RTZXTqg?si=UNkx6PChP8d7_TIp",
  },

  // {
  //   title: "Mito Sushi Weekly Planner",
  //   subtitle: "Schedule planner based on store locations.",
  //   description:
  //     "Webapp for planning Mito Sushi schedules based on store locations because my mom needed one.",
  //   startDate: "March 2025",
  //   skills: [
  //     "Python",
  //     "FastApi",
  //     "Pandas",
  //     "Htmx",
  //     "JavaScript",
  //     "CSS",
  //     "GCP",
  //     "Maps",
  //     "Docker",
  //   ],
  //   links: [
  //     {
  //       type: Icon.WebsiteLink,
  //       url: "https://mito-weekly-planner-ypdwumdcaa-uc.a.run.app",
  //     },
  //     {
  //       type: Icon.Github,
  //       url: "https://github.com/mingli202/mito-weekly-planner",
  //     },
  //   ],
  //   videoUrl: "https://www.youtube.com/embed/ooK7YwW7N4s?si=oWzTOi_xMouWbfSh",
  // },

  {
    title: "Typing Rust",
    subtitle: "Monkeytype, but in Rust and it's a cli tool.",
    description:
      "Needed a project to learn Rust, thus I made my favorite website in my favorite language and suffered a bit.",
    startDate: "Nov 2024",
    endDate: "May 2025",
    skills: ["Rust"],
    links: [
      {
        type: Icon.Cargo,
        url: "https://crates.io/crates/typing_test",
      },
      {
        type: Icon.Github,
        url: "https://github.com/mingli202/typing-rust",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/qujeessD6Mg?si=W12oQd-8J-NM3Bj2",
  },

  {
    title: "Mnist Ai",
    subtitle:
      "Handwritten digit classification using MNIST dataset from scratch.",
    description:
      "Multi-layer neural network made from scratch using only Numpy and math.",
    startDate: "Oct 2024",
    skills: ["Python", "Numpy"],
    links: [
      {
        type: Icon.Github,
        url: "https://github.com/mingli202/mnist-ai",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/ey127qKYm4g?si=ztg1kMlOa-q2vrIo",
  },

  {
    title: "CTetris",
    subtitle: "Tetris in the terminal using C and Ncurses",
    description: "Ncurses go brrrrr",
    startDate: "July 2024",
    skills: ["C"],
    links: [
      {
        type: Icon.Github,
        url: "https://github.com/mingli202/ctetris",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/S92Dl8k9gFw?si=-9L5IHC9xd2j_SAZ",
  },

  {
    title: "Dream Builder",
    subtitle: "Webapp for planning John Abbott College schedules",
    description:
      "John Abbott didn't have one and many students including me found it tedious to plan it by hand, so I made one myself.",
    startDate: "July 2023",
    endDate: "Jan 2024",
    skills: [
      "NextJs",
      "TailwindCss",
      "TypeScript",
      "Docker",
      "Firebase",
      "Python",
    ],
    links: [
      {
        type: Icon.WebsiteLink,
        url: "https://dream-builder-hazel.vercel.app/",
      },
      {
        type: Icon.Github,
        url: "https://github.com/mingli202/next-schedule-maker",
      },
    ],
    videoUrl: "https://www.youtube.com/embed/xLdIWgsmnRc?si=_zaNGwVsEl_pA43q",
  },
];
