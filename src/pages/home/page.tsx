import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';

export default function HomePage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showCartModal, setShowCartModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [customPackageForm, setCustomPackageForm] = useState({
    name: '',
    email: "",
    contact: "",
    duration: "",
    customDuration: "",
    services: [] as string[],
    requirements: "",
    startDate: ""
  });
  
  // Service Finder State
  const [serviceFinder, setServiceFinder] = useState({
    healthConcern: "",
    ageGroup: "",
    timeAvailability: "",
    experienceLevel: "",
    budget: ""
  });
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [recommendedServices, setRecommendedServices] = useState<string[]>([]);
  
  // Wellness Products State
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  
  const navigate = useNavigate();

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://example.com';

  const slides = [
    {
      image: "https://readdy.ai/api/search-image?query=majestic%20himalayan%20mountain%20peaks%20at%20golden%20sunrise%20with%20misty%20valleys%20below%20serene%20natural%20landscape%20featuring%20snow%20capped%20mountains%20lush%20green%20foothills%20and%20peaceful%20atmosphere%20representing%20spiritual%20wellness%20and%20tranquility%20in%20nepal&width=1920&height=1080&seq=hero-slide-001&orientation=landscape",
      title: "Discover Ancient Healing",
      subtitle: "Experience authentic Ayurvedic wellness in the heart of Nepal"
    },
    {
      image: "https://readdy.ai/api/search-image?query=peaceful%20meditation%20garden%20with%20traditional%20nepali%20architecture%20stone%20pathways%20lush%20greenery%20and%20tranquil%20water%20features%20creating%20serene%20wellness%20sanctuary%20atmosphere%20with%20soft%20natural%20lighting%20and%20harmonious%20design&width=1920&height=1080&seq=hero-slide-002&orientation=landscape",
      title: "Journey to Inner Peace",
      subtitle: "Transform your mind, body and spirit through traditional practices"
    },
    {
      image: "https://readdy.ai/api/search-image?query=serene%20yoga%20meditation%20space%20overlooking%20himalayan%20mountains%20with%20open%20pavilion%20natural%20wooden%20elements%20prayer%20flags%20and%20breathtaking%20mountain%20views%20creating%20perfect%20wellness%20retreat%20atmosphere&width=1920&height=1080&seq=hero-slide-003&orientation=landscape",
      title: "Embrace Holistic Wellness",
      subtitle: "Reconnect with nature and rediscover your authentic self"
    }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${siteUrl}/#organization`,
        "name": "Aayurpasal Wellness Center",
        "description": "Authentic Ayurvedic healing and wellness center in Nepal offering massage therapy, yoga sessions, sound healing, Reiki, wellness retreats, spiritual tours, and organic body care products.",
        "url": siteUrl,
        "telephone": "+977-9800000000",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "NP",
          "addressLocality": "Nepal"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "27.7172",
          "longitude": "85.3240"
        },
        "priceRange": "NPR 850 - NPR 50,000",
        "image": "https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg",
        "sameAs": [
          `https://wa.me/9779800000000`
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "Aayurpasal Wellness Center",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        }
      },
      {
        "@type": "Service",
        "serviceType": "Massage Therapy",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "areaServed": "Nepal",
        "offers": {
          "@type": "Offer",
          "price": "2500",
          "priceCurrency": "NPR"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Yoga Sessions",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "areaServed": "Nepal",
        "offers": {
          "@type": "Offer",
          "price": "1500",
          "priceCurrency": "NPR"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Sound Healing",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "areaServed": "Nepal",
        "offers": {
          "@type": "Offer",
          "price": "3000",
          "priceCurrency": "NPR"
        }
      },
      {
        "@type": "Service",
        "serviceType": "Reiki Healing",
        "provider": {
          "@id": `${siteUrl}/#organization`
        },
        "areaServed": "Nepal",
        "offers": {
          "@type": "Offer",
          "price": "2000",
          "priceCurrency": "NPR"
        }
      },
      {
        "@type": "Product",
        "name": "Himalayan Body Butter",
        "description": "Rich moisturizing cream with shea butter and Himalayan herbs",
        "offers": {
          "@type": "Offer",
          "price": "1200",
          "priceCurrency": "NPR",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "Product",
        "name": "Ayurvedic Face Serum",
        "description": "Anti-aging serum with natural botanicals and essential oils",
        "offers": {
          "@type": "Offer",
          "price": "1800",
          "priceCurrency": "NPR",
          "availability": "https://schema.org/InStock"
        }
      }
    ]
  };

  const products = [
    {
      id: 1,
      name: 'Himalayan Body Butter',
      description: 'Rich moisturizing cream with shea butter and Himalayan herbs',
      price: 1200,
      image: 'https://readdy.ai/api/search-image?query=luxury%20himalayan%20body%20butter%20cream%20jar%20on%20clean%20white%20surface%20with%20natural%20ingredients%20like%20shea%20butter%20and%20herbs%20displayed%20beside%20it%20minimalist%20product%20photography%20with%20soft%20lighting%20simple%20background&width=400&height=300&seq=product-butter-001&orientation=squarish'
    },
    {
      id: 2,
      name: 'Ayurvedic Face Serum',
      description: 'Anti-aging serum with natural botanicals and essential oils',
      price: 1800,
      image: 'https://readdy.ai/api/search-image?query=elegant%20ayurvedic%20face%20serum%20bottle%20with%20dropper%20on%20clean%20white%20background%20surrounded%20by%20fresh%20herbs%20and%20botanical%20ingredients%20professional%20skincare%20product%20photography%20simple%20minimalist%20setup&width=400&height=300&seq=product-serum-001&orientation=squarish'
    },
    {
      id: 3,
      name: 'Herbal Hair Oil',
      description: 'Nourishing oil blend for strong, healthy hair growth',
      price: 950,
      image: 'https://readdy.ai/api/search-image?query=traditional%20herbal%20hair%20oil%20bottle%20on%20white%20surface%20with%20natural%20herbs%20and%20flowers%20arranged%20around%20it%20ayurvedic%20hair%20care%20product%20photography%20with%20clean%20simple%20background&width=400&height=300&seq=product-hairoil-001&orientation=squarish'
    },
    {
      id: 4,
      name: 'Natural Body Scrub',
      description: 'Exfoliating scrub with Himalayan salt and organic oils',
      price: 850,
      image: 'https://readdy.ai/api/search-image?query=natural%20body%20scrub%20jar%20with%20organic%20ingredients%20like%20himalayan%20salt%20and%20herbs%20displayed%20on%20clean%20white%20background%20spa%20product%20photography%20minimalist%20style%20simple%20setup&width=400&height=300&seq=product-scrub-001&orientation=squarish'
    }
  ];

  const packages = [
    {
      id: 1,
      name: '3-Day Wellness Retreat',
      description: 'Complete wellness experience with yoga, massage, meditation, and organic meals',
      price: 'NPR 25,000',
      duration: '3 Days / 2 Nights',
      image: 'https://readdy.ai/api/search-image?query=luxury%20wellness%20retreat%20center%20nestled%20in%20mountains%20with%20yoga%20pavilion%20meditation%20gardens%20and%20peaceful%20natural%20surroundings%20showing%20holistic%20healing%20environment%20with%20simple%20elegant%20architecture&width=800&height=600&seq=package-retreat-001&orientation=landscape'
    },
    {
      id: 2,
      name: '5-Day Spiritual Tour',
      description: 'Temple visits, meditation, cultural experiences, and sound healing',
      price: 'NPR 45,000',
      duration: '5 Days / 4 Nights',
      image: 'https://readdy.ai/api/search-image?query=ancient%20buddhist%20temple%20in%20nepal%20with%20prayer%20flags%20and%20mountain%20backdrop%20spiritual%20pilgrimage%20site%20showing%20cultural%20heritage%20and%20peaceful%20meditation%20spaces%20with%20simple%20traditional%20architecture&width=800&height=600&seq=package-tour-001&orientation=landscape'
    },
    {
      id: 3,
      name: 'Full-Day Salon & Spa',
      description: 'Hair treatment, facial, massage, manicure & pedicure',
      price: 'NPR 8,500',
      duration: 'Full Day (8 hours)',
      image: 'https://readdy.ai/api/search-image?query=luxurious%20spa%20salon%20interior%20with%20treatment%20rooms%20beauty%20stations%20and%20relaxation%20areas%20featuring%20elegant%20design%20soft%20lighting%20and%20premium%20wellness%20facilities%20with%20simple%20sophisticated%20decor&width=800&height=600&seq=package-salon-001&orientation=landscape'
    }
  ];

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product);
    setShowCartModal(true);
  };

  const addToCart = (item: any, type: 'service' | 'package' | 'product') => {
    const cartItem = {
      ...item,
      type,
      cartId: `${type}-${item.id}-${Date.now()}`
    };
    
    // Get existing cart from localStorage
    const existingCart = localStorage.getItem('aayurpasal_cart');
    const currentCart = existingCart ? JSON.parse(existingCart) : [];
    
    // Add new item
    const updatedCart = [...currentCart, cartItem];
    
    // Save to localStorage and state
    localStorage.setItem('aayurpasal_cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  const removeFromCart = (cartId: string) => {
    const updatedCart = cart.filter(item => item.cartId !== cartId);
    setCart(updatedCart);
    localStorage.setItem('aayurpasal_cart', JSON.stringify(updatedCart));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  useEffect(() => {
    // Load cart from localStorage on mount
    const savedCart = localStorage.getItem('aayurpasal_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const openWhatsApp = () => {
    window.open('https://wa.me/9779800000000', '_blank');
  };

  const handleCustomPackageSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    // Add selected services as a comma-separated string
    formData.set('services', customPackageForm.services.join(', '));
    
    try {
      await fetch('https://readdy.ai/api/form/d5d7uu1dn6dhfpiac150', {
        method: 'POST',
        body: new URLSearchParams(formData as any)
      });
      
      // Reset form
      setCustomPackageForm({
        name: '',
        email: '',
        contact: '',
        duration: '',
        customDuration: '',
        services: [],
        requirements: '',
        startDate: ''
      });
      
      alert('Thank you! Your custom package request has been submitted. We will contact you within 24-48 hours with a personalized proposal and pricing.');
    } catch (error) {
      alert('Submission failed. Please try again or contact us via WhatsApp.');
    }
  };

  const getRecommendedServices = () => {
    const recommendations: string[] = [];
    
    // Based on health concerns
    if (serviceFinder.healthConcern === 'stress') {
      recommendations.push('massage', 'sound', 'reiki');
    } else if (serviceFinder.healthConcern === 'pain') {
      recommendations.push('massage', 'reiki');
    } else if (serviceFinder.healthConcern === 'flexibility') {
      recommendations.push('yoga', 'massage');
    } else if (serviceFinder.healthConcern === 'energy') {
      recommendations.push('reiki', 'yoga', 'sound');
    } else if (serviceFinder.healthConcern === 'mental') {
      recommendations.push('sound', 'yoga', 'reiki');
    }
    
    // Based on time availability
    if (serviceFinder.timeAvailability === 'short') {
      recommendations.push('sound', 'reiki');
    } else if (serviceFinder.timeAvailability === 'medium') {
      recommendations.push('massage', 'yoga');
    }
    
    // Based on experience level
    if (serviceFinder.experienceLevel === 'beginner') {
      recommendations.push('yoga', 'massage');
    } else if (serviceFinder.experienceLevel === 'experienced') {
      recommendations.push('sound', 'reiki');
    }
    
    // Based on budget
    if (serviceFinder.budget === 'low') {
      recommendations.push('yoga');
    } else if (serviceFinder.budget === 'medium') {
      recommendations.push('massage', 'reiki');
    } else if (serviceFinder.budget === 'high') {
      recommendations.push('sound', 'massage');
    }
    
    // Remove duplicates and return
    const uniqueRecommendations = [...new Set(recommendations)];
    
    // If no specific recommendations, show all
    if (uniqueRecommendations.length === 0) {
      return ['massage', 'yoga', 'sound', 'reiki'];
    }
    
    return uniqueRecommendations;
  };

  const handleServiceFinderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const recommended = getRecommendedServices();
    setRecommendedServices(recommended);
    setShowRecommendations(true);
    
    // Scroll to services section
    setTimeout(() => {
      document.getElementById('services-section')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const resetServiceFinder = () => {
    setServiceFinder({
      healthConcern: '',
      ageGroup: '',
      timeAvailability: '',
      experienceLevel: '',
      budget: ''
    });
    setShowRecommendations(false);
    setRecommendedServices([]);
  };

  const productCategories = [
    {
      id: 'singing-bowls',
      name: 'Singing Bowls',
      description: 'Authentic Tibetan and Himalayan singing bowls for meditation and sound healing',
      icon: 'ri-music-2-line',
      image: 'https://readdy.ai/api/search-image?query=collection%20of%20authentic%20tibetan%20singing%20bowls%20in%20various%20sizes%20arranged%20beautifully%20on%20white%20surface%20with%20traditional%20craftsmanship%20details%20golden%20brass%20finish%20meditation%20sound%20healing%20instruments&width=600&height=400&seq=category-bowls-001&orientation=landscape',
      products: [
        {
          id: 'sb1',
          name: 'Traditional Tibetan Singing Bowl - Small',
          description: 'Hand-hammered 4-inch singing bowl with wooden striker and cushion. Perfect for personal meditation and chakra balancing.',
          price: 3500,
          image: 'https://readdy.ai/api/search-image?query=small%20traditional%20tibetan%20singing%20bowl%20with%20wooden%20striker%20and%20cushion%20on%20clean%20white%20background%20hand%20hammered%20brass%20finish%20meditation%20tool%20product%20photography&width=400&height=300&seq=bowl-small-001&orientation=squarish'
        },
        {
          id: 'sb2',
          name: 'Himalayan Singing Bowl - Medium',
          description: '6-inch hand-crafted bowl with deep resonant tones. Includes mallet and silk cushion. Ideal for sound healing sessions.',
          price: 5800,
          image: 'https://readdy.ai/api/search-image?query=medium%20himalayan%20singing%20bowl%20with%20mallet%20and%20silk%20cushion%20on%20white%20surface%20golden%20brass%20hand%20crafted%20sound%20healing%20instrument%20professional%20product%20photo&width=400&height=300&seq=bowl-medium-001&orientation=squarish'
        },
        {
          id: 'sb3',
          name: 'Premium Singing Bowl Set - Large',
          description: '8-inch master quality bowl with intricate engravings. Complete set with two mallets, cushion, and carrying case.',
          price: 9500,
          image: 'https://readdy.ai/api/search-image?query=large%20premium%20singing%20bowl%20with%20intricate%20engravings%20two%20mallets%20cushion%20and%20carrying%20case%20on%20white%20background%20luxury%20meditation%20sound%20healing%20set&width=400&height=300&seq=bowl-large-001&orientation=squarish'
        },
        {
          id: 'sb4',
          name: 'Chakra Singing Bowl Set',
          description: 'Set of 7 color-coded singing bowls representing each chakra. Complete with strikers and display stand.',
          price: 18500,
          image: 'https://readdy.ai/api/search-image?query=seven%20chakra%20singing%20bowls%20set%20color%20coded%20with%20strikers%20and%20display%20stand%20on%20white%20background%20complete%20meditation%20healing%20collection%20professional%20photo&width=400&height=300&seq=bowl-chakra-001&orientation=squarish'
        }
      ]
    },
    {
      id: 'body-care',
      name: 'Body Care Products',
      description: 'Natural and organic body care products made with Himalayan herbs and botanicals',
      icon: 'ri-drop-line',
      image: 'https://readdy.ai/api/search-image?query=collection%20of%20natural%20organic%20body%20care%20products%20with%20himalayan%20herbs%20botanical%20ingredients%20arranged%20elegantly%20on%20white%20surface%20spa%20skincare%20wellness%20items%20clean%20minimalist%20photography&width=600&height=400&seq=category-bodycare-001&orientation=landscape',
      products: [
        {
          id: 'bc1',
          name: 'Himalayan Body Butter',
          description: 'Rich moisturizing cream with shea butter and Himalayan herbs. Deep hydration for dry skin.',
          price: 1200,
          image: 'https://readdy.ai/api/search-image?query=luxury%20himalayan%20body%20butter%20cream%20jar%20with%20natural%20ingredients%20shea%20butter%20herbs%20on%20clean%20white%20surface%20minimalist%20product%20photography%20soft%20lighting&width=400&height=300&seq=bodycare-butter-001&orientation=squarish'
        },
        {
          id: 'bc2',
          name: 'Ayurvedic Face Serum',
          description: 'Anti-aging serum with natural botanicals and essential oils. Promotes youthful, radiant skin.',
          price: 1800,
          image: 'https://readdy.ai/api/search-image?query=elegant%20ayurvedic%20face%20serum%20bottle%20with%20dropper%20fresh%20herbs%20botanical%20ingredients%20on%20white%20background%20professional%20skincare%20product%20photography%20minimalist&width=400&height=300&seq=bodycare-serum-001&orientation=squarish'
        },
        {
          id: 'bc3',
          name: 'Herbal Hair Oil',
          description: 'Nourishing oil blend for strong, healthy hair growth. Traditional Ayurvedic formula.',
          price: 950,
          image: 'https://readdy.ai/api/search-image?query=traditional%20herbal%20hair%20oil%20bottle%20with%20natural%20herbs%20flowers%20on%20white%20surface%20ayurvedic%20hair%20care%20product%20photography%20clean%20simple%20background&width=400&height=300&seq=bodycare-hairoil-001&orientation=squarish'
        },
        {
          id: 'bc4',
          name: 'Natural Body Scrub',
          description: 'Exfoliating scrub with Himalayan salt and organic oils. Removes dead skin cells gently.',
          price: 850,
          image: 'https://readdy.ai/api/search-image?query=natural%20body%20scrub%20jar%20with%20himalayan%20salt%20organic%20ingredients%20on%20clean%20white%20background%20spa%20product%20photography%20minimalist%20style&width=400&height=300&seq=bodycare-scrub-001&orientation=squarish'
        },
        {
          id: 'bc5',
          name: 'Herbal Face Mask',
          description: 'Detoxifying clay mask with turmeric and neem. Purifies and brightens complexion.',
          price: 1100,
          image: 'https://readdy.ai/api/search-image?query=herbal%20face%20mask%20jar%20with%20turmeric%20neem%20clay%20ingredients%20on%20white%20surface%20natural%20skincare%20product%20clean%20photography&width=400&height=300&seq=bodycare-mask-001&orientation=squarish'
        },
        {
          id: 'bc6',
          name: 'Organic Lip Balm Set',
          description: 'Set of 3 nourishing lip balms with beeswax and essential oils. Natural protection and hydration.',
          price: 650,
          image: 'https://readdy.ai/api/search-image?query=three%20organic%20lip%20balm%20tubes%20with%20beeswax%20essential%20oils%20on%20white%20background%20natural%20skincare%20set%20minimalist%20product%20photo&width=400&height=300&seq=bodycare-lipbalm-001&orientation=squarish'
        }
      ]
    },
    {
      id: 'tea',
      name: 'Wellness Teas',
      description: 'Premium herbal and Ayurvedic tea blends for health and relaxation',
      icon: 'ri-cup-line',
      image: 'https://readdy.ai/api/search-image?query=collection%20of%20premium%20wellness%20herbal%20tea%20packages%20with%20loose%20tea%20leaves%20herbs%20arranged%20beautifully%20on%20white%20surface%20ayurvedic%20tea%20blends%20natural%20ingredients%20clean%20photography&width=600&height=400&seq=category-tea-001&orientation=landscape',
      products: [
        {
          id: 't1',
          name: 'Himalayan Detox Tea',
          description: 'Cleansing blend of green tea, ginger, and Himalayan herbs. Supports natural detoxification. 100g loose leaf.',
          price: 850,
          image: 'https://readdy.ai/api/search-image?query=himalayan%20detox%20tea%20package%20with%20loose%20green%20tea%20leaves%20ginger%20herbs%20on%20white%20surface%20wellness%20tea%20product%20photography%20clean%20background&width=400&height=300&seq=tea-detox-001&orientation=squarish'
        },
        {
          id: 't2',
          name: 'Stress Relief Tea',
          description: 'Calming blend of chamomile, lavender, and holy basil. Promotes relaxation and better sleep. 100g loose leaf.',
          price: 750,
          image: 'https://readdy.ai/api/search-image?query=stress%20relief%20tea%20package%20with%20chamomile%20lavender%20holy%20basil%20on%20white%20background%20calming%20wellness%20tea%20product%20photo&width=400&height=300&seq=tea-stress-001&orientation=squarish'
        },
        {
          id: 't3',
          name: 'Immunity Boost Tea',
          description: 'Powerful blend of turmeric, ginger, tulsi, and black pepper. Strengthens immune system. 100g loose leaf.',
          price: 900,
          image: 'https://readdy.ai/api/search-image?query=immunity%20boost%20tea%20with%20turmeric%20ginger%20tulsi%20black%20pepper%20on%20white%20surface%20ayurvedic%20wellness%20tea%20product%20photography&width=400&height=300&seq=tea-immunity-001&orientation=squarish'
        },
        {
          id: 't4',
          name: 'Digestive Wellness Tea',
          description: 'Soothing blend of fennel, peppermint, and cardamom. Aids digestion and reduces bloating. 100g loose leaf.',
          price: 700,
          image: 'https://readdy.ai/api/search-image?query=digestive%20wellness%20tea%20with%20fennel%20peppermint%20cardamom%20on%20white%20background%20herbal%20tea%20product%20clean%20photography&width=400&height=300&seq=tea-digestive-001&orientation=squarish'
        },
        {
          id: 't5',
          name: 'Energy & Focus Tea',
          description: 'Invigorating blend of green tea, ginseng, and brahmi. Enhances mental clarity and energy. 100g loose leaf.',
          price: 950,
          image: 'https://readdy.ai/api/search-image?query=energy%20focus%20tea%20with%20green%20tea%20ginseng%20brahmi%20on%20white%20surface%20wellness%20tea%20product%20photography%20minimalist&width=400&height=300&seq=tea-energy-001&orientation=squarish'
        }
      ]
    },
    {
      id: 'essential-oils',
      name: 'Essential Oils',
      description: 'Pure therapeutic-grade essential oils for aromatherapy and wellness',
      icon: 'ri-flask-line',
      image: 'https://readdy.ai/api/search-image?query=collection%20of%20essential%20oil%20bottles%20with%20natural%20plant%20ingredients%20flowers%20herbs%20arranged%20on%20white%20surface%20aromatherapy%20wellness%20oils%20clean%20professional%20photography&width=600&height=400&seq=category-oils-001&orientation=landscape',
      products: [
        {
          id: 'eo1',
          name: 'Lavender Essential Oil',
          description: 'Pure lavender oil for relaxation and sleep. Calms mind and reduces anxiety. 15ml therapeutic grade.',
          price: 1200,
          image: 'https://readdy.ai/api/search-image?query=lavender%20essential%20oil%20bottle%20with%20fresh%20lavender%20flowers%20on%20white%20background%20aromatherapy%20product%20photography%20clean%20minimalist&width=400&height=300&seq=oil-lavender-001&orientation=squarish'
        },
        {
          id: 'eo2',
          name: 'Eucalyptus Essential Oil',
          description: 'Refreshing eucalyptus oil for respiratory health. Clears airways and boosts immunity. 15ml pure oil.',
          price: 1100,
          image: 'https://readdy.ai/api/search-image?query=eucalyptus%20essential%20oil%20bottle%20with%20fresh%20eucalyptus%20leaves%20on%20white%20surface%20aromatherapy%20wellness%20product%20photo&width=400&height=300&seq=oil-eucalyptus-001&orientation=squarish'
        },
        {
          id: 'eo3',
          name: 'Peppermint Essential Oil',
          description: 'Cooling peppermint oil for energy and focus. Relieves headaches and improves concentration. 15ml.',
          price: 1000,
          image: 'https://readdy.ai/api/search-image?query=peppermint%20essential%20oil%20bottle%20with%20fresh%20mint%20leaves%20on%20white%20background%20aromatherapy%20product%20clean%20photography&width=400&height=300&seq=oil-peppermint-001&orientation=squarish'
        },
        {
          id: 'eo4',
          name: 'Tea Tree Essential Oil',
          description: 'Antibacterial tea tree oil for skin care. Natural remedy for acne and blemishes. 15ml pure oil.',
          price: 1150,
          image: 'https://readdy.ai/api/search-image?query=tea%20tree%20essential%20oil%20bottle%20with%20tea%20tree%20leaves%20on%20white%20surface%20skincare%20aromatherapy%20product%20photography&width=400&height=300&seq=oil-teatree-001&orientation=squarish'
        },
        {
          id: 'eo5',
          name: 'Frankincense Essential Oil',
          description: 'Sacred frankincense oil for meditation and spiritual practice. Anti-aging properties. 15ml premium oil.',
          price: 1800,
          image: 'https://readdy.ai/api/search-image?query=frankincense%20essential%20oil%20bottle%20with%20frankincense%20resin%20on%20white%20background%20premium%20aromatherapy%20product%20photo&width=400&height=300&seq=oil-frankincense-001&orientation=squarish'
        },
        {
          id: 'eo6',
          name: 'Essential Oil Starter Set',
          description: 'Set of 6 popular essential oils: lavender, eucalyptus, peppermint, tea tree, lemon, and orange. 10ml each.',
          price: 4500,
          image: 'https://readdy.ai/api/search-image?query=essential%20oil%20starter%20set%20six%20bottles%20with%20natural%20ingredients%20on%20white%20surface%20aromatherapy%20collection%20product%20photography&width=400&height=300&seq=oil-set-001&orientation=squarish'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Nepal Wellness Center | Ayurvedic Healing & Spa | Aayurpasal"
        description="Aayurpasal offers authentic Ayurvedic healing in Nepal with massage therapy, yoga sessions, sound healing, Reiki, wellness retreats, spiritual tours, and organic body care products. Experience traditional Nepali wellness practices in the heart of the Himalayas."
        keywords="Ayurvedic healing Nepal, wellness center Nepal, massage therapy, yoga sessions, sound healing, Reiki Nepal, wellness retreats, spiritual tours Nepal, organic body care"
        schema={schema}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <div className="flex items-center space-x-3">
              <img 
                src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                alt="Aayurpasal Logo" 
                className="h-20 w-auto"
                style={{ mixBlendMode: 'multiply' }}
              />
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className={`${isScrolled ? 'text-[#2D5F3F]' : 'text-white'} hover:text-[#4A7C59] transition-colors font-medium cursor-pointer`}>Home</Link>
              <Link to="/booking" className={`${isScrolled ? 'text-[#2D5F3F]' : 'text-white'} hover:text-[#4A7C59] transition-colors font-medium cursor-pointer`}>Services</Link>
              <button 
                onClick={() => setShowCart(true)}
                className={`relative ${isScrolled ? 'text-[#2D5F3F]' : 'text-white'} hover:text-[#4A7C59] transition-colors cursor-pointer`}
              >
                <i className="ri-shopping-cart-line text-2xl"></i>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#4A7C59] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img 
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/30"></div>
          </div>
        ))}
        
        <div className="relative z-10 text-center px-4 w-full">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 font-['Playfair_Display']">
            {slides[currentSlide].title}
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/booking"
              className="bg-[#4A7C59] text-white px-8 py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer inline-block">
              Book Your Session
            </Link>
            <button 
              onClick={openWhatsApp}
              className="bg-white text-[#2D5F3F] px-8 py-4 rounded-full hover:bg-gray-100 transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2 mx-auto sm:mx-0">
              <i className="ri-whatsapp-line text-xl"></i>
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all cursor-pointer ${
                index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Service Finder Section */}
      <section className="py-20 bg-gradient-to-br from-[#F5F1E8] to-[#E8F5F1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="ri-search-heart-line text-white text-3xl"></i>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">
              What Service Is Best For Me?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Answer a few questions and we'll recommend the perfect healing services tailored to your needs, lifestyle, and wellness goals
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-4xl mx-auto">
            <form onSubmit={handleServiceFinderSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Health Concern */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <i className="ri-heart-pulse-line text-[#4A7C59] mr-2 text-xl"></i>
                    What's Your Primary Health Concern? *
                  </label>
                  <select
                    required
                    value={serviceFinder.healthConcern}
                    onChange={(e) => setServiceFinder({...serviceFinder, healthConcern: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select your concern</option>
                    <option value="stress">Stress & Anxiety Relief</option>
                    <option value="pain">Physical Pain & Tension</option>
                    <option value="flexibility">Flexibility & Mobility</option>
                    <option value="energy">Low Energy & Fatigue</option>
                    <option value="mental">Mental Clarity & Focus</option>
                    <option value="sleep">Sleep Issues</option>
                    <option value="general">General Wellness</option>
                  </select>
                </div>

                {/* Age Group */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <i className="ri-user-line text-[#4A7C59] mr-2 text-xl"></i>
                    Your Age Group *
                  </label>
                  <select
                    required
                    value={serviceFinder.ageGroup}
                    onChange={(e) => setServiceFinder({...serviceFinder, ageGroup: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select age group</option>
                    <option value="18-30">18-30 years</option>
                    <option value="31-45">31-45 years</option>
                    <option value="46-60">46-60 years</option>
                    <option value="60+">60+ years</option>
                  </select>
                </div>

                {/* Time Availability */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <i className="ri-time-line text-[#4A7C59] mr-2 text-xl"></i>
                    Time Availability *
                  </label>
                  <select
                    required
                    value={serviceFinder.timeAvailability}
                    onChange={(e) => setServiceFinder({...serviceFinder, timeAvailability: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select time availability</option>
                    <option value="short">30-45 minutes</option>
                    <option value="medium">60-90 minutes</option>
                    <option value="long">2+ hours</option>
                    <option value="flexible">Flexible schedule</option>
                  </select>
                </div>

                {/* Experience Level */}
                <div>
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <i className="ri-star-line text-[#4A7C59] mr-2 text-xl"></i>
                    Experience with Wellness Practices *
                  </label>
                  <select
                    required
                    value={serviceFinder.experienceLevel}
                    onChange={(e) => setServiceFinder({...serviceFinder, experienceLevel: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select experience level</option>
                    <option value="beginner">Complete Beginner</option>
                    <option value="some">Some Experience</option>
                    <option value="experienced">Experienced Practitioner</option>
                  </select>
                </div>

                {/* Budget */}
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-medium mb-3 flex items-center">
                    <i className="ri-wallet-line text-[#4A7C59] mr-2 text-xl"></i>
                    Budget Range *
                  </label>
                  <select
                    required
                    value={serviceFinder.budget}
                    onChange={(e) => setServiceFinder({...serviceFinder, budget: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select budget range</option>
                    <option value="low">NPR 1,000 - 1,500</option>
                    <option value="medium">NPR 1,500 - 2,500</option>
                    <option value="high">NPR 2,500 - 3,500</option>
                    <option value="premium">NPR 3,500+</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                >
                  <i className="ri-search-line text-xl"></i>
                  <span>Find My Perfect Service</span>
                </button>
                {showRecommendations && (
                  <button
                    type="button"
                    onClick={resetServiceFinder}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-full hover:bg-gray-300 transition-all text-lg font-medium whitespace-nowrap cursor-pointer"
                  >
                    Reset & Try Again
                  </button>
                )}
              </div>
            </form>

            {showRecommendations && (
              <div className="mt-8 p-6 bg-gradient-to-r from-[#4A7C59]/10 to-[#2D5F3F]/10 rounded-2xl border-2 border-[#4A7C59]">
                <div className="flex items-center justify-center mb-4">
                  <i className="ri-checkbox-circle-line text-[#4A7C59] text-3xl mr-3"></i>
                  <h3 className="text-2xl font-bold text-[#2D5F3F]">Your Personalized Recommendations</h3>
                </div>
                <p className="text-center text-gray-600 mb-4">
                  Based on your preferences, we recommend the following services. Scroll down to explore them in detail!
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {recommendedServices.map((serviceId) => {
                    const serviceNames: Record<string, string> = {
                      massage: 'Massage Therapy',
                      yoga: 'Yoga Sessions',
                      sound: 'Sound Healing',
                      reiki: 'Reiki Healing'
                    };
                    return (
                      <span key={serviceId} className="bg-white px-6 py-3 rounded-full text-[#2D5F3F] font-medium shadow-md flex items-center space-x-2">
                        <i className="ri-check-line text-[#4A7C59]"></i>
                        <span>{serviceNames[serviceId]}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services-section" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">Our Healing Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Traditional Ayurvedic treatments combined with modern wellness practices</p>
            {showRecommendations && (
              <p className="text-[#4A7C59] font-medium mt-4 flex items-center justify-center">
                <i className="ri-star-fill mr-2"></i>
                Highlighted services are recommended for you
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Massage Therapy */}
            <div className={`bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group ${showRecommendations && recommendedServices.includes('massage') ? 'ring-4 ring-[#4A7C59]' : ''}`}>
              {showRecommendations && recommendedServices.includes('massage') && (
                <div className="bg-[#4A7C59] text-white text-center py-2 font-medium flex items-center justify-center">
                  <i className="ri-star-fill mr-2"></i>
                  Recommended For You
                </div>
              )}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=professional%20ayurvedic%20massage%20therapy%20session%20in%20serene%20spa%20room%20with%20herbal%20oils%20natural%20lighting%20and%20peaceful%20ambiance%20showing%20relaxation%20and%20traditional%20healing%20techniques%20with%20simple%20neutral%20background&width=400&height=300&seq=service-massage-001&orientation=landscape"
                  alt="Massage Therapy"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3">Massage Therapy</h3>
                <p className="text-gray-600 mb-4">Traditional Ayurvedic massage using herbal oils to rejuvenate body and mind</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#4A7C59] font-bold text-xl">From NPR 2,500</span>
                </div>
                <button 
                  onClick={() => navigate('/service-booking?service=massage')}
                  className="block w-full bg-[#4A7C59] text-white text-center py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Yoga Sessions */}
            <div className={`bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group ${showRecommendations && recommendedServices.includes('yoga') ? 'ring-4 ring-[#4A7C59]' : ''}`}>
              {showRecommendations && recommendedServices.includes('yoga') && (
                <div className="bg-[#4A7C59] text-white text-center py-2 font-medium flex items-center justify-center">
                  <i className="ri-star-fill mr-2"></i>
                  Recommended For You
                </div>
              )}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=peaceful%20yoga%20meditation%20session%20in%20minimalist%20studio%20with%20natural%20light%20wooden%20floor%20and%20serene%20atmosphere%20person%20in%20lotus%20pose%20practicing%20mindfulness%20with%20simple%20clean%20background&width=400&height=300&seq=service-yoga-001&orientation=landscape"
                  alt="Yoga Sessions"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3">Yoga Sessions</h3>
                <p className="text-gray-600 mb-4">Personalized yoga practice for all levels, focusing on balance and flexibility</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#4A7C59] font-bold text-xl">From NPR 1,500</span>
                </div>
                <button 
                  onClick={() => navigate('/service-booking?service=yoga')}
                  className="block w-full bg-[#4A7C59] text-white text-center py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Sound Healing */}
            <div className={`bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group ${showRecommendations && recommendedServices.includes('sound') ? 'ring-4 ring-[#4A7C59]' : ''}`}>
              {showRecommendations && recommendedServices.includes('sound') && (
                <div className="bg-[#4A7C59] text-white text-center py-2 font-medium flex items-center justify-center">
                  <i className="ri-star-fill mr-2"></i>
                  Recommended For You
                </div>
              )}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=tibetan%20singing%20bowls%20sound%20healing%20therapy%20session%20with%20golden%20brass%20bowls%20arranged%20peacefully%20in%20meditation%20space%20with%20soft%20lighting%20and%20tranquil%20atmosphere%20simple%20neutral%20background&width=400&height=300&seq=service-sound-001&orientation=landscape"
                  alt="Sound Healing"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3">Sound Healing</h3>
                <p className="text-gray-600 mb-4">Tibetan singing bowl therapy for deep relaxation and energy alignment</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#4A7C59] font-bold text-xl">From NPR 3,000</span>
                </div>
                <button 
                  onClick={() => navigate('/service-booking?service=sound')}
                  className="block w-full bg-[#4A7C59] text-white text-center py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>

            {/* Reiki */}
            <div className={`bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group ${showRecommendations && recommendedServices.includes('reiki') ? 'ring-4 ring-[#4A7C59]' : ''}`}>
              {showRecommendations && recommendedServices.includes('reiki') && (
                <div className="bg-[#4A7C59] text-white text-center py-2 font-medium flex items-center justify-center">
                  <i className="ri-star-fill mr-2"></i>
                  Recommended For You
                </div>
              )}
              <div className="h-64 w-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=reiki%20energy%20healing%20session%20with%20practitioner%20hands%20hovering%20over%20client%20in%20peaceful%20spa%20environment%20soft%20glowing%20light%20representing%20energy%20flow%20and%20spiritual%20healing%20simple%20clean%20background&width=400&height=300&seq=service-reiki-001&orientation=landscape"
                  alt="Reiki Healing"
                  className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3">Reiki Healing</h3>
                <p className="text-gray-600 mb-4">Energy healing to restore balance and promote natural healing processes</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[#4A7C59] font-bold text-xl">From NPR 2,000</span>
                </div>
                <button 
                  onClick={() => navigate('/service-booking?service=reiki')}
                  className="block w-full bg-[#4A7C59] text-white text-center py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Wellness Packages Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">
              Wellness Packages
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive wellness experiences designed for deep healing and transformation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" data-product-shop>
            {packages.map((pkg) => (
              <div key={pkg.id} className="bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="h-64 w-full overflow-hidden">
                  <img 
                    src={pkg.image}
                    alt={pkg.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3 font-['Playfair_Display']">{pkg.name}</h3>
                  <p className="text-gray-600 mb-6">{pkg.description}</p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-sm text-gray-500">
                      <i className="ri-calendar-line mr-1"></i>
                      {pkg.duration}
                    </span>
                    <span className="text-2xl font-bold text-[#4A7C59]">{pkg.price}</span>
                  </div>
                  <button 
                    onClick={() => handleAddToCart(pkg, 'package')}
                    className="w-full bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <i className="ri-send-plane-line text-xl"></i>
                    <span>Know More</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Craft Your Own Package Section */}
          <div className="bg-gradient-to-br from-[#F5F1E8] to-[#E8F5F1] rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-[#4A7C59] rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-magic-line text-white text-3xl"></i>
              </div>
              <h3 className="text-3xl md:text-4xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">
                Craft Your Own Wellness Package
              </h3>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Create a personalized wellness journey tailored to your unique needs. From a few hours to several months, design your perfect healing experience and we'll provide custom pricing.
              </p>
            </div>

            <form id="custom-package-form" data-readdy-form onSubmit={handleCustomPackageSubmit} className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={customPackageForm.name}
                    onChange={(e) => setCustomPackageForm({...customPackageForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customPackageForm.email}
                    onChange={(e) => setCustomPackageForm({...customPackageForm, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Contact Number *</label>
                  <input
                    type="tel"
                    name="contact"
                    required
                    value={customPackageForm.contact}
                    onChange={(e) => setCustomPackageForm({...customPackageForm, contact: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="+977 98XXXXXXXX"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Package Duration *</label>
                  <select
                    name="duration"
                    required
                    value={customPackageForm.duration}
                    onChange={(e) => setCustomPackageForm({...customPackageForm, duration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                  >
                    <option value="">Select duration</option>
                    <option value="3-hours">3 Hours</option>
                    <option value="half-day">Half Day (4-5 hours)</option>
                    <option value="full-day">Full Day (8 hours)</option>
                    <option value="2-days">2 Days</option>
                    <option value="3-days">3 Days</option>
                    <option value="1-week">1 Week</option>
                    <option value="2-weeks">2 Weeks</option>
                    <option value="1-month">1 Month</option>
                    <option value="2-months">2 Months</option>
                    <option value="3-months">3 Months</option>
                    <option value="custom">Custom Duration</option>
                  </select>
                </div>
              </div>

              {customPackageForm.duration === 'custom' && (
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">Specify Custom Duration *</label>
                  <input
                    type="text"
                    name="customDuration"
                    required
                    value={customPackageForm.customDuration}
                    onChange={(e) => setCustomPackageForm({...customPackageForm, customDuration: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                    placeholder="e.g., 10 days, 6 weeks, etc."
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">Select Services to Include *</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    { id: 'massage', name: 'Massage Therapy', icon: 'ri-hand-heart-line' },
                    { id: 'yoga', name: 'Yoga Sessions', icon: 'ri-user-heart-line' },
                    { id: 'meditation', name: 'Meditation', icon: 'ri-mental-health-line' },
                    { id: 'sound-healing', name: 'Sound Healing', icon: 'ri-music-2-line' },
                    { id: 'reiki', name: 'Reiki Healing', icon: 'ri-heart-pulse-line' },
                    { id: 'ayurvedic-consultation', name: 'Ayurvedic Consultation', icon: 'ri-stethoscope-line' },
                    { id: 'herbal-treatment', name: 'Herbal Treatments', icon: 'ri-plant-line' },
                    { id: 'detox', name: 'Detox Programs', icon: 'ri-refresh-line' },
                    { id: 'nutrition', name: 'Nutrition Counseling', icon: 'ri-restaurant-line' },
                    { id: 'spa', name: 'Spa Treatments', icon: 'ri-drop-line' }
                  ].map((service) => (
                    <label key={service.id} className="flex items-center space-x-3 p-3 bg-white rounded-lg border border-gray-200 hover:border-[#4A7C59] cursor-pointer transition-all">
                      <input
                        type="checkbox"
                        name="services"
                        value={service.name}
                        checked={customPackageForm.services.includes(service.name)}
                        onChange={(e) => {
                          const newServices = e.target.checked
                            ? [...customPackageForm.services, service.name]
                            : customPackageForm.services.filter(s => s !== service.name);
                          setCustomPackageForm({...customPackageForm, services: newServices});
                        }}
                        className="w-5 h-5 text-[#4A7C59] cursor-pointer"
                      />
                      <i className={`${service.icon} text-[#4A7C59] text-xl`}></i>
                      <span className="text-gray-700">{service.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Additional Requirements or Goals</label>
                <textarea
                  name="requirements"
                  value={customPackageForm.requirements}
                  onChange={(e) => setCustomPackageForm({...customPackageForm, requirements: e.target.value})}
                  maxLength={500}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm resize-none"
                  placeholder="Tell us about your wellness goals, any specific health concerns, dietary preferences, or special requirements... (Max 500 characters)"
                ></textarea>
                <p className="text-sm text-gray-500 mt-1">{customPackageForm.requirements.length}/500 characters</p>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">Preferred Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  value={customPackageForm.startDate}
                  onChange={(e) => setCustomPackageForm({...customPackageForm, startDate: e.target.value})}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                />
              </div>

              <div className="bg-white rounded-xl p-6 mb-6">
                <div className="flex items-start space-x-3">
                  <i className="ri-information-line text-[#4A7C59] text-2xl mt-1"></i>
                  <div>
                    <h4 className="font-bold text-[#2D5F3F] mb-2">What Happens Next?</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Our wellness experts will review your custom package request</li>
                      <li>• We'll create a personalized itinerary based on your needs</li>
                      <li>• You'll receive a detailed proposal with pricing within 24-48 hours</li>
                      <li>• We'll schedule a consultation to discuss and refine your package</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                >
                  <i className="ri-send-plane-line text-xl"></i>
                  <span>Submit for Custom Pricing</span>
                </button>
                <button
                  type="button"
                  onClick={openWhatsApp}
                  className="flex-1 bg-[#25D366] text-white py-4 rounded-full hover:bg-[#20BA5A] transition-all text-lg font-medium whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2"
                >
                  <i className="ri-whatsapp-line text-xl"></i>
                  <span>Discuss on WhatsApp</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Wellness Products Section */}
      <section className="py-20 bg-white" data-product-shop>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">Wellness Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Authentic wellness products to support your healing journey at home</p>
          </div>

          {/* Product Categories */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {productCategories.map((category) => (
              <div key={category.id} className="bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group cursor-pointer">
                <div className="h-64 w-full overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 bg-[#4A7C59] rounded-full flex items-center justify-center mb-4">
                    <i className={`${category.icon} text-white text-2xl`}></i>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2D5F3F] mb-3">{category.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                  <button 
                    onClick={() => setSelectedCategory(category.id)}
                    className="w-full bg-[#4A7C59] text-white py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer flex items-center justify-center space-x-2">
                    <span>Explore More</span>
                    <i className="ri-arrow-right-line"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Products Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-3xl p-8 max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-8">
              <div>
                <h3 className="text-3xl font-bold text-[#2D5F3F] mb-2">
                  {productCategories.find(c => c.id === selectedCategory)?.name}
                </h3>
                <p className="text-gray-600">
                  {productCategories.find(c => c.id === selectedCategory)?.description}
                </p>
              </div>
              <button 
                onClick={() => setSelectedCategory(null)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="ri-close-line text-3xl"></i>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productCategories.find(c => c.id === selectedCategory)?.products.map((product) => (
                <div key={product.id} className="bg-[#F5F1E8] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                  <div className="h-48 w-full overflow-hidden">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-[#2D5F3F] mb-2">{product.name}</h4>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">{product.description}</p>
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-[#4A7C59] font-bold text-xl">NPR {product.price.toLocaleString()}</span>
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedProduct(product);
                        setShowProductModal(true);
                        setSelectedCategory(null);
                      }}
                      className="w-full bg-[#4A7C59] text-white px-6 py-3 rounded-full hover:bg-[#2D5F3F] transition-all whitespace-nowrap cursor-pointer">
                      Order Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Gift Voucher Section */}
      <section className="py-20 bg-[#F5F1E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-white to-[#E8F5F1] rounded-3xl overflow-hidden shadow-2xl">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-96 w-full overflow-hidden">
                <img 
                  src="https://readdy.ai/api/search-image?query=elegant%20gift%20voucher%20presentation%20with%20beautiful%20wrapped%20present%20ribbon%20and%20wellness%20spa%20elements%20in%20soft%20natural%20colors%20showing%20thoughtful%20gifting%20concept%20with%20simple%20sophisticated%20styling&width=800&height=600&seq=gift-voucher-hero-001&orientation=landscape"
                  alt="Gift Voucher"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="p-12 flex flex-col justify-center">
                <i className="ri-gift-line text-6xl text-[#4A7C59] mb-6"></i>
                <h2 className="text-4xl font-bold text-[#2D5F3F] mb-4 font-['Playfair_Display']">Gift Wellness Vouchers</h2>
                <p className="text-lg text-gray-700 mb-6">
                  Share the gift of healing and relaxation with your loved ones. Our personalized gift vouchers are automatically designed for any occasion - birthdays, anniversaries, Christmas, or just to say thank you.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <i className="ri-check-line text-[#4A7C59] mt-1 mr-3"></i>
                    <span className="text-gray-700">Auto-designed for special occasions</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-[#4A7C59] mt-1 mr-3"></i>
                    <span className="text-gray-700">Personalized messages included</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-[#4A7C59] mt-1 mr-3"></i>
                    <span className="text-gray-700">Valid for 12 months</span>
                  </li>
                  <li className="flex items-start">
                    <i className="ri-check-line text-[#4A7C59] mt-1 mr-3"></i>
                    <span className="text-gray-700">Sent directly to recipient's email</span>
                  </li>
                </ul>
                <button 
                  onClick={() => navigate('/gift-voucher')}
                  className="bg-[#4A7C59] text-white px-8 py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer inline-block w-fit">
                  Create Gift Voucher
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shopping Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-[#2D5F3F]">Your Cart</h3>
              <button 
                onClick={() => setShowCart(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="ri-close-line text-3xl"></i>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <i className="ri-shopping-cart-line text-6xl text-gray-300 mb-4"></i>
                <p className="text-gray-500 text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.cartId} className="bg-[#F5F1E8] rounded-xl p-4 flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-[#2D5F3F]">{item.name}</h4>
                        <p className="text-sm text-gray-600 capitalize">{item.type}</p>
                        <p className="text-[#4A7C59] font-bold mt-1">NPR {item.price.toLocaleString()}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-red-500 hover:text-red-700 cursor-pointer ml-4">
                        <i className="ri-delete-bin-line text-xl"></i>
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-[#2D5F3F]">Total:</span>
                    <span className="text-[#4A7C59]">NPR {getTotalPrice().toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={() => {
                    setShowCart(false);
                    navigate('/checkout');
                  }}
                  className="w-full bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer">
                  Proceed to Checkout
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product Order Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-3xl font-bold text-[#2D5F3F]">Complete Your Order</h3>
              <button 
                onClick={() => setShowProductModal(false)}
                className="text-gray-500 hover:text-gray-700 cursor-pointer">
                <i className="ri-close-line text-3xl"></i>
              </button>
            </div>

            <div className="bg-[#F5F1E8] rounded-2xl p-6 mb-6">
              <div className="flex items-center space-x-4">
                <img 
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-xl font-bold text-[#2D5F3F]">{selectedProduct.name}</h4>
                  <p className="text-gray-600 text-sm">{selectedProduct.description}</p>
                  <p className="text-2xl font-bold text-[#4A7C59] mt-2">NPR {selectedProduct.price.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <form 
              id="product-order-form" 
              data-readdy-form
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const formData = new FormData(form);
                
                try {
                  await fetch('https://readdy.ai/api/form/d4vdu57sdr6u9jrifmsh', {
                    method: 'POST',
                    body: new URLSearchParams(formData as any)
                  });
                  
                  setShowProductModal(false);
                  alert('Order submitted successfully! We will contact you shortly.');
                } catch (error) {
                  alert('Submission failed. Please try again.');
                }
              }}
              className="space-y-5">
              
              <input type="hidden" name="productName" value={selectedProduct.name} />
              <input type="hidden" name="productPrice" value={selectedProduct.price} />

              <div>
                <label className="block text-gray-700 font-medium mb-2">Full Name *</label>
                <input
                  type="text"
                  name="customerName"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Contact Number *</label>
                <input
                  type="tel"
                  name="contactNumber"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                  placeholder="+977-XXXXXXXXXX"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Quantity *</label>
                <input
                  type="number"
                  name="quantity"
                  required
                  min="1"
                  defaultValue="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Delivery Address *</label>
                <textarea
                  name="deliveryAddress"
                  required
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm resize-none"
                  placeholder="Enter your complete delivery address"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method *</label>
                <select
                  name="paymentMethod"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                >
                  <option value="">Select payment method</option>
                  <option value="qr-code">QR Code Payment</option>
                  <option value="bank-transfer">Bank Transfer</option>
                  <option value="cash-on-delivery">Cash on Delivery</option>
                </select>
              </div>

              <div className="bg-[#F5F1E8] rounded-2xl p-6">
                <h4 className="font-bold text-[#2D5F3F] mb-4 text-center">Payment Information</h4>
                
                <div className="bg-white rounded-lg p-4 mb-4">
                  <p className="text-center text-sm text-gray-600 mb-3">Scan QR Code for Payment</p>
                  <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <i className="ri-qr-code-line text-6xl text-gray-400 mb-2"></i>
                      <p className="text-xs text-gray-500">QR Code Here</p>
                    </div>
                  </div>
                </div>

                <div className="text-sm text-gray-700 space-y-2">
                  <p><strong>Bank Transfer Details:</strong></p>
                  <p>Bank: Nepal Bank Limited</p>
                  <p>Account: 0123456789</p>
                  <p>Account Name: Aayurpasal Wellness Center</p>
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Screenshot</label>
                <input
                  type="file"
                  name="paymentScreenshot"
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm cursor-pointer"
                />
                <p className="text-xs text-gray-500 mt-1">Upload screenshot of payment confirmation (if applicable)</p>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Additional Notes</label>
                <textarea
                  name="additionalNotes"
                  rows={3}
                  maxLength={500}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4A7C59] text-sm resize-none"
                  placeholder="Any special instructions or requests (optional)"
                />
              </div>

              <div className="flex flex-col gap-3 pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#4A7C59] text-white py-4 rounded-full hover:bg-[#2D5F3F] transition-all text-lg font-medium whitespace-nowrap cursor-pointer"
                >
                  Submit Order
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
        </div>
      )}

      {/* Footer */}
      <footer className="bg-[#2D5F3F] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <img 
                src="https://static.readdy.ai/image/968f7895edf403d811466ec8ebea225b/1d5f9c846585ef116f7b1618ab3781bd.jpeg" 
                alt="Aayurpasal Logo" 
                className="h-16 mb-4"
              />
              <p className="text-white/80">Authentic Ayurvedic healing and wellness experiences in the heart of Nepal</p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><button onClick={() => navigate('/')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Home</button></li>
                <li><button onClick={() => navigate('/booking')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Services</button></li>
                <li><button onClick={() => navigate('/gift-voucher')} className="text-white/80 hover:text-white transition-colors cursor-pointer">Gift Vouchers</button></li>
                <li><button onClick={openWhatsApp} className="text-white/80 hover:text-white transition-colors cursor-pointer">WhatsApp</button></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li className="text-white/80">Massage Therapy</li>
                <li className="text-white/80">Yoga Sessions</li>
                <li className="text-white/80">Sound Healing</li>
                <li className="text-white/80">Reiki Healing</li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <p className="text-white/80 mb-4">Nepal</p>
              <button 
                onClick={openWhatsApp}
                className="bg-[#25D366] text-white px-6 py-2.5 rounded-full hover:bg-[#20BA5A] transition-all whitespace-nowrap cursor-pointer flex items-center space-x-2">
                <i className="ri-whatsapp-line"></i>
                <span>WhatsApp Us</span>
              </button>
            </div>
          </div>
          <div className="border-t border-white/20 pt-8 text-center text-white/60">
            <p>&copy; 2025 Aayurpasal. All rights reserved. | <a href="https://readdy.ai/?origin=logo" className="hover:text-white transition-colors cursor-pointer">Powered by Readdy</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}
