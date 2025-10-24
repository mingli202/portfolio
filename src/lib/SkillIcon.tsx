import type { HTMLProps } from "react";
import { Icon, type IconName } from "./icons";
import cn from "./cn";

type SkillIconProps = {
  iconName: keyof typeof Icon;
};

export function SkillIcon(props: SkillIconProps) {
  const { iconName } = props;

  return (
    <div className="bg-secondary flex items-center gap-1.5 rounded-lg px-1 py-0.5 md:px-2 md:py-1">
      {Icon[iconName]({
        className: "md:h-5 md:w-5 h-4 w-4",
        foregroundFill: "var(--primary-color)",
        backgroundFill: "var(--secondary-color)",
      })}
      <p className="text-primary translate-y-[0.5px] text-sm font-light md:translate-y-[1px] md:text-base">
        {iconName}
      </p>
    </div>
  );
}

export function SkillIconList({
  skills,
  className,
  ...props
}: { skills: IconName[] } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-2 flex w-full flex-wrap gap-1 md:gap-2", className)}
      {...props}
    >
      {skills.map((iconName, index) => (
        <SkillIcon key={iconName + index} iconName={iconName} />
      ))}
    </div>
  );
}
