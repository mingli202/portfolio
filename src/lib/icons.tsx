import { useRef, type SVGProps } from "react";
import cn from "./cn";
import type { RecordValues } from "../types";
import {
  motion,
  type SVGMotionProps,
  type Transition,
  type Variant,
  type Variants,
} from "motion/react";

type SvgProps = SVGProps<SVGSVGElement> & {
  title?: string;
  backgroundFill?: string;
  foregroundFill?: string;
} & SVGMotionProps<SVGSVGElement>;

type HoverVariants = {
  initial: Variant;
  whileHover: Variant;
};

const hoverTransition: Transition = {
  type: "tween",
  ease: "easeOut",
  duration: 1,
};

function hoverVariantBuilder(
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

function hoverFillColorVariantBuilder(
  initialFillColor: string,
  hoverFillColor: string,
) {
  return hoverVariantBuilder(
    { fill: initialFillColor },
    { fill: hoverFillColor },
  );
}

function Svg({ className, ...props }: SvgProps) {
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

export function Envelope(props: SvgProps) {
  return (
    <Svg title="Email" {...props}>
      <motion.path
        d="M3.73592 4.5C2.77726 4.5 2.00014 5.27724 2.00031 6.2359L2.00031 6.26829C2.01064 6.81904 2.28199 7.33272 2.732 7.65165L2.74287 7.65929L10.7131 13.2171C11.3897 13.689 12.2609 13.7479 12.9861 13.3941C13.0897 13.3435 13.1904 13.2845 13.287 13.2171L21.2569 7.65949C21.7225 7.33485 21.9999 6.8031 21.9998 6.23554C21.9997 5.27702 21.2229 4.5 20.2644 4.5H3.73592Z"
        variants={hoverVariantBuilder(
          { translateY: 0, fill: "var(--text-color-secondary)" },
          { translateY: -1, fill: "var(--primary-color)" },
        )}
      />
      <motion.path
        d="M22.0001 8.96994L14.145 14.4475C12.8562 15.3462 11.1438 15.3462 9.85507 14.4475L2.00023 8.97012L2 17.25C2 18.4926 3.00736 19.5 4.25 19.5H19.75C20.9926 19.5 22 18.4926 22 17.25L22.0001 8.96994Z"
        variants={{
          initial: { fill: "var(--text-color-secondary)" },
          whileHover: { fill: "var(--primary-color)" },
        }}
      />
    </Svg>
  );
}

export function Linkedin(props: SvgProps) {
  return (
    <Svg title="Linkedin" viewBox="0 0 128 128" {...props}>
      <motion.path
        d="M116 3H12a8.91 8.91 0 00-9 8.8v104.42a8.91 8.91 0 009 8.78h104a8.93 8.93 0 009-8.81V11.77A8.93 8.93 0 00116 3z"
        variants={hoverVariantBuilder(
          { fill: "var(--text-color-secondary)" },
          { fill: "#0076b2" },
        )}
      ></motion.path>
      <motion.path
        d="M21.06 48.73h18.11V107H21.06zm9.06-29a10.5 10.5 0 11-10.5 10.49 10.5 10.5 0 0110.5-10.49M50.53 48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75v32H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53z"
        variants={hoverVariantBuilder(
          { fill: "var(--background-color)" },
          { fill: "#ffffff" },
        )}
      ></motion.path>
    </Svg>
  );
}

export function Github(props: SvgProps) {
  return (
    <Svg title="Github" {...props} viewBox="0 0 128 128">
      <motion.g className="-translate-y-[3px]">
        <motion.path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M64 5.103c-33.347 0-60.388 27.035-60.388 60.388 0 26.682 17.303 49.317 41.297 57.303 3.017.56 4.125-1.31 4.125-2.905 0-1.44-.056-6.197-.082-11.243-16.8 3.653-20.345-7.125-20.345-7.125-2.747-6.98-6.705-8.836-6.705-8.836-5.48-3.748.413-3.67.413-3.67 6.063.425 9.257 6.223 9.257 6.223 5.386 9.23 14.127 6.562 17.573 5.02.542-3.903 2.107-6.568 3.834-8.076-13.413-1.525-27.514-6.704-27.514-29.843 0-6.593 2.36-11.98 6.223-16.21-.628-1.52-2.695-7.662.584-15.98 0 0 5.07-1.623 16.61 6.19C53.7 35 58.867 34.327 64 34.304c5.13.023 10.3.694 15.127 2.033 11.526-7.813 16.59-6.19 16.59-6.19 3.287 8.317 1.22 14.46.593 15.98 3.872 4.23 6.215 9.617 6.215 16.21 0 23.194-14.127 28.3-27.574 29.796 2.167 1.874 4.097 5.55 4.097 11.183 0 8.08-.07 14.583-.07 16.572 0 1.607 1.088 3.49 4.148 2.897 23.98-7.994 41.263-30.622 41.263-57.294C124.388 32.14 97.35 5.104 64 5.104z"
          variants={hoverVariantBuilder(
            { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
            { fill: "#fff" },
          )}
        ></motion.path>
        <motion.path
          d="M26.484 91.806c-.133.3-.605.39-1.035.185-.44-.196-.685-.605-.543-.906.13-.31.603-.395 1.04-.188.44.197.69.61.537.91zm2.446 2.729c-.287.267-.85.143-1.232-.28-.396-.42-.47-.983-.177-1.254.298-.266.844-.14 1.24.28.394.426.472.984.17 1.255zM31.312 98.012c-.37.258-.976.017-1.35-.52-.37-.538-.37-1.183.01-1.44.373-.258.97-.025 1.35.507.368.545.368 1.19-.01 1.452zm3.261 3.361c-.33.365-1.036.267-1.552-.23-.527-.487-.674-1.18-.343-1.544.336-.366 1.045-.264 1.564.23.527.486.686 1.18.333 1.543zm4.5 1.951c-.147.473-.825.688-1.51.486-.683-.207-1.13-.76-.99-1.238.14-.477.823-.7 1.512-.485.683.206 1.13.756.988 1.237zm4.943.361c.017.498-.563.91-1.28.92-.723.017-1.308-.387-1.315-.877 0-.503.568-.91 1.29-.924.717-.013 1.306.387 1.306.88zm4.598-.782c.086.485-.413.984-1.126 1.117-.7.13-1.35-.172-1.44-.653-.086-.498.422-.997 1.122-1.126.714-.123 1.354.17 1.444.663zm0 0"
          variants={hoverVariantBuilder(
            { fill: props.backgroundFill ?? "var(--text-color-secondary)" },
            { fill: "#fff" },
          )}
        ></motion.path>
      </motion.g>
    </Svg>
  );
}

export function MapMarker(props: SvgProps) {
  const pathVariants: HoverVariants = hoverVariantBuilder(
    { rotateY: 0, fill: "var(--text-color-secondary)" },
    { rotateY: 180, fill: "var(--primary-color)" },
  );

  return (
    <Svg title="Location" viewBox="0 0 24 26" {...props}>
      <motion.path
        d="M5.03125 10.392C5.03125 6.26528 8.3766 2.91992 12.5033 2.91992C16.63 2.91992 19.9754 6.26528 19.9754 10.392C19.9754 13.194 18.9108 15.7454 17.6454 17.7938C16.3778 19.8458 14.8791 21.441 13.9389 22.3454C13.139 23.1148 11.9045 23.1163 11.1026 22.3493C10.1581 21.4458 8.65084 19.8507 7.37569 17.7982C6.1028 15.7493 5.03125 13.1963 5.03125 10.392ZM9.50391 10.3906C9.50391 12.0475 10.8471 13.3906 12.5039 13.3906C14.1608 13.3906 15.5039 12.0475 15.5039 10.3906C15.5039 8.73377 14.1608 7.39062 12.5039 7.39062C10.8471 7.39062 9.50391 8.73377 9.50391 10.3906Z"
        className="origin-center scale-105"
        variants={pathVariants}
      />
    </Svg>
  );
}

export function TypeScript(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="TypeScript" {...props}>
      <motion.path
        d="M22.67 47h99.67v73.67H22.67z"
        variants={hoverVariantBuilder(
          { fill: props.backgroundFill ?? "var(--background-color)" },
          { fill: "#ffffff" },
        )}
      ></motion.path>
      <motion.path
        data-name="original"
        d="M1.5 63.91v62.5h125v-125H1.5zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1 23 23 0 01-12.72-6.63c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73L82 101l3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51 59h21.83z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#007acc" },
        )}
      ></motion.path>
    </Svg>
  );
}

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

export function TailwindCss(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Tailwind CSS" {...props}>
      <motion.path
        d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#38bdf8" },
        )}
      ></motion.path>
    </Svg>
  );
}

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

export function React(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="React" {...props}>
      <motion.circle
        cx="64"
        cy="64"
        r="11.4"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#61DAFB" },
        )}
      ></motion.circle>
      <motion.path
        d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21l-3.6-6c3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3-1.1-2.1-2.2-4.2-3.4-6.2zM31.7 35c-1.7-10.5-.3-17.9 3.8-20.3 1-.6 2.2-.9 3.5-.9 6 0 13.5 4.9 21 12.3-3.5 3.8-7 8.2-10.4 13-5.8.5-11.3 1.4-16.5 2.5-.6-2.3-1-4.5-1.4-6.6zM7 64c0-4.7 5.7-9.7 15.7-13.4 2-.8 4.2-1.5 6.4-2.1 1.6 5 3.6 10.3 6 15.6-2.4 5.3-4.5 10.5-6 15.5C15.3 75.6 7 69.6 7 64zm28.5 49.3c-4.1-2.4-5.5-9.8-3.8-20.3.3-2.1.8-4.3 1.4-6.6 5.2 1.2 10.7 2 16.5 2.5 3.4 4.8 6.9 9.1 10.4 13-7.4 7.3-14.9 12.3-21 12.3-1.3 0-2.5-.3-3.5-.9zM96.3 93c1.7 10.5.3 17.9-3.8 20.3-1 .6-2.2.9-3.5.9-6 0-13.5-4.9-21-12.3 3.5-3.8 7-8.2 10.4-13 5.8-.5 11.3-1.4 16.5-2.5.6 2.3 1 4.5 1.4 6.6zm9-15.6c-2 .8-4.2 1.5-6.4 2.1-1.6-5-3.6-10.3-6-15.6 2.4-5.3 4.5-10.5 6-15.5 13.8 4 22.1 10 22.1 15.6 0 4.7-5.8 9.7-15.7 13.4z"
        variants={hoverVariantBuilder(
          { fill: props.foregroundFill ?? "var(--text-color-secondary)" },
          { fill: "#61DAFB" },
        )}
      ></motion.path>
    </Svg>
  );
}

