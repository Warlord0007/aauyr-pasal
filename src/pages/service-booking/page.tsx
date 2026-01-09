import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  description: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'massage',
    name: 'Massage Therapy',
    price: 2500,
    duration: '60-90 minutes',
    description: 'Traditional Ayurvedic massage using herbal oils to rejuvenate body and mind',
    image: 'https://readdy.ai/api/search-image?query=professional%20ayurvedic%20massage%20therapy%20session%20in%20serene%20spa%20room%20with%20herbal%20oils%20natural%20lighting%20and%20peaceful%20ambiance%20showing%20relaxation%20and%20traditional%20healing%20techniques%20with%20simple%20neutral%20background&width=800&height=600&seq=service-massage-detail-001&orientation=landscape'
  },
  {
    id: 'yoga',
    name: 'Yoga Sessions',
    price: 1500,
    duration: '60 minutes',
    description: 'Personalized yoga practice for all levels, focusing on balance and flexibility',
    image: 'https://readdy.ai/api/search-image?query=peaceful%20yoga%20meditation%20session%20in%20minimalist%20studio%20with%20natural%20light%20wooden%20floor%20and%20serene%20atmosphere%20person%20in%20lotus%20pose%20practicing%20mindfulness%20with%20simple%20clean%20background&width=800&height=600&seq=service-yoga-detail-001&orientation=landscape'
  },
  {
    id: 'sound',
    name: 'Sound Healing',
    price: 3000,
    duration: '45-60 minutes',
    description: 'Tibetan singing bowl therapy for deep relaxation and energy alignment',
    image: 'https://readdy.ai/api/search-image?query=tibetan%20singing%20bowls%20sound%20healing%20therapy%20session%20with%20golden%20brass%20bowls%20arranged%20peacefully%20in%20meditation%20space%20with%20soft%20lighting%20and%20tranquil%20atmosphere%20simple%20neutral%20background&width=800&height=600&seq=service-sound-detail-001&orientation=landscape'
  },
  {
    id: 'reiki',
    name: 'Reiki Healing',
    price: 2000,
    duration: '45 minutes',
    description: 'Energy healing to restore balance and promote natural healing processes',
    image: 'https://readdy.ai/api/search-image?query=reiki%20energy%20healing%20session%20with%20practitioner%20hands%20hovering%20over%20client%20in%20peaceful%20spa%20environment%20soft%20glowing%20light%20representing%20energy%20flow%20and%20spiritual%20healing%20simple%20clean%20background&width=800&height=600&seq=service-reiki-detail-001&orientation=landscape'
  }
];

