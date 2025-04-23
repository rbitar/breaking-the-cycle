import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../services/supabase/client';

// This page handles the callback from Supabase Auth
export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    // Extract the hash from the URL
    const { hash } = window.location;
    
    if (hash) {
      // If we have a hash, process it with Supabase Auth
      console.log('Processing auth callback');
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' && session) {
          console.log('User signed in via callback');
          router.push('/');
        }
      });
    } else {
      // If no hash, redirect to the login page
      router.push('/auth/login');
    }
  }, [router]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Processing authentication...</h2>
        <p>Please wait while we complete your sign in.</p>
      </div>
    </div>
  );
}