export function Rust(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Rust" {...props}>
      <defs>
        <linearGradient id="rust-gradient-a" gradientTransform="rotate(90)">
          <stop offset="0" stop-color="oklch(70.5% 0.213 47.604)" />
          <stop offset="1" stop-color="oklch(79.5% 0.184 86.047)" />
        </linearGradient>
      </defs>

      <path
        d="M62.96.242c-.232.135-1.203 1.528-2.16 3.097-2.4 3.94-2.426 3.942-5.65.55-2.098-2.208-2.605-2.612-3.28-2.607-.44.002-.995.152-1.235.332-.24.18-.916 1.612-1.504 3.183-1.346 3.6-1.41 3.715-2.156 3.86-.46.086-1.343-.407-3.463-1.929-1.565-1.125-3.1-2.045-3.411-2.045-1.291 0-1.655.706-2.27 4.4-.78 4.697-.754 4.681-4.988 2.758-1.71-.776-3.33-1.41-3.603-1.41-.274 0-.792.293-1.15.652-.652.652-.653.655-.475 4.246l.178 3.595-.68.364c-.602.322-1.017.283-3.684-.348-3.48-.822-4.216-.8-4.92.15l-.516.693.692 2.964c.38 1.63.745 3.2.814 3.487.067.287-.05.746-.26 1.02-.348.448-.717.49-3.94.44-5.452-.086-5.761.382-3.51 5.3.718 1.56 1.305 2.98 1.305 3.15 0 .898-.717 1.224-3.794 1.727-1.722.28-3.218.51-3.326.51-.107 0-.43.235-.717.522-.937.936-.671 1.816 1.453 4.814 2.646 3.735 2.642 3.75-1.73 5.421-4.971 1.902-5.072 2.37-1.287 5.96 3.525 3.344 3.53 3.295-.461 5.804C.208 62.8.162 62.846.085 63.876c-.093 1.253-.071 1.275 3.538 3.48 3.57 2.18 3.57 2.246.067 5.56C-.078 76.48.038 77 5.013 78.877c4.347 1.64 4.353 1.66 1.702 5.394-1.502 2.117-1.981 3-1.981 3.653 0 1.223.637 1.535 4.44 2.174 3.206.54 3.92.857 3.92 1.741 0 .182-.588 1.612-1.307 3.177-2.236 4.87-1.981 5.275 3.31 5.275 4.93 0 4.799-.15 3.737 4.294-.8 3.35-.813 3.992-.088 4.715.554.556 1.6.494 4.87-.289 2.499-.596 2.937-.637 3.516-.328l.66.354-.177 3.594c-.178 3.593-.177 3.595.475 4.248.358.36.884.652 1.165.652.282 0 1.903-.63 3.604-1.404 4.22-1.916 4.194-1.932 4.973 2.75.617 3.711.977 4.4 2.294 4.4.327 0 1.83-.88 3.34-1.958 2.654-1.893 3.342-2.19 4.049-1.74.182.115.89 1.67 1.572 3.455 1.003 2.625 1.37 3.31 1.929 3.576 1.062.51 1.72.1 4.218-2.62 3.016-3.286 3.14-3.27 5.602.72 2.72 4.406 3.424 4.396 6.212-.089 2.402-3.864 2.374-3.862 5.621-.47 2.157 2.25 2.616 2.61 3.343 2.61.464 0 1.019-.175 1.23-.388.214-.213.92-1.786 1.568-3.496.649-1.71 1.321-3.2 1.495-3.31.687-.436 1.398-.13 4.048 1.752 1.56 1.108 3.028 1.96 3.377 1.96 1.296 0 1.764-.92 2.302-4.535.46-3.082.554-3.378 1.16-3.685.596-.302.954-.2 3.75 1.07 1.701.77 3.323 1.402 3.604 1.402.282 0 .816-.302 1.184-.672l.672-.67-.184-3.448c-.177-3.29-.16-3.468.364-3.943.54-.488.596-.486 3.615.204 3.656.835 4.338.857 5.025.17.671-.67.664-.818-.254-4.69-1.03-4.346-1.168-4.19 3.78-4.19 3.374 0 3.75-.049 4.18-.523.718-.793.547-1.702-.896-4.779-.729-1.55-1.32-2.96-1.315-3.135.024-.914.743-1.227 4.065-1.767 2.033-.329 3.553-.71 3.829-.96.923-.833.584-1.918-1.523-4.873-2.642-3.703-2.63-3.738 1.599-5.297 5.064-1.866 5.209-2.488 1.419-6.09-3.51-3.335-3.512-3.317.333-5.677 4.648-2.853 4.655-3.496.082-6.335-3.933-2.44-3.93-2.406-.405-5.753 3.78-3.593 3.678-4.063-1.295-5.965-4.388-1.679-4.402-1.72-1.735-5.38 1.588-2.18 1.982-2.903 1.982-3.65 0-1.306-.586-1.598-4.436-2.22-3.216-.52-3.924-.835-3.924-1.75 0-.174.588-1.574 1.307-3.113 1.406-3.013 1.604-4.22.808-4.94-.428-.387-1-.443-4.067-.392-3.208.054-3.618.008-4.063-.439-.486-.488-.48-.557.278-3.725.931-3.88.935-3.975.17-4.694-.777-.73-1.262-.718-4.826.121-2.597.612-3.027.653-3.617.337l-.67-.36.185-3.582.186-3.58-.67-.67c-.369-.37-.891-.67-1.163-.67-.27 0-1.884.64-3.583 1.421-2.838 1.306-3.143 1.393-3.757 1.072-.612-.32-.714-.637-1.237-3.829-.603-3.693-.977-4.412-2.288-4.412-.311 0-1.853.925-3.426 2.055-2.584 1.856-2.93 2.032-3.574 1.807-.533-.186-.843-.59-1.221-1.599-.28-.742-.817-2.172-1.194-3.177-.762-2.028-1.187-2.482-2.328-2.482-.637 0-1.213.458-3.28 2.604-3.25 3.375-3.261 3.374-5.65-.545C66.073 1.78 65.075.382 64.81.24c-.597-.32-1.3-.32-1.85.002m2.96 11.798c2.83 2.014 1.326 6.75-2.144 6.75-3.368 0-5.064-4.057-2.66-6.36 1.358-1.3 3.304-1.459 4.805-.39m-3.558 12.507c1.855.705 2.616.282 6.852-3.8l3.182-3.07 1.347.18c4.225.56 12.627 4.25 17.455 7.666 4.436 3.14 10.332 9.534 12.845 13.93l.537.942-2.38 5.364c-1.31 2.95-2.382 5.673-2.382 6.053 0 .878.576 2.267 1.13 2.726.234.195 2.457 1.265 4.939 2.378l4.51 2.025.178 1.148c.23 1.495.26 5.167.052 6.21l-.163.816h-2.575c-2.987 0-2.756-.267-2.918 3.396-.118 2.656-.76 4.124-2.22 5.075-2.377 1.551-6.304 1.27-7.97-.57-.255-.284-.752-1.705-1.105-3.16-1.03-4.254-2.413-6.64-5.193-8.965-.878-.733-1.595-1.418-1.595-1.522 0-.102.965-.915 2.145-1.803 4.298-3.24 6.77-7.012 7.04-10.747.519-7.126-5.158-13.767-13.602-15.92-2.002-.51-2.857-.526-27.624-.526-14.057 0-25.56-.092-25.56-.204 0-.263 3.125-3.295 4.965-4.816 5.054-4.178 11.618-7.465 18.417-9.22l2.35-.61 3.34 3.387c1.839 1.863 3.64 3.5 4.003 3.637M20.3 46.34c1.539 1.008 2.17 3.54 1.26 5.062-1.405 2.356-4.966 2.455-6.373.178-2.046-3.309 1.895-7.349 5.113-5.24m90.672.13c4.026 2.454.906 8.493-3.404 6.586-2.877-1.273-2.97-5.206-.155-6.64 1.174-.6 2.523-.579 3.56.053M32.163 61.5v15.02h-13.28l-.526-2.285c-1.036-4.5-1.472-9.156-1.211-12.969l.182-2.679 4.565-2.047c2.864-1.283 4.706-2.262 4.943-2.625 1.038-1.584.94-2.715-.518-5.933l-.68-1.502h6.523V61.5M70.39 47.132c2.843.74 4.345 2.245 4.349 4.355.002 1.55-.765 2.52-2.67 3.38-1.348.61-1.562.625-10.063.708l-8.686.084v-8.92h7.782c6.078 0 8.112.086 9.288.393m-2.934 21.554c1.41.392 3.076 1.616 3.93 2.888.898 1.337 1.423 3.076 2.667 8.836 1.05 4.87 1.727 6.46 3.62 8.532 2.345 2.566 1.8 2.466 13.514 2.466 5.61 0 10.198.09 10.198.2 0 .197-3.863 4.764-4.03 4.764-.048 0-2.066-.422-4.484-.939-6.829-1.458-7.075-1.287-8.642 6.032l-1.008 4.702-.91.448c-1.518.75-6.453 2.292-9.01 2.82-4.228.87-8.828 1.162-12.871.821-6.893-.585-16.02-3.259-16.377-4.8-.075-.327-.535-2.443-1.018-4.704-.485-2.26-1.074-4.404-1.31-4.764-1.13-1.724-2.318-1.83-7.547-.674-1.98.44-3.708.796-3.84.796-.248 0-3.923-4.249-3.923-4.535 0-.09 8.728-.194 19.396-.23l19.395-.066.07-6.89c.05-4.865-.018-6.997-.23-7.25-.234-.284-1.485-.358-6.011-.358H53.32v-8.36l6.597.001c3.626.002 7.02.12 7.539.264M37.57 100.02c3.084 1.88 1.605 6.804-2.043 6.8-3.74 0-5.127-4.88-1.94-6.826 1.055-.643 2.908-.63 3.983.026m56.48.206c1.512 1.108 2.015 3.413 1.079 4.95-2.46 4.034-8.612.827-6.557-3.419 1.01-2.085 3.695-2.837 5.478-1.53"
        className="group-hover:fill-[url(#rust-gradient-a)]"
      ></path>
    </Svg>
  );
}

export function Python(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Python" {...props}>
      <linearGradient
        id="python-original-a"
        gradientUnits="userSpaceOnUse"
        x1="70.252"
        y1="1237.476"
        x2="170.659"
        y2="1151.089"
        gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
      >
        <stop offset="0" stop-color="#5A9FD4"></stop>
        <stop offset="1" stop-color="#306998"></stop>
      </linearGradient>
      <linearGradient
        id="python-original-b"
        gradientUnits="userSpaceOnUse"
        x1="209.474"
        y1="1098.811"
        x2="173.62"
        y2="1149.537"
        gradientTransform="matrix(.563 0 0 -.568 -29.215 707.817)"
      >
        <stop offset="0" stop-color="#FFD43B"></stop>
        <stop offset="1" stop-color="#FFE873"></stop>
      </linearGradient>
      <path
        d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137H29.977c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491V67.234c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548V15.833c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zM50.037 9.557c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
        transform="translate(0 10.26)"
        className="group-hover:fill-[url(#python-original-a)]"
      ></path>
      <path
        d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655H51.591c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412H63.938v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zM77.809 87.927c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
        transform="translate(0 10.26)"
        className="group-hover:fill-[url(#python-original-b)]"
      ></path>
    </Svg>
  );
}

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

export function Docker(props: SvgProps) {
  const svgVariants: Variants = {
    initial: {},
    whileHover: {},
  };

  return (
    <Svg
      title="Docker"
      viewBox="0 0 128 128"
      variants={svgVariants}
      initial="initial"
      whileHover="whileHover"
      {...props}
    >
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#3A4D54",
        )}
        d="M73.8 50.8h11.3v11.5h5.7c2.6 0 5.3-.5 7.8-1.3 1.2-.4 2.6-1 3.8-1.7-1.6-2.1-2.4-4.7-2.6-7.3-.3-3.5.4-8.1 2.8-10.8l1.2-1.4 1.4 1.1c3.6 2.9 6.5 6.8 7.1 11.4 4.3-1.3 9.3-1 13.1 1.2l1.5.9-.8 1.6c-3.2 6.2-9.9 8.2-16.4 7.8-9.8 24.3-31 35.8-56.8 35.8-13.3 0-25.5-5-32.5-16.8l-.1-.2-1-2.1c-2.4-5.2-3.1-10.9-2.6-16.6l.2-1.7h9.6V50.8h11.3V39.6h22.5V28.3h13.5v22.5z"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#00AADA",
        )}
        d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7H18.6c-.6 6.2.5 11.9 3 16.8l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5 1.1-8.3 1.3h-.6c-1.3.1-2.7.1-4.2.1-1.6 0-3.1 0-4.9-.1 6 6.8 15.4 10.8 27.2 10.8 25 0 46.2-11.1 55.5-35.9 6.7.7 13.1-1 16-6.7-4.5-2.7-10.5-1.8-13.9-.1z"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#28B8EB",
        )}
        d="M110.4 55.1c.8-5.9-3.6-10.5-6.4-12.7-3.1 3.6-3.6 13.2 1.3 17.2-2.8 2.4-8.5 4.7-14.5 4.7h-68c-.3 9.5 3.2 16.7 9.5 21 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4l-.1-.1c8.5 4.4 20.8 4.3 35-1.1 15.8-6.1 30.6-17.7 40.9-30.9-.2.1-.4.1-.5.2z"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#028BB8",
        )}
        d="M18.7 71.8c.4 3.3 1.4 6.4 2.9 9.3l.8 1.5c.5.9 1.1 1.7 1.7 2.6 3 .2 5.7.3 8.2.2 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.5 1.4h-.4c-1.3.1-2.7.1-4.1.1-1.6 0-3.2 0-4.9-.1 6 6.8 15.5 10.8 27.3 10.8 21.4 0 40-8.1 50.8-26H18.7v-.1z"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--primary-color)",
          "#019BC6",
        )}
        d="M23.5 71.8c1.3 5.8 4.3 10.4 8.8 13.5 4.9-.1 8.9-.7 12-1.7.5-.2.9.1 1.1.5.2.5-.1.9-.5 1.1-.4.1-.8.3-1.3.4-2.4.7-5.2 1.2-8.6 1.4 8.5 4.4 20.8 4.3 34.9-1.1 8.5-3.3 16.8-8.2 24.2-14.1H23.5z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#00ACD3",
        )}
        d="M28.4 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3-12h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#23C2EE",
        )}
        d="M39.6 52.7h9.8v9.8h-9.8v-9.8zm.9.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#00ACD3",
        )}
        d="M50.9 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#23C2EE",
        )}
        d="M50.9 41.5h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm3.1 10.4H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#00ACD3",
        )}
        d="M62.2 41.5H72v9.8h-9.8v-9.8zm.8.8h.8v8.1H63v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#23C2EE",
        )}
        d="M62.2 30.2H72V40h-9.8v-9.8zm.8.8h.8v8.1H63V31zm1.5 0h.8v8.1h-.8V31zm1.4 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31zm1.5 0h.8v8.1h-.8V31z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#00ACD3",
        )}
        d="M73.5 52.7h9.8v9.8h-9.8v-9.8zm.8.8h.8v8.1h-.8v-8.1zm1.4 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1zm1.5 0h.8v8.1h-.8v-8.1z"
      />
      <motion.path
        fill-rule="evenodd"
        clip-rule="evenodd"
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#D4EEF1",
        )}
        d="M48.8 78.3c1.5 0 2.7 1.2 2.7 2.7 0 1.5-1.2 2.7-2.7 2.7-1.5 0-2.7-1.2-2.7-2.7 0-1.5 1.2-2.7 2.7-2.7"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#BFDBE0",
        )}
        d="M56 97.8c-6.7-3.2-10.3-7.5-12.4-12.2-2.5.7-5.5 1.2-8.9 1.4-1.3.1-2.7.1-4.1.1-1.7 0-3.4 0-5.2-.1 6 6 13.6 10.7 27.5 10.8H56z"
      />
      <motion.path
        variants={hoverFillColorVariantBuilder(
          "var(--secondary-color)",
          "#D4EEF1",
        )}
        d="M46.1 89.9c-.9-1.3-1.8-2.8-2.5-4.3-2.5.7-5.5 1.2-8.9 1.4 2.3 1.2 5.7 2.4 11.4 2.9z"
      />
    </Svg>
  );
}

