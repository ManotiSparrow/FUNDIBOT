import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, Mail, MessageCircle, Calendar, Shield, Award, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingModal from '../components/BookingModal';

// Sample provider data - in a real app, this would come from an API
const providerData = {
  1: {
    id: 1,
    name: 'John Mwangi',
    service: 'Plumber',
    location: 'Nairobi West',
    rating: 4.9,
    reviews: 127,
    price: 'KES 2,500/hr',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '8 years',
    responseTime: '< 30 min',
    verified: true,
    phone: '+254712345678',
    email: 'john.mwangi@example.com',
    description: 'Expert plumber with 8+ years experience in residential and commercial plumbing. Specializing in pipe installations, leak repairs, and bathroom renovations. Available for emergency calls 24/7.',
    specialties: ['Pipe Installation', 'Leak Repairs', 'Bathroom Renovation', 'Emergency Plumbing'],
    certifications: ['Licensed Plumber', 'Water Systems Certified', 'Safety Training Completed'],
    portfolio: [
      'https://images.pexels.com/photos/1249611/pexels-photo-1249611.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Sarah K.',
        rating: 5,
        comment: 'Excellent work! Fixed my kitchen sink quickly and professionally.',
        date: '2 weeks ago'
      },
      {
        id: 2,
        name: 'Michael O.',
        rating: 5,
        comment: 'Very reliable and honest. Highly recommend for any plumbing work.',
        date: '1 month ago'
      },
      {
        id: 3,
        name: 'Grace W.',
        rating: 4,
        comment: 'Good service, arrived on time and completed the job well.',
        date: '2 months ago'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Sarah Njoki',
    service: 'Math Tutor',
    location: 'Kilimani',
    rating: 4.8,
    reviews: 89,
    price: 'KES 1,500/hr',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '5 years',
    responseTime: '< 15 min',
    verified: true,
    phone: '+254700000000',
    email: 'sarah.njoki@example.com',
    description: 'Mathematics and Science tutor specializing in high school and university level. Passionate about helping students achieve their academic goals with personalized learning approaches.',
    specialties: ['Mathematics', 'Physics', 'Chemistry', 'Statistics'],
    certifications: ['Bachelor of Education', 'Mathematics Teaching Certificate', 'Online Tutoring Certified'],
    portfolio: [
      'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/5212703/pexels-photo-5212703.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'James M.',
        rating: 5,
        comment: 'Sarah helped my daughter improve her math grades significantly. Highly recommended!',
        date: '1 week ago'
      },
      {
        id: 2,
        name: 'Mary K.',
        rating: 5,
        comment: 'Excellent tutor! Very patient and explains concepts clearly.',
        date: '3 weeks ago'
      },
      {
        id: 3,
        name: 'Peter W.',
        rating: 4,
        comment: 'Good teaching methods and flexible scheduling.',
        date: '1 month ago'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Michael Ochieng',
    service: 'Electrician',
    location: 'Kawangware',
    rating: 4.7,
    reviews: 156,
    price: 'KES 3,000/hr',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '12 years',
    responseTime: '< 45 min',
    verified: true,
    phone: '+254787654321',
    email: 'michael.ochieng@example.com',
    description: 'Licensed electrician with expertise in home wiring and electrical installations. Specializing in solar installations, electrical repairs, and safety inspections.',
    specialties: ['Home Wiring', 'Solar Installation', 'Electrical Repairs', 'Safety Inspections'],
    certifications: ['Licensed Electrician', 'Solar Installation Certified', 'Electrical Safety Inspector'],
    portfolio: [
      'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/162553/keys-workshop-mechanic-tools-162553.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'David K.',
        rating: 5,
        comment: 'Professional work on our solar installation. Very knowledgeable!',
        date: '5 days ago'
      },
      {
        id: 2,
        name: 'Lucy N.',
        rating: 4,
        comment: 'Fixed our electrical issues quickly and safely.',
        date: '2 weeks ago'
      },
      {
        id: 3,
        name: 'Robert M.',
        rating: 5,
        comment: 'Excellent service and fair pricing. Will use again.',
        date: '1 month ago'
      }
    ]
  },
  4: {
    id: 4,
    name: 'Grace Wanjiku',
    service: 'Cleaning',
    location: 'Kisumu',
    rating: 4.6,
    reviews: 203,
    price: 'KES 1,200/hr',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '6 years',
    responseTime: '< 20 min',
    verified: true,
    phone: '+254722334455',
    email: 'grace.wanjiku@example.com',
    description: 'Professional cleaning service for homes and offices with eco-friendly products. Specializing in deep cleaning, office maintenance, and post-construction cleanup.',
    specialties: ['Deep Cleaning', 'Office Cleaning', 'Eco-Friendly', 'Post-Construction'],
    certifications: ['Professional Cleaning Certificate', 'Eco-Friendly Products Training', 'Safety Protocols Certified'],
    portfolio: [
      'https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/4239119/pexels-photo-4239119.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/4239009/pexels-photo-4239009.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Anne M.',
        rating: 5,
        comment: 'Amazing deep cleaning service! My house has never been cleaner.',
        date: '3 days ago'
      },
      {
        id: 2,
        name: 'John K.',
        rating: 4,
        comment: 'Professional and thorough. Uses eco-friendly products as promised.',
        date: '1 week ago'
      },
      {
        id: 3,
        name: 'Susan W.',
        rating: 5,
        comment: 'Reliable and trustworthy. Great attention to detail.',
        date: '2 weeks ago'
      }
    ]
  },
  5: {
    id: 5,
    name: 'David Kimani',
    service: 'Painting',
    location: 'Nakuru',
    rating: 4.5,
    reviews: 78,
    price: 'KES 2,000/hr',
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '7 years',
    responseTime: '< 1 hour',
    verified: true,
    phone: '+254733445566',
    email: 'david.kimani@example.com',
    description: 'Professional painter specializing in interior and exterior painting projects. Expert in decorative finishes, color consultation, and surface preparation.',
    specialties: ['Interior Painting', 'Exterior Painting', 'Decorative Finishes', 'Color Consultation'],
    certifications: ['Professional Painter Certificate', 'Color Theory Training', 'Surface Preparation Specialist'],
    portfolio: [
      'https://images.pexels.com/photos/1669799/pexels-photo-1669799.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Maria L.',
        rating: 5,
        comment: 'Beautiful work on our living room. Great color advice!',
        date: '1 week ago'
      },
      {
        id: 2,
        name: 'Paul N.',
        rating: 4,
        comment: 'Professional and clean work. Finished on time.',
        date: '3 weeks ago'
      },
      {
        id: 3,
        name: 'Jane K.',
        rating: 4,
        comment: 'Good quality painting at reasonable prices.',
        date: '1 month ago'
      }
    ]
  },
  6: {
    id: 6,
    name: 'Mary Achieng',
    service: 'Beauty',
    location: 'Eldoret',
    rating: 4.9,
    reviews: 145,
    price: 'KES 1,800/hr',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=300',
    experience: '4 years',
    responseTime: '< 10 min',
    verified: true,
    phone: '+254744556677',
    email: 'mary.achieng@example.com',
    description: 'Professional makeup artist and hairstylist for all occasions. Specializing in bridal makeup, special events, and hair styling with modern techniques.',
    specialties: ['Bridal Makeup', 'Hair Styling', 'Special Events', 'Fashion Makeup'],
    certifications: ['Professional Makeup Artist', 'Hair Styling Certificate', 'Bridal Beauty Specialist'],
    portfolio: [
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=300',
      'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=300'
    ],
    reviewsList: [
      {
        id: 1,
        name: 'Brenda M.',
        rating: 5,
        comment: 'Perfect bridal makeup! I felt like a princess on my wedding day.',
        date: '2 days ago'
      },
      {
        id: 2,
        name: 'Catherine W.',
        rating: 5,
        comment: 'Amazing hair styling for my graduation. Highly recommend!',
        date: '1 week ago'
      },
      {
        id: 3,
        name: 'Joyce K.',
        rating: 5,
        comment: 'Professional and creative. Great for special events.',
        date: '2 weeks ago'
      }
    ]
  }
};

