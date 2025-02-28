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
      fill="#FFF3F3"
      d="M30 16.5v3H12l8.25 8.25-2.13 2.13L6.24 18 18.12 6.12l2.13 2.13L12 16.5h18Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as ArrowBackIcon }