export function Firebase(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Firebase" {...props}>
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#ffa000" },
        )}
        d="M17.474 103.276 33.229 2.462a2.91 2.91 0 0 1 5.44-.924l16.294 30.39 6.494-12.366a2.91 2.91 0 0 1 5.15 0l43.97 83.714H17.474Z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#f57c00" },
        )}
        d="M71.903 64.005 54.955 31.913l-37.481 71.363Z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#ffca28" },
        )}
        d="M110.577 103.276 98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.714l-76.112 76.243 42.115 23.618a8.728 8.728 0 0 0 8.51 0l42.478-23.618Z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#fff" },
        )}
        fillOpacity=".2"
        d="M98.51 28.604a2.913 2.913 0 0 0-1.984-2.286 2.906 2.906 0 0 0-2.94.713L78.479 42.178 66.6 19.562a2.91 2.91 0 0 0-5.15 0l-6.494 12.365L38.662 1.538A2.91 2.91 0 0 0 35.605.044a2.907 2.907 0 0 0-2.384 2.425L17.474 103.276h-.051l.05.058.415.204 75.676-75.764a2.91 2.91 0 0 1 4.932 1.571l11.965 74.003.116-.073L98.51 28.603Zm-80.898 74.534L33.228 3.182A2.91 2.91 0 0 1 35.613.756a2.911 2.911 0 0 1 3.057 1.495l16.292 30.39 6.495-12.366a2.91 2.91 0 0 1 5.15 0L78.245 42.41 17.61 103.138Z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#a52714" },
        )}
        d="M68.099 126.18a8.728 8.728 0 0 1-8.51 0l-42.015-23.55-.102.647 42.115 23.61a8.728 8.728 0 0 0 8.51 0l42.48-23.61-.11-.67-42.37 23.575z"
        opacity=".2"
      />
    </Svg>
  );
}

export function CSharp(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="C#" {...props}>
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#9B4F96" },
        )}
        d="M115.4 30.7L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.4 1 3.5l106.8-62c-.6-1.2-1.5-2.1-2.4-2.7z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#68217A" },
        )}
        d="M10.7 95.3c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c0-.9-.1-1.9-.6-2.8l-106.6 62z"
      />
      <motion.path
        variants={hoverVariantBuilder(
          { fill: "var(--secondary-color)" },
          { fill: "#fff" },
        )}
        d="M85.3 76.1C81.1 83.5 73.1 88.5 64 88.5c-13.5 0-24.5-11-24.5-24.5s11-24.5 24.5-24.5c9.1 0 17.1 5 21.3 12.5l13-7.5c-6.8-11.9-19.6-20-34.3-20-21.8 0-39.5 17.7-39.5 39.5s17.7 39.5 39.5 39.5c14.6 0 27.4-8 34.2-19.8l-12.9-7.6zM97 66.2l.9-4.3h-4.2v-4.7h5.1L100 51h4.9l-1.2 6.1h3.8l1.2-6.1h4.8l-1.2 6.1h2.4v4.7h-3.3l-.9 4.3h4.2v4.7h-5.1l-1.2 6h-4.9l1.2-6h-3.8l-1.2 6h-4.8l1.2-6h-2.4v-4.7H97zm4.8 0h3.8l.9-4.3h-3.8l-.9 4.3z"
      />
    </Svg>
  );
}

export function Azure(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Azure" {...props}>
      <defs>
        <linearGradient
          id="azure-original-a"
          x1="60.919"
          y1="9.602"
          x2="18.667"
          y2="134.423"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            variants={hoverVariantBuilder(
              { stopColor: "var(--primary-color)" },
              { stopColor: "#114A8B" },
            )}
          />
          <motion.stop
            offset="1"
            variants={hoverVariantBuilder(
              { stopColor: "var(--primary-color)" },
              { stopColor: "#0669BC" },
            )}
          />
        </linearGradient>
        <linearGradient
          id="azure-original-b"
          x1="74.117"
          y1="67.772"
          x2="64.344"
          y2="71.076"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            variants={hoverVariantBuilder(
              { stopOpacity: "0" },
              { stopOpacity: ".3" },
            )}
          />
          <motion.stop
            offset=".071"
            variants={hoverVariantBuilder(
              { stopOpacity: "0" },
              { stopOpacity: ".2" },
            )}
          />
          <motion.stop
            offset=".321"
            variants={hoverVariantBuilder(
              { stopOpacity: "0" },
              { stopOpacity: ".1" },
            )}
          />
          <motion.stop
            offset=".623"
            variants={hoverVariantBuilder(
              { stopOpacity: "0" },
              { stopOpacity: ".05" },
            )}
          />
          <motion.stop
            offset="1"
            variants={hoverVariantBuilder(
              { stopOpacity: "0" },
              { stopOpacity: "0" },
            )}
          />
        </linearGradient>
        <linearGradient
          id="azure-original-c"
          x1="68.742"
          y1="5.961"
          x2="115.122"
          y2="129.525"
          gradientUnits="userSpaceOnUse"
        >
          <motion.stop
            variants={hoverVariantBuilder(
              { stopColor: "var(--primary-color)" },
              { stopColor: "#3CCBF4" },
            )}
          />

          <motion.stop
            offset="1"
            variants={hoverVariantBuilder(
              { stopColor: "var(--primary-color)" },
              { stopColor: "#2892DF" },
            )}
          />
        </linearGradient>
      </defs>
      <motion.path
        d="M46.09.002h40.685L44.541 125.137a6.485 6.485 0 01-6.146 4.413H6.733a6.482 6.482 0 01-5.262-2.699 6.474 6.474 0 01-.876-5.848L39.944 4.414A6.488 6.488 0 0146.09 0z"
        transform="translate(.587 4.468) scale(.91904)"
        fill="url(#azure-original-a)"
      />
      <motion.path
        d="M97.28 81.607H37.987a2.743 2.743 0 00-1.874 4.751l38.1 35.562a5.991 5.991 0 004.087 1.61h33.574z"
        variants={hoverVariantBuilder(
          { fill: "var(--primary-color)" },
          { fill: "#0078d4" },
        )}
      />
      <motion.path
        d="M46.09.002A6.434 6.434 0 0039.93 4.5L.644 120.897a6.469 6.469 0 006.106 8.653h32.48a6.942 6.942 0 005.328-4.531l7.834-23.089 27.985 26.101a6.618 6.618 0 004.165 1.519h36.396l-15.963-45.616-46.533.011L86.922.002z"
        transform="translate(.587 4.468) scale(.91904)"
        fill="url(#azure-original-b)"
      />
      <motion.path
        d="M98.055 4.408A6.476 6.476 0 0091.917.002H46.575a6.478 6.478 0 016.137 4.406l39.35 116.594a6.476 6.476 0 01-6.137 8.55h45.344a6.48 6.48 0 006.136-8.55z"
        transform="translate(.587 4.468) scale(.91904)"
        fill="url(#azure-original-c)"
      />
    </Svg>
  );
}

