import { useSignIn } from '@clerk/nextjs';
import { Button } from './ui/button';

export function GoogleSignIn() {
  const { signIn, isLoaded } = useSignIn();

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;
    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/auth/callback",
        redirectUrlComplete: "/",
      });
    } catch (error) {
      console.error('Google sign in failed', error);
    }
  };

  return (
    <Button onClick={handleGoogleSignIn}>
      Sign in with Google
    </Button>
  );
}