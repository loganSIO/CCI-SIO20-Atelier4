import React, { createContext, useContext } from 'react'
import * as Google from "expo-google-app-auth";

const AuthContext = createContext({});

const config = {
  androidClientId: '1033034459895-gkj59lu4mofen9tjmpni33tduvju1njj.apps.googleusercontent.com',
  iosClientId: '1033034459895-5kdgc1efcd9dvtr38k1kgb8gp3te7tnm.apps.googleusercontent.com',
  scopes:["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export const AuthProvider = ({ children }) => {

  const signInWithGoogle = async() => {
    Google.logInAsync(config).then(async (logInResult) => {
      if (logInResult.type === 'succes') {
        //login
      }
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user: null,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}