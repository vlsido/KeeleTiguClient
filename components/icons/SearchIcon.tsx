import Svg, {
  SvgProps,
  Path
} from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#212221"
      d="M10 3.5a6.5 6.5 0 0 1 6.5 6.5c0 1.61-.59 3.09-1.56 4.23l.27.27H16l5 5-1.5 1.5-5-5v-.79l-.27-.27A6.52 6.52 0 0 1 10 16.5a6.5 6.5 0 1 1 0-13Zm0 2c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as SearchIcon }


