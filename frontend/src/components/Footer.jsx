import { Link } from 'react-router-dom';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  Briefcase
} from 'lucide-react';
import { APP_NAME } from '../utils/constants';

const Footer = () => {
  const currentYear = new Date().getFullYear();

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
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-purple-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:text-sky-400' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-pink-400' }
  ];

  return (
    <footer className="relative bg-slate-950 border-t border-slate-800/60" role="contentinfo" aria-label="Site footer">
      {/* Gradient top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg blur-sm opacity-60" />
                <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 p-2 rounded-lg">
                  <Briefcase className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold gradient-text-animated">
                {APP_NAME}
              </span>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-sm leading-relaxed">
              Streamline your project management with powerful tools designed for modern teams.
              Collaborate, track, and deliver projects efficiently.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3" role="list" aria-label="Social media links">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`bg-slate-800/80 p-2.5 rounded-lg hover:bg-slate-700 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 flex items-center justify-center group`}
                  >
                    <Icon className={`h-5 w-5 text-slate-400 ${social.color} transition-colors duration-200`} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest border-b border-white/5 pb-2">
              Product
            </h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest border-b border-white/5 pb-2">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest border-b border-white/5 pb-2">
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-xs uppercase tracking-widest border-b border-white/5 pb-2">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-slate-400 hover:text-purple-400 text-sm transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800/60">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-slate-500 text-sm">
              &copy; {currentYear} <span className="text-slate-400 font-medium">Shrinivas Mudabe</span>. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm flex items-center gap-1.5">
              Built with <span className="text-pink-400">&hearts;</span> by
              <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">Shrinivas Mudabe</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
