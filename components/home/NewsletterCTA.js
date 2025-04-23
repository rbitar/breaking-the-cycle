import { useState } from 'react';
import { supabase, isSupabaseConfigured } from '../../services/supabase';
import { Alert, AlertDescription } from '../ui/alert';

export default function NewsletterCTA() {
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
            name: 'Newsletter Subscriber', // Default name since we don't collect it here
            email,
            join_newsletter: true,
            message: 'Newsletter signup from homepage'
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
      setEmail('');
      
      // Reset success message after a few seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (err) {
      console.error('Newsletter signup error:', err);
      setError(err.message || 'There was a problem with your subscription');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-[#2d2c40] to-[#3d3659] text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text">Get a Free Chapter</h3>
        <p className="mb-8 text-[#e0e0e0]">Sign up for our newsletter and receive a free chapter from "Breaking the Cycle" plus exclusive wellness tips from Raminy.</p>
        
        {isSuccess && (
          <div className="mb-6 bg-green-500/20 text-green-300 p-3 rounded-md">
            <p>Thank you for subscribing! Your free chapter is on the way.</p>
          </div>
        )}
        
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-900/50 text-red-200">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address" 
            className="flex-1 py-3 px-4 rounded-full text-gray-800 bg-white/90 focus:outline-none focus:ring-2 focus:ring-[#e45ca8]"
            required
            disabled={isSubmitting}
          />
          <button 
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] hover:from-[#e76fb3] hover:to-[#9b60e4] text-white py-3 px-6 rounded-full font-medium transition duration-300 border border-[#7fe7d6]/10 disabled:opacity-70"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <i className="ri-loader-2-line animate-spin mr-2"></i>
                Sending...
              </span>
            ) : 'Send Me the Chapter'}
          </button>
        </form>
      </div>
    </section>
  );
}