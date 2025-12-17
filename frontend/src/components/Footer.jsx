import React from 'react'
import { LayoutDashboard, Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How to Use', path: '/how-to-use' },
    { name: 'Contact', path: '/contact' }
  ]

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: '#', label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: '#', label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: '#', label: 'Email' }
  ]

  return (
    <footer className="glass-dark border-t border-purple-500/20 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 shadow-lg" style={{
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.5)'
              }}>
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                ProTasker
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md mb-4 font-medium">
              Your ultimate task management solution. Stay organized, boost productivity, 
              and achieve your goals with ease.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="p-2.5 rounded-xl glass border border-purple-500/20 text-gray-400 hover:text-purple-300 hover:border-purple-400/40 transition-all"
                  style={{
                    boxShadow: '0 0 12px rgba(168, 85, 247, 0.1)'
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-black mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.path}
                    className="text-gray-400 hover:text-purple-300 transition-colors text-sm font-semibold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-black mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="/how-to-use" className="text-gray-400 hover:text-purple-300 transition-colors text-sm font-semibold">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors text-sm font-semibold">
                  Help Center
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-purple-300 transition-colors text-sm font-semibold">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-purple-500/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm text-center md:text-left font-medium">
            © {currentYear} ProTasker. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm flex items-center gap-1 font-medium">
            Made with <Heart className="w-4 h-4 text-pink-500 fill-pink-500" /> by the ProTasker Team
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