export default function ServiceBookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const serviceId = searchParams.get('service') || 'massage';
  const selectedService = services.find(s => s.id === serviceId) || services[0];
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    selectedService: selectedService.name,
    preferredDate: '',
    preferredTime: '',
    paymentMethod: 'qr',
    paymentScreenshot: null as File | null
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": selectedService.name,
    "name": selectedService.name,
    "description": selectedService.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Aayurpasal Wellness Center",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NP"
      }
    },
    "areaServed": {
      "@type": "Country",
      "name": "Nepal"
    },
    "offers": {
      "@type": "Offer",
      "price": selectedService.price.toString(),
      "priceCurrency": "NPR",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/service-booking?service=${serviceId}`
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const form = e.target as HTMLFormElement;
    const formDataToSend = new FormData(form);
    
    try {
      await fetch('https://readdy.ai/api/form/d4vdu57sdr6u9jrifms0', {
        method: 'POST',
        body: new URLSearchParams(formDataToSend as any)
      });
      
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate('/');
      }, 3000);
    } catch (error) {
      alert('Submission failed. Please try again.');
    }
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/9779800000000', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title={`${selectedService.name} Booking | ${selectedService.duration} | Aayurpasal`}
        description={`Book ${selectedService.name} at Aayurpasal Wellness Center. ${selectedService.description}. Duration: ${selectedService.duration}. Price: NPR ${selectedService.price.toLocaleString()}.`}
        keywords={`${selectedService.name} Nepal, book ${selectedService.name}, Ayurvedic ${selectedService.name}, wellness ${selectedService.name} Nepal`}
        canonical={`${siteUrl}/service-booking?service=${serviceId}`}
        schema={schema}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-3">
              <img 
                src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                alt="Aayurpasal Logo" 
                className="h-20 w-auto cursor-pointer"
                style={{ mixBlendMode: 'multiply' }}
                onClick={() => navigate('/')}
              />
            </div>
            <div className="flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-[#2D5F3F] hover:text-[#4A7C59] transition-colors font-medium cursor-pointer">Home</button>
              <button onClick={() => navigate('/booking')} className="text-[#2D5F3F] hover:text-[#4A7C59] transition-colors font-medium cursor-pointer">Services</button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Service Details */}
          <div className="bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="h-96 w-full overflow-hidden">
              <img 
                src={selectedService.image}
                alt={selectedService.name}
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="p-8 md:p-12">
              <h1 className="text-4xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">{selectedService.name}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-3xl font-bold text-[#4A7C59]">NPR {selectedService.price.toLocaleString()}</span>
                <span className="text-gray-600">• {selectedService.duration}</span>
              </div>
              <p className="text-gray-700 text-lg">{selectedService.description}</p>
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#2D5F3F] mb-8 font-['Playfair_Display']">Book Your Session</h2>
            
            <form id="service-booking-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contact"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Selected Service *</label>
                  <select
                    name="selectedService"
                    required
                    value={formData.selectedService}
                    onChange={(e) => setFormData({...formData, selectedService: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    {services.map(service => (
                      <option key={service.id} value={service.name}>{service.name} - NPR {service.price.toLocaleString()}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    name="preferredDate"
                    required
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Preferred Time *</label>
                  <select
                    name="preferredTime"
                    required
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select time slot</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="02:00 PM">02:00 PM</option>
                    <option value="03:00 PM">03:00 PM</option>
                    <option value="04:00 PM">04:00 PM</option>
                    <option value="05:00 PM">05:00 PM</option>
                  </select>
                </div>
              </div>

              {/* Payment Section */}
              <div className="mt-8 p-6 bg-[#F5F1E8] rounded-xl">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">Payment Method</h3>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="qr"
                      checked={formData.paymentMethod === 'qr'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-5 h-5 text-[#4A7C59] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">Online Payment (eSewa / Khalti)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === 'cash'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-5 h-5 text-[#4A7C59] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">Pay at Center</span>
                  </label>
                </div>

                {formData.paymentMethod === 'qr' && (
                  <div className="bg-white p-6 rounded-xl">
                    <div className="text-center mb-4">
                      <p className="text-gray-700 mb-4 font-medium">Scan to Pay NPR {selectedService.price.toLocaleString()}</p>
                      <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center mb-4">
                        <img 
                          src="https://readdy.ai/api/search-image?query=generic%20payment%20qr%20code%20placeholder%20square%20format%20with%20simple%20clean%20design%20for%20mobile%20payment%20scanning&width=256&height=256&seq=payment-qr-002&orientation=squarish"
                          alt="Payment QR Code"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-gray-700 font-medium mb-2">Upload Payment Screenshot *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          name="paymentScreenshot"
                          accept="image/*"
                          onChange={(e) => setFormData({...formData, paymentScreenshot: e.target.files?.[0] || null})}
                          className="hidden"
                          id="screenshot-upload"
                        />
                        <label htmlFor="screenshot-upload" className="cursor-pointer">
                          <i className="ri-upload-cloud-line text-4xl text-gray-400 mb-2"></i>
                          <p className="text-gray-600">Click to upload payment screenshot</p>
                          <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                        </label>
                        {formData.paymentScreenshot && (
                          <p className="text-[#4A7C59] mt-2 font-medium">{formData.paymentScreenshot.name}</p>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mt-2">Note: Payment screenshot is for reference only</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer"
                >
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-full hover:bg-[#20BA5A] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                >
                  <i className="ri-whatsapp-line text-xl"></i>
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-check-line text-white text-3xl"></i>
            </div>
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600">We'll contact you shortly to confirm your appointment.</p>
          </div>
        </div>
      )}
    </div>
  );
}
