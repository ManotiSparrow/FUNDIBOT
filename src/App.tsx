import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import FeaturedProviders from './components/FeaturedProviders';
import HowItWorks from './components/HowItWorks';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import ChatBotButton from './components/ChatBotButton';

// Pages
import SearchResults from './pages/SearchResults';
import AllServices from './pages/AllServices';
import AllProviders from './pages/AllProviders';
import JoinProvider from './pages/JoinProvider';
import SignIn from './pages/SignIn';
import ProviderProfile from './pages/ProviderProfile';
import HowItWorksPage from './pages/HowItWorksPage';
import SupportForm from './pages/SupportForm';

function HomePage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);

  const openBookingModal = (provider: any) => {
    setSelectedProvider(provider);
    setIsBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setIsBookingModalOpen(false);
    setSelectedProvider(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <Services />
      <FeaturedProviders onBookProvider={openBookingModal} />
      <HowItWorks />
      <Footer />
      <ChatBotButton />
      
      {isBookingModalOpen && (
        <BookingModal 
          provider={selectedProvider}
          onClose={closeBookingModal}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search-results" element={<SearchResults />} />
        <Route path="/all-services" element={<AllServices />} />
        <Route path="/all-providers" element={<AllProviders />} />
        <Route path="/join-provider" element={<JoinProvider />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/provider/:id" element={<ProviderProfile />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/support" element={<SupportForm />} />
      </Routes>
    </Router>
  );
}

export default App;