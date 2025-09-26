import { motion } from "motion/react";
import { hoverVariantBuilder, Svg, type SvgProps } from ".";

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
