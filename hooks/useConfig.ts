import { useContext } from "react";
import { ConfigContext } from "../components/store/ConfigContext";
import { OperationError } from "../components/errors/OperationError";

export function useConfig() {
  const { isUnderMaintenance } = useContext(ConfigContext);

  if (isUnderMaintenance == null) {
    throw new OperationError(
      "context/no-provider",
      "useConfig must be used within ConfigContextProvider"
    );
  }

  return { isUnderMaintenance };
}
