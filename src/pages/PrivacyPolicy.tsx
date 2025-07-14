
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import { supabase } from '@/integrations/supabase/client';

const PrivacyPolicy = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Privacy',
      highlightedText: 'Policy',
      backgroundVideoUrl: null as string | null
    },
    body: {
      subtitle: 'Effective Date: July 14, 2025',
      description: `Effective Date: July 14, 2025

1. Introduction
Resilient Healthcare ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our healthcare technology services.

2. Information We Collect
Personal Information
We may collect personal information that you provide directly to us, including:

• Name, email address, and contact information
• Professional information (job title, organization)
• Demo requests and inquiry details
• Account credentials and preferences

Usage Information
We automatically collect certain information about your use of our services:

• Device information and browser type
• IP address and location data
• Pages visited and time spent on our website
• Referral sources and search terms

3. How We Use Your Information
We use the information we collect to:

• Provide and improve our healthcare technology services
• Respond to your inquiries and demo requests
• Send relevant updates and communications
• Analyze usage patterns to enhance user experience
• Comply with legal and regulatory requirements
• Protect against fraud and security threats

4. HIPAA Compliance
As a healthcare technology provider, Resilient Healthcare is committed to maintaining HIPAA compliance. We implement appropriate administrative, physical, and technical safeguards to protect protected health information (PHI) in accordance with HIPAA regulations.

5. Information Sharing
We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:

• With your explicit consent
• To comply with legal obligations
• With trusted service providers who assist in our operations
• To protect our rights, privacy, safety, or property
• In connection with a business transfer or merger

6. Data Security
We implement industry-standard security measures to protect your information, including:

• Encryption of data in transit and at rest
• Regular security assessments and audits
• Access controls and authentication protocols
• SOC 2 compliance and monitoring

7. Your Rights
You have the right to:

• Access and review your personal information
• Request corrections to inaccurate data
• Request deletion of your personal information
• Opt-out of marketing communications
• Request data portability

8. Cookies and Tracking
We use cookies and similar technologies to enhance your experience on our website. You can control cookie preferences through your browser settings.

9. Third-Party Links
Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites and encourage you to review their privacy policies.

10. Changes to This Policy
We may update this Privacy Policy periodically. We will notify you of any material changes by posting the new policy on our website with an updated effective date.

11. Contact Us
If you have questions about this Privacy Policy or our privacy practices, please contact us at:

Resilient Healthcare
Email: info@resilienthc.com
Phone: +1 888-874-0852
Address: Dallas, TX`
    }
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load hero section
        const { data: heroData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'privacy_hero')
          .eq('is_active', true)
          .single();

        // Load body section
        const { data: bodyData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'privacy_body')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setContent(prev => ({
            ...prev,
            hero: {
              title: heroData.title?.split(' ')[0] || 'Privacy',
              highlightedText: heroData.title?.split(' ')[1] || 'Policy',
              backgroundVideoUrl: heroData.background_video_url
            }
          }));
        }

        if (bodyData) {
          setContent(prev => ({
            ...prev,
            body: {
              subtitle: bodyData.subtitle || 'Effective Date: July 14, 2025',
              description: bodyData.description || prev.body.description
            }
          }));
        }
      } catch (error) {
        console.error('Error loading privacy policy content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('privacy-policy-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.privacy_hero' },
        () => loadContent()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.privacy_body' },
        () => loadContent()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatPolicyContent = (text: string) => {
    const sections = text.split(/(\d+\.\s+[^\n]+)/g).filter(Boolean);
    
    return sections.map((section, index) => {
      if (/^\d+\.\s+/.test(section)) {
        // This is a section header
        return (
          <h2 key={index} className="text-2xl font-semibold text-gray-900 mb-4 mt-8">
            {section}
          </h2>
        );
      } else {
        // This is content - split by bullet points and paragraphs
        const paragraphs = section.split('\n\n').filter(Boolean);
        
        return paragraphs.map((paragraph, pIndex) => {
          if (paragraph.includes('•')) {
            // This contains bullet points
            const parts = paragraph.split('•').filter(Boolean);
            const intro = parts[0].trim();
            const bullets = parts.slice(1);
            
            return (
              <div key={`${index}-${pIndex}`} className="mb-6">
                {intro && <p className="text-gray-700 leading-relaxed mb-4">{intro}</p>}
                <ul className="list-disc pl-6 text-gray-700 mb-4">
                  {bullets.map((bullet, bIndex) => (
                    <li key={bIndex}>{bullet.trim()}</li>
                  ))}
                </ul>
              </div>
            );
          } else {
            // Regular paragraph
            return (
              <p key={`${index}-${pIndex}`} className="text-gray-700 leading-relaxed mb-4">
                {paragraph.trim()}
              </p>
            );
          }
        });
      }
    });
  };

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title={content.hero.title}
        highlightedText={content.hero.highlightedText}
        backgroundVideoUrl={content.hero.backgroundVideoUrl}
      />

      <main className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="text-center mb-12">
              <p className="text-gray-600 text-lg">
                <strong>{content.body.subtitle}</strong>
              </p>
            </div>

            <div className="space-y-6">
              {formatPolicyContent(content.body.description)}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="text-gray-700 mb-2"><strong>Resilient Healthcare</strong></p>
              <p className="text-gray-700 mb-2">Email: info@resilienthc.com</p>
              <p className="text-gray-700 mb-2">Phone: +1 888-874-0852</p>
              <p className="text-gray-700">Address: Dallas, TX</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
