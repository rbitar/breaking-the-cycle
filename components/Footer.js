export default function Footer() {
  return (
    <footer className="py-8 px-6 bg-[#0f121e] text-white text-center">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-center space-x-6 mb-6">
          <a href="#" className="hover:text-[#e45ca8] transition duration-300">
            <i className="ri-instagram-line text-xl"></i>
          </a>
          <a href="#" className="hover:text-[#8a4bd7] transition duration-300">
            <i className="ri-twitter-line text-xl"></i>
          </a>
          <a href="#" className="hover:text-[#7fe7d6] transition duration-300">
            <i className="ri-facebook-line text-xl"></i>
          </a>
          <a href="#" className="hover:text-[#f8a4b4] transition duration-300">
            <i className="ri-pinterest-line text-xl"></i>
          </a>
        </div>
        <p className="text-sm text-gray-400">© 2023 Breaking the Cycle. All rights reserved.</p>
      </div>
    </footer>
  );
}