import { motion } from "motion/react";
import { useRef } from "react";
import { type SvgProps, Svg, hoverVariantBuilder } from ".";

export function Angular(props: SvgProps) {
  const random = useRef(Math.random());

  return (
    <Svg viewBox="0 0 128 128" title="Angular" {...props}>
      <linearGradient
        id={`angular-gradient-a-${random.current}`}
        x1="14.704"
        x2="110.985"
        y1="46.27"
        y2="92.024"
        gradientTransform="matrix(1 0 0 -1 0 130)"
        gradientUnits="userSpaceOnUse"
      >
        <motion.stop
          offset="0"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#e40035" },
          )}
        ></motion.stop>
        <motion.stop
          offset=".24"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#f60a48" },
          )}
        ></motion.stop>
        <motion.stop
          offset=".352"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#f20755" },
          )}
        ></motion.stop>
        <motion.stop
          offset=".494"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#dc087d" },
          )}
        ></motion.stop>
        <motion.stop
          offset=".745"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#9717e7" },
          )}
        ></motion.stop>
        <motion.stop
          offset="1"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#6c00f5" },
          )}
        ></motion.stop>
      </linearGradient>
      <path
        fill={`url(#angular-gradient-a-${random.current})`}
        d="m124.5 21.3-4.4 68.6L78.3 0l46.2 21.3zm-29 88.7L64 128l-31.5-18 6.4-15.5h50.3l6.3 15.5zM64 34.1l16.5 40.2h-33L64 34.1zM7.9 89.9 3.5 21.3 49.7 0 7.9 89.9z"
      ></path>
      <linearGradient
        id={`angular-gradient-b-${random.current}`}
        x1="28.733"
        x2="91.742"
        y1="117.071"
        y2="45.195"
        gradientTransform="matrix(1 0 0 -1 0 130)"
        gradientUnits="userSpaceOnUse"
      >
        <motion.stop
          offset="0"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#ff31d9" },
          )}
        ></motion.stop>
        <motion.stop
          offset="1"
          variants={hoverVariantBuilder(
            {
              stopColor: props.foregroundFill ?? "var(--text-color-secondary)",
            },
            { stopColor: "#ff5be1" },
          )}
          stopOpacity="0"
        ></motion.stop>
      </linearGradient>
      <path
        fill={`url(#angular-gradient-b-${random.current})`}
        d="m124.5 21.3-4.4 68.6L78.3 0l46.2 21.3zm-29 88.7L64 128l-31.5-18 6.4-15.5h50.3l6.3 15.5zM64 34.1l16.5 40.2h-33L64 34.1zM7.9 89.9 3.5 21.3 49.7 0 7.9 89.9z"
      ></path>
    </Svg>
  );
}
