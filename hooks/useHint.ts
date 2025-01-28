import { useContext } from "react";
import { HintContext } from "../components/store/HintContext";
import { OperationError } from "../components/errors/OperationError";

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
