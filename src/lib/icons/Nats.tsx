import { motion } from "motion/react";
import { hoverVariantBuilder, Svg, type SvgProps } from "./shared";

export function Nats(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="NATS" {...props}>
      <motion.path
        d="M63.998 0h61.82v50.12h-61.82z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#34a574" },
        )}
      />
      <motion.path
        d="M2.182 0h61.816v50.12H2.182Z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#27aae1" },
        )}
      />
      <motion.path
        d="M63.998 50.164h61.82v50.113h-61.82z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#8dc63f" },
        )}
      />
      <motion.path
        d="M2.182 50.164h61.816v50.113H2.182Z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#375c93" },
        )}
      />
      <motion.path
        d="M54.914 100.004 85.16 128v-27.996z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#8dc63f" },
        )}
      />
      <motion.path
        d="m63.998 100.004.322 8.812-9.685-9.042z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#375c93" },
        )}
      />
      <motion.path
        d="M89.608 64.802V23.315h14.779v53.651H81.993l-45.21-42.223v42.269H21.958V23.316h23.177l44.472 41.486z"
        variants={hoverVariantBuilder(
          { fill: props.backgroundFill ?? "var(--background-color)" },
          { fill: "#ffffff" },
        )}
      />
    </Svg>
  );
}
