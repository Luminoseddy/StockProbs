import { createContext, useState } from 'react';

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
  }

  // erase the token
  function logout() {
    setAuthToken(null);
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

