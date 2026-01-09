import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

interface Package {
  id: string;
  name: string;
  price: number;
  duration: string;
  image: string;
  itinerary: string[];
  includes: string[];
}

const packages: Package[] = [
  {
    id: '3-day-retreat',
    name: '3-Day Wellness Retreat',
    price: 25000,
    duration: '3 Days / 2 Nights',
    image: 'https://readdy.ai/api/search-image?query=luxury%20wellness%20retreat%20center%20nestled%20in%20mountains%20with%20yoga%20pavilion%20meditation%20gardens%20and%20peaceful%20natural%20surroundings%20showing%20holistic%20healing%20environment%20with%20simple%20elegant%20architecture&width=800&height=600&seq=package-retreat-detail-001&orientation=landscape',
    itinerary: [
      'Day 1: Arrival, welcome ceremony, yoga session, Ayurvedic consultation, dinner',
      'Day 2: Morning meditation, massage therapy, organic lunch, sound healing, evening yoga',
      'Day 3: Sunrise yoga, breakfast, Reiki session, closing ceremony, departure'
    ],
    includes: [
      'Accommodation for 2 nights',
      'All organic vegetarian meals',
      'Daily yoga and meditation sessions',
      '2 Ayurvedic massage treatments',
      'Sound healing ceremony',
      'Reiki healing session',
      'Welcome and closing ceremonies'
    ]
  },
  {
    id: '5-day-tour',
    name: '5-Day Spiritual Tour',
    price: 45000,
    duration: '5 Days / 4 Nights',
    image: 'https://readdy.ai/api/search-image?query=ancient%20buddhist%20temple%20in%20nepal%20with%20prayer%20flags%20and%20mountain%20backdrop%20spiritual%20pilgrimage%20site%20showing%20cultural%20heritage%20and%20peaceful%20meditation%20spaces%20with%20simple%20traditional%20architecture&width=800&height=600&seq=package-tour-detail-001&orientation=landscape',
    itinerary: [
      'Day 1: Arrival, orientation, visit to Swayambhunath Temple, evening meditation',
      'Day 2: Boudhanath Stupa visit, Tibetan monastery tour, sound healing ceremony',
      'Day 3: Pashupatinath Temple, Bagmati River ceremony, yoga session',
      'Day 4: Mountain monastery retreat, guided meditation, cultural dinner',
      'Day 5: Sunrise meditation, breakfast, closing ceremony, departure'
    ],
    includes: [
      'Accommodation for 4 nights',
      'All meals included',
      'Transportation to all sites',
      'Professional spiritual guide',
      'Temple entrance fees',
      'Daily meditation sessions',
      'Sound healing ceremonies',
      'Cultural experiences'
    ]
  },
  {
    id: 'salon-spa',
    name: 'Full-Day Salon & Spa',
    price: 8500,
    duration: '8 Hours',
    image: 'https://readdy.ai/api/search-image?query=luxurious%20spa%20salon%20interior%20with%20treatment%20rooms%20beauty%20stations%20and%20relaxation%20areas%20featuring%20elegant%20design%20soft%20lighting%20and%20premium%20wellness%20facilities%20with%20simple%20sophisticated%20decor&width=800&height=600&seq=package-salon-detail-001&orientation=landscape',
    itinerary: [
      '9:00 AM - Welcome tea and consultation',
      '9:30 AM - Hair treatment and styling',
      '11:00 AM - Facial treatment',
      '12:30 PM - Organic lunch break',
      '1:30 PM - Full body massage',
      '3:00 PM - Body scrub and wrap',
      '4:30 PM - Manicure and pedicure',
      '5:30 PM - Closing relaxation and refreshments'
    ],
    includes: [
      'Hair wash, treatment and styling',
      'Deep cleansing facial',
      '90-minute full body massage',
      'Body scrub and herbal wrap',
      'Manicure and pedicure',
      'Organic lunch and refreshments',
      'All premium products included',
      'Relaxation lounge access'
    ]
  }
];

