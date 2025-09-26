import { type Variants, motion } from "motion/react";
import { type SvgProps, Svg } from ".";

export function ArrowAngularTopRight(props: SvgProps) {
  const svgVariants: Variants = {
    initial: {
      stroke: "var(--text-color-secondary)",
    },
    whileHover: {
      stroke: "var(--primary-color)",
    },
  };

  const pathVariants1: Variants = {
    initial: {
      d: "M15 3h6v6",
    },
    whileHover: {
      d: "M12 2h10v10",
      transitionDuration: 0.1,
    },
  };

  const pathVariants2: Variants = {
    initial: {
      d: "M10 14 21 3",
    },
    whileHover: {
      d: "M10 14 22 2",
    },
  };

  const pathVariants3: Variants = {
    initial: {
      d: "M18 13L18 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
    },
    whileHover: {
      d: "M18 16L18 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3",
    },
  };

  return (
    <Svg
      title="Website"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      variants={svgVariants}
      initial="initial"
      whileHover="whileHover"
      transition={{
        type: "tween",
        ease: "easeOut",
        duration: 0.1,
      }}
      {...props}
    >
      <motion.path variants={pathVariants1} fill="none" />
      <motion.path variants={pathVariants2} fill="none" />
      <motion.path fill="none" variants={pathVariants3} />
    </Svg>
  );
}
