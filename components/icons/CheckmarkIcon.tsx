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
      stroke="#EEE"
      strokeWidth={2.5}
      d="m16.741 25.373-8.14-6.718M27.4 10.627 15.95 24.381"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as CheckmarkIcon }

