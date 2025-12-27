import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Briefcase,
  Heart
} from 'lucide-react';

const Footer = () => {
  const currentYear = 2025;

  const footerLinks = {
    product: [
      { name: 'Dashboard', path: '/' },
      { name: 'Projects', path: '/projects' },
      { name: 'Tasks', path: '/tasks' },
      { name: 'Analytics', path: '/analytics' },
      { name: 'Team', path: '/team' }
    ],
    company: [
      { name: 'About', path: '#' },
      { name: 'Careers', path: '#' },
      { name: 'Blog', path: '#' },
      { name: 'Press', path: '#' }
    ],
    support: [
      { name: 'Help Center', path: '#' },
      { name: 'Documentation', path: '#' },
      { name: 'API Reference', path: '#' },
      { name: 'Contact Us', path: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', path: '#' },
      { name: 'Terms of Service', path: '#' },
      { name: 'Cookie Policy', path: '#' },
      { name: 'Security', path: '#' }
    ]
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: Mail, href: 'mailto:contact@example.com', label: 'Email' }
  ];

  return (
    <footer className="bg-slate-900 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 p-2 rounded-lg">
                <Briefcase className="h-6 w-6 text-slate-900" />
              </div>
              <span className="text-xl font-bold text-white">
                EY Project Manager
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-sm">
              Streamline your project management with powerful tools designed for modern teams. 
              Collaborate, track, and deliver projects efficiently.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="bg-slate-800 p-2 rounded-lg hover:bg-slate-700 transition-colors duration-200"
                  >
                    <Icon className="h-5 w-5 text-slate-400 hover:text-yellow-400" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-yellow-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-yellow-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-yellow-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-yellow-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-400 text-sm">
              © {currentYear} EY Project Management Tool. All rights reserved.
            </p>
            <p className="text-slate-400 text-sm flex items-center">
              Made with <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" /> by the EY Team
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
