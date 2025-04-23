import { useState } from 'react';
import { supabase } from '../../services/supabase';
import OTPVerification from './OTPVerification';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';

export default function SignupForm({ onSuccess, onError }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showOTPVerification, setShowOTPVerification] = useState(false);
  const [userId, setUserId] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Configure Supabase to use OTP for signup
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: window.location.origin + '/auth/callback',
          data: {
            email_verified: false // This will be set to true after OTP verification
          }
        }
      });
      
      if (error) throw error;
      
      if (data?.user) {
        // User created successfully, but needs OTP verification
        // Supabase automatically sends the OTP during signUp
        setUserId(data.user.id);
        setShowOTPVerification(true);
      } else {
        // Something unexpected happened
        setError('An error occurred during signup');
        console.log('Signup error, unexpected data format:', data);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || 'Failed to create account');
      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOTPSuccess = (user) => {
    // OTP verification successful, user is now verified
    if (onSuccess) onSuccess(user);
  };

  const handleOTPCancel = () => {
    // User canceled OTP verification, go back to signup form
    setShowOTPVerification(false);
  };

  if (showOTPVerification) {
    return (
      <OTPVerification
        email={email}
        onSuccess={handleOTPSuccess}
        onCancel={handleOTPCancel}
        type="signup"
      />
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            minLength={6}
          />
          <p className="text-xs text-gray-500 mt-1">
            Must be at least 6 characters
          </p>
        </div>
        
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            disabled={loading}
          />
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground"
        >
          {loading ? 'Creating account...' : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
}