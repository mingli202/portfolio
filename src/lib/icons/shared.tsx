import { type SVGProps } from "react";
import {
  motion,
  type SVGMotionProps,
  type Transition,
  type Variant,
} from "motion/react";
import cn from "../cn";

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
  duration: 0.1,
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

export function Svg({
  className,
  foregroundFill: _foregroundFill,
  backgroundFill: _backgroundFill,
  initial,
  whileHover,
  ...props
}: SvgProps) {
  void _foregroundFill;
  void _backgroundFill;

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
        initial={initial === "" ? undefined : "initial"}
        whileHover={whileHover === "" ? undefined : "whileHover"}
        transition={hoverTransition}
        {...props}
      >
        {props.children}
      </motion.svg>
    </motion.div>
  );
}
