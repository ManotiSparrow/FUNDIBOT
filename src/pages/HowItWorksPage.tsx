import React from 'react';
import { Search, MessageCircle, CreditCard, CheckCircle, Users, Shield, Clock, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const steps = [
  {
    icon: Search,
    title: 'Search & Find',
    description: 'Browse through verified professionals in your area or search for specific services you need.',
    color: 'bg-primary-100 text-primary-600',
    details: [
      'Use our smart search to find providers by service type',
      'Filter by location, rating, and price range',
      'View detailed profiles and portfolios',
      'Read authentic customer reviews'
    ]
  },
  {
    icon: MessageCircle,
    title: 'Connect via WhatsApp',
    description: 'Chat directly with service providers through WhatsApp to discuss your requirements and schedule.',
    color: 'bg-secondary-100 text-secondary-600',
    details: [
      'Direct WhatsApp integration for instant communication',
      'Discuss project details and requirements',
      'Get quotes and negotiate pricing',
      'Schedule appointments at your convenience'
    ]
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Pay safely using M-Pesa or other secure payment methods. Your money is protected until job completion.',
    color: 'bg-accent-100 text-accent-600',
    details: [
      'Multiple payment options including M-Pesa',
      'Secure escrow system protects your money',
      'Pay only after satisfactory completion',
      'Transparent pricing with no hidden fees'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Job Done',
    description: 'Get your service completed by skilled professionals and rate your experience for others.',
    color: 'bg-green-100 text-green-600',
    details: [
      'Professional service delivery guaranteed',
      'Quality assurance and follow-up support',
      'Rate and review your experience',
      'Build long-term relationships with trusted providers'
    ]
  },
];

const benefits = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All service providers are background-checked and verified for your safety and peace of mind.'
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Find help anytime, anywhere. Many providers offer emergency services and flexible scheduling.'
  },
  {
    icon: Star,
    title: 'Quality Guaranteed',
    description: 'Our rating system ensures you get the best service. Unsatisfied? We make it right.'
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Join thousands of satisfied customers and trusted professionals in our growing community.'
  }
];

const HowItWorksPage = () => {
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStartTalkingToBot = () => {
    const message = "Hi! I'd like to start using FundiBot. Can you help me find a service provider?";
    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            How FundiBot Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Connecting you with trusted professionals has never been easier. 
            Follow these simple steps to get quality services delivered to your doorstep.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Simple Steps to Get Started
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From search to service completion in four easy steps
            </p>
          </div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`flex flex-col lg:flex-row items-center gap-12 ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center mb-6">
                    <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mr-4`}>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-lg font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                  <ul className="space-y-3">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex-1">
                  <div className="bg-gray-100 rounded-2xl p-8 h-80 flex items-center justify-center">
                    <step.icon className="h-32 w-32 text-gray-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose FundiBot?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the best experience for both customers and service providers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={benefit.title}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 text-center animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about using FundiBot
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: "How do I know if a service provider is trustworthy?",
                answer: "All our providers go through a verification process including background checks, skill assessments, and reference verification. You can also read reviews from previous customers and check their ratings."
              },
              {
                question: "What if I'm not satisfied with the service?",
                answer: "We have a satisfaction guarantee. If you're not happy with the service, contact our support team within 24 hours. We'll work with you and the provider to resolve any issues or provide a refund if necessary."
              },
              {
                question: "How does the payment system work?",
                answer: "We use a secure escrow system. Your payment is held safely until the job is completed to your satisfaction. You can pay via M-Pesa, bank transfer, or other supported payment methods."
              },
              {
                question: "Can I book services for emergency situations?",
                answer: "Yes! Many of our providers offer emergency services. Look for the '24/7 Available' badge on provider profiles, or use our emergency booking feature for urgent needs."
              },
              {
                question: "How do I become a service provider on FundiBot?",
                answer: "Click on 'Join as Provider' and complete our application process. You'll need to provide identification, proof of skills/certifications, and pass our verification process."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-white opacity-90 mb-8">
            Join thousands of satisfied customers who trust FundiBot for their service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={handleStartTalkingToBot}
              className="bg-white text-primary-500 px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg"
            >
              Start Talking to Bot
            </button>
            <button 
              onClick={() => window.location.href = '/all-services'}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-primary-500 transition-colors font-medium text-lg"
            >
              Browse Services
            </button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default HowItWorksPage;