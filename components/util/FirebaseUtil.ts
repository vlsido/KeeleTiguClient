import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./FirebaseConfig";


export async function loginUser(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error(error);
    let errorMessage: any;
    switch (error.code) {
      case "auth/invalid-email":
        errorMessage = "Invalid email format.";
        break;
      case "auth/user-disabled":
        errorMessage = "This user has been disabled.";
        break;
      case "auth/user-not-found":
        errorMessage = "User not found.";
        break;
      case "auth/wrong-password":
        errorMessage = "Wrong password.";
        break;
      default:
        errorMessage = "Login failed.";
        break;
    }
    throw new Error(errorMessage);
  }
}
