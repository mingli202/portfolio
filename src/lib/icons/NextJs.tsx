import { motion } from "motion/react";
import { useRef } from "react";
import { type SvgProps, Svg, hoverVariantBuilder } from ".";

export function NextJs(props: SvgProps) {
  const random = useRef(Math.random());

  return (
    <Svg viewBox="0 0 128 128" title="Next.js" {...props}>
      <motion.circle
        cx="64"
        cy="64"
        r="64"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#000000" },
        )}
      ></motion.circle>
      <path
        fill={`url(#nextjs-gradient-a-${random.current})`}
        d="M106.317 112.014 49.167 38.4H38.4v51.179h8.614v-40.24l52.54 67.884a64.216 64.216 0 0 0 6.763-5.209z"
      ></path>
      <path
        fill={`url(#nextjs-gradient-b-${random.current})`}
        d="M81.778 38.4h8.533v51.2h-8.533z"
      ></path>
      <defs>
        <linearGradient
          id={`nextjs-gradient-a-${random.current}`}
          x1="109"
          x2="144.5"
          y1="116.5"
          y2="160.5"
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            variants={hoverVariantBuilder(
              { stopColor: props.backgroundFill ?? "var(--background-color)" },
              { stopColor: "#ffffff" },
            )}
          ></motion.stop>
          <motion.stop
            offset="1"
            variants={hoverVariantBuilder(
              { stopColor: props.backgroundFill ?? "var(--background-color)" },
              { stopColor: "#ffffff" },
            )}
            stop-opacity="0"
          ></motion.stop>
        </linearGradient>
        <linearGradient
          id={`nextjs-gradient-b-${random.current}`}
          x1="121"
          x2="120.799"
          y1="54"
          y2="106.875"
          gradientTransform="scale(.71111)"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            variants={hoverVariantBuilder(
              { stopColor: props.backgroundFill ?? "var(--background-color)" },
              { stopColor: "#ffffff" },
            )}
          ></motion.stop>
          <motion.stop
            offset="1"
            variants={hoverVariantBuilder(
              { stopColor: props.backgroundFill ?? "var(--background-color)" },
              { stopColor: "#ffffff" },
            )}
            stop-opacity="0"
          ></motion.stop>
        </linearGradient>
      </defs>
    </Svg>
  );
}
