
import React, { useState, useEffect } from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface FooterContent {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [content, setContent] = useState<FooterContent>({
    title: 'Ready to Transform Healthcare?',
    subtitle: 'Get Started Today',
    description: 'Contact us to learn how our hospital-at-home platform can revolutionize patient care in your organization.',
    button_text: 'Contact Us',
    button_url: '/contact'
  });

  useEffect(() => {
    // Load footer content from database
    const loadFooterContent = async () => {
      try {
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'footer')
          .eq('is_active', true)
          .single();

        if (data && !error) {
          console.log('Loaded footer content from database:', data);
          
          setContent({
            title: data.title || 'Ready to Transform Healthcare?',
            subtitle: data.subtitle || 'Get Started Today',
            description: data.description || 'Contact us to learn how our hospital-at-home platform can revolutionize patient care in your organization.',
            button_text: data.button_text || 'Contact Us',
            button_url: data.button_url || '/contact'
          });
        } else {
          console.log('No footer content found in database, using defaults');
        }
      } catch (error) {
        console.error('Error loading footer content from database:', error);
      }
    };

    loadFooterContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('footer-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.footer'
      }, (payload) => {
        console.log('Real-time footer content change:', payload);
        loadFooterContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Contact', href: '#' }
    ],
    Product: [
      { name: 'Platform', href: '#' },
      { name: 'Integrations', href: '#' },
      { name: 'Security', href: '#' },
      { name: 'Pricing', href: '#' }
    ],
    Resources: [
      { name: 'Documentation', href: '#' },
      { name: 'Support', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Webinars', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'HIPAA Compliance', href: '#' },
      { name: 'Data Security', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Add subtle texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="paper-texture-subtle w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
        {/* Top Section */}
        <div className="grid lg:grid-cols-5 gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 healthcare-gradient rounded-xl flex items-center justify-center">
                <Heart className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="text-white leading-none tracking-tight font-black"
                     style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', fontWeight: 900, lineHeight: 0.85 }}>Resilient Healthcare</div>
                <div className="text-blue-300/90 font-medium tracking-wide"
                     style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>Extending care beyond the hospital</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              {content.description}
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">hello@resilientcare.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">1-800-RESILIENT</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-400">San Francisco, CA</span>
              </div>
            </div>

            {/* CTA Section */}
            {content.title && (
              <div className="mt-8 p-6 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30">
                <h3 className="text-white font-bold text-xl mb-2">{content.title}</h3>
                {content.subtitle && (
                  <p className="text-blue-300 mb-4">{content.subtitle}</p>
                )}
                {content.button_text && content.button_url && (
                  <a
                    href={content.button_url}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                  >
                    {content.button_text}
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Links Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-white/90 font-medium tracking-wide mb-4"
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', lineHeight: 1.3 }}>{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href}
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © {currentYear} Resilient Healthcare. All rights reserved.
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse-slow" />
                <span>SOC 2 Certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
