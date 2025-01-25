import React, {
  createContext,
  useEffect
} from "react";
import {
  onAuthStateChanged,
  signInAnonymously,
  updateProfile
} from "firebase/auth";
import {
  auth,
  firestore
} from "../util/FirebaseConfig";
import {
  doc,
  getDoc
} from "firebase/firestore";

interface AuthContextProps {
}

export const AuthContext = createContext<AuthContextProps>({
});


function AuthContextProvider({ children }: { children: React.ReactNode }) {
  useEffect(
    () => {
      console.log("AuthContextProvider");

      const unsubscribe = () => {
        onAuthStateChanged(
          auth,
          async (user) => {
            if (user) {
              if (user.isAnonymous) {
                console.log("User is AnonymousMouse");
              } else if (!user.isAnonymous) {
                console.log("User is not AnonymousMouse");
                if (user.displayName == null) {
                  await syncNicknameWithDB(user.uid);
                }
              }
            } else {
              console.log("User is not logged in");
              await signInAnonymously(auth);
            }
          }
        );
      };

      return unsubscribe;

    },
    []
  );

  async function syncNicknameWithDB(uid: string) {
    const userRef = doc(
      firestore,
      "users",
      uid
    );
    const userSnap = await getDoc(userRef);

    if (userSnap.exists() && auth.currentUser != null) {
      await updateProfile(
        auth.currentUser,
        { displayName: userSnap.data().nickname }
      ).then(() => {
        console.log(
          "Nickname set to",
          userSnap.data().nickname
        );
      }).catch((error) => {
        console.error(
          "Failed to set nickname",
          error
        );
      });
    }
  }

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
