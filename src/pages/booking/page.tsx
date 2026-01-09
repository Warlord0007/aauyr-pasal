import { useState } from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
  description: string;
  category: string;
}

const services: Service[] = [
  {
    id: 'massage',
    name: 'Massage Therapy',
    duration: '60 minutes',
    price: 'NPR 2,500',
    description: 'Traditional Ayurvedic massage with herbal oils',
    category: 'therapy'
  },
  {
    id: 'yoga',
    name: 'Yoga Session',
    duration: '90 minutes',
    price: 'NPR 1,500',
    description: 'Personalized yoga practice for all levels',
    category: 'therapy'
  },
  {
    id: 'sound',
    name: 'Sound Healing',
    duration: '45 minutes',
    price: 'NPR 3,000',
    description: 'Tibetan singing bowl therapy for deep relaxation',
    category: 'therapy'
  },
  {
    id: 'reiki',
    name: 'Reiki Healing',
    duration: '60 minutes',
    price: 'NPR 2,000',
    description: 'Energy healing for balance and harmony',
    category: 'therapy'
  },
  {
    id: 'retreat-3day',
    name: '3-Day Wellness Retreat',
    duration: '3 days',
    price: 'NPR 25,000',
    description: 'Complete wellness experience with yoga, massage, meditation, and organic meals',
    category: 'package'
  },
  {
    id: 'spiritual-tour',
    name: '5-Day Spiritual Tour',
    duration: '5 days',
    price: 'NPR 45,000',
    description: 'Temple visits, meditation, cultural experiences, and sound healing',
    category: 'package'
  },
  {
    id: 'salon-spa',
    name: 'Full-Day Salon & Spa',
    duration: 'Full day',
    price: 'NPR 8,500',
    description: 'Hair treatment, facial, massage, manicure & pedicure',
    category: 'package'
  }
];

