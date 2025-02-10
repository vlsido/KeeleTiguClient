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
      d="M30 9a1.5 1.5 0 0 1 .176 2.99L30 12h-.121L28.5 28.5a4.5 4.5 0 0 1-4.236 4.492L24 33H12c-2.397 0-4.356-1.873-4.488-4.125l-.007-.25L6.12 12H6a1.5 1.5 0 0 1-.175-2.99L6 9h24Zm-14.233 7.71a1.5 1.5 0 0 0-1.827 2.35L15.878 21l-1.938 1.94-.125.14a1.5 1.5 0 0 0 2.246 1.98L18 23.123l1.939 1.939.14.124a1.5 1.5 0 0 0 1.98-2.245L20.124 21l1.938-1.94.124-.14a1.5 1.5 0 0 0-2.245-1.98L18 18.877l-1.94-1.939-.14-.124-.153-.105ZM21 3a3 3 0 0 1 3 3 1.5 1.5 0 0 1-2.99.176L21 6h-6l-.01.176A1.5 1.5 0 0 1 12 6a3 3 0 0 1 2.775-2.993L15 3h6Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as TrashIcon }
