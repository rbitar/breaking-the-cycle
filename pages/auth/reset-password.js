import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ResetPasswordForm } from '../../components/auth';
import { supabase } from '../../services/supabase';
import { Alert, AlertDescription } from '../../components/ui/alert';

export default function ResetPasswordPage() {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const handleHashChange = async () => {
      setLoading(true);
      try {
        // Get the access token from the URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (!accessToken) {
          setError('Invalid or expired reset link. Please try again.');
          setLoading(false);
          return;
        }
        
        // Set the access token in the session
        const { error } = await supabase.auth.setSession({
          access_token: accessToken,
          refresh_token: '',
        });
        
        if (error) {
          console.error('Session error:', error);
          setError(error.message || 'Token has expired or is invalid');
          setLoading(false);
          return;
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error validating reset token:', err);
        setError(err.message || 'Invalid or expired reset link. Please try again.');
        setLoading(false);
      }
    };
    
    // Handle the hash params when the component mounts
    if (typeof window !== 'undefined') {
      handleHashChange();
    }
  }, []);
  
  const handleResetSuccess = () => {
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card p-8 shadow rounded-lg">
          {loading ? (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Validating your reset link...</p>
            </div>
          ) : error ? (
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-6 text-center">Password Reset Failed</h2>
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <div className="text-center mt-6">
                <Link
                  href="/auth/forgot-password" 
                  className="font-medium text-primary hover:text-primary/90"
                >
                  Try again
                </Link>
              </div>
            </div>
          ) : (
            <ResetPasswordForm onSuccess={handleResetSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}