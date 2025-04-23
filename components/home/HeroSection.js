import { useState } from 'react';
import LeadCaptureModal from '../LeadCaptureModal';

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="relative pt-24 pb-12 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text">BREAKING THE CYCLE</h1>
          <h2 className="text-xs md:text-sm text-[#e0e0e0]/50 mb-6 font-light leading-relaxed">
            "A gentle step-by-step guide to healing your relationship with food & losing weight naturally."
          </h2>
          <p className="text-lg text-[#e0e0e0] mb-8">by <span className="font-medium text-white">RAMINY DA PAIXÃO</span></p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button 
              onClick={handleOpenModal}
              className="bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] hover:from-[#e76fb3] hover:to-[#9b60e4] text-white font-medium py-3 px-8 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105"
            >
              Read Now
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="relative w-72 h-96 md:w-80 md:h-[28rem] bg-gradient-to-b from-[#3d3659] to-[#2d2c40] rounded-lg shadow-xl overflow-hidden transform rotate-1">
            <div className="absolute inset-0 flex flex-col justify-center items-center p-8 text-center">
              <h3 className="bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text text-3xl md:text-4xl font-bold mb-4">BREAKING<br/>THE<br/>CYCLE</h3>
              <div className="w-32 h-1 bg-[#e45ca8] my-4"></div>
              <p className="text-white/40 text-xs md:text-xs">"A gentle step-by-step guide to healing your relationship with food & losing weight naturally."</p>
              <p className="text-white mt-auto">RAMINY DA PAIXÃO</p>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal */}
      <LeadCaptureModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </section>
  );
}