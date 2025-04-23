import { useState } from 'react';
import { supabase } from '../../services/supabase';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import { Alert, AlertDescription } from '../ui/alert';

export default function OTPVerification({ email, onSuccess, onCancel, type = 'signup' }) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: type
      });
      
      if (error) {
        console.error('OTP verification error:', error);
        setError(error.message || 'Failed to verify OTP');
        setLoading(false);
        return;
      }
      
      // OTP verification successful
      if (onSuccess) onSuccess(data.user);
    } catch (err) {
      console.error('OTP verification error:', err);
      setError(err.message || 'Failed to verify OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await supabase.auth.resend({
        type: type,
        email
      });
      
      if (error) {
        console.error('OTP resend error:', error);
        setError(error.message || 'Failed to resend OTP');
        setLoading(false);
        return;
      }
      
      // Show success message for resend
      setError('OTP resent to your email');
    } catch (err) {
      console.error('OTP resend error:', err);
      setError(err.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-6 text-center">Verify Your Email</h2>
      
      <p className="text-center mb-4">
        We've sent a one-time password to <strong>{email}</strong>
      </p>
      
      {error && (
        <Alert 
          variant={error.includes('resent') ? "default" : "destructive"} 
          className={cn(
            "mb-4",
            error.includes('resent') ? 'border-green-300 bg-green-50/50' : ''
          )}
        >
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium mb-3 text-center">
            One-Time Password
          </label>
          <div className="flex justify-center">
            <InputOTP 
              maxLength={6} 
              value={otp} 
              onChange={setOtp}
              disabled={loading}
              required
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>
        
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-primary-foreground"
        >
          {loading ? 'Verifying...' : 'Verify'}
        </Button>
        
        <div className="flex justify-between mt-4">
          <Button
            type="button"
            onClick={handleResendOTP}
            disabled={loading}
            variant="link"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Resend code
          </Button>
          
          <Button
            type="button"
            onClick={onCancel}
            disabled={loading}
            variant="link"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Back to signup
          </Button>
        </div>
      </form>
    </div>
  );
}