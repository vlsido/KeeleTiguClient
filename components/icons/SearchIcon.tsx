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
      stroke="#000"
      strokeWidth={3}
      d="M21.41 13.031a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
    />
    <Path stroke="#000" strokeWidth={3} d="M30.336 32.625 18.655 19.187" />
    <Path
      stroke="#000"
      strokeOpacity={0.5}
      strokeLinecap="round"
      d="M9.41 11.031c-.436 2.758-.525 4.125 2 6"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as SearchIcon }

