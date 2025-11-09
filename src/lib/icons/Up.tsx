import { Svg, type SvgProps } from ".";

export function Up(props: SvgProps) {
  return (
    <Svg {...props} title="Expand">
      <path d="m18 15-6-6-6 6" />
    </Svg>
  );
}
