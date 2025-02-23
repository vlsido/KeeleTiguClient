import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color || "#FFF3F3"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.091}
      d="M36.692 39H14.77a3.462 3.462 0 0 1 0-6.923h19.616m0 0a2.308 2.308 0 0 0 2.307-2.308V11.308A2.308 2.308 0 0 0 34.385 9H14.769a3.462 3.462 0 0 0-3.461 3.37v23.076m23.077-3.37V39"
    />
    <Path
      stroke={props.color || "#FFF3F3"}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.091}
      d="M26.424 19.39h5.345l-5.677 8.014h6.01M15.95 21.66l2.46-7.382a.923.923 0 0 1 .877-.633c.399 0 .754.254.881.633l2.46 7.382m-5.788-2.672h4.897"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as DictionaryIcon }