export default function BookingPage() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${siteUrl}/booking#webpage`,
    "url": `${siteUrl}/booking`,
    "name": "Book Wellness Services | Aayurpasal",
    "description": "Book authentic Ayurvedic healing services including massage therapy, yoga sessions, sound healing, Reiki, and wellness packages at Aayurpasal Wellness Center in Nepal.",
    "isPartOf": {
      "@id": `${siteUrl}/#website`
    },
    "about": {
      "@type": "Service",
      "serviceType": "Wellness Services",
      "provider": {
        "@type": "LocalBusiness",
        "name": "Aayurpasal Wellness Center"
      }
    }
  };

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setSelectedService(null);
      setSelectedDate('');
      setSelectedTime('');
    }, 3000);
  };

  const openAIAssistant = () => {
    const widget = document.querySelector('#vapi-widget-floating-button') as HTMLElement;
    if (widget) {
      widget.click();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5F1E8] to-white">
      <SEOHead
        title="Book Wellness Services | Massage, Yoga, Sound Healing | Aayurpasal"
        description="Book authentic Ayurvedic healing services including massage therapy, yoga sessions, sound healing, Reiki, and wellness packages at Aayurpasal Wellness Center in Nepal. Experience traditional healing practices."
        keywords="book massage Nepal, yoga booking, sound healing appointment, Reiki session Nepal, wellness package booking, Ayurvedic treatment booking"
        canonical={`${siteUrl}/booking`}
        schema={schema}
      />

      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                alt="Aayurpasal Logo" 
                className="h-20 w-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </Link>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-[#2D5F3F] hover:text-[#4A7C59] transition-colors font-medium">Home</Link>
              <Link to="/booking" className="text-[#2D5F3F] hover:text-[#4A7C59] transition-colors font-medium">Services</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://readdy.ai/api/search-image?query=serene%20wellness%20spa%20interior%20with%20soft%20natural%20lighting%20bamboo%20plants%20meditation%20cushions%20and%20peaceful%20atmosphere%20minimalist%20zen%20design%20with%20warm%20earth%20tones%20and%20natural%20textures%20creating%20tranquil%20healing%20environment&width=1920&height=600&seq=booking-hero-bg&orientation=landscape"
            alt="Wellness Center"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-['Playfair_Display']">
            Book Your Wellness Journey
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Choose from our range of healing services and wellness packages. Experience authentic Ayurvedic care in the heart of Nepal.
          </p>
          <button 
            onClick={openAIAssistant}
            className="bg-[#4A7C59] text-white px-8 py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer inline-flex items-center space-x-2"
          >
            <i className="ri-customer-service-2-line text-2xl"></i>
            <span>Talk to AI Assistant</span>
          </button>
        </div>
      </section>

      {/* Booking Options */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">Choose Your Service</h2>
            <p className="text-lg text-gray-600">Select a service below or use our AI assistant for personalized recommendations</p>
          </div>

          {/* AI Assistant Card */}
          <div className="bg-gradient-to-r from-[#4A7C59] to-[#2D5F3F] rounded-2xl p-8 mb-12 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2 flex items-center">
                  <i className="ri-robot-2-line text-3xl mr-3"></i>
                  Need Help Choosing?
                </h3>
                <p className="text-white/90 text-lg">
                  Our AI assistant can help you find the perfect wellness service based on your needs, answer questions, and book appointments instantly.
                </p>
              </div>
              <button 
                onClick={openAIAssistant}
                className="bg-white text-[#2D5F3F] px-8 py-4 rounded-full hover:bg-gray-100 transition-all font-medium whitespace-nowrap cursor-pointer flex items-center space-x-2"
              >
                <i className="ri-chat-voice-line text-xl"></i>
                <span>Chat or Call Now</span>
              </button>
            </div>
          </div>

          {/* Individual Services */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">Individual Sessions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.filter(s => s.category === 'therapy').map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer border-2 border-transparent hover:border-[#4A7C59]"
                  onClick={() => setSelectedService(service)}
                >
                  <h4 className="text-xl font-bold text-[#2D5F3F] mb-2">{service.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      <i className="ri-time-line mr-1"></i>
                      {service.duration}
                    </span>
                    <span className="text-lg font-bold text-[#4A7C59]">{service.price}</span>
                  </div>
                  <button className="w-full bg-[#4A7C59] text-white py-2.5 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                    Select Service
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Wellness Packages */}
          <div>
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">Wellness Packages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.filter(s => s.category === 'package').map((service) => (
                <div 
                  key={service.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 cursor-pointer border-2 border-transparent hover:border-[#4A7C59]"
                  onClick={() => setSelectedService(service)}
                >
                  <h4 className="text-xl font-bold text-[#2D5F3F] mb-2">{service.name}</h4>
                  <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">
                      <i className="ri-calendar-line mr-1"></i>
                      {service.duration}
                    </span>
                    <span className="text-lg font-bold text-[#4A7C59]">{service.price}</span>
                  </div>
                  <button className="w-full bg-[#4A7C59] text-white py-2.5 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 relative">
            <button 
              onClick={() => setSelectedService(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
            
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">{selectedService.name}</h3>
            
            <form onSubmit={handleBooking}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                <input 
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent"
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                <select 
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent cursor-pointer"
                >
                  <option value="">Choose a time</option>
                  <option value="09:00">09:00 AM</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                </select>
              </div>

              <div className="bg-[#F5F1E8] rounded-lg p-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{selectedService.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-[#4A7C59]">{selectedService.price}</span>
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-[#4A7C59] text-white py-3 rounded-full hover:bg-[#2D5F3F] transition-all font-medium whitespace-nowrap cursor-pointer"
              >
                Confirm Booking
              </button>
            </form>

            <div className="mt-4 text-center">
              <button 
                onClick={openAIAssistant}
                className="text-[#4A7C59] hover:text-[#2D5F3F] text-sm cursor-pointer"
              >
                Need help? Talk to our AI assistant
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Toast */}
      {showConfirmation && (
        <div className="fixed bottom-8 right-8 bg-[#4A7C59] text-white px-6 py-4 rounded-lg shadow-xl z-50 flex items-center space-x-3">
          <i className="ri-checkbox-circle-line text-2xl"></i>
          <span className="font-medium">Booking request sent! We'll contact you shortly.</span>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2D5F3F] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Aayurpasal</h4>
              <p className="text-white/80">Authentic Ayurvedic healing and wellness experiences in Nepal</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <Link to="/" className="block text-white/80 hover:text-white transition-colors cursor-pointer">Home</Link>
                <Link to="/booking" className="block text-white/80 hover:text-white transition-colors cursor-pointer">Book Now</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-white/80">Nepal</p>
              <button 
                onClick={openAIAssistant}
                className="mt-4 bg-white text-[#2D5F3F] px-6 py-2 rounded-full hover:bg-gray-100 transition-all whitespace-nowrap cursor-pointer"
              >
                Chat with Us
              </button>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Aayurpasal. All rights reserved. | <a href="https://readdy.ai/?origin=logo" className="hover:text-white transition-colors cursor-pointer">Website Builder</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
