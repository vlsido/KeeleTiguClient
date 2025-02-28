import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={32}
    height={32}
    fill="none"
    {...props}
  >
    <Path
      fill="#212221"
      d="m16 20.533-8-8 1.867-1.866L16 16.8l6.133-6.133L24 12.533l-8 8Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as KeyboardArrowDownIcon }

