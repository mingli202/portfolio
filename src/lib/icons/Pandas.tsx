import { motion } from "motion/react";
import { type SvgProps, hoverFillColorVariantBuilder, Svg } from ".";

export function Pandas(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Pandas" {...props}>
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#130754",
        )}
        d="M46.236 7.567h13.99v29.047h-13.99Zm0 59.668h13.99V96.28h-13.99Z"
      ></motion.path>
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#ffca00",
        )}
        d="M46.236 45.092h13.99v13.705h-13.99Z"
      ></motion.path>
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#130754",
        )}
        d="M23.763 31.446h13.989V128h-13.99ZM68.245 91.2h13.99v29.046h-13.99Zm0-59.72h13.99v29.047h-13.99Z"
      ></motion.path>
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#e70488",
        )}
        d="M68.245 69.011h13.99v13.705h-13.99Z"
      ></motion.path>
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#130754",
        )}
        d="M90.248 0h13.99v96.554h-13.99Z"
      ></motion.path>
    </Svg>
  );
}
