// src/components/sfoodter.jsx
import React from 'react';
 import logo from "../assets/logo.png"; 

export default function Sfoodter() {
  const phoneNumber = "9253625099";
  const whatsappMessage = encodeURIComponent("Hi! I want to sell scrap and promote a greener environment with ScrapShera. Can you help me?");
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
  const instagramLink = "https://www.instagram.com/scrap_shera?igsh=MTh1NjR4OHlvNGFleg==";
  const facebookLink = "https://www.facebook.com/share/1HabyDDqtu/";

  // Using a placeholder URL for the logo instead of importing a local file
  const logoPlaceholderUrl = "https://placehold.co/80x80/28a745/ffffff?text=SS"; // Green background, white text placeholder

  return (
    <footer className="bg-green-900 text-white py-10 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Company Info / Logo */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <img
            src={logo} // Using the placeholder URL
            alt="ScrapShera Logo"
            className="w-20 h-20 rounded-full mb-4"
            onError={(e) => { e.target.onerror = null; e.target.src="https://placehold.co/80x80/CCCCCC/000000?text=Logo"; }} // Fallback in case placeholder also fails
          />
          <h3 className="text-2xl font-bold mb-2">ScrapShera</h3>
          <p className="text-green-200">Your trusted partner for responsible recycling and cash for scrap.</p>
        </div>

        {/* Contact Details */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 border-b border-green-700 pb-2">Contact Us</h3>
          <p className="mb-2">
            <strong>Phone:</strong> <a href={`tel:${phoneNumber}`} className="text-green-300 hover:underline">{phoneNumber}</a>
          </p>
          <p className="mb-2 flex items-center justify-center md:justify-start"> {/* Added flex for alignment */}
            <strong>WhatsApp:</strong>{" "}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:underline ml-2"
            >
              {/* WhatsApp SVG Icon within contact details */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-message-square inline-block align-middle mr-1">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              Message Us
            </a>
          </p>
          <p className="mt-4 text-green-200">We're here to help you turn your scrap into value!</p>
        </div>

        {/* Social Media Links */}
        <div className="text-center md:text-left">
          <h3 className="text-xl font-semibold mb-4 border-b border-green-700 pb-2">Connect With Us</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-pink-400 transition-colors duration-300"
              aria-label="Instagram"
            >
              {/* Instagram SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-instagram">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            <a
              href={facebookLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-blue-600 transition-colors duration-300"
              aria-label="Facebook"
            >
              {/* Facebook SVG Icon */}
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            {/* WhatsApp SVG Icon for "Connect With Us" */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-300 hover:text-green-500 transition-colors duration-300"
              aria-label="WhatsApp"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-whatsapp">
                <path d="M22 15.05a8.99 8.99 0 0 1-5.69 6.27L12 23l-4.31-1.68A9 9 0 0 1 2 15.05V12a9 9 0 0 1 9-9h2a9 9 0 0 1 9 9v3.05z"></path>
                <path d="M16 12a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4z"></path>
                <path d="M12 8v4"></path>
                <path d="M12 16h.01"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-6 border-t border-green-800 text-center text-green-200">
        <p>&copy; {new Date().getFullYear()} ScrapShera. All rights reserved.</p>
        <p className="text-sm mt-1">Recycle smarter, live greener! <span role="img" aria-label="green heart">💚</span></p>
      </div>
    </footer>
  );
}
