import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

interface VoucherDesign {
  id: string;
  occasion: string;
  bgColor: string;
  accentColor: string;
  pattern: string;
  icon: string;
}

const voucherDesigns: VoucherDesign[] = [
  {
    id: 'birthday',
    occasion: 'Birthday',
    bgColor: 'from-pink-100 to-purple-100',
    accentColor: '#E91E63',
    pattern: 'https://readdy.ai/api/search-image?query=elegant%20birthday%20celebration%20pattern%20with%20balloons%20confetti%20and%20festive%20elements%20in%20soft%20pastel%20colors%20minimalist%20design%20for%20gift%20voucher%20background&width=800&height=400&seq=voucher-birthday-001&orientation=landscape',
    icon: 'ri-cake-3-line'
  },
  {
    id: 'anniversary',
    occasion: 'Anniversary',
    bgColor: 'from-red-100 to-pink-100',
    accentColor: '#DC143C',
    pattern: 'https://readdy.ai/api/search-image?query=romantic%20anniversary%20design%20with%20hearts%20roses%20and%20elegant%20decorative%20elements%20in%20warm%20red%20and%20pink%20tones%20sophisticated%20pattern%20for%20gift%20voucher&width=800&height=400&seq=voucher-anniversary-001&orientation=landscape',
    icon: 'ri-heart-3-line'
  },
  {
    id: 'christmas',
    occasion: 'Christmas',
    bgColor: 'from-green-100 to-red-100',
    accentColor: '#C41E3A',
    pattern: 'https://readdy.ai/api/search-image?query=festive%20christmas%20holiday%20pattern%20with%20snowflakes%20pine%20branches%20and%20ornaments%20in%20traditional%20red%20and%20green%20colors%20elegant%20winter%20design%20for%20gift%20voucher&width=800&height=400&seq=voucher-christmas-001&orientation=landscape',
    icon: 'ri-gift-line'
  },
  {
    id: 'wellness',
    occasion: 'Wellness Gift',
    bgColor: 'from-green-100 to-teal-100',
    accentColor: '#4A7C59',
    pattern: 'https://readdy.ai/api/search-image?query=peaceful%20wellness%20spa%20pattern%20with%20lotus%20flowers%20bamboo%20and%20zen%20elements%20in%20calming%20green%20tones%20serene%20natural%20design%20for%20gift%20voucher%20background&width=800&height=400&seq=voucher-wellness-001&orientation=landscape',
    icon: 'ri-leaf-line'
  },
  {
    id: 'thankyou',
    occasion: 'Thank You',
    bgColor: 'from-yellow-100 to-orange-100',
    accentColor: '#FF8C00',
    pattern: 'https://readdy.ai/api/search-image?query=warm%20gratitude%20pattern%20with%20flowers%20sunshine%20and%20appreciation%20symbols%20in%20golden%20yellow%20and%20orange%20tones%20cheerful%20design%20for%20thank%20you%20gift%20voucher&width=800&height=400&seq=voucher-thankyou-001&orientation=landscape',
    icon: 'ri-hand-heart-line'
  },
  {
    id: 'general',
    occasion: 'General Gift',
    bgColor: 'from-blue-100 to-indigo-100',
    accentColor: '#4169E1',
    pattern: 'https://readdy.ai/api/search-image?query=elegant%20universal%20gift%20pattern%20with%20decorative%20flourishes%20ribbons%20and%20celebratory%20elements%20in%20sophisticated%20blue%20tones%20versatile%20design%20for%20any%20occasion%20voucher&width=800&height=400&seq=voucher-general-001&orientation=landscape',
    icon: 'ri-gift-2-line'
  }
];

