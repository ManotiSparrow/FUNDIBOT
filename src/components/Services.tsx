import React from 'react';
import { Wrench, GraduationCap, Paintbrush, Zap, Car, Home, Scissors, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const services = [
  { icon: Wrench, name: 'Plumbing', count: '120+', color: 'bg-blue-100 text-blue-600' },
  { icon: GraduationCap, name: 'Tutoring', count: '80+', color: 'bg-green-100 text-green-600' },
  { icon: Paintbrush, name: 'Painting', count: '65+', color: 'bg-purple-100 text-purple-600' },
  { icon: Zap, name: 'Electrical', count: '90+', color: 'bg-yellow-100 text-yellow-600' },
  { icon: Car, name: 'Auto Repair', count: '45+', color: 'bg-red-100 text-red-600' },
  { icon: Home, name: 'Cleaning', count: '150+', color: 'bg-pink-100 text-pink-600' },
  { icon: Scissors, name: 'Beauty', count: '70+', color: 'bg-indigo-100 text-indigo-600' },
  { icon: Monitor, name: 'Tech Support', count: '55+', color: 'bg-teal-100 text-teal-600' },
];

const Services = () => {
  const navigate = useNavigate();

  const handleViewAllServices = () => {
    navigate('/all-services');
  };

  const handleServiceClick = (serviceName: string) => {
    navigate(`/search-results?service=${encodeURIComponent(serviceName)}`);
  };

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Popular Services
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of services provided by verified professionals
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.name}
              onClick={() => handleServiceClick(service.name)}
              className="group p-6 bg-gray-50 rounded-2xl hover:bg-white hover:shadow-lg transition-all duration-300 cursor-pointer animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
              <p className="text-sm text-gray-600">{service.count} providers</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllServices}
            className="bg-primary-500 text-white px-8 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;