export function DotNet(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title=".NET" {...props}>
      <linearGradient
        id="dot-net-original-a"
        gradientUnits="userSpaceOnUse"
        x1="61.631"
        y1="563.347"
        x2="62.022"
        y2="563.347"
        gradientTransform="matrix(0 149.735 149.735 0 -84296.266 -9188.014)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0994DC" },
          }}
        />
        <motion.stop
          offset=".35"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#66CEF5" },
          }}
        />
        <motion.stop
          offset=".35"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#66CEF5" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#127BCA" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#127BCA" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#127BCA" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-a)"
        d="M45.288 49.559c4.417 13.507 6.09 37.601 19.006 37.601.982 0 1.977-.096 2.974-.286-11.74-2.737-13.132-26.569-20.297-38.912a61.601 61.601 0 00-1.683 1.597"
      ></path>
      <linearGradient
        id="dot-net-original-b"
        gradientUnits="userSpaceOnUse"
        x1="61.705"
        y1="563.34"
        x2="62.095"
        y2="563.34"
        gradientTransform="matrix(0 153.551 153.551 0 -86442.719 -9435.969)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0E76BC" },
          }}
        />
        <motion.stop
          offset=".36"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#36AEE8" },
          }}
        />
        <motion.stop
          offset=".36"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#36AEE8" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#00ADEF" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#00ADEF" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#00ADEF" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-b)"
        d="M46.971 47.962c7.165 12.342 8.557 36.174 20.297 38.912a18.621 18.621 0 002.773-.749C59.502 80.961 56.59 57.819 48.453 46.678c-.492.41-.987.839-1.482 1.284"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#14559A" },
        }}
        d="M57.294 40.623c-.98 0-1.977.096-2.977.286-2.612.493-5.268 1.618-7.944 3.321.73.722 1.427 1.547 2.081 2.448 2.723-2.259 5.427-3.928 8.12-4.932a18.177 18.177 0 013.029-.842 9.393 9.393 0 00-2.309-.281"
      />
      <linearGradient
        id="dot-net-original-c"
        gradientUnits="userSpaceOnUse"
        x1="67.486"
        y1="564.985"
        x2="67.876"
        y2="564.985"
        gradientTransform="matrix(0 -122.178 -122.178 0 69099.289 8331.043)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1C63B7" },
          }}
        />
        <motion.stop
          offset=".5"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#33BDF2" },
          }}
        />
        <motion.stop
          offset="1"
          stopOpacity=".42"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#33BDF2" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-c)"
        d="M78.268 81.366a47.16 47.16 0 003.24-2.84c-4.488-13.443-6.095-37.883-19.101-37.883-.93 0-1.868.087-2.804.26C71.45 43.85 72.968 69.625 78.268 81.366"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#3092C4" },
        }}
        d="M59.604 40.904a9.355 9.355 0 00-2.311-.282l5.114.019c-.929 0-1.867.086-2.803.263"
      />
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#1969BC" },
        }}
        d="M78.04 84.221a19.441 19.441 0 01-1.466-1.584c-2.188 1.549-4.368 2.724-6.533 3.489.771.376 1.578.656 2.436.829.664.136 1.353.206 2.075.206 2.431 0 4.353-.288 5.987-1.072-.9-.488-1.726-1.118-2.499-1.868"
      />
      <linearGradient
        id="dot-net-original-d"
        gradientUnits="userSpaceOnUse"
        x1="61.852"
        y1="563.281"
        x2="62.243"
        y2="563.281"
        gradientTransform="matrix(0 159.425 159.425 0 -89733.742 -9828.116)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#166AB8" },
          }}
        />
        <motion.stop
          offset=".4"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#36AEE8" },
          }}
        />
        <motion.stop
          offset=".4"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#36AEE8" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0798DD" },
          }}
        />
        <motion.stop
          offset=".846"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0798DD" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0798DD" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-d)"
        d="M56.573 41.748c10.611 5.55 11.534 30.684 20.001 40.889.568-.4 1.13-.824 1.691-1.271-5.3-11.741-6.815-37.519-18.66-40.463-1.011.189-2.02.469-3.032.845"
      ></path>
      <linearGradient
        id="dot-net-original-e"
        gradientUnits="userSpaceOnUse"
        x1="61.975"
        y1="563.367"
        x2="62.366"
        y2="563.367"
        gradientTransform="matrix(0 169.528 169.528 0 -95443.742 -10473.372)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#124379" },
          }}
        />
        <motion.stop
          offset=".39"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1487CB" },
          }}
        />
        <motion.stop
          offset=".39"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1487CB" },
          }}
        />
        <motion.stop
          offset=".78"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#165197" },
          }}
        />
        <motion.stop
          offset=".78"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#165197" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#165197" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-e)"
        d="M48.453 46.678c8.137 11.141 11.049 34.284 21.588 39.448 2.166-.765 4.346-1.939 6.533-3.489-8.467-10.205-9.39-35.338-20.001-40.889-2.693 1.002-5.397 2.671-8.12 4.93"
      ></path>
      <linearGradient
        id="dot-net-original-f"
        gradientUnits="userSpaceOnUse"
        x1="1006.454"
        y1="-1412.08"
        x2="1008.771"
        y2="-1412.08"
        gradientTransform="matrix(4.038 0 0 -4.038 -4028.633 -5649.283)"
      >
        <motion.stop
          offset="0"
          stopOpacity=".698"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#33BDF2" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1DACD8" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-f)"
        d="M40.083 49.234c-1.275 2.883-2.578 6.674-4.152 11.621 3.131-4.413 6.253-8.214 9.357-11.295a33.873 33.873 0 00-1.382-3.606 46.113 46.113 0 00-3.823 3.28"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#2B74B1" },
        }}
        d="M45.037 45.121c-.374.268-.751.542-1.13.832.495 1.08.953 2.292 1.38 3.607a66.502 66.502 0 011.684-1.597 22.346 22.346 0 00-1.934-2.842"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#125A9E" },
        }}
        d="M46.373 44.229c-.445.282-.888.58-1.337.891.695.855 1.333 1.81 1.936 2.844.495-.448.989-.879 1.482-1.287-.654-.9-1.35-1.726-2.081-2.448"
      ></motion.path>
      <linearGradient
        id="dot-net-original-g"
        gradientUnits="userSpaceOnUse"
        x1="67.564"
        y1="565.48"
        x2="67.954"
        y2="565.48"
        gradientTransform="matrix(0 -119.018 -119.018 0 67408.578 8125.832)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#136AB4" },
          }}
        />
        <motion.stop
          offset=".6"
          stopOpacity=".549"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#59CAF5" },
          }}
        />
        <motion.stop
          offset="1"
          stopOpacity=".235"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#59CAF5" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-g)"
        d="M118.751 39.594c-6.001 23.144-18.536 41.734-29.044 46.42h-.021l-.567.243-.069.027-.161.062-.072.03-.263.093-.108.038-.131.043-.126.044-.112.038-.224.068-.096.025-.151.041-.103.028-.165.043-.201.044c.475.175.97.264 1.503.264 9.965 0 20.013-17.858 36.638-47.556h-6.528l.001.005z"
      ></path>
      <linearGradient
        id="dot-net-original-h"
        gradientUnits="userSpaceOnUse"
        x1="998.231"
        y1="-1414.829"
        x2="1006.826"
        y2="-1414.829"
        gradientTransform="matrix(4.038 0 0 -4.038 -4028.633 -5649.283)"
      >
        <motion.stop
          offset="0"
          stopOpacity=".247"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-h)"
        d="M33.766 41.563l.019-.016.023-.015h.013l.161-.062.032-.016.042-.017.173-.062h.009l.383-.134.057-.015.164-.049.075-.024.165-.049.063-.017.548-.142.075-.017.16-.031.078-.024.161-.03h.038l.333-.062h.066l.154-.027.087-.015.147-.022.081-.016.358-.032a11.467 11.467 0 00-1.061-.054c-11.223 0-26.685 20.822-33.649 47.788h1.343a390.312 390.312 0 006.062-11.266c4.879-19.1 14.814-32.126 23.64-35.577"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#0D82CA" },
        }}
        d="M40.083 49.234a46.488 46.488 0 013.823-3.281 17.961 17.961 0 00-.911-1.761c-1.026 1.246-1.964 2.89-2.912 5.042"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#0D82CA" },
        }}
        d="M41.005 41.72c.733.614 1.39 1.46 1.99 2.473.189-.232.381-.447.58-.649a11.263 11.263 0 00-2.712-1.897l.12.057.022.016"
      ></motion.path>
      <linearGradient
        id="dot-net-original-i"
        gradientUnits="userSpaceOnUse"
        x1="67.491"
        y1="564.359"
        x2="67.881"
        y2="564.359"
        gradientTransform="matrix(0 -121.865 -121.865 0 68797.742 8310.488)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#318ED5" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#38A7E4" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-i)"
        d="M10.127 77.138c10.233-19.719 15.081-32.199 23.64-35.577-8.825 3.454-18.762 16.479-23.64 35.577"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#127BCA" },
        }}
        d="M43.574 43.544c-.199.204-.389.417-.58.649.322.538.621 1.124.913 1.76.378-.29.756-.563 1.129-.832a15.351 15.351 0 00-1.462-1.577"
      ></motion.path>
      <linearGradient
        id="dot-net-original-j"
        gradientUnits="userSpaceOnUse"
        x1="67.593"
        y1="564.41"
        x2="67.984"
        y2="564.41"
        gradientTransform="matrix(0 -118.46 -118.46 0 66884.703 8093.017)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
        <motion.stop
          offset="1"
          stopOpacity=".549"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-j)"
        d="M14.773 88.315l-.186.022h-.035l-.158.016h-.026l-.376.025h-.039c10.356-.29 15.091-5.475 17.44-12.997 1.785-5.701 3.252-10.505 4.537-14.535-4.338 6.106-8.696 13.384-13.077 21.539-2.112 3.93-5.325 5.572-8.08 5.922"
      ></path>
      <linearGradient
        id="dot-net-original-k"
        gradientUnits="userSpaceOnUse"
        x1="68.291"
        y1="564.525"
        x2="68.682"
        y2="564.525"
        gradientTransform="matrix(0 -100.1 -100.1 0 56536.551 6924.301)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1959A6" },
          }}
        />
        <motion.stop
          offset=".5"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
        <motion.stop
          offset=".5"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
        <motion.stop
          offset=".918"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#7EC5EA" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#7EC5EA" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-k)"
        d="M14.773 88.311c2.755-.351 5.968-1.991 8.08-5.923 4.381-8.151 8.741-15.431 13.075-21.538 1.577-4.949 2.878-8.737 4.154-11.621-8.639 8.223-17.311 21.896-25.31 39.077"
      ></path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#05A1E6" },
        }}
        d="M10.127 77.139a388.004 388.004 0 01-6.063 11.266h3.904a95.502 95.502 0 012.158-11.264"
      ></motion.path>
      <linearGradient
        id="dot-net-original-l"
        gradientUnits="userSpaceOnUse"
        x1="67.892"
        y1="563.82"
        x2="68.282"
        y2="563.82"
        gradientTransform="scale(-110.211 110.211) rotate(-80 -301.688 322.91)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#165096" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0D82CA" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-l)"
        d="M37.073 40.709l-.083.016-.146.021-.086.015-.154.027-.066.016-.333.058h-.038l-.162.032-.081.022-.157.031-.074.018-.549.142-.063.018-.166.049-.075.021-.163.049-.06.016-.381.134-.173.06-.072.03-.161.06-.054.026c-8.558 3.377-13.406 15.857-23.639 35.576A94.655 94.655 0 007.979 88.41h.547l3.755-.016h1.723l.375-.025h.024l.158-.016h.037l.186-.022c8-17.182 16.672-30.854 25.31-39.077.95-2.152 1.887-3.796 2.911-5.04-.6-1.013-1.256-1.861-1.988-2.476l-.021-.016-.122-.059-.121-.061-.117-.057-.139-.058-.108-.047-.227-.095-.097-.036-.169-.068-.091-.03-.235-.081h-.019l-.272-.077-.061-.019-.229-.064-.053-.015a7.851 7.851 0 00-.569-.125l-.059-.016-.247-.04-.049-.015-.292-.039h-.051l-.226-.025-.358.033"
      ></path>
      <linearGradient
        id="dot-net-original-m"
        gradientUnits="userSpaceOnUse"
        x1="70.847"
        y1="566.882"
        x2="71.237"
        y2="566.882"
        gradientTransform="matrix(0 -56.721 -56.721 0 32252.127 4080.282)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#05A1E6" },
          }}
        />
        <motion.stop
          offset=".874"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0495D6" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0495D6" },
          }}
        />
      </linearGradient>
      <path
        fill="url(#dot-net-original-m)"
        d="M95.311 52.407c-1.97 6.307-3.563 11.51-4.952 15.791 5.403-7.435 10.725-16.787 15.792-27.579-5.913 1.857-9.065 6.107-10.84 11.788"
      ></path>
      <linearGradient
        id="dot-net-original-n"
        gradientUnits="userSpaceOnUse"
        x1="61.634"
        y1="562.213"
        x2="62.024"
        y2="562.213"
        gradientTransform="scale(-132.813 132.813) rotate(80 365.248 244.034)"
      >
        <motion.stop
          offset="0"
          stopOpacity=".329"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#38A7E4" },
          }}
        />
        <motion.stop
          offset=".962"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0E88D3" },
          }}
        />
        <motion.stop
          offset=".962"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0E88D3" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#0E88D3" },
          }}
        />
      </linearGradient>
      <motion.path
        fill="url(#dot-net-original-n)"
        d="M90.53 85.621c-.275.14-.552.273-.823.394 10.508-4.687 23.044-23.277 29.044-46.421h-1.216c-13.788 24.631-18.222 41.12-27.005 46.027"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#079AE1" },
        }}
        d="M83.668 83.552c2.287-2.791 4.148-7.535 6.691-15.354-2.933 4.029-5.885 7.492-8.84 10.316l-.015.025c.645 1.931 1.352 3.636 2.158 5.012"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#1969BC" },
        }}
        d="M83.668 83.552c-.778.95-1.603 1.673-2.519 2.209-.2.117-.404.227-.61.327a8.839 8.839 0 003.206 1.011l.524.046h.031l.252.016h.855l.097-.016.189-.016h.092l.205-.022h.017l.063-.015.219-.034h.064l.246-.041h.04l.491-.104c-1.357-.496-2.492-1.667-3.469-3.334"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#1E5CB3" },
        }}
        d="M64.295 87.161c.982 0 1.976-.096 2.973-.288a18.309 18.309 0 002.773-.747c.771.376 1.579.656 2.435.831.664.135 1.354.205 2.077.205H64.295zM74.553 87.161c2.429 0 4.353-.288 5.986-1.073a8.84 8.84 0 003.206 1.012l.524.045h.031l.252.016h.302-10.301z"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#1D60B5" },
        }}
        d="M84.854 87.161h.561l.097-.016.191-.016h.092l.204-.022h.017l.062-.016.219-.033.067-.015.247-.04h.039l.491-.104c.475.175.97.264 1.503.264l-3.788.016-.002-.018z"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#175FAB" },
        }}
        d="M81.511 78.54v-.016a47.16 47.16 0 01-3.24 2.84 36.81 36.81 0 01-1.693 1.271c.476.568.959 1.1 1.468 1.585.772.749 1.597 1.38 2.498 1.867.205-.101.41-.211.609-.327.918-.536 1.741-1.26 2.52-2.209-.806-1.376-1.513-3.082-2.157-5.012"
      ></motion.path>
      <linearGradient
        id="dot-net-original-o"
        gradientUnits="userSpaceOnUse"
        x1="61.149"
        y1="562.654"
        x2="61.539"
        y2="562.654"
        gradientTransform="matrix(0 123.742 123.742 0 -69523.625 -7527.189)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#168CD4" },
          }}
        />
        <motion.stop
          offset=".5"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1C87CC" },
          }}
        />
        <motion.stop
          offset="1"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#154B8D" },
          }}
        />
      </linearGradient>
      <motion.path
        fill="url(#dot-net-original-o)"
        d="M113.685 39.594h-6.121l-.97.047-.451.966c-5.068 10.793-10.388 20.145-15.791 27.58-2.54 7.818-4.404 12.563-6.69 15.353.977 1.668 2.114 2.84 3.466 3.337l.106-.023h.022l.075-.016.17-.042.101-.029.151-.039.094-.027.226-.068.112-.038.126-.046.13-.041.106-.04.264-.093.073-.027.162-.063.068-.025.568-.243h.02c.271-.119.547-.254.821-.394 8.785-4.908 13.22-21.396 27.008-46.026h-3.851l.005-.003z"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#7DCBEC" },
        }}
        d="M37.433 40.677l.063.016.16.017h.054l.292.038.049.016.246.041.062.015.567.126.052.016.228.064.063.019.271.077.021.016.237.081.09.029.17.069.096.034.226.094.11.047.136.059.12.057.119.062c.979.48 1.879 1.121 2.713 1.898.308-.323.628-.613.962-.874-1.823-1.293-3.89-2.03-6.271-2.03-.276 0-.552.016-.832.037"
      ></motion.path>
      <motion.path
        variants={{
          initial: { fill: "var(--primary-color)" },
          whileHover: { fill: "#5EC5ED" },
        }}
        d="M43.574 43.544c.511.475 1 1.005 1.462 1.577.448-.311.892-.611 1.337-.891a14.13 14.13 0 00-1.839-1.56c-.333.26-.652.552-.96.874"
      ></motion.path>
      <g transform="matrix(5.048 0 0 -5.048 -9064.26 2270.61)">
        <linearGradient
          id="dot-net-original-p"
          gradientUnits="userSpaceOnUse"
          x1="1806.96"
          y1="336.158"
          x2="1807.35"
          y2="336.158"
          gradientTransform="scale(30.857 -30.857) rotate(22.527 1812.675 -4228.953)"
        >
          <motion.stop
            offset="0"
            variants={{
              initial: { stopColor: "var(--primary-color)" },
              whileHover: { stopColor: "#97D6EE" },
            }}
          />
          <motion.stop
            offset=".703"
            variants={{
              initial: { stopColor: "var(--primary-color)" },
              whileHover: { stopColor: "#55C1EA" },
            }}
          />
          <motion.stop
            offset="1"
            variants={{
              initial: { stopColor: "var(--primary-color)" },
              whileHover: { stopColor: "#55C1EA" },
            }}
          />
        </linearGradient>
        <motion.path
          fill="url(#dot-net-original-p)"
          d="M1802.977 441.733l.165.007c.472 0 .881-.146 1.242-.402.381.301.842.406 1.482.406h-3.099l.21-.011"
        ></motion.path>
      </g>
      <g transform="matrix(5.048 0 0 -5.048 -9064.26 2270.61)">
        <linearGradient
          id="dot-net-original-q"
          gradientUnits="userSpaceOnUse"
          x1="1808.848"
          y1="335.171"
          x2="1809.238"
          y2="335.171"
          gradientTransform="scale(24.717 -24.717) rotate(-24.385 124.122 4175.416)"
        >
          <motion.stop
            offset="0"
            variants={{
              initial: { stopColor: "var(--primary-color)" },
              whileHover: { stopColor: "#7ACCEC" },
            }}
          />
          <motion.stop
            offset="1"
            variants={{
              initial: { stopColor: "var(--primary-color)" },
              whileHover: { stopColor: "#3FB7ED" },
            }}
          />
        </linearGradient>
        <motion.path
          fill="url(#dot-net-original-q)"
          d="M1805.866 441.744c-.64 0-1.1-.105-1.482-.406.126-.089.248-.193.364-.309.531.337 1.056.561 1.574.658.198.037.395.056.589.056h-1.045v.001z"
        ></motion.path>
      </g>
      <linearGradient
        id="dot-net-original-r"
        gradientUnits="userSpaceOnUse"
        x1="61.049"
        y1="562.706"
        x2="61.439"
        y2="562.706"
        gradientTransform="matrix(0 121.032 121.032 0 -68011.711 -7346.748)"
      >
        <motion.stop
          offset="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#1DA7E7" },
          }}
        />
        <motion.stop
          offset="1"
          stopOpacity="0"
          variants={{
            initial: { stopColor: "var(--primary-color)" },
            whileHover: { stopColor: "#37ABE7" },
          }}
        />
      </linearGradient>
      <motion.path
        fill="url(#dot-net-original-r)"
        d="M90.359 68.202c1.391-4.284 2.98-9.485 4.954-15.794 1.777-5.684 4.925-9.934 10.835-11.788l.456-.966c-9.636.577-14.14 5.479-16.405 12.738-3.964 12.673-6.365 20.888-8.677 26.123 2.952-2.823 5.904-6.288 8.837-10.313"
      ></motion.path>
    </Svg>
  );
}

