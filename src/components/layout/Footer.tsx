import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const footerLinks = [
    {
      title: 'Coursera',
      links: [
        { name: 'About', href: '/about' },
        { name: 'What We Offer', href: '/what-we-offer' },
        { name: 'Leadership', href: '/leadership' },
        { name: 'Careers', href: '/careers' },
        { name: 'Catalog', href: '/catalog' },
        { name: 'Coursera Plus', href: '/coursera-plus' },
        { name: 'Professional Certificates', href: '/certificates' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Learners', href: '/learners' },
        { name: 'Partners', href: '/partners' },
        { name: 'Beta Testers', href: '/beta-testers' },
        { name: 'Translators', href: '/translators' },
        { name: 'Blog', href: '/blog' },
        { name: 'Tech Blog', href: '/tech-blog' },
        { name: 'Teaching Center', href: '/teaching-center' },
      ],
    },
    {
      title: 'More',
      links: [
        { name: 'Press', href: '/press' },
        { name: 'Investors', href: '/investors' },
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' },
        { name: 'Help', href: '/help' },
        { name: 'Accessibility', href: '/accessibility' },
        { name: 'Contact', href: '/contact' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: 'https://facebook.com/coursera' },
    { icon: <Twitter size={20} />, href: 'https://twitter.com/coursera' },
    { icon: <Linkedin size={20} />, href: 'https://linkedin.com/company/coursera' },
    { icon: <Instagram size={20} />, href: 'https://instagram.com/coursera' },
    { icon: <Youtube size={20} />, href: 'https://youtube.com/c/coursera' },
  ];

  return (
    <footer className="bg-neutral-900 text-white pt-12 pb-6">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 mb-8 md:mb-0">
            <Link to="/" className="inline-block mb-6">
              <span className="font-serif font-bold text-2xl text-white">Coursera</span>
            </Link>
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index} 
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition-colors"
                  aria-label={`Social link ${index + 1}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
            <div className="flex items-center text-neutral-400 text-sm">
              <Globe size={16} className="mr-2" />
              <span>English</span>
            </div>
          </div>

          {footerLinks.map((column) => (
            <div key={column.title}>
              <h4 className="font-medium text-lg mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href}
                      className="text-neutral-400 hover:text-white text-sm transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="font-medium text-lg mb-4">Mobile App</h4>
            <div className="space-y-3">
              <a 
                href="https://apps.apple.com/us/app/coursera-learn-new-skills/id736535961"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d3njjcbhbojbot.cloudfront.net/web/images/icons/download_on_the_app_store_badge_en.svg" 
                  alt="Download on the App Store" 
                  className="h-10"
                />
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=org.coursera.android"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <img 
                  src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://d3njjcbhbojbot.cloudfront.net/web/images/icons/en_generic_rgb_wo_45.png" 
                  alt="Get it on Google Play" 
                  className="h-10"
                />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between">
          <div className="text-neutral-400 text-sm mb-4 md:mb-0">
            © 2025 Coursera Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link to="/privacy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link to="/cookie-policy" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Accessibility
            </Link>
            <Link to="/privacy/data-settings" className="text-neutral-400 hover:text-white text-sm transition-colors">
              Do Not Sell My Personal Information
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;