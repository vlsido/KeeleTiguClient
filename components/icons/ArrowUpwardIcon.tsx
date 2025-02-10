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
      fillRule="evenodd"
      d="M33 18c0 8.285-6.715 15-15 15-8.284 0-15-6.715-15-15C3 9.716 9.716 3 18 3c8.285 0 15 6.716 15 15Zm-22.06-1.06 6-6a1.5 1.5 0 0 1 2.12 0l6 6a1.5 1.5 0 0 1-2.12 2.12l-3.44-3.439V24a1.5 1.5 0 1 1-3 0v-8.379l-3.44 3.44a1.5 1.5 0 0 1-2.12-2.122Z"
      clipRule="evenodd"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as ArrowUpwardIcon }
