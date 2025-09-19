import { Icon } from "../lib/icons";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <div className="flex flex-col gap-3 p-3 md:gap-4 md:p-4">
      {projects.map(
        (
          { title, subtitle, startDate, endDate, skills, links, videoUrl },
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
                        "fill-primary h-[calc(2rem-0.375rem*2)] w-[calc(2rem-0.375rem*2)] md:h-[calc(2rem-0.375rem*2)] md:w-[calc(2rem-0.375rem*2)]",
                    })}
                    <p className="text-primary text-sm leading-5.5 font-light md:text-base">
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
