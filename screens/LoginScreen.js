import AuthContent from '../components/Auth/AuthContent';
import { useState } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utility/auth';

// isLogin is set to true
export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);
    await login(email, password); // recall createUser returns  promise. (b/c we're using await)
    setIsAuthenticating(false);
  }

  // Loading state - spinner while it waits to send reuqest. 
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in, 1 minute please." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}


