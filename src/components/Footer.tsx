import React from 'react';
import { MessageCircle, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleServiceClick = (service: string) => {
    navigate(`/search-results?service=${encodeURIComponent(service)}`);
  };

  const handleCompanyClick = (section: string) => {
    const routes: { [key: string]: string } = {
      'About Us': '/about',
      'How It Works': '/how-it-works',
      'Join as Provider': '/join-provider',
      'Privacy Policy': '/privacy',
      'Terms of Service': '/terms'
    };
    
    navigate(routes[section] || '/');
  };

  const handleContactClick = () => {
    navigate('/support');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/login', '_blank');
  };

  const handleTwitterClick = () => {
    window.open('https://twitter.com/login', '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://www.instagram.com/accounts/login/', '_blank');
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <MessageCircle className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold">FundiBot</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Connecting skilled professionals with customers across Kenya through innovative WhatsApp integration.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={handleFacebookClick}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </button>
              <button 
                onClick={handleTwitterClick}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </button>
              <button 
                onClick={handleInstagramClick}
                className="text-gray-400 hover:text-primary-500 transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handleServiceClick('Plumbing')}
                  className="hover:text-white transition-colors text-left"
                >
                  Plumbing
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('Tutoring')}
                  className="hover:text-white transition-colors text-left"
                >
                  Tutoring
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('Electrical')}
                  className="hover:text-white transition-colors text-left"
                >
                  Electrical
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleServiceClick('Cleaning')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cleaning
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/all-services')}
                  className="hover:text-white transition-colors text-left"
                >
                  All Services
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button 
                  onClick={() => handleCompanyClick('About Us')}
                  className="hover:text-white transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCompanyClick('How It Works')}
                  className="hover:text-white transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCompanyClick('Join as Provider')}
                  className="hover:text-white transition-colors text-left"
                >
                  Join as Provider
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCompanyClick('Privacy Policy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleCompanyClick('Terms of Service')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms of Service
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-3" />
                <span>hello@fundibot.com</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-3" />
                <span>+254 768 375 519</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3" />
                <span>Nairobi, Kenya</span>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Customer Support</h4>
              <p className="text-sm text-gray-400 mb-3">Need help? Contact us:</p>
              <button
                onClick={handleContactClick}
                className="inline-flex items-center bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors text-sm"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Support
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 FundiBot. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-2 md:mt-0">
              Made with ❤️ in Kenya
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;