export default function PackageBookingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const packageId = searchParams.get('package') || '3-day-retreat';
  const selectedPackage = packages.find(p => p.id === packageId) || packages[0];
  
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    selectedPackage: selectedPackage.name,
    paymentMethod: 'qr'
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": selectedPackage.name,
    "description": selectedPackage.includes.join(', '),
    "offers": {
      "@type": "Offer",
      "price": selectedPackage.price.toString(),
      "priceCurrency": "NPR",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/package-booking?package=${packageId}`
    },
    "provider": {
      "@type": "LocalBusiness",
      "name": "Aayurpasal Wellness Center",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "NP"
      }
    },
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": selectedPackage.itinerary.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item
      }))
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
      await fetch('https://readdy.ai/api/form/d4vdu57sdr6u9jrifmrg', {
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
        title={`${selectedPackage.name} | Wellness Package Booking | Aayurpasal`}
        description={`Book ${selectedPackage.name} at Aayurpasal Wellness Center. ${selectedPackage.includes.slice(0, 3).join(', ')}. Experience authentic Ayurvedic wellness in Nepal.`}
        keywords={`${selectedPackage.name}, wellness retreat Nepal, spiritual tour Nepal, spa package Nepal, Ayurvedic retreat, wellness package booking`}
        canonical={`${siteUrl}/package-booking?package=${packageId}`}
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
        <div className="max-w-6xl mx-auto">
          {/* Package Details */}
          <div className="bg-[#F5F1E8] rounded-3xl overflow-hidden shadow-xl mb-12">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-96 w-full overflow-hidden">
                <img 
                  src={selectedPackage.image}
                  alt={selectedPackage.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-8 md:p-12">
                <h1 className="text-4xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">{selectedPackage.name}</h1>
                <div className="flex items-center space-x-4 mb-6">
                  <span className="text-3xl font-bold text-[#4A7C59]">NPR {selectedPackage.price.toLocaleString()}</span>
                  <span className="text-gray-600">• {selectedPackage.duration}</span>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-[#2D5F3F] mb-3">Package Includes:</h3>
                  <ul className="space-y-2">
                    {selectedPackage.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <i className="ri-check-line text-[#4A7C59] mt-1 mr-2"></i>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Itinerary */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-[#2D5F3F] mb-6 font-['Playfair_Display']">Detailed Itinerary</h2>
            <div className="space-y-4">
              {selectedPackage.itinerary.map((day, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-[#F5F1E8] rounded-xl">
                  <div className="w-8 h-8 bg-[#4A7C59] text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 flex-1">{day}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-bold text-[#2D5F3F] mb-8 font-['Playfair_Display']">Complete Your Booking</h2>
            
            <form id="package-booking-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
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
                  <label className="block text-gray-700 font-medium mb-2">Selected Package *</label>
                  <select
                    name="selectedPackage"
                    required
                    value={formData.selectedPackage}
                    onChange={(e) => setFormData({...formData, selectedPackage: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    {packages.map(pkg => (
                      <option key={pkg.id} value={pkg.name}>{pkg.name} - NPR {pkg.price.toLocaleString()}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Payment Section */}
              <div className="mt-8 p-6 bg-[#F5F1E8] rounded-xl">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-6">Payment Options</h3>
                
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
                    <span className="text-gray-700 font-medium">Scan QR Code (eSewa / Khalti / Bank)</span>
                  </label>

                  <label className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === 'bank'}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                      className="w-5 h-5 text-[#4A7C59] cursor-pointer"
                    />
                    <span className="text-gray-700 font-medium">Bank Transfer</span>
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
                  <div className="bg-white p-6 rounded-xl text-center">
                    <p className="text-gray-700 mb-4 font-medium">Scan to Pay NPR {selectedPackage.price.toLocaleString()}</p>
                    <div className="w-64 h-64 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                      <img 
                        src="https://readdy.ai/api/search-image?query=generic%20payment%20qr%20code%20placeholder%20square%20format%20with%20simple%20clean%20design%20for%20mobile%20payment%20scanning&width=256&height=256&seq=payment-qr-001&orientation=squarish"
                        alt="Payment QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Supports eSewa, Khalti, and all major banks</p>
                  </div>
                )}

                {formData.paymentMethod === 'bank' && (
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-bold text-[#2D5F3F] mb-3">Bank Details:</h4>
                    <div className="space-y-2 text-gray-700">
                      <p><strong>Bank Name:</strong> Nepal Bank Limited</p>
                      <p><strong>Account Name:</strong> Aayurpasal Wellness Center</p>
                      <p><strong>Account Number:</strong> 0123456789</p>
                      <p><strong>Branch:</strong> Kathmandu</p>
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
            <p className="text-gray-600">We'll contact you shortly to confirm your booking details.</p>
          </div>
        </div>
      )}
    </div>
  );
}
