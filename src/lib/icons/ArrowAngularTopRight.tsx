import { type Variants, motion } from "motion/react";
import { type SvgProps, hoverVariantBuilder, Svg } from ".";

export function ArrowAngularTopRight(props: SvgProps) {
  const pathVariants1: Variants = hoverVariantBuilder(
    { d: "M15 3h6v6" },
    { d: "M12 2h10v10" },
  );

  const pathVariants2: Variants = hoverVariantBuilder(
    { d: "M10 14 21 3" },
    { d: "M10 14 22 2" },
  );

  const pathVariants3: Variants = hoverVariantBuilder(
    { d: "M18 13L18 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" },
    { d: "M18 16L18 19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h3" },
  );

  return (
    <Svg
      title="Website"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      stroke="var(--primary-color)"
      {...props}
    >
      <motion.path variants={pathVariants1} fill="none" />
      <motion.path variants={pathVariants2} fill="none" />
      <motion.path fill="none" variants={pathVariants3} />
    </Svg>
  );
}
