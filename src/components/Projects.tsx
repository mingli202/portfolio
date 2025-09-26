import { projects } from "../data/projects";
import { SkillIconList } from "../lib/SkillIcon";

export default function Projects() {
  return (
    <div className="flex flex-col gap-3 p-2 md:gap-4 md:p-4">
      {projects.map(
        (
          {
            title,
            subtitle,
            startDate,
            endDate,
            skills,
            links,
            videoUrl,
            description,
          },
          index,
        ) => (
          <div
            className="border-secondary flex flex-col gap-3 rounded-[calc(1rem+0.75rem)] border border-solid p-3 md:gap-4 md:rounded-[2rem] md:p-4"
            key={title + index}
          >
            <div className="aspect-video w-full overflow-hidden rounded-2xl">
              {videoUrl ? (
                <iframe
                  src={videoUrl}
                  title="YouTube video player"
                  className="h-full w-full border-none"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="bg-secondary flex h-full w-full items-center justify-center">
                  Rip demo :(
                </div>
              )}
            </div>
            <div className="flex w-full flex-col gap-2 px-2 pb-2 md:gap-3.5 md:px-3 md:pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold">{title}</h2>
                  <div className="flex gap-2">
                    {links.map(({ type, url }) => (
                      <a
                        key={url + title}
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {type({
                          className: "fill-text-secondary md:h-6 md:w-6",
                        })}
                      </a>
                    ))}
                  </div>
                </div>
                <p className="font-light">{subtitle}</p>
              </div>
              <p className="text-text-secondary font-light">{description}</p>
              <p className="text-text-secondary">
                {startDate} {endDate ? `- ${endDate}` : null}
              </p>
              <SkillIconList skills={skills} />
            </div>
          </div>
        ),
      )}
    </div>
  );
}
