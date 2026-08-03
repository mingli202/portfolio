import { Svg, type SvgProps } from "./shared";

export function Up(props: SvgProps) {
  return (
    <Svg {...props} title="Expand">
      <path d="m18 15-6-6-6 6" />
    </Svg>
  );
}
