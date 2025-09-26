import { Icon, type IconName } from "./icons";

type SkillIconProps = {
  iconName: keyof typeof Icon;
};

export function SkillIcon(props: SkillIconProps) {
  const { iconName } = props;

  return (
    <div className="bg-secondary flex h-8 gap-1.5 rounded-lg p-1.5">
      {Icon[iconName]({
        className:
          "h-[calc(2rem-0.375rem*2)] w-[calc(2rem-0.375rem*2)] md:h-[calc(2rem-0.375rem*2)] md:w-[calc(2rem-0.375rem*2)]",
        foregroundFill: "var(--primary-color)",
        backgroundFill: "var(--secondary-color)",
      })}
      <p className="text-primary text-sm leading-5.5 font-light md:text-base">
        {iconName}
      </p>
    </div>
  );
}

export function SkillIconList(props: { skills: IconName[] }) {
  return (
    <div className="mt-2 flex w-full flex-wrap gap-2">
      {props.skills.map((iconName, index) => (
        <SkillIcon key={iconName + index} iconName={iconName} />
      ))}
    </div>
  );
}
