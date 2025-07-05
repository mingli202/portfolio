import { Icon } from "./lib/icons";

export type ProjectItem = {
  title: string;
  subtitle: string;
  videoUrl?: string;
  description: string;
  startDate: string;
  endDate?: string;
  skills: Skill[];
  links: Link[];
};

export type ExperienceListItem = {
  title: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  skills: Skill[];
  additionalInfo: string[];
};

export type Skill = {
  name: string;
  imageUrl?: string;
};

export type Link = {
  type: Icon;
  url: string;
};
