import React from 'react';
import { Star, MapPin, Clock, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const providers = [
  {
    id: 1,
    name: 'John Mwangi',
    service: 'Plumber',
    location: 'Nairobi West',
    rating: 4.9,
    reviews: 127,
    price: 'KES 2,500/hr',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '8 years',
    responseTime: '< 30 min',
    verified: true,
  },
  {
    id: 2,
    name: 'Sarah Njoki',
    service: 'Math Tutor',
    location: 'Kilimani',
    rating: 4.8,
    reviews: 89,
    price: 'KES 1,500/hr',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '5 years',
    responseTime: '< 15 min',
    verified: true,
  },
  {
    id: 3,
    name: 'Michael Ochieng',
    service: 'Electrician',
    location: 'Kawangware',
    rating: 4.7,
    reviews: 156,
    price: 'KES 3,000/hr',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '12 years',
    responseTime: '< 45 min',
    verified: true,
  },
];

interface FeaturedProvidersProps {
  onBookProvider: (provider: any) => void;
}

const FeaturedProviders: React.FC<FeaturedProvidersProps> = ({ onBookProvider }) => {
  const navigate = useNavigate();

  const handleViewProfile = (provider: any) => {
    navigate(`/provider/${provider.id}`);
  };

  const handleViewMoreProviders = () => {
    navigate('/all-providers');
  };

  return (
    <section id="providers" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Top Rated Providers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Connect with our highest-rated professionals who deliver exceptional service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {providers.map((provider, index) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={provider.avatar}
                      alt={provider.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900 flex items-center">
                        {provider.name}
                        {provider.verified && (
                          <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </h3>
                      <p className="text-primary-500 font-medium">{provider.service}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{provider.price}</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {provider.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    {provider.experience} experience • Responds in {provider.responseTime}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium text-gray-900">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({provider.reviews} reviews)</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleViewProfile(provider)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    View Profile
                  </button>
                  <button
                    onClick={() => onBookProvider(provider)}
                    className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewMoreProviders}
            className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            View More Providers
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProviders;