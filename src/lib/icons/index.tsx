import { type SVGProps } from "react";
import cn from "../cn";
import type { RecordValues } from "../../types";
import {
  motion,
  type SVGMotionProps,
  type Transition,
  type Variant,
} from "motion/react";
import { Envelope } from "./Envelope";
import { Linkedin } from "./Linkedin";
import { Github } from "./Github";
import { MapMarker } from "./MapMarker";
import { TypeScript } from "./TypeScript";
import { NextJs } from "./NextJs";
import { TailwindCss } from "./TailwindCss";
import { Angular } from "./Angular";
import { React } from "./React";
import { Rust } from "./Rust";
import { Python } from "./Python";
import { ArrowAngularTopRight } from "./ArrowAngularTopRight";
import { Auth0 } from "./Auth0";
import { Azure } from "./Azure";
import { C } from "./C";
import { Cargo } from "./Cargo";
import { CSharp } from "./CSharp";
import { Docker } from "./Docker";
import { DotNet } from "./DotNet";
import { FastApi } from "./FastApi";
import { Firebase } from "./Firebase";
import { GCP } from "./GCP";
import { GoogleMaps } from "./GoogleMaps";
import { Htmx } from "./Htmx";
import { JavaScript } from "./JavaScript";
import { Numpy } from "./Numpy";
import { Pandas } from "./Pandas";
import { PowerShell } from "./PowerShell";
import { Supabase } from "./Supebase";
import { Zod } from "./Zod";

export type SvgProps = SVGProps<SVGSVGElement> & {
  title?: string;
  backgroundFill?: string;
  foregroundFill?: string;
} & SVGMotionProps<SVGSVGElement>;

export type HoverVariants = {
  initial: Variant;
  whileHover: Variant;
};

const hoverTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 1,
};

export function hoverVariantBuilder(
  initial: Variant,
  whileHover: Variant,
): HoverVariants {
  return {
    initial: {
      ...initial,
      transition: hoverTransition,
    },
    whileHover: {
      ...whileHover,
      transition: hoverTransition,
    },
  };
}

export function hoverFillColorVariantBuilder(
  initialFillColor: string,
  hoverFillColor: string,
) {
  return hoverVariantBuilder(
    { fill: initialFillColor },
    { fill: hoverFillColor },
  );
}

export function Svg({ className, ...props }: SvgProps) {
  const svgVariants: HoverVariants = {
    initial: {},
    whileHover: {},
  };

  return (
    <motion.div title={props.title}>
      <motion.svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className={cn(
          "fill-text-secondary group h-5 w-5 md:h-7 md:w-7",
          className,
        )}
        variants={svgVariants}
        initial="initial"
        whileHover="whileHover"
        transition={hoverTransition}
        {...props}
      >
        {props.children}
      </motion.svg>
    </motion.div>
  );
}

// vim command to substitute tags to motion tags:
// '<,'>s/<\(\/\?\)\(\w\+\)\(>\?\)/<\1motion.\2\3/g

export const Icon = {
  Email: Envelope,
  Linkedin,
  Github,
  Location: MapMarker,
  TypeScript,
  NextJs,
  TailwindCss,
  Angular,
  React,
  Rust, // TODO: animation and the rest below
  Python,
  WebsiteLink: ArrowAngularTopRight,
  Docker,
  Firebase,
  "C#": CSharp,
  Azure,
  ".NET": DotNet,
  FastApi,
  Numpy,
  Pandas,
  Htmx,
  JavaScript,
  CSS,
  Maps: GoogleMaps,
  Cargo,
  Supabase,
  Auth0,
  Zod,
  C,
  GCP,
  PowerShell,
} as const;

export type Icon = RecordValues<typeof Icon>;
export type IconName = keyof typeof Icon;
