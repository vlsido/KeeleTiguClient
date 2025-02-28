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
      fill="#FFF3F3"
      d="m25.334 8.547-1.88-1.88L16 14.12 8.547 6.667l-1.88 1.88L14.12 16l-7.453 7.453 1.88 1.88L16 17.88l7.454 7.453 1.88-1.88L17.88 16l7.454-7.453Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as CloseIcon }
