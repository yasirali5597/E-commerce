import {
  FaFacebookF,
  FaTwitter,
  FaRss,
  FaGooglePlusG,
  FaFlickr,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white w-full">
      <div className=" mx-auto px-8 py-16 w-full">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          <div>
            {/* <h1 className="text-4xl font-bold">LOGO</h1> */}
             <h1 className="w-full text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              E-Commerce
            </h1>
            <p className="text-gray-400 mt-2 uppercase tracking-wider">
              Slogan Company
            </p>
          </div>

          <div>
            <ul className="space-y-2 uppercase text-sm">
              <li>Weebly Themes</li>
              <li>Pre-Sale FAQs</li>
              <li>Submit a Ticket</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 uppercase text-sm">
              <li>Services</li>
              <li>Theme Tweak</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 uppercase text-sm">
              <li>Showcase</li>
              <li>Widgetkit</li>
              <li>Support</li>
            </ul>
          </div>

          <div>
            <ul className="space-y-2 uppercase text-sm">
              <li>About Us</li>
              <li>Contact Us</li>
              <li>Affiliates</li>
              <li>Resources</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-12"></div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4">
          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
            <FaFacebookF />
          </div>

          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
            <FaTwitter />
          </div>

          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
            <FaRss />
          </div>

          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
            <FaGooglePlusG />
          </div>

          <div className="w-12 h-12 border border-white rounded-full flex items-center justify-center cursor-pointer">
            <FaFlickr />
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-400 mt-8">
          © Copyright All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;