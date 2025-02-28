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
      fill={props.color || "#000000"}
      fillRule="evenodd"
      d="M7.5 4.5a3 3 0 0 0-3 3v21a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-21a3 3 0 0 0-3-3h-15ZM6 7.5A1.5 1.5 0 0 1 7.5 6h15A1.5 1.5 0 0 1 24 7.5v21a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 6 28.5v-21ZM27 12a2.25 2.25 0 0 1 4.5 0v15.227l-2.25 3.375L27 27.227V12Zm2.25-.75a.75.75 0 0 0-.75.75v1.5H30V12a.75.75 0 0 0-.75-.75Zm0 16.648-.75-1.125V15H30v11.773l-.75 1.125Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || "#000000"}
      d="M14.999 11.25a.75.75 0 0 1 .75-.75h6a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5h-6Zm-.75 7.5a.75.75 0 0 1 .75-.75h6a.75.75 0 1 1 0 1.5h-6a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 1 0 0 1.5h6a.75.75 0 1 0 0-1.5h-6Z"
    />
    <Path
      fill={props.color || "#000000"}
      fillRule="evenodd"
      d="M7.5 20.25a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 .75.75V24a.75.75 0 0 1-.75.75H8.25A.75.75 0 0 1 7.5 24v-3.75ZM9 21v2.25h2.25V21H9Z"
      clipRule="evenodd"
    />
    <Path
      fill={props.color || "#000000"}
      d="M13.28 11.78a.75.75 0 0 0-1.06-1.06l-2.47 2.47-.97-.97a.75.75 0 0 0-1.06 1.06l2.03 2.03 3.53-3.53Z"
    />
  </Svg>
)
const Memo = memo(SvgComponent)
export { Memo as ExamIcon }
