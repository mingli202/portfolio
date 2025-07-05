import { Icons } from "../lib/icons";
import type { ProjectItem } from "../types";

export default function Projects() {
  const projects: ProjectItem[] = [
    {
      title: "John Abbott College schedule builder",
      subtitle: "Webapp for planning JAC schedules",
      description:
        "John Abbott didn't have one and many students including me found it tedious to plan it by hand, so I made one myself.",
      startDate: "July 2023",
      endDate: "Jan 2024",
      skills: [],
      links: [
        {
          type: Icons.WebsiteLink,
          url: "https://dream-builder-hazel.vercel.app/",
        },
        {
          type: Icons.Github,
          url: "https://github.com/mingli202/next-schedule-maker",
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-4 p-4">
      {projects.map(
        ({ title, subtitle, startDate, endDate, skills, links }) => (
          <div className="border-secondary flex flex-col gap-4 rounded-[2.25rem] border border-solid p-4">
            <div className="bg-secondary aspect-video w-full rounded-[calc(2.25rem-1rem)]"></div>
            <div className="flex flex-col gap-4 p-3">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                <div className="flex gap-2">
                  {links.map(({ type, url }) => (
                    <a key={url} href={url} target="_blank" rel="noreferrer">
                      {type}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}
