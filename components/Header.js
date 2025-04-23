import { useState } from 'react';
import LeadCaptureModal from './LeadCaptureModal';

export default function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 lg:px-24 flex justify-between items-center bg-[#131a2b]/90 backdrop-blur-sm shadow-md border-b border-[#8a4bd7]/20">
      <a href="/" className="text-xl font-bold flex items-center">
        <span className="bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text mr-2">BREAKING</span>
        <span className="text-white">THE CYCLE</span>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-[#e0e0e0] hover:text-[#7fe7d6] transition duration-300">About</a>
        <a href="#" className="text-[#e0e0e0] hover:text-[#7fe7d6] transition duration-300">Contents</a>
        <a href="#" className="text-[#e0e0e0] hover:text-[#7fe7d6] transition duration-300">Testimonials</a>
        <a href="#" className="text-[#e0e0e0] hover:text-[#7fe7d6] transition duration-300">Contact</a>
      </nav>
      <div className="flex items-center gap-4">
        <button 
          onClick={handleOpenModal}
          className="hidden md:inline-block bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] hover:from-[#e76fb3] hover:to-[#9b60e4] text-white font-medium py-2 px-6 rounded-full transition duration-300 shadow-lg"
        >
          Read Now
        </button>
        <button className="md:hidden text-white">
          <i className="ri-menu-line text-2xl"></i>
        </button>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </header>
  );
}