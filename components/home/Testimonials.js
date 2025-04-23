export default function Testimonials() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1e2235]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text w-full">What Readers Are Saying</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#2d2c40] p-6 rounded-lg shadow-md border border-[#8a4bd7]/20">
            <i className="ri-double-quotes-l text-3xl text-[#e45ca8] mb-4"></i>
            <p className="text-[#e0e0e0] mb-4 leading-relaxed">"This book completely changed my relationship with food. Raminy's approach is gentle yet effective. I've lost 20 pounds, but more importantly, I've found peace with eating."</p>
            <p className="font-medium text-[#7fe7d6]">- Sarah M.</p>
          </div>
          
          <div className="bg-[#2d2c40] p-6 rounded-lg shadow-md border border-[#8a4bd7]/20">
            <i className="ri-double-quotes-l text-3xl text-[#e45ca8] mb-4"></i>
            <p className="text-[#e0e0e0] mb-4 leading-relaxed">"Breaking the Cycle helped me understand that my weight loss journey didn't have to be punishing. The step-by-step approach made it feel manageable and sustainable."</p>
            <p className="font-medium text-[#7fe7d6]">- Michael T.</p>
          </div>
          
          <div className="bg-[#2d2c40] p-6 rounded-lg shadow-md border border-[#8a4bd7]/20">
            <i className="ri-double-quotes-l text-3xl text-[#e45ca8] mb-4"></i>
            <p className="text-[#e0e0e0] mb-4 leading-relaxed">"I was skeptical at first, but Raminy's personal story resonated with me so deeply. This isn't just another diet book - it's a compassionate guide to healing."</p>
            <p className="font-medium text-[#7fe7d6]">- Jasmine K.</p>
          </div>
        </div>
      </div>
    </section>
  );
}