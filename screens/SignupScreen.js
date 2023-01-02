import { useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../utility/auth';


// isLogin is set to false 
// function receives an object that contains email/password 
// the object will be validated already from AuthContent.
export default function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    await createUser(email, password); // recall createUser returns  promise. (b/c we're using await)
    setIsAuthenticating(false);
  }

  // Loading state - spinner while it waits to send reuqest. 
  if (isAuthenticating) {
    return <LoadingOverlay message="Account being created" />
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}