const ProviderProfile = () => {
  const { id } = useParams();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  
  const provider = providerData[id as keyof typeof providerData];

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!provider) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">Provider not found</h1>
            <p className="text-gray-600 mt-2">The provider you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleBookProvider = () => {
    setIsBookingModalOpen(true);
  };

  const handleChatWithProvider = () => {
    const message = `Hi ${provider.name}! I'm interested in your ${provider.service} services. Can we discuss my requirements?`;
    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Provider Header */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-shrink-0">
              <img
                src={provider.avatar}
                alt={provider.name}
                className="w-32 h-32 rounded-2xl object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                    {provider.name}
                    {provider.verified && (
                      <div className="ml-3 flex items-center bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                        <Shield className="h-4 w-4 mr-1" />
                        Verified
                      </div>
                    )}
                  </h1>
                  <p className="text-xl text-primary-500 font-medium">{provider.service}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">{provider.price}</p>
                  <p className="text-sm text-gray-600">Starting rate</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{provider.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>{provider.experience} experience</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span>Responds in {provider.responseTime}</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-6">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="ml-1 text-lg font-semibold text-gray-900">{provider.rating}</span>
                  <span className="ml-2 text-gray-600">({provider.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleBookProvider}
                  className="bg-primary-500 text-white px-6 py-3 rounded-lg hover:bg-primary-600 transition-colors font-medium flex items-center justify-center"
                >
                  <Calendar className="h-5 w-5 mr-2" />
                  Book Now
                </button>
                <button
                  onClick={handleChatWithProvider}
                  className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </button>
                <button className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Call
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-8">
              {['overview', 'portfolio', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                    activeTab === tab
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-8">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About</h3>
                  <p className="text-gray-600 leading-relaxed">{provider.description}</p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Specialties</h3>
                  <div className="flex flex-wrap gap-2">
                    {provider.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary-50 text-primary-600 rounded-full text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Certifications</h3>
                  <div className="space-y-2">
                    {provider.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center">
                        <Award className="h-5 w-5 text-green-500 mr-3" />
                        <span className="text-gray-700">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Portfolio Tab */}
            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Work Portfolio</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {provider.portfolio.map((image, index) => (
                    <div key={index} className="rounded-lg overflow-hidden shadow-md">
                      <img
                        src={image}
                        alt={`Work sample ${index + 1}`}
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {provider.reviewsList.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.name}</h4>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {isBookingModalOpen && (
        <BookingModal 
          provider={provider}
          onClose={() => setIsBookingModalOpen(false)}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ProviderProfile;