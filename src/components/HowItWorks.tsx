import React from 'react';
import { Search, MessageCircle, CreditCard, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Search & Find',
    description: 'Browse through verified professionals in your area or search for specific services you need.',
    color: 'bg-primary-100 text-primary-600',
  },
  {
    icon: MessageCircle,
    title: 'Connect via WhatsApp',
    description: 'Chat directly with service providers through WhatsApp to discuss your requirements and schedule.',
    color: 'bg-secondary-100 text-secondary-600',
  },
  {
    icon: CreditCard,
    title: 'Secure Payment',
    description: 'Pay safely using M-Pesa or other secure payment methods. Your money is protected until job completion.',
    color: 'bg-accent-100 text-accent-600',
  },
  {
    icon: CheckCircle,
    title: 'Job Done',
    description: 'Get your service completed by skilled professionals and rate your experience for others.',
    color: 'bg-green-100 text-green-600',
  },
];

const HowItWorks = () => {
  const handleStartTalkingToBot = () => {
    const message = "Hi! I'd like to start using FundiBot. Can you help me find a service provider?";
    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get connected with trusted professionals in four simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="text-center animate-slide-up"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative mb-6">
                <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mx-auto`}>
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
              <p className="text-gray-600 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of satisfied customers who trust FundiBot for their service needs
          </p>
          <button 
            onClick={handleStartTalkingToBot}
            className="bg-white text-primary-500 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
          >
            Start Talking to Bot
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;