export function FastApi(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="FastApi" {...props}>
      <path d="M56.813 127.586c-1.903-.227-3.899-.52-4.434-.652a48.078 48.078 0 00-2.375-.5 36.042 36.042 0 01-2.703-.633c-4.145-1.188-4.442-1.285-7.567-2.563-2.875-1.172-8.172-3.91-9.984-5.156-.496-.344-.96-.621-1.031-.621-.07 0-1.23-.816-2.578-1.813-8.57-6.343-15.004-14.043-19.653-23.527-.8-1.629-1.453-3.074-1.453-3.21 0-.134-.144-.505-.32-.817-.363-.649-.88-2.047-1.297-3.492a20.047 20.047 0 00-.625-1.813c-.195-.46-.352-1.02-.352-1.246 0-.227-.195-.965-.433-1.645-.238-.675-.43-1.472-.43-1.77 0-.296-.187-1.32-.418-2.276C.598 73.492 0 67.379 0 63.953c0-3.422.598-9.535 1.16-11.894.23-.957.418-2 .418-2.32 0-.321.145-.95.32-1.4.18-.448.41-1.253.516-1.788.11-.535.36-1.457.563-2.055l.59-1.726c.433-1.293.835-2.387 1.027-2.813.11-.238.539-1.21.957-2.16.676-1.535 2.125-4.43 2.972-5.945.309-.555.426-.739 2.098-3.352 2.649-4.148 7.176-9.309 11.39-12.988 1.485-1.297 6.446-5.063 6.669-5.063.062 0 .53-.281 1.043-.625 1.347-.902 2.668-1.668 4.39-2.531a53.06 53.06 0 001.836-.953c.285-.164.82-.41 3.567-1.64.605-.27 1.257-.516 3.136-1.173.414-.144 1.246-.449 1.84-.672.598-.222 1.301-.406 1.563-.406.258 0 .937-.18 1.508-.402.57-.223 1.605-.477 2.304-.563.696-.082 1.621-.277 2.055-.43.43-.148 1.61-.34 2.621-.425a72.572 72.572 0 003.941-.465c2.688-.394 8.532-.394 11.192 0a75.02 75.02 0 003.781.445c.953.079 2.168.278 2.703.442.535.16 1.461.36 2.055.433.594.079 1.594.325 2.222.551.63.23 1.344.414 1.59.414s.754.137 1.125.309c.375.168 1.168.449 1.766.625.594.18 1.613.535 2.27.797.652.261 1.527.605 1.945.761.77.29 6.46 3.137 7.234 3.622 6.281 3.917 9.512 6.476 13.856 10.964 5.238 5.414 8.715 10.57 12.254 18.16.25.536.632 1.329.851 1.758.215.434.395.942.395 1.13 0 .19.18.76.402 1.269.602 1.383 1.117 2.957 1.36 4.16.12.59.343 1.32.495 1.621.153.3.332 1.063.403 1.688.07.624.277 1.648.453 2.269 1.02 3.531 1.527 13.934.91 18.535-.183 1.367-.39 3.02-.46 3.672-.118 1.117-.708 4.004-1.212 5.945l-.52 2.055c-.98 3.957-3.402 9.594-6.359 14.809-1.172 2.07-5.101 7.668-5.843 8.324-.067.058-.399.45-.735.863-.336.418-1.414 1.586-2.39 2.594-4.301 4.441-7.77 7.187-13.86 10.969-.722.449-6.847 3.441-7.992 3.906-.594.238-1.586.64-2.203.89-.613.247-1.297.454-1.512.458-.215.003-.781.195-1.258.425-.476.23-1.082.422-1.351.426-.266.004-1.043.192-1.727.418-.683.23-1.633.477-2.11.55-.476.075-1.495.278-2.269.45-.773.172-3.11.508-5.187.746a59.06 59.06 0 01-13.945-.031zm4.703-12.5c.3-.234.609-.7.691-1.027.18-.723 29.234-58.97 29.781-59.7.461-.617.504-1.605.082-1.953-.222-.187-3.004-.246-10.43-.234-5.57.012-10.253.016-10.406.012-.226-.008-.273-3.73-.25-19.672.016-10.817-.035-19.766-.113-19.89-.078-.126-.383-.227-.68-.227-.418 0-.613.18-.87.808-.485 1.168-1.825 3.82-8.348 16.485a3554.569 3554.569 0 00-4.055 7.89c-1.156 2.262-2.98 5.813-4.047 7.89a8751.248 8751.248 0 00-8.598 16.759c-4.933 9.636-5.53 10.785-5.742 11.039-.41.496-.633 1.64-.402 2.07.21.394.629.41 11.043.394 5.953-.007 10.863.024 10.914.07.137.141.086 37.31-.055 38.196-.093.582-.031.89.235 1.156.46.461.586.457 1.25-.066zm0 0"></path>
    </Svg>
  );
}

export function Numpy(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Numpy" {...props}>
      <path d="M64.113 0 43.6 10.24l21.37 10.774L84.854 10.4 64.114 0zm-30.48 15.217-23.479 11.71 21.969 11.03 22.889-11.951-21.38-10.79zm61.135.158L74.734 25.938 97.2 37.272l20.606-10.344-23.037-11.553zM64.82 30.957 41.982 42.912l22 11.043 23.26-11.676L64.82 30.957zM4.115 33.32v64.977l15.041 8.064v-33.98s20.477 39.348 20.688 39.781c.213.43 2.257 4.569 4.459 6.027 2.92 1.94 15.459 9.48 15.459 9.48l.008-65.952-16.918-8.512v36.766s-20.7-44.034-22.612-47.993c-.246-.512-1.263-1.07-1.521-1.209-3.732-1.947-14.604-7.449-14.604-7.449zm119.77.928-21.471 10.674.018 28.068 21.453-10.9V34.248zm-30.186 15.01L68.64 61.717V89.74l25.088-12.47-.028-28.012zm30.186 22.765-21.447 10.823.017 28.277 21.43-10.69v-28.41zm-30.147 15.13L68.638 99.7V128l25.124-12.537-.024-28.31z"></path>
    </Svg>
  );
}

export function Pandas(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Pandas" {...props}>
      <path d="M48.697 15.176h12.25v25.437h-12.25zm0 52.251h12.25v25.436h-12.25z" />
      <path d="M48.697 48.037h12.25v12.001h-12.25z" />
      <path d="M29.017 36.087h12.25v84.552h-12.25zM67.97 88.414h12.25v25.436H67.97zm0-52.297h12.25v25.437H67.97z" />
      <path d="M67.97 68.983h12.25v12.001H67.97z" />
      <path d="M87.238 8.55h12.25v84.552h-12.25z" />
    </Svg>
  );
}

export function Htmx(props: SvgProps) {
  return (
    <Svg title="Htmx" {...props}>
      <path d="M0 13.01v-2l7.09-2.98.58 1.94-5.1 2.05 5.16 2.05-.63 1.9Zm16.37 1.03 5.18-2-5.16-2.09.65-1.88L24 10.95v2.12L17 16zm-2.85-9.98H16l-5.47 15.88H8.05Z" />
    </Svg>
  );
}

export function JavaScript(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="JypeScript" {...props}>
      <path d="M2 1v125h125V1H2zm66.119 106.513c-1.845 3.749-5.367 6.212-9.448 7.401-6.271 1.44-12.269.619-16.731-2.059-2.986-1.832-5.318-4.652-6.901-7.901l9.52-5.83c.083.035.333.487.667 1.071 1.214 2.034 2.261 3.474 4.319 4.485 2.022.69 6.461 1.131 8.175-2.427 1.047-1.81.714-7.628.714-14.065C58.433 78.073 58.48 68 58.48 58h11.709c0 11 .06 21.418 0 32.152.025 6.58.596 12.446-2.07 17.361zm48.574-3.308c-4.07 13.922-26.762 14.374-35.83 5.176-1.916-2.165-3.117-3.296-4.26-5.795 4.819-2.772 4.819-2.772 9.508-5.485 2.547 3.915 4.902 6.068 9.139 6.949 5.748.702 11.531-1.273 10.234-7.378-1.333-4.986-11.77-6.199-18.873-11.531-7.211-4.843-8.901-16.611-2.975-23.335 1.975-2.487 5.343-4.343 8.877-5.235l3.688-.477c7.081-.143 11.507 1.727 14.756 5.355.904.916 1.642 1.904 3.022 4.045-3.772 2.404-3.76 2.381-9.163 5.879-1.154-2.486-3.069-4.046-5.093-4.724-3.142-.952-7.104.083-7.926 3.403-.285 1.023-.226 1.975.227 3.665 1.273 2.903 5.545 4.165 9.377 5.926 11.031 4.474 14.756 9.271 15.672 14.981.882 4.916-.213 8.105-.38 8.581z"></path>
      ,
    </Svg>
  );
}

export function CSS(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="CSS" {...props}>
      <path d="M8.76 1l10.055 112.883 45.118 12.58 45.244-12.626L119.24 1H8.76zm89.591 25.862l-3.347 37.605.01.203-.014.467v-.004l-2.378 26.294-.262 2.336L64 101.607v.001l-.022.019-28.311-7.888L33.75 72h13.883l.985 11.054 15.386 4.17-.004.008v-.002l15.443-4.229L81.075 65H48.792l-.277-3.043-.631-7.129L47.553 51h34.749l1.264-14H30.64l-.277-3.041-.63-7.131L29.401 23h69.281l-.331 3.862z"></path>
    </Svg>
  );
}

export function GoogleMaps(props: SvgProps) {
  return (
    <Svg viewBox="0 0 48 48" title="Google Maps" {...props}>
      <path
        d="M17.8971,33.398A39.3963,39.3963,0,0,1,20.97,37.9305a22.9991,22.9991,0,0,1,1.6835,4.2849c.3512.9893.6687,1.2846,1.3513,1.2846.7439,0,1.0814-.5023,1.3421-1.2792A23.224,23.224,0,0,1,26.9837,38.02a47.8757,47.8757,0,0,1,4.5556-6.4576A41.3528,41.3528,0,0,0,36.05,25.0614a15.78,15.78,0,0,0,1.5553-6.887,13.5933,13.5933,0,0,0-1.5338-6.3579"
        className="fill-primary group-hover:fill-[#34A851]"
      />
      <path
        d="M11.7348,24.5783c1.4572,3.3284,4.2673,6.2543,6.1685,8.822L28.0015,21.4384a5.3056,5.3056,0,0,1-4.0034,1.8606,5.1725,5.1725,0,0,1-5.1967-5.19,5.5055,5.5055,0,0,1,1.1941-3.3484"
        className="fill-primary group-hover:fill-[#F9BB0E]"
      />
      <path
        d="M28.1142,5.1151a13.519,13.519,0,0,1,7.9608,6.6991l-8.0705,9.6173a5.6064,5.6064,0,0,0,1.1941-3.3606A5.2235,5.2235,0,0,0,24.01,12.8964a5.4179,5.4179,0,0,0-4.0111,1.8575"
        className="fill-primary group-hover:fill-[#4285F5]"
      />
      <path
        d="M13.5847,9.3646A13.4781,13.4781,0,0,1,23.972,4.5a13.8562,13.8562,0,0,1,4.1338.6189l-8.1142,9.64"
        className="fill-primary group-hover:fill-[#1A73E6]"
      />
      <path
        d="M11.7348,24.5783A15.3756,15.3756,0,0,1,10.3943,18.15a13.5161,13.5161,0,0,1,3.19-8.7852L19.9962,14.76Z"
        className="fill-primary group-hover:fill-[#E74335]"
      />
    </Svg>
  );
}

