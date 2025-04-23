import HeroSection from '../components/home/HeroSection';
import ContentPreview from '../components/home/ContentPreview';
import Testimonials from '../components/home/Testimonials';
import AuthorSection from '../components/home/AuthorSection';
import NewsletterCTA from '../components/home/NewsletterCTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-[#131a2b] min-h-screen">
      {/* Hero Section */}
      <HeroSection />

      {/* Content Preview Section */}
      <ContentPreview />

      {/* Testimonials/Features Section */}
      <Testimonials />

      {/* Author Section */}
      <AuthorSection />

      {/* Newsletter/CTA Section */}
      <NewsletterCTA />

      {/* Footer */}
      <Footer />
    </div>
  );
}