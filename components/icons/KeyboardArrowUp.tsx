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
      d="m16 14.4-6.133 6.133L8 18.667l8-8 8 8-1.867 1.866L16 14.4Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as KeyboardArrowUpIcon }
