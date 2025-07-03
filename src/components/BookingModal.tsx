import React, { useState } from 'react';
import { X, CalendarDays, Clock, MapPin, CreditCard, MessageCircle } from 'lucide-react';

interface BookingModalProps {
  provider: any;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ provider, onClose }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [description, setDescription] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mpesa');

  const handleBooking = () => {
    const bookingDetails = `
Hi! I'd like to book ${provider.name} for ${provider.service} services.

Details:
- Date: ${selectedDate}
- Time: ${selectedTime}
- Description: ${description}
- Payment Method: ${paymentMethod}
- Location: ${provider.location}

Please confirm this booking.`;

    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(bookingDetails)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const handleChatFirst = () => {
    const message = `Hi! I'm interested in ${provider.service} services from ${provider.name}. Can we chat first before booking?`;
    const whatsappUrl = `https://wa.me/254768375519?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Book Service</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-xl">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div>
              <h3 className="font-semibold text-gray-900">{provider.name}</h3>
              <p className="text-primary-500">{provider.service}</p>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                {provider.location}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CalendarDays className="h-4 w-4 inline mr-2" />
                Preferred Date
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-2" />
                Preferred Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="">Select time</option>
                <option value="08:00">8:00 AM</option>
                <option value="09:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Service Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what you need help with..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <CreditCard className="h-4 w-4 inline mr-2" />
                Payment Method
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="mpesa"
                    checked={paymentMethod === 'mpesa'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">M-Pesa</div>
                    <div className="text-sm text-gray-600">Pay via mobile money</div>
                  </div>
                </label>
                <label className="flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-3"
                  />
                  <div>
                    <div className="font-medium">Cash on Delivery</div>
                    <div className="text-sm text-gray-600">Pay when service is completed</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="bg-primary-50 p-4 rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">Service Rate</span>
                <span className="font-semibold">{provider.price}</span>
              </div>
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Platform Fee</span>
                <span>KES 200</span>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={handleBooking}
              disabled={!selectedDate || !selectedTime}
              className="w-full bg-primary-500 text-white py-3 rounded-lg hover:bg-primary-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
            >
              Confirm Booking
            </button>
            <button
              onClick={handleChatFirst}
              className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Chat First
            </button>
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By booking, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;