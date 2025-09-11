import cn from "../lib/cn";
import type { ExperienceListItem } from "../types";

type Props = {
  items: ExperienceListItem[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function ExperienceList({ items, className, ...props }: Props) {
  return (
    <div className={cn("flex flex-col gap-2 p-2 md:p-4", className)} {...props}>
      {items.map(({ title, imageUrl, subtitle, startDate, endDate }) => (
        <div
          key={title}
          className="border-secondary flex items-center gap-4 rounded-[calc(0.25rem+0.75rem)] border border-solid p-3 md:rounded-[calc(0.25rem+1rem)] md:p-4"
        >
          <img
            src={imageUrl}
            alt={title}
            className="h-13 w-13 rounded md:h-16 md:w-16"
            width={64}
            height={64}
          />

          <div className="flex w-full flex-col gap-1">
            <div className="flex w-full flex-wrap justify-between gap-x-4">
              <p className="font-bold">{subtitle}</p>
              <p className="text-text-secondary">
                {startDate} {endDate ? `- ${endDate}` : null}
              </p>
            </div>
            <p>{title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
