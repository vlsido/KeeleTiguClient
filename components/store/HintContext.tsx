import { createContext } from "react";
import Hint from "../Hint";
import { useSignal } from "@preact/signals-react";

interface HintContextProps {
  showHint: (text: string, durationInMs?: number) => void;
}

export const HintContext = createContext<HintContextProps>({
  showHint: () => { return }
});


function HintContextProvider({ children }: { children: React.ReactNode }) {
  const hintText = useSignal<string>("Text was supposed to be here :/");
  const isHintVisible = useSignal<boolean>(false);
  const duration = useSignal<number>(2000);

  function showHint(
    text: string, durationInMs: number
  ) {

    hintText.value = text;
    duration.value = durationInMs;
    isHintVisible.value = true;
  }

  const value = {
    showHint
  }

  return (
    <HintContext.Provider value={value}>
      {children}
      <Hint text={hintText} isHintVisible={isHintVisible} duration={duration} />
    </HintContext.Provider>
  )
}

export default HintContextProvider;
