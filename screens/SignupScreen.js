import AuthContent from '../components/Auth/AuthContent';
import { useState, useContext } from 'react';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../utility/auth';
import { AuthContext } from '../dataStorage/auth-context';
import { Alert } from 'react-native';
import { createAnimatedPropAdapter } from 'react-native-reanimated';

// isLogin is set to false 
// function receives an object that contains email/password 
// the object will be validated already from AuthContent.
export default function SignupScreen() {

  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // taps into the context using hook useContext, object being passed in 
  const authContx = useContext(AuthContext);

  async function signupHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      // recall createUser returns  promise. (b/c we're using await)
      const token = await createUser(email, password);
      // authenticating the token returned from FB.
      authContx.authenticate(token);

    } catch (error) {
      Alert.alert(
        'Ouch! Error! Authentication failed!',
        "User can't be created! Check your inputs or try again later."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message="Creating user..." />;
  }
  return <AuthContent onAuthenticate={signupHandler} />;
}


