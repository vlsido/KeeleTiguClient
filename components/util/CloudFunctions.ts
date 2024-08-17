import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { functions } from "./FirebaseConfig";

connectFunctionsEmulator(functions, "127.0.0.1", 5001);


export async function callCloudFunction(
  name: string,
  data?: any,
) {

  const callableFunction = httpsCallable(functions, name);

  const result = await callableFunction(data).catch((error) => {
    console.log("ERROR", error);
  });

  return result?.data;
}
