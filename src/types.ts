import type { Icon } from "./lib/icons";

export type IconName = keyof typeof Icon;
type IconComponent = (typeof Icon)[IconName];

export type ProjectItem = {
  title: string;
  subtitle: string;
  videoUrl?: string;
  description: string;
  startDate: string;
  endDate?: string;
  skills: IconName[];
  links: Link[];
};

export type ExperienceListItem = {
  title: string;
  subtitle: string;
  imageUrl: string;
  startDate: string;
  endDate?: string;
  location: string;
  skills: IconName[];
  additionalInfo: string[];
};

export type Skill = {
  name: string;
  icon: IconComponent;
};

export type Link = {
  type: IconComponent;
  url: string;
};
