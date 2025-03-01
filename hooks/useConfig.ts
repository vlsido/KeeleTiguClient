import { useContext } from "react";
import { OperationError } from "../components/errors/OperationError";
import { ConfigContext } from "../components/contexts/ConfigContext";

export function useConfig() {
  const {
    remoteConfig,
    rerender
  } = useContext(ConfigContext);

  if (remoteConfig == null) {
    throw new OperationError(
      "context/no-provider",
      "useHint must be used within ConfigContextProvider"
    );
  }

  return {
    remoteConfig,
    rerender
  };
}
