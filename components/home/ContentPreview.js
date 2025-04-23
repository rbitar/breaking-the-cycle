import { cn } from '../../lib/utils';

export default function ContentPreview() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <div className="border-t-2 border-[#e45ca8] w-24 mb-6 mx-auto"></div>
          <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text w-full">Step Zero: A Little Note Before We Begin</h3>
          <p className="text-[#e0e0e0] leading-relaxed">
            I am not a doctor or a dietitian. Everything in this guide is based on my personal experience and what worked for me. Before starting any lifestyle changes, please consult a medical professional, and if possible, get a full body check-up to make sure everything's in balance. Your health comes first always.
          </p>
        </div>

        <div className="mb-16">
          <div className="border-t-2 border-[#8a4bd7] w-24 mb-6 mx-auto"></div>
          <h3 className="text-2xl font-semibold text-center mb-6 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text w-full">Step One: Reset Your Eating Habits</h3>
          <p className="text-[#e0e0e0] leading-relaxed mb-4">
            The first 3 months were the foundation of my transformation. I didn't follow any strict or fancy plan I just made real, simple changes that I could stick to.
          </p>
          <ul className="list-disc pl-6 mb-6 text-[#e0e0e0] leading-relaxed">
            <li>Ate clean, whole foods cut out over-processed items</li>
            <li>Avoided added sugar completely for 3 months</li>
            <li>Focused on high-protein meals and fresh fruits</li>
            <li>No alcohol, no cheat meals</li>
            <li>Aimed for about 1200 calories/day (I wasn't counting, but I was mindful)</li>
          </ul>
          
          <h4 className="font-medium text-lg mb-2 text-[#7fe7d6]">Overcoming the Food Noise & Binge Urges:</h4>
          <p className="text-[#e0e0e0] leading-relaxed mb-4">
            This was one of the hardest parts, but also the most rewarding. What helped me:
          </p>
          <ul className="list-disc pl-6 mb-4 text-[#e0e0e0] leading-relaxed">
            <li>Drinking tea or water when cravings hit</li>
            <li>Writing down how I felt instead of reacting to the urge</li>
            <li>Giving myself 10 minutes before responding to cravings</li>
            <li>Swapping the binge urge for a walk, a fun video, or deep breathing</li>
          </ul>
          <p className="text-[#e0e0e0] italic leading-relaxed">
            The first few weeks were tough, but each day made the next one easier.
          </p>
        </div>

        <div className="flex justify-center">
          <button className="group relative bg-gradient-to-r from-[#e45ca8] to-[#8a4bd7] hover:from-[#e76fb3] hover:to-[#9b60e4] text-white font-medium py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105">
            Continue Reading
            <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>
    </section>
  );
}