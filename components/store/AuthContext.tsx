import React, { createContext, useEffect } from "react";
import { onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { auth } from "../util/FirebaseConfig";
import { router } from "expo-router";

interface AuthContextProps {
}

export const AuthContext = createContext<AuthContextProps>({
});


function AuthContextProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("AuthContextProvider");

    const unsubscribe = () => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          if (user.isAnonymous) {
            console.log("User is AnonymousMouse");
          } else if (!user.isAnonymous) {
            console.log("User is not AnonymousMouse");
          }
        } else {
          console.log("User is not logged in");
          await signInAnonymously(auth);
        }
      });
    };

    return unsubscribe;

  }, []);

  return (
    <AuthContext.Provider value={{}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
