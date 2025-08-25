import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="text-lg font-semibold mb-4 md:mb-0">Store Rating</div>
        <div className="flex gap-6 mb-4 md:mb-0">
          <a href="/about" className="hover:text-white transition">
            About
          </a>
          <a href="/contact" className="hover:text-white transition">
            Contact
          </a>
          <a href="/stores" className="hover:text-white transition">
            Stores
          </a>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:text-white transition">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaTwitter size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaInstagram size={20} />
          </a>
          <a href="#" className="hover:text-white transition">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
      <div className="text-center text-sm text-gray-500 mt-6">
        © {new Date().getFullYear()} Store Rating. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
