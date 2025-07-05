import React, { useState } from 'react';

const Website: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="font-sans text-gray-800">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/meridian-logo.svg" alt="Meridian Bank" className="h-8 w-auto" />
              <span className="ml-2 text-xl font-bold text-primary-600">Meridian Bank</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <a href="#home" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Home</a>
                <a href="#about" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About</a>
                <a href="#services" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Services</a>
                <a href="#contact" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Contact</a>
                <a href="/app" className="bg-primary-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-700 transition-colors">Online Banking</a>
              </div>
            </div>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen((open) => !open)}
                className="text-gray-700 hover:text-primary-600"
                aria-label="Open mobile menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">Home</a>
              <a href="#about" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">About</a>
              <a href="#services" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">Services</a>
              <a href="#contact" className="text-gray-700 hover:text-primary-600 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
              <a href="/app" className="bg-primary-600 text-white block px-3 py-2 rounded-md text-base font-medium">Online Banking</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero-gradient text-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Welcome To<br />
                <span className="text-yellow-300">Meridian Bank</span>
              </h1>
              <p className="text-xl mb-8 text-gray-100">
                We believe modern banking should be easy and accessible to all our customers worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/app" className="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center">
                  Online Banking
                </a>
                <a href="#contact" className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center">
                  Contact Us
                </a>
              </div>
            </div>
            <div className="animate-float">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold">700K+</div>
                    <div className="text-sm">Happy Customers</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold">139</div>
                    <div className="text-sm">Branches</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold">1629</div>
                    <div className="text-sm">Dedicated Staff</div>
                  </div>
                  <div className="bg-white/20 rounded-lg p-4">
                    <div className="text-3xl font-bold">17</div>
                    <div className="text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

                      {/* Leaders Section */}
        <section className="leaders-section">
          <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Leaders In Banking and<br />
                <span className="text-primary-600">Banking Services</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                We believe numbers without meaning are useless. Our mission is to become your trusted business advisor. Our Certified Financial Advisors are passionate about your success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#about" className="bg-primary-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center">
                  About Us
                </a>
                <a href="#contact" className="border-2 border-primary-600 text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-primary-600 hover:text-white transition-colors text-center">
                  Contact
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-purple-600 rounded-2xl p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">Why Not Open An Account Today?</h3>
                <p className="mb-6 text-gray-100">Join thousands of satisfied customers who trust Meridian Bank with their financial future.</p>
                <a href="/app" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-block">
                  Open An Account Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

                      {/* Advantages Section */}
        <section className="advantages-section">
          <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Advantages</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover what makes Meridian Bank the preferred choice for millions of customers worldwide
            </p>
          </div>
          <div className="advantages-grid">
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">Strategy experience and analytical expertise combine to enable informed decision making for your financial future.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Corporate Finance</h3>
              <p className="text-gray-600">Linking corporate strategy, financial strategy, transactions and capital markets to maximize your business potential.</p>
            </div>
            <div className="text-center p-6 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Modern Technology</h3>
              <p className="text-gray-600">We make banking easier by incorporating modern technology in our day-to-day transactions and customer service.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 about-bg">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                With Over 17 Years Of Experience In The Banking Sector
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We're a leading international banking group committed to building a sustainable business over the long-term. We operate in some of the world's most dynamic markets and have been for over 17 years.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                More than 90 per cent of our income and profits are derived from Europe, Asia and the Middle East, making us a truly global financial institution.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">17+</div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary-600 mb-2">90%</div>
                  <div className="text-gray-600">Global Operations</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Core Values</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                    <span className="font-semibold">Team Work</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                    <span className="font-semibold">Equity</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                    <span className="font-semibold">Prudence</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary-500 rounded-full mr-3"></div>
                    <span className="font-semibold">Communication</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Services Section */}
        <section className="services-section services-bg">
        <div className="container">
          <div className="section-header">
            <h2>Our Services</h2>
            <p>Comprehensive banking solutions tailored to your needs</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-credit-card"></i>
              </div>
              <h3>Credit Cards</h3>
              <p>Flexible credit solutions with competitive rates and rewards programs designed for your lifestyle.</p>
              <a href="#" className="learn-more">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-home"></i>
              </div>
              <h3>Home Loans</h3>
              <p>Make your dream home a reality with our competitive mortgage rates and flexible payment options.</p>
              <a href="#" className="learn-more">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3>Investment</h3>
              <p>Grow your wealth with our expert investment advisory services and diverse portfolio options.</p>
              <a href="#" className="learn-more">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>Insurance</h3>
              <p>Protect what matters most with comprehensive insurance coverage for life, health, and property.</p>
              <a href="#" className="learn-more">Learn More <i className="fas fa-arrow-right"></i></a>
            </div>
          </div>
        </div>
      </section>

              {/* Reviews Section */}
        <section className="reviews-section reviews-bg">
        <div className="container">
          <div className="section-header">
            <h2>What Our Clients Say</h2>
            <p>Trusted by thousands of satisfied customers worldwide</p>
          </div>
          <div className="reviews-grid-two">
            <div className="review-card">
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"Meridian Bank has transformed my banking experience. Their digital platform is intuitive and their customer service is exceptional. I've never felt more confident about my financial future."</p>
              <div className="review-author">
                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Sarah Johnson" />
                <div>
                  <h4>Sarah Johnson</h4>
                  <span>Business Owner</span>
                </div>
              </div>
            </div>
            <div className="review-card">
              <div className="review-stars">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
              </div>
              <p>"The investment advisory team at Meridian Bank helped me build a robust portfolio that has consistently outperformed my expectations. Their expertise and personalized approach are unmatched."</p>
              <div className="review-author">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80" alt="Michael Webber" />
                <div>
                  <h4>Michael Webber</h4>
                  <span>Investment Manager</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

              {/* Contact Section */}
        <section className="contact-section contact-bg">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2>Get in Touch</h2>
              <p>Ready to start your financial journey? Contact us today and let's discuss how we can help you achieve your goals.</p>
              <div className="contact-details">
                <div className="contact-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <div>
                    <h4>Visit Us</h4>
                    <p>350 Park Avenue<br />New York, NY 10022</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-phone"></i>
                  <div>
                    <h4>Call Us</h4>
                    <p>+1 (212) 555-0123<br />Mon-Fri 8AM-7PM EST</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="fas fa-envelope"></i>
                  <div>
                    <h4>Email Us</h4>
                    <p>info@meridianbank.com<br />customerservice@meridianbank.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="contact-form">
              <form>
                <div className="form-group">
                  <input type="text" placeholder="Full Name" required />
                </div>
                <div className="form-group">
                  <input type="email" placeholder="Email Address" required />
                </div>
                <div className="form-group">
                  <input type="tel" placeholder="Phone Number" />
                </div>
                <div className="form-group">
                  <select>
                    <option value="">Select Service</option>
                    <option value="personal-banking">Personal Banking</option>
                    <option value="business-banking">Business Banking</option>
                    <option value="investment">Investment Services</option>
                    <option value="loans">Loans & Mortgages</option>
                    <option value="insurance">Insurance</option>
                  </select>
                </div>
                <div className="form-group">
                  <textarea placeholder="How can we help you?" rows={5}></textarea>
                </div>
                <button type="submit" className="btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <img src="/meridian-logo.svg" alt="Meridian Bank" />
                <h3>Meridian Bank</h3>
              </div>
              <p>Empowering your financial future with innovative banking solutions and personalized service.</p>
              <div className="social-links">
                <a href="#"><i className="fab fa-facebook"></i></a>
                <a href="#"><i className="fab fa-twitter"></i></a>
                <a href="#"><i className="fab fa-linkedin"></i></a>
                <a href="#"><i className="fab fa-instagram"></i></a>
              </div>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Services</h4>
              <ul>
                <li><a href="#">Personal Banking</a></li>
                <li><a href="#">Business Banking</a></li>
                <li><a href="#">Investment Services</a></li>
                <li><a href="#">Loans & Mortgages</a></li>
                <li><a href="#">Insurance</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Security</a></li>
                <li><a href="#">Privacy Policy</a></li>
                <li><a href="#">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Meridian Bank. All rights reserved. | FDIC Insured</p>
            <div className="footer-bottom-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Website; 