export function Cargo(props: SvgProps) {
  return (
    <Svg viewBox="0 0 32 32" title="Cargo" {...props}>
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {/*
          The <defs> element is used to store graphical objects that can be used later.
          Here, we define a symbol with the id "a" which is reused multiple times in the SVG.
        */}
        <defs>
          <symbol id="a-cargo" viewBox="0 0 45.72 26.28">
            <rect width="45.72" height="26.28" style={{ fill: "none" }}></rect>
            <polygon
              points="0 16.309 22.926 16.309 22.926 26.28 45.72 13.139 22.926 0 22.926 9.97 0 9.97 0 16.309"
              className="fill-background"
            ></polygon>
          </symbol>
        </defs>
        {/* The following paths create the main structure and details of the cargo icon. */}
        <path
          d="M14.261,29.519l-.007-.457L27.18,23.551l2.038.288-.012.385L16.264,30.558Z"
          className="fill-secondary"
        ></path>
        <path
          d="M14.268,29.067,27.18,23.19l2.05.663L16.264,30.117Z"
          className="fill-background"
        ></path>
        <path
          d="M14.258,27.63l2.01,1.086v1.416l-2.01-1.086Z"
          className="fill-secondary"
        ></path>
        <path
          d="M29.139,22.465l-1.521.766v1.416l1.521-.766Z"
          className="fill-secondary"
        ></path>
        <path
          d="M20.178,24.751l2.01,1.086v1.416l-2.01-1.086V24.751Z"
          className="fill-background"
        ></path>
        <path
          d="M23.708,25.072l-1.521.766v1.416l1.521-.766V25.072Z"
          className="fill-secondary"
        ></path>
        <path
          d="M8.722,26.749l-.007-.4L21.64,20.835l2.038.288-.012.385-12.942,6.28Z"
          className="fill-background"
        ></path>
        <path
          d="M8.719,24.914,10.728,26v1.416l-2.01-1.086V24.914Z"
          className="fill-secondary"
        ></path>
        <path
          d="M12.249,25.234,10.728,26v1.416l1.521-.766V25.234Z"
          className="fill-background"
        ></path>
        <path
          d="M3.454,24.088l-.007-.349,12.926-5.511,2.038.288L18.4,18.9,5.456,25.127Z"
          className="fill-background"
        ></path>
        <path
          d="M3.451,22.308l2.01,1.086V24.81l-2.01-1.086Z"
          className="fill-secondary"
        ></path>
        <path
          d="M6.981,22.628l-1.521.766V24.81l1.521-.766Z"
          className="fill-background"
        ></path>
        <path
          d="M3.345,22.622l-.007-.282s2.539-.09,1.689.115C6.08,21.792,16.182,17.9,16.182,17.9l12.961,4.44.062.279-12.942,6.09Z"
          className="fill-secondary"
        ></path>
        <path
          d="M3.3,22.36l12.966-4.519L29.229,22.36,16.264,28.379Z"
          className="fill-primary"
        ></path>
        <path
          d="M16.372,6.64l-6.2-2.481v8.123l6.2,2.522Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M16.331,6.674l6.115-2.435L16.3,1.708,10.159,4.175Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.054070758972961416px",
          }}
        ></path>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.022, 0.013, 10.56, 6.25)"
          xlinkHref="#a-cargo"
        ></use>
        <path
          d="M22.509,17.109l6.2-2.481v7.311l-6.2,2.878Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M22.5,9.134l6.2-2.415v7.906l-6.2,2.509Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M22.433,9.119,16.4,6.557l6.062-2.274,6.2,2.4Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M10.072,17.092,3.872,14.7v7.375l6.2,2.847Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M10.056,17.144l6.2-2.417-6.2-2.465-6.2,2.4Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <line
          x1="6.952"
          y1="15.883"
          x2="13.148"
          y2="13.416"
          className="stroke-background"
          style={{
            fill: "none",
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></line>
        <path
          d="M16.3,19.658l-6.2-2.464v7.715l6.2,2.957Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M16.25,19.729l6.255-2.481v7.661L16.25,27.866Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M16.264,11.547l6.2-2.446v8.16l-6.2,2.485Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M16.264,11.528l-6.2-2.481V17.17l6.2,2.522Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <path
          d="M16.277,11.508l6.169-2.435-6.2-2.531-6.2,2.467Z"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></path>
        <line
          x1="12.82"
          y1="10.149"
          x2="19.016"
          y2="7.682"
          className="stroke-background"
          style={{
            fill: "none",
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></line>
        <line
          x1="13.037"
          y1="5.37"
          x2="19.233"
          y2="2.903"
          className="stroke-background"
          style={{
            fill: "none",
            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></line>
        <line
          x1="19.811"
          y1="5.286"
          x2="26.127"
          y2="7.733"
          className="stroke-background"
          style={{
            fill: "none",

            strokeMiterlimit: 10,
            strokeWidth: "0.05430921534373718px",
          }}
        ></line>
        <polygon
          points="18.301 7.395 12.061 9.879 13.543 10.472 19.739 8.006 18.301 7.395"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.04741218643894885px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="18.573 2.616 12.333 5.1 13.815 5.693 20.01 3.227 18.573 2.616"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.04741218643894885px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="6.266 15.628 7.747 16.22 10.089 15.288 10.063 14.116 6.266 15.628"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.04741218643894885px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="20.495 5.029 19.156 5.554 25.383 7.967 26.725 7.443 20.495 5.029"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.041861926921599964px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="6.7 17.509 6.751 17.465 6.647 17.424 6.7 17.509"
          className="fill-none"
        ></polygon>
        <polygon
          points="7.09 17.679 7.155 17.622 7.026 17.571 7.09 17.679"
          className="fill-none"
        ></polygon>
        <polygon
          points="7.719 16.195 6.266 15.63 6.266 17.275 6.467 17.139 6.647 17.424 6.751 17.465 6.889 17.343 7.026 17.571 7.155 17.622 7.344 17.456 7.582 17.788 7.719 17.841 7.719 16.195"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="12.783 6.973 12.833 6.929 12.729 6.888 12.783 6.973"
          className="fill-none"
        ></polygon>
        <polygon
          points="13.173 7.143 13.238 7.086 13.108 7.035 13.173 7.143"
          className="fill-none"
        ></polygon>
        <polygon
          points="13.802 5.659 12.348 5.094 12.348 6.739 12.55 6.603 12.729 6.888 12.833 6.929 12.971 6.807 13.108 7.035 13.238 7.086 13.426 6.92 13.665 7.252 13.802 7.305 13.802 5.659"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="12.544 11.783 12.594 11.739 12.49 11.699 12.544 11.783"
          className="fill-none"
        ></polygon>
        <polygon
          points="12.933 11.953 12.998 11.896 12.869 11.846 12.933 11.953"
          className="fill-none"
        ></polygon>
        <polygon
          points="13.562 10.47 12.109 9.905 12.109 11.55 12.31 11.414 12.49 11.699 12.594 11.739 12.732 11.618 12.869 11.846 12.998 11.896 13.187 11.73 13.425 12.062 13.562 12.115 13.562 10.47"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="13.139 16.719 13.089 16.764 13.193 16.803 13.139 16.719"
          className="fill-none"
        ></polygon>
        <polygon
          points="12.747 16.554 12.682 16.612 12.813 16.661 12.747 16.554"
          className="fill-none"
        ></polygon>
        <polygon
          points="12.139 18.046 13.6 18.591 13.577 16.946 13.377 17.085 13.193 16.803 13.089 16.764 12.953 16.887 12.813 16.661 12.682 16.612 12.496 16.781 12.253 16.452 12.116 16.401 12.139 18.046"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="7.328 21.878 7.278 21.923 7.382 21.962 7.328 21.878"
          className="fill-none"
        ></polygon>
        <polygon
          points="6.936 21.714 6.871 21.772 7.001 21.82 6.936 21.714"
          className="fill-none"
        ></polygon>
        <polygon
          points="6.327 23.206 7.719 23.845 7.766 22.105 7.566 22.244 7.382 21.962 7.278 21.923 7.141 22.046 7.001 21.82 6.871 21.772 6.685 21.94 6.442 21.612 6.304 21.56 6.327 23.206"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="25.761 14.093 25.812 14.138 25.708 14.178 25.761 14.093"
          className="fill-none"
        ></polygon>
        <polygon
          points="26.151 13.923 26.216 13.98 26.087 14.031 26.151 13.923"
          className="fill-none"
        ></polygon>
        <polygon
          points="26.78 15.407 25.327 15.972 25.327 14.327 25.528 14.463 25.708 14.178 25.812 14.138 25.95 14.259 26.087 14.031 26.216 13.98 26.405 14.146 26.643 13.814 26.78 13.761 26.78 15.407"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="26.356 9.321 26.307 9.276 26.411 9.237 26.356 9.321"
          className="fill-none"
        ></polygon>
        <polygon
          points="25.964 9.485 25.9 9.427 26.03 9.379 25.964 9.485"
          className="fill-none"
        ></polygon>
        <polygon
          points="25.356 7.993 26.817 7.448 26.794 9.093 26.595 8.955 26.411 9.237 26.307 9.276 26.17 9.152 26.03 9.379 25.9 9.427 25.714 9.259 25.471 9.587 25.333 9.639 25.356 7.993"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="19.428 24.558 19.478 24.602 19.375 24.642 19.428 24.558"
          className="fill-none"
        ></polygon>
        <polygon
          points="19.818 24.388 19.883 24.445 19.753 24.495 19.818 24.388"
          className="fill-none"
        ></polygon>
        <polygon
          points="20.447 25.871 18.993 26.545 18.993 24.791 19.195 24.927 19.375 24.642 19.478 24.602 19.617 24.723 19.753 24.495 19.883 24.445 20.072 24.611 20.31 24.279 20.447 24.226 20.447 25.871"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <polygon
          points="20.023 19.948 19.973 19.903 20.078 19.864 20.023 19.948"
          className="fill-none"
        ></polygon>
        <polygon
          points="19.631 20.113 19.567 20.055 19.697 20.006 19.631 20.113"
          className="fill-none"
        ></polygon>
        <polygon
          points="19.023 18.62 20.484 18.076 20.461 19.721 20.262 19.582 20.078 19.864 19.973 19.903 19.837 19.78 19.697 20.006 19.567 20.055 19.38 19.886 19.138 20.215 19 20.266 19.023 18.62"
          className="fill-primary stroke-background"
          style={{
            strokeMiterlimit: 10,
            strokeWidth: "0.06661495224335688px",
            opacity: 0.3,
          }}
        ></polygon>
        <path
          d="M21.426,13.49l-.172-.039,0-.051.148-.208a.087.087,0,0,0,.018-.065.035.035,0,0,0-.037-.03l-.189.006-.015-.045.118-.222a.073.073,0,0,0,.007-.063.037.037,0,0,0-.045-.018l-.2.051-.024-.037.084-.229a.058.058,0,0,0,0-.058.042.042,0,0,0-.051-.006l-.2.094-.032-.027.047-.227a.047.047,0,0,0-.016-.052.052.052,0,0,0-.056.007l-.2.133-.039-.017.007-.215a.039.039,0,0,0-.026-.043.065.065,0,0,0-.058.02l-.184.166-.045-.006-.033-.2a.036.036,0,0,0-.036-.032.08.08,0,0,0-.057.031l-.164.194-.049.005-.071-.168a.036.036,0,0,0-.044-.021.094.094,0,0,0-.055.042l-.138.214-.05.016-.107-.135a.041.041,0,0,0-.05-.008.1.1,0,0,0-.05.051l-.107.226-.05.026-.138-.1a.05.05,0,0,0-.055,0,.109.109,0,0,0-.044.058l-.071.228-.049.036-.164-.054a.062.062,0,0,0-.057.017.107.107,0,0,0-.036.063l-.033.223-.045.044-.184-.01a.077.077,0,0,0-.058.029.1.1,0,0,0-.026.065l.007.209-.039.05-.2.035a.092.092,0,0,0-.056.04.085.085,0,0,0-.016.065l.046.187-.032.054-.2.079a.1.1,0,0,0-.051.049.07.07,0,0,0,0,.062l.084.157-.024.057-.2.119a.109.109,0,0,0-.045.057.056.056,0,0,0,.007.057l.118.122-.015.058-.189.155a.107.107,0,0,0-.037.062.045.045,0,0,0,.018.05l.148.082,0,.055-.172.185a.1.1,0,0,0-.028.065.038.038,0,0,0,.028.041l.172.039,0,.051-.148.208a.088.088,0,0,0-.018.065.035.035,0,0,0,.037.03l.189-.006.015.045-.118.222a.073.073,0,0,0-.007.063.037.037,0,0,0,.045.018l.2-.051.024.037-.084.229a.058.058,0,0,0,0,.058.042.042,0,0,0,.051.006l.2-.094.032.027-.046.227a.047.047,0,0,0,.016.051.052.052,0,0,0,.056-.007l.2-.133.039.017-.007.215a.039.039,0,0,0,.026.043.065.065,0,0,0,.058-.02l.184-.166.045.006.033.2a.035.035,0,0,0,.036.032.08.08,0,0,0,.057-.031l.164-.194.049-.005.071.168a.036.036,0,0,0,.044.02.093.093,0,0,0,.055-.042l.138-.214.05-.016.107.135a.041.041,0,0,0,.05.008.1.1,0,0,0,.05-.051l.107-.226.05-.027.138.1a.05.05,0,0,0,.055,0,.109.109,0,0,0,.044-.058l.071-.228.049-.036.164.054a.063.063,0,0,0,.057-.017.107.107,0,0,0,.036-.063l.033-.223.045-.044.184.01a.077.077,0,0,0,.058-.029.1.1,0,0,0,.026-.065l-.007-.209.039-.05.2-.035a.091.091,0,0,0,.056-.04.085.085,0,0,0,.016-.065l-.046-.187L20.854,15l.2-.079a.1.1,0,0,0,.051-.049.07.07,0,0,0,0-.062l-.084-.157.024-.057.2-.119a.108.108,0,0,0,.045-.057.056.056,0,0,0-.007-.057l-.118-.122.015-.058.189-.155a.107.107,0,0,0,.037-.062.045.045,0,0,0-.018-.05l-.148-.082,0-.055.172-.185a.1.1,0,0,0,.028-.065A.038.038,0,0,0,21.426,13.49Zm-1.153,1.988c-.066.013-.108-.037-.094-.112a.208.208,0,0,1,.145-.16c.066-.013.108.037.094.112A.209.209,0,0,1,20.273,15.478Zm-.059-.39a.19.19,0,0,0-.132.146l-.061.325a2.252,2.252,0,0,1-.619.4,1.4,1.4,0,0,1-.632.123l-.061-.273c-.013-.057-.072-.072-.132-.033l-.252.164a.825.825,0,0,1-.13-.106l1.226-.521c.014-.006.023-.012.023-.026v-.455c0-.013-.009-.012-.023-.006l-.359.152v-.288l.388-.165a.161.161,0,0,1,.239.115c.015.057.049.249.072.3s.117.172.217.13l.611-.26.022-.012c-.042.078-.089.155-.139.23Zm-1.7,1.13c-.066.043-.131.026-.145-.037a.2.2,0,0,1,.094-.192c.066-.043.131-.026.145.037A.2.2,0,0,1,18.518,16.218Zm-.465-1.779a.18.18,0,0,1-.062.2c-.062.055-.134.056-.161,0a.18.18,0,0,1,.062-.2C17.954,14.388,18.026,14.386,18.053,14.439Zm-.143.416.263-.234a.164.164,0,0,0,.057-.178l-.054-.105.213-.09v1l-.429.182a1.386,1.386,0,0,1-.057-.407C17.9,14.971,17.9,14.913,17.91,14.855Zm1.152-.587v-.3l.506-.215c.026-.011.185-.047.185.077,0,.1-.122.192-.222.234l-.47.2Zm1.84-.516q0,.059,0,.118l-.154.065a.036.036,0,0,0-.022.036v.074a.31.31,0,0,1-.176.3c-.078.043-.165.036-.176-.01-.046-.253-.123-.278-.245-.327a.984.984,0,0,0,.308-.578.3.3,0,0,0-.235-.315.568.568,0,0,0-.322.026l-1.592.677a2.7,2.7,0,0,1,.84-.853l.188.127c.042.029.113,0,.157-.063l.21-.3a.938.938,0,0,1,1.027.33l-.144.4c-.025.069,0,.128.057.13l.277.011Q20.9,13.673,20.9,13.752Zm-1.591-1.044c.049-.069.126-.1.172-.069s.045.113,0,.183-.126.1-.172.069S19.263,12.777,19.312,12.707Zm1.427.6a.191.191,0,0,1,.161-.133c.062,0,.089.066.062.142a.191.191,0,0,1-.161.133C20.739,13.444,20.711,13.38,20.738,13.3Z"
          style={{ opacity: 0.55 }}
        ></path>
        <path
          d="M15.314,23.421l-.19-.195-.005-.057.163-.085a.046.046,0,0,0,.02-.052.112.112,0,0,0-.041-.065l-.208-.163-.016-.06.13-.127a.057.057,0,0,0,.007-.06.116.116,0,0,0-.05-.06l-.22-.126-.026-.06.092-.165a.07.07,0,0,0-.005-.065.111.111,0,0,0-.057-.052l-.223-.083-.035-.057.051-.2a.086.086,0,0,0-.017-.068.1.1,0,0,0-.061-.042l-.217-.038-.043-.053.008-.22a.1.1,0,0,0-.029-.068.087.087,0,0,0-.063-.031l-.2.01-.049-.047-.036-.234a.111.111,0,0,0-.039-.066.071.071,0,0,0-.063-.018l-.181.056-.054-.038-.078-.24a.115.115,0,0,0-.048-.061.057.057,0,0,0-.06-.005l-.152.1L13.26,20.6l-.117-.238a.113.113,0,0,0-.055-.054.046.046,0,0,0-.055.008l-.117.142-.055-.017-.152-.225a.1.1,0,0,0-.06-.044.04.04,0,0,0-.048.021l-.078.176-.054-.006-.181-.2a.089.089,0,0,0-.063-.033.038.038,0,0,0-.039.034l-.036.205-.049.006-.2-.175a.074.074,0,0,0-.063-.021.041.041,0,0,0-.029.045l.008.226-.043.018-.217-.14a.06.06,0,0,0-.061-.008.048.048,0,0,0-.017.054l.051.238-.035.028-.223-.1a.048.048,0,0,0-.057.006.059.059,0,0,0-.005.061l.092.24-.026.039-.22-.054a.041.041,0,0,0-.05.019.074.074,0,0,0,.007.066l.13.234-.016.047-.208-.007a.038.038,0,0,0-.041.032.089.089,0,0,0,.02.068l.163.219-.005.053-.19.04a.04.04,0,0,0-.031.043.1.1,0,0,0,.031.068l.19.195.005.057-.163.085a.046.046,0,0,0-.02.052.113.113,0,0,0,.041.065l.208.163.016.06-.13.127a.057.057,0,0,0-.007.06.116.116,0,0,0,.05.06l.22.126.026.06-.092.165a.071.071,0,0,0,.005.065.111.111,0,0,0,.057.052l.223.083.035.057-.051.2a.086.086,0,0,0,.017.068.1.1,0,0,0,.061.042l.217.038.043.053-.008.22a.1.1,0,0,0,.029.068.087.087,0,0,0,.063.031l.2-.009.049.047.036.234a.111.111,0,0,0,.039.066.071.071,0,0,0,.063.019l.18-.056.054.038.078.24a.115.115,0,0,0,.048.061.057.057,0,0,0,.06.005l.152-.1.055.028.117.238a.113.113,0,0,0,.055.054.047.047,0,0,0,.055-.008l.117-.142.055.017.152.225a.1.1,0,0,0,.06.044.04.04,0,0,0,.048-.021l.078-.176.054.006.181.2a.09.09,0,0,0,.063.033.038.038,0,0,0,.039-.034l.036-.2.049-.006.2.175a.074.074,0,0,0,.063.021.041.041,0,0,0,.029-.045l-.008-.226.043-.018.217.14a.059.059,0,0,0,.061.008.048.048,0,0,0,.017-.054l-.051-.238.035-.028.223.1a.048.048,0,0,0,.057-.006.059.059,0,0,0,.005-.061l-.092-.24.026-.039.22.054a.041.041,0,0,0,.05-.019.073.073,0,0,0-.007-.066l-.13-.234.016-.047.208.007a.038.038,0,0,0,.041-.032.089.089,0,0,0-.02-.068l-.163-.219.005-.053.19-.04a.04.04,0,0,0,.031-.043A.1.1,0,0,0,15.314,23.421Zm-1.269,1.054a.21.21,0,0,1-.1-.2c.015-.066.087-.083.159-.038a.21.21,0,0,1,.1.2C14.189,24.5,14.118,24.52,14.045,24.475Zm-.064-.462c-.066-.041-.131-.026-.145.035l-.067.287a1.619,1.619,0,0,1-.681-.132,2.516,2.516,0,0,1-.7-.438l-.067-.342a.2.2,0,0,0-.145-.153l-.277-.054q-.077-.111-.143-.228l1.35.552c.015.006.025.008.025-.006v-.477c0-.014-.01-.021-.025-.027l-.395-.161v-.3l.427.175a.459.459,0,0,1,.263.335c.017.074.054.305.08.385a.608.608,0,0,0,.239.331l.672.275.024.008a.9.9,0,0,1-.153.117Zm-1.867-.334a.224.224,0,0,1-.159-.168c-.015-.079.031-.132.1-.118a.225.225,0,0,1,.159.168C12.233,23.64,12.187,23.693,12.114,23.679ZM11.6,21.393c.03.08,0,.147-.068.149a.209.209,0,0,1-.177-.141c-.03-.08,0-.147.068-.149A.209.209,0,0,1,11.6,21.393Zm-.157.309.289-.01c.062,0,.09-.063.062-.136l-.06-.159.234.1v1.055l-.472-.193a1.944,1.944,0,0,1-.063-.479A1.565,1.565,0,0,1,11.445,21.7Zm1.268.416v-.311l.557.228c.029.012.2.116.2.247,0,.108-.134.092-.244.047l-.517-.211Zm2.025,1.108q0,.062,0,.121l-.169-.069c-.017-.007-.024,0-.024.018v.078c0,.183-.1.181-.194.154a.311.311,0,0,1-.194-.168.953.953,0,0,0-.269-.563c.166-.038.339-.122.339-.331a.862.862,0,0,0-.259-.542,1.183,1.183,0,0,0-.355-.262l-1.752-.717a1.144,1.144,0,0,1,.924-.144l.207.3c.047.068.124.1.173.075l.231-.127a2.951,2.951,0,0,1,1.13,1.267l-.158.293a.169.169,0,0,0,.062.187l.3.26Q14.738,23.143,14.738,23.226ZM12.987,20.7c.054-.029.138.007.19.082s.049.159,0,.188-.138-.007-.19-.082S12.934,20.732,12.987,20.7Zm1.57,1.905c.03-.056.109-.054.177,0a.185.185,0,0,1,.068.205c-.03.056-.109.054-.177,0A.185.185,0,0,1,14.557,22.608Z"
          style={{ opacity: 0.56 }}
        ></path>
        <path
          d="M27.838,18.724l-.172-.039,0-.051.148-.208a.087.087,0,0,0,.018-.065.035.035,0,0,0-.037-.03l-.189.006-.015-.045.118-.222a.073.073,0,0,0,.007-.063.037.037,0,0,0-.045-.018l-.2.051L27.441,18l.084-.229a.058.058,0,0,0,0-.058.042.042,0,0,0-.051-.006l-.2.094-.032-.027.047-.227a.047.047,0,0,0-.016-.052.052.052,0,0,0-.056.007l-.2.133-.039-.017.007-.215a.039.039,0,0,0-.026-.043.065.065,0,0,0-.058.02l-.184.166-.045-.006-.033-.2a.036.036,0,0,0-.036-.032.08.08,0,0,0-.057.031l-.164.194-.049.005-.071-.168a.036.036,0,0,0-.044-.021.094.094,0,0,0-.055.042l-.138.214-.05.016-.107-.135a.041.041,0,0,0-.05-.008.1.1,0,0,0-.05.051l-.107.226-.05.026-.138-.1a.05.05,0,0,0-.055,0,.109.109,0,0,0-.044.058l-.071.228-.049.036-.164-.054a.062.062,0,0,0-.057.017.107.107,0,0,0-.036.063l-.033.223-.045.044-.184-.01a.077.077,0,0,0-.058.029.1.1,0,0,0-.026.065l.007.209-.039.05-.2.035a.092.092,0,0,0-.056.04.085.085,0,0,0-.016.065l.046.187-.032.054-.2.079a.1.1,0,0,0-.051.049.07.07,0,0,0,0,.062l.084.157-.024.057-.2.119a.109.109,0,0,0-.045.057.056.056,0,0,0,.007.057l.118.122-.015.058-.189.155a.107.107,0,0,0-.037.062.045.045,0,0,0,.018.05l.148.082,0,.055-.172.185a.1.1,0,0,0-.028.065.038.038,0,0,0,.028.041l.172.039,0,.051-.148.208a.088.088,0,0,0-.018.065.035.035,0,0,0,.037.03l.189-.006.015.045-.118.222a.073.073,0,0,0-.007.063.037.037,0,0,0,.045.018l.2-.051.024.037L24.1,21.5a.058.058,0,0,0,0,.058.042.042,0,0,0,.051.006l.2-.094.032.027-.046.227a.047.047,0,0,0,.016.051.052.052,0,0,0,.056-.007l.2-.133.039.017-.007.215a.039.039,0,0,0,.026.043.065.065,0,0,0,.058-.02l.184-.166.045.006.033.2a.035.035,0,0,0,.036.032.08.08,0,0,0,.057-.031l.164-.194.049-.005.071.168a.036.036,0,0,0,.044.02.093.093,0,0,0,.055-.042l.138-.214.05-.016.107.135a.041.041,0,0,0,.05.008.1.1,0,0,0,.05-.051l.107-.226.05-.027.138.1a.05.05,0,0,0,.055,0,.109.109,0,0,0,.044-.058l.071-.228.049-.036.164.054a.063.063,0,0,0,.057-.017.107.107,0,0,0,.036-.063L26.667,21l.045-.044.184.01a.077.077,0,0,0,.058-.029.1.1,0,0,0,.026-.065l-.007-.209.039-.05.2-.035a.091.091,0,0,0,.056-.04.085.085,0,0,0,.016-.065l-.046-.187.032-.054.2-.079a.1.1,0,0,0,.051-.049.07.07,0,0,0,0-.062l-.084-.157.024-.057.2-.119a.108.108,0,0,0,.045-.057A.056.056,0,0,0,27.7,19.6l-.118-.122.015-.058.189-.155a.107.107,0,0,0,.037-.062.045.045,0,0,0-.018-.05l-.148-.082,0-.055.172-.185a.1.1,0,0,0,.028-.065A.038.038,0,0,0,27.838,18.724Zm-1.153,1.988c-.066.013-.108-.037-.094-.112a.208.208,0,0,1,.145-.16c.066-.013.108.037.094.112A.209.209,0,0,1,26.684,20.713Zm-.059-.39a.19.19,0,0,0-.132.146l-.061.325a2.252,2.252,0,0,1-.619.4,1.4,1.4,0,0,1-.632.123l-.061-.273c-.013-.057-.072-.072-.132-.033l-.252.164a.825.825,0,0,1-.13-.106l1.226-.521c.014-.006.023-.012.023-.026v-.455c0-.013-.009-.012-.023-.006l-.359.152v-.288l.388-.165a.161.161,0,0,1,.239.115c.015.057.049.249.072.3s.117.172.217.13l.611-.26.022-.012c-.042.078-.089.155-.139.23Zm-1.7,1.13c-.066.043-.131.026-.145-.037a.2.2,0,0,1,.094-.192c.066-.043.131-.026.145.037A.2.2,0,0,1,24.93,21.452Zm-.465-1.779a.18.18,0,0,1-.062.2c-.062.055-.134.056-.161,0a.18.18,0,0,1,.062-.2C24.365,19.622,24.437,19.62,24.465,19.673Zm-.143.416.263-.234a.164.164,0,0,0,.057-.178l-.054-.105.213-.09v1l-.429.182a1.386,1.386,0,0,1-.057-.407C24.313,20.2,24.316,20.147,24.322,20.089Zm1.152-.587v-.3l.506-.215c.026-.011.185-.047.185.077,0,.1-.122.192-.222.234l-.47.2Zm1.84-.516q0,.059,0,.118l-.154.065a.036.036,0,0,0-.022.036v.074a.31.31,0,0,1-.176.3c-.078.043-.165.036-.176-.01-.046-.253-.123-.278-.245-.327a.984.984,0,0,0,.308-.578.3.3,0,0,0-.235-.315.568.568,0,0,0-.322.026L24.7,19.05a2.7,2.7,0,0,1,.84-.853l.188.127c.042.029.113,0,.157-.063l.21-.3a.938.938,0,0,1,1.027.33l-.144.4c-.025.069,0,.128.057.13l.277.011Q27.314,18.907,27.314,18.986Zm-1.591-1.044c.049-.069.126-.1.172-.069s.045.113,0,.183-.126.1-.172.069S25.674,18.011,25.723,17.941Zm1.427.6a.191.191,0,0,1,.161-.133c.062,0,.089.066.062.142a.191.191,0,0,1-.161.133C27.15,18.678,27.122,18.614,27.15,18.538Z"
          style={{ opacity: 0.55 }}
        ></path>
        {/*
          The <use> elements clone the symbol defined earlier ("a") and place it at different positions
          with different transformations, building up the repetitive parts of the icon efficiently.
        */}
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.022, 0.013, 4.314, 16.786)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.022, 0.013, 8.876, 18.632)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.022, 0.013, 10.451, 11.138)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.022, 0.013, 15.013, 12.984)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.02, -0.012, 16.773, 21.54)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.02, -0.012, 21.389, 19.694)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.02, -0.012, 23.072, 11.167)"
          xlinkHref="#a-cargo"
        ></use>
        <use
          width="45.72"
          height="26.28"
          transform="matrix(0, -0.029, 0.02, -0.012, 27.689, 9.321)"
          xlinkHref="#a-cargo"
        ></use>
      </g>
    </Svg>
  );
}

