
import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import Layout from '../components/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      console.warn('Supabase is not configured. Authentication features will not work.');
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (error){
          setUser(null)
        } else {
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state changed, event:', event);
      setUser(session?.user || null);
    });

    return () => {
      if (authListener && authListener.subscription && authListener.subscription.unsubscribe) {
        console.log('Unsubscribing from auth listener');
        authListener.subscription.unsubscribe();
      }
    };
  }, []);


  return (
    <Layout>
      <Component {...pageProps} user={user} loading={loading} />
    </Layout>
  );
}