export default function GiftVoucherPage() {
  const navigate = useNavigate();
  const voucherRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    recipientName: '',
    recipientEmail: '',
    occasion: 'birthday',
    amount: '5000',
    personalMessage: ''
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedVoucher, setGeneratedVoucher] = useState(false);

  const selectedDesign = voucherDesigns.find(d => d.id === formData.occasion) || voucherDesigns[0];

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Wellness Gift Voucher",
    "description": "Personalized wellness gift vouchers for Aayurpasal services. Auto-designed for special occasions including birthdays, anniversaries, Christmas, and more. Valid for 12 months.",
    "brand": {
      "@type": "Brand",
      "name": "Aayurpasal Wellness Center"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "NPR",
      "lowPrice": "2000",
      "highPrice": "50000",
      "availability": "https://schema.org/InStock",
      "url": `${siteUrl}/gift-voucher`
    },
    "category": "Gift Voucher"
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
    
    setGeneratedVoucher(true);
    
    setTimeout(async () => {
      const form = e.target as HTMLFormElement;
      const formDataToSend = new FormData(form);
      
      try {
        await fetch('https://readdy.ai/api/form/d4vdu57sdr6u9jrifmsg', {
          method: 'POST',
          body: new URLSearchParams(formDataToSend as any)
        });
        
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
        }, 3000);
      } catch (error) {
        alert('Submission failed. Please try again.');
      }
    }, 1000);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/9779800000000', '_blank');
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Gift Wellness Vouchers | Personalized Spa Gift Cards | Aayurpasal"
        description="Create personalized wellness gift vouchers for Aayurpasal services. Auto-designed for birthdays, anniversaries, Christmas, and special occasions. Valid for 12 months. Share the gift of healing and relaxation."
        keywords="wellness gift voucher Nepal, spa gift card, Ayurvedic gift certificate, birthday wellness gift, anniversary spa voucher, Christmas wellness gift"
        canonical={`${siteUrl}/gift-voucher`}
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
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">Gift Wellness Voucher</h1>
            <p className="text-xl text-gray-600">Share the gift of healing and relaxation with your loved ones</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form Section */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-[#2D5F3F] mb-6">Create Your Gift Voucher</h2>
              
              <form id="gift-voucher-form" data-readdy-form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="senderName"
                    required
                    value={formData.senderName}
                    onChange={(e) => setFormData({...formData, senderName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Email *</label>
                  <input
                    type="email"
                    name="senderEmail"
                    required
                    value={formData.senderEmail}
                    onChange={(e) => setFormData({...formData, senderEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Recipient Name *</label>
                  <input
                    type="text"
                    name="recipientName"
                    required
                    value={formData.recipientName}
                    onChange={(e) => setFormData({...formData, recipientName: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="Recipient's full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Recipient Email *</label>
                  <input
                    type="email"
                    name="recipientEmail"
                    required
                    value={formData.recipientEmail}
                    onChange={(e) => setFormData({...formData, recipientEmail: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="recipient@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Occasion *</label>
                  <select
                    name="occasion"
                    required
                    value={formData.occasion}
                    onChange={(e) => setFormData({...formData, occasion: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    {voucherDesigns.map(design => (
                      <option key={design.id} value={design.id}>{design.occasion}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Voucher Amount *</label>
                  <select
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({...formData, amount: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="2000">NPR 2,000</option>
                    <option value="5000">NPR 5,000</option>
                    <option value="10000">NPR 10,000</option>
                    <option value="15000">NPR 15,000</option>
                    <option value="25000">NPR 25,000</option>
                    <option value="50000">NPR 50,000</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Personal Message</label>
                  <textarea
                    name="personalMessage"
                    value={formData.personalMessage}
                    onChange={(e) => setFormData({...formData, personalMessage: e.target.value})}
                    maxLength={500}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm resize-none"
                    placeholder="Add a personal message (optional, max 500 characters)"
                  />
                  <p className="text-sm text-gray-500 mt-1">{formData.personalMessage.length}/500 characters</p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <button
                    type="submit"
                    className="w-full bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer"
                  >
                    Generate & Send Voucher
                  </button>
                  <button
                    type="button"
                    onClick={openWhatsApp}
                    className="w-full bg-[#25D366] text-white py-4 rounded-full hover:bg-[#20BA5A] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <i className="ri-whatsapp-line text-xl"></i>
                    <span>Questions? Chat on WhatsApp</span>
                  </button>
                </div>
              </form>
            </div>

            {/* Voucher Preview */}
            <div className="lg:sticky lg:top-32 h-fit">
              <h2 className="text-2xl font-bold text-[#2D5F3F] mb-6">Voucher Preview</h2>
              <div 
                ref={voucherRef}
                className={`bg-gradient-to-br ${selectedDesign.bgColor} rounded-3xl shadow-2xl overflow-hidden transform transition-all duration-500 ${generatedVoucher ? 'scale-105' : 'scale-100'}`}
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <img 
                    src={selectedDesign.pattern}
                    alt={selectedDesign.occasion}
                    className="w-full h-full object-cover opacity-30"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <i className={`${selectedDesign.icon} text-8xl opacity-20`} style={{ color: selectedDesign.accentColor }}></i>
                  </div>
                </div>
                
                <div className="p-8 bg-white/90 backdrop-blur-sm">
                  <div className="text-center mb-6">
                    <img 
                      src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                      alt="Aayurpasal Logo" 
                      className="h-16 mx-auto mb-4"
                      style={{ mixBlendMode: 'multiply' }}
                    />
                    <h3 className="text-3xl font-bold mb-2" style={{ color: selectedDesign.accentColor }}>
                      {selectedDesign.occasion} Gift Voucher
                    </h3>
                    <div className="text-5xl font-bold text-[#2D5F3F] my-4">
                      NPR {parseInt(formData.amount).toLocaleString()}
                    </div>
                  </div>

                  <div className="border-t-2 border-dashed border-gray-300 pt-6 space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">To:</p>
                      <p className="text-lg font-semibold text-[#2D5F3F]">
                        {formData.recipientName || 'Recipient Name'}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">From:</p>
                      <p className="text-lg font-semibold text-[#2D5F3F]">
                        {formData.senderName || 'Your Name'}
                      </p>
                    </div>
                    {formData.personalMessage && (
                      <div className="mt-4 p-4 bg-[#F5F1E8] rounded-lg">
                        <p className="text-sm text-gray-700 italic">"{formData.personalMessage}"</p>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 text-center text-xs text-gray-500">
                    <p>Valid for 12 months from date of purchase</p>
                    <p className="mt-1">Redeemable at Aayurpasal Wellness Center</p>
                  </div>
                </div>
              </div>
            </div>
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
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-2">Voucher Created!</h3>
            <p className="text-gray-600">Your gift voucher has been generated and will be sent to the recipient's email.</p>
          </div>
        </div>
      )}
    </div>
  );
}
