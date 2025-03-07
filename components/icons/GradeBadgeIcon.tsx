import Svg, {
  SvgProps,
  Path
} from "react-native-svg"
import { memo } from "react"
const SvgComponent = (props: SvgProps) => (
  <Svg
    width={48}
    height={48}
    fill="none"
    {...props}
  >
    <Path
      fill="#FFF3F3"
      stroke="#6A6A6A"
      d="m39.434 16.976-.045.335.296.167A7.495 7.495 0 0 1 43.5 24a7.495 7.495 0 0 1-3.815 6.522l-.296.167.045.335c.044.327.066.652.066.976 0 4.459-4.023 8.03-8.476 7.434l-.336-.044-.166.295A7.49 7.49 0 0 1 24 43.5a7.49 7.49 0 0 1-6.522-3.815l-.166-.295-.336.044C12.513 40.03 8.5 36.46 8.5 32c0-.326.023-.652.066-.976l.044-.336-.295-.166A7.495 7.495 0 0 1 4.5 24a7.495 7.495 0 0 1 3.815-6.522l.296-.167-.045-.335A7.33 7.33 0 0 1 8.5 16c0-4.46 4.014-8.04 8.475-7.435l.336.046.167-.296A7.49 7.49 0 0 1 24 4.5a7.49 7.49 0 0 1 6.522 3.815l.167.296.336-.046C35.477 7.961 39.5 11.54 39.5 16c0 .324-.022.65-.066.976Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as GradeBadgeIcon }
