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
  const { title, imageUrl, startDate, endDate, subtitle } = item;

  return (
    <>
      <div
        className={cn(
          "ring-secondary flex w-full gap-4 rounded-[calc(0.25rem+0.75rem)] p-3 ring-1 transition md:rounded-[calc(0.25rem+1rem)] md:p-4",
        )}
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
          <SkillIconList skills={item.skills} />
        </div>
      </div>
    </>
  );
}