export function Supabase(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Supabase" {...props}>
      <path d="M58.061.007a5.45 5.45 0 0 0-4.563 2.126L4.137 64.283c-5.823 7.332-.597 18.148 8.763 18.148h50.98l.549 39.864c0 3.63 2.588 5.704 5.704 5.704 1.556 0 3.111-.524 4.148-2.08l49.314-62.201c6.223-7.26 1.037-18.148-8.307-18.148H63.74l-.264-40.045c-.047-3.288-2.66-5.403-5.409-5.518zm10.527 50.748h46.706c2.593 0 4.148 1.042 5.186 3.635 1.037 2.074.518 4.667-.52 6.222l-49.297 62.191h-.529s-.519 0-.519-.518L68.584 50.75z"></path>
    </Svg>
  );
}

export function Auth0(props: SvgProps) {
  return (
    <Svg viewBox="0 0 512 512" title="Auth0" {...props}>
      <path d="M358.1 378.8L319.6 260L420.5 186.9H295.7l-38.6-118.7l-.01-.03h124.8l38.6 118.7v-.003l0.03-.02c22.4 68.8-.7 147 -62.4 192zm-201.9 0l-.036 .03L257.13 452.2L358.09 378.84L257.17 305.51ZM93.85 186.85c-23.57 72.57 3.79 149.46 62.36 192l0.01-.036L194.77 260.17L93.89 186.87H218.6L257.15 68.2L257.2 68.2H132.4Z"></path>
    </Svg>
  );
}

