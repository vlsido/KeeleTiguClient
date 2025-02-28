import Svg, {
  SvgProps,
  Path
} from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={28}
    height={28}
    fill="none"
    {...props}
  >
    <Path
      stroke="#FFF3F3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M25 27H6a3 3 0 0 1 0-6h17m0 0a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H6a3 3 0 0 0-3 2.92v20M23 21v6"
    />
    <Path
      stroke="#FFF3F3"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16.102 10.004h4.632l-4.92 6.946h5.208M7.024 11.972l2.132-6.398a.8.8 0 0 1 .76-.548c.346 0 .654.22.764.548l2.132 6.398M7.796 9.656h4.244"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as DictionaryIcon }
