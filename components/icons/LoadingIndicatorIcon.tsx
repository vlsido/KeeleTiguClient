import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={36}
    height={36}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color ?? "#FFF3F3"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.25}
      d="M18 3v6m0 18v6m15-15h-6M9 18H3M7.394 7.393l4.242 4.243m12.729 12.729 4.242 4.242m0-21.213-4.242 4.242m-12.73 12.729-4.24 4.24"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as LoadingIndicatorIcon }