export function Zod(props: SvgProps) {
  return (
    <Svg viewBox="0 0 256 203" title="Zod" {...props}>
      <defs>
        <path
          d="M200.420694,0 L53.6308282,0 L0,53.3549074 L121.760272,199.97871 L131.473707,189.079838 L252,53.8556526 L200.420694,0 Z M195.058122,12.5620609 L234.89802,54.1622312 L122.097509,180.72046 L16.9997871,54.1622312 L58.8145625,12.5620609 L195.058122,12.5620609 Z"
          id="path-1-zod"
        />
      </defs>
      <g transform="translate(2.000000, 1.510645)" fill-rule="nonzero">
        <polygon points="149.426831 150.874561 96.0134271 150.874561 71.8889656 121.341138 140.252621 121.33896 140.255033 117.149462 179.332589 117.149462" />
        <polygon points="223.55992 42.3226943 76.1782017 127.413686 56.9521852 103.361957 171.050895 37.4849931 168.955265 33.853745 199.34598 16.3076536" />
        <polygon points="144.596212 12.5642823 33.9304463 76.4571406 16.7194669 54.9715457 90.8141008 12.1929865" />
        <use className="fill-primary" href="#path-1-zod" />
      </g>
    </Svg>
  );
}

export function C(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="C" {...props}>
      <path d="M117.5 33.5l.3-.2c-.6-1.1-1.5-2.1-2.4-2.6L67.1 2.9c-.8-.5-1.9-.7-3.1-.7-1.2 0-2.3.3-3.1.7l-48 27.9c-1.7 1-2.9 3.5-2.9 5.4v55.7c0 1.1.2 2.3.9 3.4l-.2.1c.5.8 1.2 1.5 1.9 1.9l48.2 27.9c.8.5 1.9.7 3.1.7 1.2 0 2.3-.3 3.1-.7l48-27.9c1.7-1 2.9-3.5 2.9-5.4V36.1c.1-.8 0-1.7-.4-2.6zM64 88.5c9.1 0 17.1-5 21.3-12.4l12.9 7.6c-6.8 11.8-19.6 19.8-34.2 19.8-21.8 0-39.5-17.7-39.5-39.5S42.2 24.5 64 24.5c14.7 0 27.5 8.1 34.3 20l-13 7.5C81.1 44.5 73.1 39.5 64 39.5c-13.5 0-24.5 11-24.5 24.5s11 24.5 24.5 24.5z"></path>
    </Svg>
  );
}

export function GCP(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="Google Cloud Platform" {...props}>
      <path d="M80.6 40.3h.4l-.2-.2 14-14v-.3c-11.8-10.4-28.1-14-43.2-9.5C36.5 20.8 24.9 32.8 20.7 48c.2-.1.5-.2.8-.2 5.2-3.4 11.4-5.4 17.9-5.4 2.2 0 4.3.2 6.4.6.1-.1.2-.1.3-.1 9-9.9 24.2-11.1 34.6-2.6h-.1z"></path>
      <path d="M108.1 47.8c-2.3-8.5-7.1-16.2-13.8-22.1L80 39.9c6 4.9 9.5 12.3 9.3 20v2.5c16.9 0 16.9 25.2 0 25.2H63.9v20h-.1l.1.2h25.4c14.6.1 27.5-9.3 31.8-23.1 4.3-13.8-1-28.8-13-36.9z"></path>
      <path d="M39 107.9h26.3V87.7H39c-1.9 0-3.7-.4-5.4-1.1l-15.2 14.6v.2c6 4.3 13.2 6.6 20.7 6.6z"></path>
      <path d="M40.2 41.9c-14.9.1-28.1 9.3-32.9 22.8-4.8 13.6 0 28.5 11.8 37.3l15.6-14.9c-8.6-3.7-10.6-14.5-4-20.8 6.6-6.4 17.8-4.4 21.7 3.8L68 55.2C61.4 46.9 51.1 42 40.2 42.1z"></path>
    </Svg>
  );
}

export function PowerShell(props: SvgProps) {
  return (
    <Svg viewBox="0 0 128 128" title="PowerShell" {...props}>
      <linearGradient
        id="powershell-gradient-a"
        x1="96.306"
        x2="25.454"
        y1="35.144"
        y2="98.431"
        gradientTransform="matrix(1 0 0 -1 0 128)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#a9c8ff"></stop>
        <stop offset="1" stop-color="#c7e6ff"></stop>
      </linearGradient>
      <path
        className="fill-primary group-hover:fill-[url(#powershell-gradient-a)]"
        fill-rule="evenodd"
        d="M7.2 110.5c-1.7 0-3.1-.7-4.1-1.9-1-1.2-1.3-2.9-.9-4.6l18.6-80.5c.8-3.4 4-6 7.4-6h92.6c1.7 0 3.1.7 4.1 1.9 1 1.2 1.3 2.9.9 4.6l-18.6 80.5c-.8 3.4-4 6-7.4 6H7.2z"
        clip-rule="evenodd"
        opacity=".8"
      ></path>
      <linearGradient
        id="powershell-gradient-b"
        x1="25.336"
        x2="94.569"
        y1="98.33"
        y2="36.847"
        gradientTransform="matrix(1 0 0 -1 0 128)"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stop-color="#2d4664"></stop>
        <stop offset=".169" stop-color="#29405b"></stop>
        <stop offset=".445" stop-color="#1e2f43"></stop>
        <stop offset=".79" stop-color="#0c131b"></stop>
        <stop offset="1"></stop>
      </linearGradient>
      <path
        className="fill-secondary group-hover:fill-[url(#powershell-gradient-b)]"
        fill-rule="evenodd"
        d="M120.3 18.5H28.5c-2.9 0-5.7 2.3-6.4 5.2L3.7 104.3c-.7 2.9 1.1 5.2 4 5.2h91.8c2.9 0 5.7-2.3 6.4-5.2l18.4-80.5c.7-2.9-1.1-5.3-4-5.3z"
        clip-rule="evenodd"
      ></path>
      <path
        className="fill-primary group-hover:fill-[#2C5591]"
        fill-rule="evenodd"
        d="M64.2 88.3h22.3c2.6 0 4.7 2.2 4.7 4.9s-2.1 4.9-4.7 4.9H64.2c-2.6 0-4.7-2.2-4.7-4.9s2.1-4.9 4.7-4.9zM78.7 66.5c-.4.8-1.2 1.6-2.6 2.6L34.6 98.9c-2.3 1.6-5.5 1-7.3-1.4-1.7-2.4-1.3-5.7.9-7.3l37.4-27.1v-.6l-23.5-25c-1.9-2-1.7-5.3.4-7.4 2.2-2 5.5-2 7.4 0l28.2 30c1.7 1.9 1.8 4.5.6 6.4z"
        clip-rule="evenodd"
      ></path>
      <path
        className="fill-primary group-hover:fill-[#FFF]"
        fill-rule="evenodd"
        d="M77.6 65.5c-.4.8-1.2 1.6-2.6 2.6L33.6 97.9c-2.3 1.6-5.5 1-7.3-1.4-1.7-2.4-1.3-5.7.9-7.3l37.4-27.1v-.6l-23.5-25c-1.9-2-1.7-5.3.4-7.4 2.2-2 5.5-2 7.4 0l28.2 30c1.7 1.8 1.8 4.4.5 6.4zM63.5 87.8h22.3c2.6 0 4.7 2.1 4.7 4.6 0 2.6-2.1 4.6-4.7 4.6H63.5c-2.6 0-4.7-2.1-4.7-4.6 0-2.6 2.1-4.6 4.7-4.6z"
        clip-rule="evenodd"
      ></path>
    </Svg>
  );
}

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
  Rust,
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
