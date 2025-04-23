import { useState } from 'react';
import { useRouter } from 'next/router';
import { ForgotPasswordForm, OTPVerification, ResetPasswordForm } from '../../components/auth';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [stage, setStage] = useState('request'); // 'request', 'verify', 'reset'
  const [email, setEmail] = useState('');
  
  const handleRequestSuccess = (email) => {
    setEmail(email);
    setStage('verify');
  };
  
  const handleVerifySuccess = () => {
    setStage('reset');
  };
  
  const handleResetSuccess = () => {
    router.push('/auth/login');
  };
  
  const handleCancel = () => {
    if (stage === 'verify') {
      setStage('request');
    } else {
      router.push('/auth/login');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-card p-8 shadow rounded-lg">
          {stage === 'request' && (
            <ForgotPasswordForm onSuccess={handleRequestSuccess} />
          )}
          
          {stage === 'verify' && (
            <OTPVerification 
              email={email}
              onSuccess={handleVerifySuccess}
              onCancel={handleCancel}
              type="signup"
            />
          )}
          
          {stage === 'reset' && (
            <ResetPasswordForm onSuccess={handleResetSuccess} />
          )}
          
          {stage === 'request' && (
            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{' '}
                <Link href="/auth/login" className="font-medium text-primary hover:text-primary/90">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}