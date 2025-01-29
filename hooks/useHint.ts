import { useContext } from "react";
import { OperationError } from "../components/errors/OperationError";
import { HintContext } from "../components/store/HintContext/HintContext";

export function useHint() {
  const { showHint } = useContext(HintContext);

  if (showHint == null) {
    throw new OperationError(
      "context/no-provider",
      "useHint must be used within HintContextProvider"
    );
  }

  return { showHint };
}
