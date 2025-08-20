
import React, { useState, useEffect } from 'react';
import { Heart, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface FooterContent {
  title?: string;
  subtitle?: string;
  description?: string;
  button_text?: string;
  button_url?: string;
  background_image_url?: string; // For logo
}

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [content, setContent] = useState<FooterContent>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFooterContent = async () => {
      try {
        setIsLoading(true);
        const { data, error } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'footer')
          .eq('is_active', true)
          .maybeSingle();

        if (data && !error) {
          setContent({
            title: data.title,
            subtitle: data.subtitle,
            description: data.description,
            button_text: data.button_text,
            button_url: data.button_url,
            background_image_url: data.background_image_url
          });
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading footer content:', error);
        setIsLoading(false);
      }
    };

    loadFooterContent();

    const channel = supabase
      .channel('footer-realtime')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=eq.footer'
      }, () => {
        loadFooterContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const footerLinks = {
    Company: [
      { name: 'About Us', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'News', href: '/news' }
    ],
    Services: [
      { name: 'Care at Home', href: '/care-at-home' },
      { name: 'Health Systems', href: '/health-systems' },
      { name: 'For Clinicians', href: '/clinicians' },
      { name: 'For Patients', href: '/patients' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'HIPAA Compliance', href: '/hipaa-compliance' },
      { name: 'Data Security', href: '/data-security' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-white relative">
      {/* Add subtle texture overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="paper-texture-subtle w-full h-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10">
        {/* Top Section */}
        <div className="grid gap-8 sm:gap-12 lg:grid-cols-5 mb-8 sm:mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 text-center lg:text-left">
            <div className="mb-4 sm:mb-6">
              <div className="mb-2 sm:mb-3 flex justify-center lg:justify-start">
                {content.background_image_url ? (
                  <img 
                    src={content.background_image_url} 
                    alt="Company Logo" 
                    className="h-12 sm:h-16 object-contain"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Heart className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                )}
              </div>
              {content.title && (
                <h2 className="text-white font-semibold text-xl sm:text-2xl mb-2 text-center lg:text-left">
                  {content.title}
                </h2>
              )}
              {content.subtitle && (
                <div className="text-blue-300/90 font-medium tracking-wide text-center lg:text-left"
                     style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', lineHeight: 1.3 }}>{content.subtitle}</div>
              )}
            </div>
            
            <p className="text-gray-400 mb-4 sm:mb-6 leading-relaxed text-center lg:text-left text-sm sm:text-base">
              {content.description}
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center space-x-2 sm:space-x-3 justify-center lg:justify-start">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">info@resilienthc.org</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 justify-center lg:justify-start">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">+1 888-874-0852</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 justify-center lg:justify-start">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 flex-shrink-0" />
                <span className="text-gray-400 text-sm sm:text-base">Dallas, TX</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:col-span-3 lg:grid-cols-3">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="text-center lg:text-left">
                <h3 className="text-white/90 font-medium tracking-wide mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                  {category}
                </h3>
                <ul className="space-y-1 sm:space-y-2">
                  {links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        to={link.href}
                        className="text-gray-400 hover:text-blue-400 transition-colors duration-200 text-xs sm:text-sm lg:text-base"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 pt-6 sm:pt-8">
          <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center md:space-y-0">
            <div className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              © 2025 Resilient Healthcare Corp. All rights reserved.
            </div>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
