import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../utility/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../dataStorage/auth-context';

// isLogin is set to true
export default function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  // taps into the context using hook useContext, object being passed in 
  const authContx = useContext(AuthContext);

  async function loginHandler({ email, password }) {
    setIsAuthenticating(true);

    // Occurs when credentials are not valid
    try {
      const token = await login(email, password);
      // authenticating the token returned from FB.
      authContx.authenticate(token);
    } catch (error) {
      Alert.alert('Credentials failed', 'Check your email/password or try again later.');
    }
    setIsAuthenticating(false);
  }

  // Loading state - spinner while it waits to send reuqest. 
  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in, 1 minute please." />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler} />;
}


