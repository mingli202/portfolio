import { Icon, type IconName } from "./lib/icons";

export type RecordValues<T extends Record<string | number | symbol, unknown>> =
  T[keyof T];

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
  icon: Icon;
};

export type Link = {
  type: Icon;
  url: string;
};
