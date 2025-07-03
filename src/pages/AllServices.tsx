import React from 'react';
import { Wrench, GraduationCap, Paintbrush, Zap, Car, Home, Scissors, Monitor, Camera, Music, Laptop, Hammer, Leaf, Heart, Baby, Dog } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const allServices = [
  { icon: Wrench, name: 'Plumbing', count: '120+', color: 'bg-blue-100 text-blue-600', description: 'Pipe repairs, installations, and maintenance' },
  { icon: GraduationCap, name: 'Tutoring', count: '80+', color: 'bg-green-100 text-green-600', description: 'Academic support for all subjects and levels' },
  { icon: Paintbrush, name: 'Painting', count: '65+', color: 'bg-purple-100 text-purple-600', description: 'Interior and exterior painting services' },
  { icon: Zap, name: 'Electrical', count: '90+', color: 'bg-yellow-100 text-yellow-600', description: 'Wiring, installations, and electrical repairs' },
  { icon: Car, name: 'Auto Repair', count: '45+', color: 'bg-red-100 text-red-600', description: 'Vehicle maintenance and repair services' },
  { icon: Home, name: 'Cleaning', count: '150+', color: 'bg-pink-100 text-pink-600', description: 'Residential and commercial cleaning' },
  { icon: Scissors, name: 'Beauty', count: '70+', color: 'bg-indigo-100 text-indigo-600', description: 'Hair, makeup, and beauty treatments' },
  { icon: Monitor, name: 'Tech Support', count: '55+', color: 'bg-teal-100 text-teal-600', description: 'Computer repair and IT support' },
  { icon: Camera, name: 'Photography', count: '40+', color: 'bg-orange-100 text-orange-600', description: 'Event and portrait photography' },
  { icon: Music, name: 'Music Lessons', count: '30+', color: 'bg-cyan-100 text-cyan-600', description: 'Instrument and vocal training' },
  { icon: Laptop, name: 'Web Design', count: '25+', color: 'bg-emerald-100 text-emerald-600', description: 'Website development and design' },
  { icon: Hammer, name: 'Carpentry', count: '85+', color: 'bg-amber-100 text-amber-600', description: 'Furniture making and wood repairs' },
  { icon: Leaf, name: 'Gardening', count: '60+', color: 'bg-lime-100 text-lime-600', description: 'Landscaping and garden maintenance' },
  { icon: Heart, name: 'Healthcare', count: '35+', color: 'bg-rose-100 text-rose-600', description: 'Home nursing and health services' },
  { icon: Baby, name: 'Childcare', count: '50+', color: 'bg-violet-100 text-violet-600', description: 'Babysitting and nanny services' },
  { icon: Dog, name: 'Pet Care', count: '20+', color: 'bg-fuchsia-100 text-fuchsia-600', description: 'Pet grooming and sitting services' },
];

const AllServices = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleServiceClick = (serviceName: string) => {
    window.location.href = `/search-results?service=${encodeURIComponent(serviceName)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            All Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our comprehensive range of services provided by verified professionals across Kenya
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allServices.map((service, index) => (
            <div
              key={service.name}
              onClick={() => handleServiceClick(service.name)}
              className="group p-6 bg-white rounded-2xl hover:shadow-lg transition-all duration-300 cursor-pointer animate-scale-in border border-gray-100"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className={`w-16 h-16 ${service.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-8 w-8" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{service.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{service.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary-500">{service.count} providers</span>
                <span className="text-xs text-gray-400 group-hover:text-primary-500 transition-colors">
                  View all →
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Don't see your service?</h3>
          <p className="text-lg mb-6 opacity-90">
            We're constantly adding new services. Contact us to request a specific service category.
          </p>
          <button 
            onClick={() => window.location.href = '/support'}
            className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Request New Service
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AllServices;