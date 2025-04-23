export default function AuthorSection() {
  return (
    <section className="py-16 px-6 md:px-12 lg:px-24 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-[#e45ca8] shadow-lg">
          <img 
            src="https://frontend.co/api/photos?query=woman+author+professional&w=800&h=600&q=90" 
            alt="Author Raminy" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#f8a4b4] via-[#ac8cde] to-[#7fe7d6] inline-block text-transparent bg-clip-text">About the Author</h3>
          <p className="text-[#e0e0e0] leading-relaxed mb-4">
            Raminy Da Paixão is a wellness advocate and certified nutrition coach who transformed her own life through the methods shared in "Breaking the Cycle." After struggling with disordered eating for over a decade, she developed a gentle approach to healing her relationship with food that has now helped thousands of people worldwide.
          </p>
          <p className="text-[#e0e0e0] leading-relaxed">
            Through her online community and this book, Raminy continues to support others on their journey to food freedom and sustainable weight management.
          </p>
        </div>
      </div>
    </section>
  );
}