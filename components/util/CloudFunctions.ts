import { Alert } from "react-native";
import { connectFunctionsEmulator, httpsCallable } from "firebase/functions";
import { auth, functions } from "./FirebaseConfig";

connectFunctionsEmulator(functions, "127.0.0.1", 5001);


export async function callCloudFunction(
  name: string,
  data?: any,
  debug?: boolean,
) {
  const storeSignupData = httpsCallable(functions, name);

  storeSignupData(data).then((result) => {
    console.log("RESULT", result);
    console.log(result.data);
  }).catch((error) => {
    console.log("ERROR", error);
  });
  //
  // const idToken = await auth.currentUser?.getIdToken();
  //
  // if (!idToken) {
  //   Alert.alert("Error. Something is wrong.");
  // }
  //
  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${idToken}`,
  //   },
  //   body: JSON.stringify(data),
  // });

  // if (!response.ok) {
  //   const errorText = await response.text();
  //   console.error("HTTP Error:", errorText);
  // }

  // const result = await response.json();

}
