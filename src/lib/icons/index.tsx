import type { JSX, SVGProps } from "react";
import cn from "../cn";

import LinkedinPath from "./LinkedinPath";
import GithubPath from "./GithubPath";
import EnvelopePath from "./EnvelopePath";

type Props = SVGProps<SVGSVGElement>;

function icon(path: () => JSX.Element) {
  function Icon({ className, ...props }: Props) {
    return (
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("w-6 h-6 fill-text", className)}
        {...props}
      >
        {path()}
      </svg>
    );
  }

  return Icon;
}

export const Envelope = icon(EnvelopePath);
export const Linkedin = icon(LinkedinPath);
export const Github = icon(GithubPath);
