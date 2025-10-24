import { useCallback, useRef } from "react";
import cn from "../lib/cn";
import { SkillIconList } from "../lib/SkillIcon";
import type { ExperienceListItem } from "../types";

type Props = {
  items: ExperienceListItem[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ExperienceList({ items, className, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-2 p-2 md:p-4", className)} {...props}>
      {items.map((item) => (
        <ListItem key={item.title} {...item} />
      ))}
    </div>
  );
}

function ListItem(item: ExperienceListItem) {
  const {
    title,
    imageUrl,
    startDate,
    endDate,
    subtitle,
    skills,
    additionalInfo,
    location,
  } = item;

  const isClicked = useRef(false);

  const additionalInfoRef = useRef<HTMLDivElement>(null!);
  const placeholderRef = useRef<HTMLDivElement>(null!);
  const backgroundRef = useRef<HTMLDivElement>(null!);

  const ref = useRef<HTMLDivElement>(null!);
  const height = useRef(0);

  const showAdditionalInfo = useCallback(() => {
    if (isClicked.current) {
      additionalInfoRef.current.style.display = "none";
      backgroundRef.current.style.display = "none";

      placeholderRef.current.style.display = "none";

      ref.current.classList.add("w-full");
      ref.current.classList.remove(
        "md:w-[calc(min(90%,45rem)-2rem)]",
        "w-[calc(min(90%,45rem)-1rem)]",
      );
      ref.current.style.position = "relative";
      ref.current.style.top = "";
      ref.current.style.left = "";
      ref.current.style.transform = "";
      ref.current.style.zIndex = "";

      isClicked.current = false;
    } else {
      additionalInfoRef.current.style.display = "flex";
      backgroundRef.current.style.display = "block";

      placeholderRef.current.style.display = "block";
      placeholderRef.current.style.height = height.current + "px";

      ref.current.classList.remove("w-full");
      ref.current.classList.add(
        "md:w-[calc(min(90%,45rem)-2rem)]",
        "w-[calc(min(90%,45rem)-1rem)]",
      );
      ref.current.style.position = "absolute";
      ref.current.style.top = "50%";
      ref.current.style.left = "50%";
      ref.current.style.transform = "translate(-50%, -50%)";

      ref.current.parentElement!.removeChild(ref.current);
      backgroundRef.current.appendChild(ref.current);

      isClicked.current = true;
    }
  }, []);

  return (
    <>
      <div ref={placeholderRef} className="hidden" />
      <div
        ref={backgroundRef}
        className="fixed top-0 left-0 z-10 hidden h-screen w-screen items-center justify-center bg-black/50 backdrop-blur-sm transition-all"
      />
      <div
        // style={{ viewTransitionName: "list-item" + title + startDate }}
        className={cn(
          "ring-secondary bg-background relative flex w-full gap-4 rounded-[calc(0.25rem+0.75rem)] p-3 ring-1 transition md:rounded-[calc(0.25rem+1rem)] md:p-4",
          "hover:ring-primary hover:cursor-pointer",
        )}
        onPointerDown={() => {
          height.current = ref.current.clientHeight;
          document.startViewTransition(showAdditionalInfo);
        }}
        ref={ref}
      >
        <img
          src={imageUrl}
          alt={title}
          className="h-13 w-13 rounded md:h-16 md:w-16"
          width={64}
          height={64}
        />
        <div className="flex min-h-13 w-full flex-col justify-center gap-1 md:gap-2">
          <div className="flex w-full flex-wrap justify-between gap-x-4">
            <p className="font-bold">{subtitle}</p>
            <p className="text-text-secondary">
              {startDate} {endDate ? `- ${endDate}` : null}
            </p>
          </div>
          <p>{title}</p>

          <div
            className="text-text-secondary hidden flex-col gap-2 text-sm md:text-base"
            ref={additionalInfoRef}
          >
            <p>{location}</p>
            <ul className="list-inside list-disc">
              {additionalInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
          </div>

          <SkillIconList
            skills={skills}
            //            style={{
            //              viewTransitionName: "list-item-skills" + title + startDate,
            //            }}
          />
        </div>
      </div>
    </>
  );
}
