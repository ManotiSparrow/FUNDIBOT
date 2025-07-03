import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Filter, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const providers = [
  {
    id: 1,
    name: 'John Mwangi',
    service: 'Plumbing',
    location: 'Nairobi',
    rating: 4.9,
    reviews: 127,
    price: 'KES 2,500/hr',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '8 years',
    verified: true,
    description: 'Expert plumber with 8+ years experience in residential and commercial plumbing.',
  },
  {
    id: 2,
    name: 'Sarah Njoki',
    service: 'Tutoring',
    location: 'Nairobi',
    rating: 4.8,
    reviews: 89,
    price: 'KES 1,500/hr',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '5 years',
    verified: true,
    description: 'Mathematics and Science tutor specializing in high school and university level.',
  },
  {
    id: 3,
    name: 'Michael Ochieng',
    service: 'Electrical',
    location: 'Mombasa',
    rating: 4.7,
    reviews: 156,
    price: 'KES 3,000/hr',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '12 years',
    verified: true,
    description: 'Licensed electrician with expertise in home wiring and electrical installations.',
  },
  {
    id: 4,
    name: 'Grace Wanjiku',
    service: 'Cleaning',
    location: 'Kisumu',
    rating: 4.6,
    reviews: 203,
    price: 'KES 1,200/hr',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '6 years',
    verified: true,
    description: 'Professional cleaning service for homes and offices with eco-friendly products.',
  },
];

const SearchResults = () => {
  const navigate = useNavigate();
  const [searchService, setSearchService] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Get search params from URL
    const urlParams = new URLSearchParams(window.location.search);
    const service = urlParams.get('service') || '';
    const location = urlParams.get('location') || '';
    
    setSearchService(service);
    setSearchLocation(location);
    
    // Filter providers based on search params
    let filtered = providers;
    
    if (service) {
      filtered = filtered.filter(provider => 
        provider.service.toLowerCase().includes(service.toLowerCase())
      );
    }
    
    if (location) {
      filtered = filtered.filter(provider => 
        provider.location.toLowerCase().includes(location.toLowerCase())
      );
    }
    
    setFilteredProviders(filtered);
  }, []);

  const handleSort = (criteria: string) => {
    setSortBy(criteria);
    const sorted = [...filteredProviders].sort((a, b) => {
      switch (criteria) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        default:
          return 0;
      }
    });
    setFilteredProviders(sorted);
  };

  const handleBookProvider = (provider: any) => {
    navigate(`/provider/${provider.id}`);
  };

  const handleViewProfile = (provider: any) => {
    navigate(`/provider/${provider.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Search Results
            {searchService && (
              <span className="text-primary-500"> for {searchService}</span>
            )}
            {searchLocation && (
              <span className="text-gray-600"> in {searchLocation}</span>
            )}
          </h1>
          
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchService}
                  onChange={(e) => setSearchService(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
            </div>
            <button className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <p className="text-gray-600 mb-4 md:mb-0">
            Found {filteredProviders.length} providers
          </p>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => handleSort(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
                <option value="experience">Sort by Experience</option>
              </select>
              <ChevronDown className="absolute right-2 top-3 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden"
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

                <p className="text-gray-600 text-sm mb-4">{provider.description}</p>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    {provider.location}
                  </div>
                  <div className="flex items-center">
                    <div className="flex items-center mr-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 font-medium text-gray-900">{provider.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">({provider.reviews} reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">{provider.experience} experience</p>
                </div>

                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleViewProfile(provider)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleBookProvider(provider)}
                    className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-lg hover:bg-primary-600 transition-colors font-medium"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProviders.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No providers found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or browse all services.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default SearchResults;