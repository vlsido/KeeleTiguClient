import { httpsCallable } from "firebase/functions";
import { functions } from "./FirebaseConfig";
import { OperationError } from "../errors/OperationError";

// UNCOMMENT TO DEBUG
// connectFunctionsEmulator(
//   functions,
//   "192.168.0.103",
//   5001
// );

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
