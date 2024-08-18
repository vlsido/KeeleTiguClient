import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33}
    height={33}
    fill="none"
    {...props}
  >
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.667}
      d="M3.5 8.248v18.11c4.719-2.603 9.315-2.155 13 0 3.998-2.198 8.343-2.401 13 0V8.249a13.96 13.96 0 0 0-13 0c-3.64-1.115-6.497-2.92-13 0Z"
    />
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.667}
      d="M18.956 13.525a11.934 11.934 0 0 1 7.62-.538m-7.62 6.814a11.934 11.934 0 0 1 7.62-.538m-7.62-2.69a11.934 11.934 0 0 1 7.62-.538"
    />
    <Path stroke="#fff" d="M10.5 12.5v8m-4-4h8" />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as AddToDictionaryIcon }
