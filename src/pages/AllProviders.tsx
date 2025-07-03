import React, { useState } from 'react';
import { Star, MapPin, Filter, Search, ChevronDown } from 'lucide-react';
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
    specialties: ['Pipe Installation', 'Leak Repairs', 'Bathroom Renovation']
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
    specialties: ['Mathematics', 'Physics', 'Chemistry']
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
    specialties: ['Home Wiring', 'Solar Installation', 'Electrical Repairs']
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
    specialties: ['Deep Cleaning', 'Office Cleaning', 'Eco-Friendly']
  },
  {
    id: 5,
    name: 'David Kimani',
    service: 'Painting',
    location: 'Nakuru',
    rating: 4.5,
    reviews: 78,
    price: 'KES 2,000/hr',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '7 years',
    verified: true,
    description: 'Professional painter specializing in interior and exterior painting projects.',
    specialties: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes']
  },
  {
    id: 6,
    name: 'Mary Achieng',
    service: 'Beauty',
    location: 'Eldoret',
    rating: 4.9,
    reviews: 145,
    price: 'KES 1,800/hr',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
    experience: '4 years',
    verified: true,
    description: 'Professional makeup artist and hairstylist for all occasions.',
    specialties: ['Bridal Makeup', 'Hair Styling', 'Special Events']
  }
];

const AllProviders = () => {
  const navigate = useNavigate();
  const [filteredProviders, setFilteredProviders] = useState(providers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('rating');

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [...new Set(providers.map(p => p.service))];
  const locations = [...new Set(providers.map(p => p.location))];

  const handleFilter = () => {
    let filtered = providers;

    if (searchTerm) {
      filtered = filtered.filter(provider =>
        provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        provider.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedService) {
      filtered = filtered.filter(provider => provider.service === selectedService);
    }

    if (selectedLocation) {
      filtered = filtered.filter(provider => provider.location === selectedLocation);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'price':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'experience':
          return parseInt(b.experience) - parseInt(a.experience);
        case 'reviews':
          return b.reviews - a.reviews;
        default:
          return 0;
      }
    });

    setFilteredProviders(filtered);
  };

  React.useEffect(() => {
    handleFilter();
  }, [searchTerm, selectedService, selectedLocation, sortBy]);

  const handleBookProvider = (provider: any) => {
    navigate(`/provider/${provider.id}`);
  };

  const handleViewProfile = (provider: any) => {
    navigate(`/provider/${provider.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Service Providers
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our network of verified professionals across Kenya
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search providers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            
            <select
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Services</option>
              {services.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">All Locations</option>
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price">Sort by Price</option>
              <option value="experience">Sort by Experience</option>
              <option value="reviews">Sort by Reviews</option>
            </select>
          </div>
          
          <p className="text-gray-600">
            Showing {filteredProviders.length} of {providers.length} providers
          </p>
        </div>

        {/* Providers Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider, index) => (
            <div
              key={provider.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
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

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {provider.specialties.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

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

export default AllProviders;