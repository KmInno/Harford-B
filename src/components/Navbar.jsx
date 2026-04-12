import React, { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#home');

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setIsOpen(false);

    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        const offset = document.querySelector('.navbar')?.offsetHeight || 0;
        const top = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#multiple-intelligencies', label: 'Multiple Intelligencies' },
    { href: '#gallery', label: 'Gallery' },
    { href: '#admissions', label: 'Admissions' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className="navbar fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">

        {/* Logo */}
        <a href="#" className="flex items-center gap-2">
          <img
            src="/images/logo.webp"
            alt="HBIS Logo"
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold text-primary">
            Harford<span className="text-secondary">Bridge</span>
          </span>
        </a>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className={`text-sm font-medium transition duration-300 ${
                  activeLink === link.href
                    ? 'text-primary border-b-2 border-primary pb-1'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <div
          className="md:hidden flex flex-col gap-1 cursor-pointer"
          onClick={toggleMenu}
        >
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
          <span className="w-6 h-0.5 bg-gray-800"></span>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-96 py-4' : 'max-h-0'
        }`}
      >
        <ul className="flex flex-col items-center gap-4">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleLinkClick(link.href)}
                className={`text-base font-medium ${
                  activeLink === link.href
                    ? 'text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}