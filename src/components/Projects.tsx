import { Icon } from "../lib/icons";
import type { ProjectItem } from "../types";

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      title: "Mathracer",
      subtitle: "Multiplayer math game website",
      description:
        "Made to compete with my friends and show that I'm better at math (most normal Asian behavior).",
      startDate: "April 2025",
      skills: ["NextJs", "TailwindCss", "TypeScript", "C#", ".NET", "Azure"],
      links: [
        // {
        //   type: Icon.WebsiteLink,
        //   url: "https://mathracer-phi.vercel.app/",
        // },
        {
          type: Icon.Github,
          url: "https://github.com/mingli202/mathracer",
        },
      ],
    },

    {
      title: "League of Studies",
      subtitle: "Competitive studying platform.",
      description: "JacHacks Hackathon project.",
      startDate: "April 2025",
      skills: ["NextJs", "TailwindCss", "Supabase", "Auth0", "Zod"],
      links: [
        {
          type: Icon.Github,
          url: "https://github.com/mingli202/LeagueOfStudies",
        },
      ],
    },

    {
      title: "Mito Sushi Weekly Planner",
      subtitle: "Schedule planner based on store locations",
      description:
        "Webapp for planning Mito Sushi schedules based on store locations because my mom wanted one.",
      startDate: "March 2025",
      skills: [
        "Python",
        "FastApi",
        "Pandas",
        "Htmx",
        "JavaScript",
        "CSS",
        "Maps",
        "Docker",
      ],
      links: [
        {
          type: Icon.Github,
          url: "https://github.com/mingli202/mathracer",
        },
      ],
    },

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
        "Vercel",
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
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {projects.map(
        ({ title, subtitle, startDate, endDate, skills, links }, index) => (
          <div
            className="border-secondary flex flex-col gap-4 rounded-[2.25rem] border border-solid p-4"
            key={title + index}
          >
            <div className="bg-secondary aspect-video w-full rounded-[calc(2.25rem-1rem)]"></div>
            <div className="flex w-full flex-col gap-3.5 px-3 pb-3">
              <div>
                <div className="flex items-center gap-1">
                  <h2 className="font-bold">{title}</h2>
                  <div className="flex gap-1">
                    {links.map(({ type, url }) => (
                      <a
                        key={url + title}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {type({ className: "fill-primary" })}
                      </a>
                    ))}
                  </div>
                </div>
                <p className="font-light">{subtitle}</p>
              </div>
              <p className="text-text-secondary">
                {startDate} {endDate ? `- ${endDate}` : null}
              </p>
              <div className="mt-2 flex w-full flex-wrap gap-2">
                {skills.map((iconName, index) => (
                  <div
                    key={iconName + index}
                    className="bg-secondary flex h-8 gap-1.5 rounded-lg p-1.5"
                  >
                    {Icon[iconName]({
                      className:
                        "fill-primary h-[calc(2rem-0.375rem*2)] w-[calc(2rem-0.375rem*2)]",
                    })}
                    <p className="text-primary text-base leading-5.5 font-light">
                      {iconName}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
