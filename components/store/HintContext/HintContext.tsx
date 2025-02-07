import { createContext } from "react";
import {
  useSetAtom
} from "jotai";
import {
  durationAtom,
  hintTextAtom,
  isHintVisibleAtom
} from "./hintAtoms";
import Hint from "./Hint";

interface HintContextProps {
  showHint: (text: string, durationInMs?: number) => void;
}

export const HintContext = createContext<HintContextProps>({
  showHint: () => { return }
});


function HintContextProvider({ children }: { children: React.ReactNode }) {
  const setHintText = useSetAtom(hintTextAtom);
  const setIsHintVisible = useSetAtom(isHintVisibleAtom);
  const setDuration = useSetAtom(durationAtom);

  function showHint(
    text: string, durationInMs: number
  ) {
    setHintText(text);
    setDuration(durationInMs);
    setIsHintVisible(true);
  }

  const value = {
    showHint
  }

  return (
    <HintContext.Provider value={value}>
      {children}
      <Hint />
    </HintContext.Provider>
  )
}

export default HintContextProvider;
