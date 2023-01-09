import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '', // get token, store it here.
  isAuthenticated: false, // helper variable, tells if user is logged on or not.
  authenticate: (token) => { }, // method that triggers when states are changed (logged in/out)
  logout: () => { }, // clears the auth status, erases the token.
});

// responsible for managing the auth-context state
export default function AuthContextProvider({ children }) {

  // indication of when a token is logged in/signed up succesfully
  const [authToken, setAuthToken] = useState();

  // triggers when user logged in/signed up succesfuly. 
  function authenticate(token) {
    setAuthToken(token);
    // store token in device to continue where user left from if app was closed.
    AsyncStorage.setItem('token', token);
  }

  // erase the token
  function logout() {
    setAuthToken(null);
    // clear token when logging out
    AsyncStorage.removeItem('token');
  }

  // constructing object passed to auth-context users 
  const value = {
    token: authToken, // to our state
    isAuthenticated: !!authToken, // converts truthy/falsy to true/false
    authenticate: authenticate, // points to function 
    logout: logout, // points to function 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

