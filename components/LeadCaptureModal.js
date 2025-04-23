import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Alert, AlertDescription } from '../components/ui/alert';

export default function LeadCaptureModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured) {
      setError('Database connection is not configured. Please contact the administrator.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Insert data into the contacts table
      const { error: insertError } = await supabase
        .from('contacts')
        .insert([
          { 
            name, 
            email, 
            join_newsletter: true,
            message: 'Requested free book chapter'
          }
        ]);
      
      if (insertError) {
        throw new Error(insertError.message || 'Failed to save your information');
      }
      
      try {
        // Also add to newsletter subscribers table
        const { error: subscriberError } = await supabase
          .from('newsletter_subscribers')
          .insert([
            { 
              email,
              first_name: name.split(' ')[0], // Get first name
              subscribed: true
            }
          ]);
        
        if (subscriberError) {
          console.error('Newsletter subscription error:', subscriberError);
        }
      } catch (newsletterErr) {
        // Don't fail the whole operation if just the newsletter part fails
        console.error('Newsletter subscription error:', newsletterErr);
      }
      
      setIsSuccess(true);
      
      // Close modal after success message display
      setTimeout(() => {
        onClose();
        // Reset form state after closing
        setTimeout(() => {
          setName('');
          setEmail('');
          setIsSuccess(false);
        }, 300);
      }, 2000);
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.message || 'There was a problem submitting your information');
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-[#2d2c40] border border-[#8a4bd7]/30 text-white">
        <DialogHeader className="bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] -mx-6 -mt-6 px-6 py-4 rounded-t-lg">
          <DialogTitle className="text-xl font-bold text-white">Get Your Free Chapter</DialogTitle>
          <DialogDescription className="text-white/80">
            Enter your details to continue reading
          </DialogDescription>
        </DialogHeader>
        
        {isSuccess ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 text-green-500 mb-4">
              <i className="ri-check-line text-2xl"></i>
            </div>
            <h4 className="text-xl font-medium text-white mb-2">Thank You!</h4>
            <p className="text-gray-300">Your chapter is on its way to your inbox.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 py-2">
            {error && (
              <Alert variant="destructive" className="bg-red-900/20 border-red-900/50 text-red-200">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-1">
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Your Name
              </label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-[#3d3659] text-white border-[#8a4bd7]/30 focus:ring-[#e45ca8]/50 placeholder:text-gray-400"
                placeholder="Enter your full name"
                required
              />
            </div>
            
            <div className="space-y-1">
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email Address
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#3d3659] text-white border-[#8a4bd7]/30 focus:ring-[#e45ca8]/50 placeholder:text-gray-400"
                placeholder="your@email.com"
                required
              />
            </div>
            
            <DialogFooter className="mt-6">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] hover:from-[#e76fb3] hover:to-[#9b60e4] text-white font-medium transition duration-300"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <i className="ri-loader-2-line animate-spin mr-2"></i>
                    Processing...
                  </span>
                ) : 'Get My Free Chapter'}
              </Button>
            </DialogFooter>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              We respect your privacy and will never share your information.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}