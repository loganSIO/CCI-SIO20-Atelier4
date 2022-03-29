import
  React,
  { createContext,
    useContext,
    useState,
    useEffect,
    useMemo
} from 'react';
import { auth } from "../firebase";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";

const AuthContext = createContext({});

const config = {
  androidClientId: '1033034459895-dilkum1o1a14e5teje1lsvos4ei321eg.apps.googleusercontent.com',
  iosClientId: '1033034459895-5kdgc1efcd9dvtr38k1kgb8gp3te7tnm.apps.googleusercontent.com',
  scopes:["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUser(user);
        } else {
          setUser(null);
        }


        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);

    signOut(auth)
    .catch(error => setError(error))
    .finally(() => setLoading(true));
  }

  const signInWithGoogle = async() => {
    setLoading(true);

    await Google.logInAsync(config).then(async (logInResult) => {
      if(logInResult.type === "success") {
        // login
        const { idToken, accessToken } = logInResult;
        const credential = GoogleAuthProvider.credential(idToken, accessToken);

        await signInWithCredential(auth, credential);
      }

      return Promise.reject();
    })
    .catch(error => setError(error))
    .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user: user,
      loading: loading,
      error: error,
      signInWithGoogle: signInWithGoogle,
      logout: logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider
      value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}