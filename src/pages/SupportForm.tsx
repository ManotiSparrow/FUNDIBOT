import React, { useState } from 'react';
import { Mail, Phone, User, MessageCircle, CheckCircle } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const SupportForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Support form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 3000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Submitted Successfully!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We've received your message and will get back to you within 24 hours.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-green-800 text-sm">
                <strong>What's next?</strong> Our support team will review your request and respond via email or phone. 
                For urgent matters, you can also reach us on WhatsApp at +254 768 375 519.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Support
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Need help? Our support team is here to assist you. Fill out the form below and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600 text-sm">+254 768 375 519</p>
            <p className="text-gray-500 text-xs">24/7 Support</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600 text-sm">Quick Response</p>
            <p className="text-gray-500 text-xs">Instant Support</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-2xl shadow-sm">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 text-sm">hello@fundibot.com</p>
            <p className="text-gray-500 text-xs">24hr Response</p>
          </div>
        </div>

        {/* Support Form */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="+254..."
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="booking-help">Booking Help</option>
                  <option value="payment-issue">Payment Issue</option>
                  <option value="provider-complaint">Provider Complaint</option>
                  <option value="technical-support">Technical Support</option>
                  <option value="account-help">Account Help</option>
                  <option value="general-inquiry">General Inquiry</option>
                  <option value="feature-request">Feature Request</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What support do you need? *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Please describe your issue or question in detail. Include any relevant information that might help us assist you better..."
              />
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Before submitting:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Check our FAQ section for quick answers</li>
                <li>• Include specific details about your issue</li>
                <li>• Mention any error messages you've seen</li>
                <li>• For urgent matters, call us directly</li>
              </ul>
            </div>
            
            <button
              type="submit"
              className="w-full bg-primary-500 text-white py-3 px-6 rounded-lg hover:bg-primary-600 transition-colors font-medium text-lg"
            >
              Submit Support Request
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need immediate assistance? 
              <button 
                onClick={() => window.open('https://wa.me/254768375519', '_blank')}
                className="text-primary-600 hover:text-primary-500 font-medium ml-1"
              >
                Chat with us on WhatsApp
              </button>
            </p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {[
              {
                question: "How do I book a service?",
                answer: "You can book a service by searching for providers, selecting one you like, and clicking 'Book Now'. You can also use our WhatsApp bot for instant booking."
              },
              {
                question: "What if I'm not satisfied with the service?",
                answer: "We have a satisfaction guarantee. Contact us within 24 hours if you're not happy, and we'll work to resolve the issue or provide a refund."
              },
              {
                question: "How do payments work?",
                answer: "We use secure payment methods including M-Pesa. Your payment is protected until the service is completed to your satisfaction."
              },
              {
                question: "How can I become a service provider?",
                answer: "Click 'Join as Provider' and complete our verification process. We'll review your application and get back to you within 24-48 hours."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default SupportForm;