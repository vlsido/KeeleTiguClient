import Svg, {
  SvgProps,
  Path
} from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={64}
    height={64}
    fill="none"
    {...props}
  >
    <Path
      stroke="#EEE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M13.333 15.541h7.2m0 0h4.8m-4.8 0v-2.208m8.8 2.208h-4m0 0c-.842 3.016-2.613 5.87-4.63 8.376l3.086 3.208m-8.226 2.208a50.659 50.659 0 0 0 5.14-5.413c-1.026-1.208-2.466-3.157-2.88-4.04M36 50.667l2.221-5.334m0 0 4.446-10.666 4.445 10.666m-8.89 0h8.89m2.221 5.334-2.221-5.334"
    />
    <Path
      stroke="#EEE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M37.333 26.667v-5.334c0-7.541 0-11.314-2.344-13.656-2.341-2.344-6.114-2.344-13.656-2.344-7.541 0-11.314 0-13.656 2.344-2.344 2.342-2.344 6.115-2.344 13.656 0 7.542 0 11.315 2.344 13.656 2.342 2.344 6.115 2.344 13.656 2.344h5.334"
    />
    <Path
      stroke="#EEE"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M10.666 44c0 3.744 0 5.619.9 6.963.388.582.889 1.082 1.471 1.472 1.344.898 3.219.898 6.963.898M53.333 20c0-3.744 0-5.619-.898-6.963a5.333 5.333 0 0 0-1.473-1.472c-1.344-.898-3.218-.898-6.962-.898m-17.334 32c0-7.542 0-11.315 2.345-13.656 2.34-2.344 6.114-2.344 13.655-2.344 7.542 0 11.315 0 13.657 2.344 2.343 2.341 2.343 6.114 2.343 13.656 0 7.541 0 11.314-2.343 13.656-2.342 2.344-6.115 2.344-13.657 2.344-7.54 0-11.314 0-13.655-2.344-2.345-2.342-2.345-6.115-2.345-13.656Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as TranslateIcon }
