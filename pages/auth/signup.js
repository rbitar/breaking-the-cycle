import { useRouter } from 'next/router';
import { SignupForm } from '../../components/auth';
import SupabaseRequired from '../../components/auth/SupabaseRequired';
import Link from 'next/link';
import { isSupabaseConfigured } from '../../services/supabase/client';

export default function SignupPage() {
  const router = useRouter();
  
  const handleAuthSuccess = (user) => {
    // Redirect to home page or dashboard after successful authentication
    router.push('/');
  };

  if(!isSupabaseConfigured) {
    return (
      <SupabaseRequired />
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card p-8 shadow rounded-lg">
          <SignupForm onSuccess={handleAuthSuccess} />      
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/auth/login" className="font-medium text-primary hover:text-primary/90">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}