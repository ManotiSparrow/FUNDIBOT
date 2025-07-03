import React, { useState } from 'react';
import { Search, MapPin, Star, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const kenyanCities = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Malindi',
  'Kitale',
  'Garissa',
  'Kakamega',
  'Machakos',
  'Meru',
  'Nyeri',
  'Kericho',
  'Embu',
  'Migori',
  'Homa Bay',
  'Naivasha',
  'Voi',
  'Kilifi',
  'Lamu',
  'Isiolo',
  'Nanyuki',
  'Kapenguria',
  'Bungoma',
  'Webuye',
  'Mumias',
  'Siaya',
  'Busia',
  'Malaba'
];

const services = [
  'Plumbing',
  'Electrical',
  'Tutoring',
  'Cleaning',
  'Painting',
  'Auto Repair',
  'Beauty',
  'Tech Support',
  'Photography',
  'Carpentry',
  'Gardening',
  'Healthcare',
  'Childcare',
  'Pet Care'
];

const Hero = () => {
  const [service, setService] = useState('');
  const [location, setLocation] = useState('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isServiceOpen, setIsServiceOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    // Navigate to search results page
    const searchParams = new URLSearchParams();
    if (service) searchParams.append('service', service);
    if (location) searchParams.append('location', location);
    
    navigate(`/search-results?${searchParams.toString()}`);
  };

  const handleLocationSelect = (city: string) => {
    setLocation(city);
    setIsLocationOpen(false);
  };

  const handleServiceSelect = (selectedService: string) => {
    setService(selectedService);
    setIsServiceOpen(false);
    // Navigate directly to providers for this service
    navigate(`/search-results?service=${encodeURIComponent(selectedService)}`);
  };

  return (
    <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
          <div className="mb-16 lg:mb-0 animate-fade-in">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Find Trusted
              <span className="text-primary-500 block">Fundis & Freelancers</span>
              Near You
            </h1>
            <p className="mt-6 text-xl text-gray-600 leading-relaxed">
              Connect with verified skilled professionals across Kenya. From plumbing to tutoring, 
              get quality services delivered to your doorstep via WhatsApp.
            </p>
            
            <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setIsServiceOpen(!isServiceOpen)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-left bg-white"
                    >
                      {service || 'What service do you need?'}
                    </button>
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  
                  {isServiceOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-60 overflow-y-auto">
                      {services.map((serviceOption) => (
                        <button
                          key={serviceOption}
                          onClick={() => handleServiceSelect(serviceOption)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          {serviceOption}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex-1 relative">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <button
                      type="button"
                      onClick={() => setIsLocationOpen(!isLocationOpen)}
                      className="w-full pl-10 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-left bg-white"
                    >
                      {location || 'Select your city'}
                    </button>
                    <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
                  </div>
                  
                  {isLocationOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                      {kenyanCities.map((city) => (
                        <button
                          key={city}
                          onClick={() => handleLocationSelect(city)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                        >
                          {city}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button 
                  onClick={handleSearch}
                  className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 mr-1" />
                <span>4.8/5 Average Rating</span>
              </div>
              <div>
                <span className="font-semibold text-primary-500">500+</span> Active Providers
              </div>
              <div>
                <span className="font-semibold text-primary-500">10k+</span> Happy Customers
              </div>
            </div>
          </div>

          <div className="relative animate-slide-up">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Professional service provider"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">John the Plumber</p>
                    <p className="text-sm text-gray-600">Available now</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;