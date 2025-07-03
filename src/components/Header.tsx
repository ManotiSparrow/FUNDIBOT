import React, { useState } from 'react';
import { Menu, X, MessageCircle, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleJoinAsProvider = () => {
    navigate('/join-provider');
    window.scrollTo(0, 0);
  };

  const handleSignIn = () => {
    navigate('/signin');
    window.scrollTo(0, 0);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo(0, 0);
  };

  const handleServicesClick = () => {
    navigate('/all-services');
    window.scrollTo(0, 0);
  };

  const handleProvidersClick = () => {
    navigate('/all-providers');
    window.scrollTo(0, 0);
  };

  const handleHowItWorksClick = () => {
    navigate('/how-it-works');
    window.scrollTo(0, 0);
  };

  const handleContactClick = () => {
    if (window.location.pathname === '/') {
      // If on home page, scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If on other pages, navigate to home and then scroll to contact
      navigate('/');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button onClick={handleLogoClick} className="flex-shrink-0 flex items-center">
              <MessageCircle className="h-8 w-8 text-primary-500" />
              <span className="ml-2 text-xl font-bold text-gray-900">FundiBot</span>
            </button>
          </div>

          <nav className="hidden md:flex space-x-8">
            <button onClick={handleServicesClick} className="text-gray-600 hover:text-primary-500 transition-colors">Services</button>
            <button onClick={handleProvidersClick} className="text-gray-600 hover:text-primary-500 transition-colors">Find Providers</button>
            <button onClick={handleHowItWorksClick} className="text-gray-600 hover:text-primary-500 transition-colors">How It Works</button>
            <button onClick={handleContactClick} className="text-gray-600 hover:text-primary-500 transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={handleSignIn}
              className="text-gray-600 hover:text-primary-500 transition-colors"
            >
              Sign In
            </button>
            <button 
              onClick={handleJoinAsProvider}
              className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Join as Provider
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button onClick={handleServicesClick} className="block px-3 py-2 text-gray-600 hover:text-primary-500 w-full text-left">Services</button>
              <button onClick={handleProvidersClick} className="block px-3 py-2 text-gray-600 hover:text-primary-500 w-full text-left">Find Providers</button>
              <button onClick={handleHowItWorksClick} className="block px-3 py-2 text-gray-600 hover:text-primary-500 w-full text-left">How It Works</button>
              <button onClick={handleContactClick} className="block px-3 py-2 text-gray-600 hover:text-primary-500 w-full text-left">Contact</button>
              <div className="border-t pt-2">
                <button 
                  onClick={handleSignIn}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-primary-500"
                >
                  Sign In
                </button>
                <button 
                  onClick={handleJoinAsProvider}
                  className="block w-full text-left px-3 py-2 bg-primary-500 text-white rounded-lg mt-2 hover:bg-primary-600"
                >
                  Join as Provider
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;