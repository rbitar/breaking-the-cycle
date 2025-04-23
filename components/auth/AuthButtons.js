import { useRouter } from 'next/router';
import { Button } from '../ui/button';

export function SignIn() {
  const router = useRouter();
  
  const handleSignIn = () => {
    router.push('/auth/login');
  };
  
  return (
    <Button onClick={handleSignIn}>Sign In</Button>
  );
}

export function SignUp() {
  const router = useRouter();
  
  const handleSignUp = () => {
    router.push('/auth/signup');
  };
  
  return (
    <Button variant="default" onClick={handleSignUp}>Sign Up</Button>
  );
}