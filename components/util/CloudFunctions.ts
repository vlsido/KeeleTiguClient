import { httpsCallable } from "firebase/functions";
import { functions } from "./FirebaseConfig";
import { OperationError } from "../errors/OperationError";

// connectFunctionsEmulator(functions, "127.0.0.1", 5001);

export async function callCloudFunction(
  name: string,
  data?: object,
) {

  const callableFunction = httpsCallable(
    functions,
    name
  );

  const result = await callableFunction(data).catch((error) => {
    console.error(
      "error calling cloud function",
      error.message
    );

    throw new OperationError(
      "cloud-function/error",
      error.message
    );
  });

  return result?.data;
}
