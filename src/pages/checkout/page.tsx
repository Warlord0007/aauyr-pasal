import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [cart, setCart] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'qr',
    notes: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Get cart from localStorage
    const savedCart = localStorage.getItem('aayurpasal_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    } else {
      navigate('/');
    }
  }, [navigate]);

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const orderData = new URLSearchParams();
    orderData.append('name', formData.name);
    orderData.append('email', formData.email);
    orderData.append('phone', formData.phone);
    orderData.append('address', formData.address);
    orderData.append('paymentMethod', formData.paymentMethod);
    orderData.append('notes', formData.notes);
    orderData.append('items', JSON.stringify(cart));
    orderData.append('total', getTotalPrice().toString());

    try {
      const response = await fetch('https://readdy.ai/api/form/d51met4ekrnjg18b4740', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: orderData.toString()
      });

      if (response.ok) {
        setShowSuccess(true);
        localStorage.removeItem('aayurpasal_cart');
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting order:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const removeFromCart = (cartId: string) => {
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    setCart(updatedCart);
    localStorage.setItem('aayurpasal_cart', JSON.stringify(updatedCart));
    
    if (updatedCart.length === 0) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Checkout | Aayurpasal Wellness Center"
        description="Complete your order for Ayurvedic services, wellness packages, and natural body care products at Aayurpasal."
        keywords="checkout, order, Ayurvedic products, wellness services"
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-md'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <img 
                src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                alt="Aayurpasal Logo" 
                className="h-20 w-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="flex items-center space-x-8">
              <button onClick={() => navigate('/')} className="text-[#2D5F3F] hover:text-[#4A7C59] transition-colors font-medium cursor-pointer">
                <i className="ri-arrow-left-line mr-2"></i>Back to Home
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-[#2D5F3F] mb-12 text-center font-['Playfair_Display']">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Summary */}
            <div>
              <h2 className="text-2xl font-bold text-[#2D5F3F] mb-6">Order Summary</h2>
              <div className="bg-[#F5F1E8] rounded-2xl p-6 space-y-4">
                {cart.map((item) => (
                  <div key={item.cartId} className="bg-white rounded-xl p-4 flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-bold text-[#2D5F3F] mb-1">{item.name}</h3>
                      <p className="text-sm text-gray-600 capitalize mb-2">{item.type}</p>
                      {item.description && (
                        <p className="text-sm text-gray-500 mb-2">{item.description}</p>
                      )}
                      <p className="text-[#4A7C59] font-bold">NPR {item.price.toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="text-red-500 hover:text-red-700 cursor-pointer ml-4">
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                ))}

                <div className="border-t border-gray-300 pt-4 mt-4">
                  <div className="flex justify-between items-center text-2xl font-bold">
                    <span className="text-[#2D5F3F]">Total:</span>
                    <span className="text-[#4A7C59]">NPR {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <div>
              <h2 className="text-2xl font-bold text-[#2D5F3F] mb-6">Your Information</h2>
              <form id="checkout-form" data-readdy-form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Delivery Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    maxLength={500}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm resize-none"
                    placeholder="Enter your complete delivery address"
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.address.length}/500 characters</p>
                </div>

                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Payment Method *</label>
                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="qr">QR Code Payment</option>
                    <option value="bank">Bank Transfer</option>
                    <option value="cod">Cash on Delivery</option>
                  </select>
                </div>

                {formData.paymentMethod === 'qr' && (
                  <div className="bg-[#F5F1E8] rounded-xl p-6 text-center">
                    <p className="text-[#2D5F3F] font-medium mb-4">Scan to Pay</p>
                    <div className="bg-white p-4 rounded-xl inline-block">
                      <img 
                        src="https://readdy.ai/api/search-image?query=simple%20clean%20qr%20code%20payment%20scanner%20for%20mobile%20banking%20digital%20wallet%20transaction%20with%20minimalist%20white%20background%20professional%20business%20style&width=200&height=200&seq=qr-payment-001&orientation=squarish"
                        alt="Payment QR Code"
                        className="w-48 h-48"
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-4">Scan with any UPI app or mobile banking</p>
                  </div>
                )}

                {formData.paymentMethod === 'bank' && (
                  <div className="bg-[#F5F1E8] rounded-xl p-6">
                    <p className="text-[#2D5F3F] font-medium mb-3">Bank Transfer Details:</p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <p><strong>Bank Name:</strong> Nepal Bank Limited</p>
                      <p><strong>Account Name:</strong> Aayurpasal Wellness Center</p>
                      <p><strong>Account Number:</strong> 0123456789</p>
                      <p><strong>Branch:</strong> Kathmandu</p>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[#2D5F3F] font-medium mb-2">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    maxLength={500}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:border-[#4A7C59] text-sm resize-none"
                    placeholder="Any special instructions or preferences..."
                  ></textarea>
                  <p className="text-xs text-gray-500 mt-1">{formData.notes.length}/500 characters</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer"
                >
                  Complete Order
                </button>
              </form>

              <div className="mt-6 text-center">
                <a 
                  href="https://wa.me/9779800000000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#25D366] hover:text-[#128C7E] transition-colors cursor-pointer"
                >
                  <i className="ri-whatsapp-line text-2xl mr-2"></i>
                  <span>Need help? Chat with us on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="ri-check-line text-4xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-[#2D5F3F] mb-4">Order Placed Successfully!</h3>
            <p className="text-gray-600 mb-6">Thank you for your order. We'll contact you shortly to confirm the details.</p>
            <p className="text-sm text-gray-500">Redirecting to homepage...</p>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#4A7C59] text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm">&copy; 2025 Aayurpasal. All rights reserved. | <a href="https://readdy.ai/?ref=logo" target="_blank" rel="noopener noreferrer" className="hover:underline cursor-pointer">Website Builder</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
