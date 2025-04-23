import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '../../services/supabase';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Alert, AlertDescription } from '../ui/alert';

export default function ForgotPasswordForm({ onSuccess }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage('');

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      
      if (error) throw error;
      
      setMessage('Check your email for the password reset link');
      if (onSuccess) onSuccess(email);
    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Reset Your Password</h2>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {message && (
        <Alert 
          variant="default" 
          className="mb-4 border-green-300 bg-green-50/50"
        >
          <AlertDescription>{message}</AlertDescription>
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
            placeholder="Enter your email address"
          />
        </div>
        
        <Button 
          type="submit" 
          disabled={loading}
          className="w-full bg-primary text-primary-foreground"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </Button>
        
        <div className="text-center mt-4">
          <Link
            href="/auth/login" 
            className="text-sm text-primary hover:text-primary/90"
          >
            Back to login
          </Link>
        </div>
      </form>
    </div>
  );
}