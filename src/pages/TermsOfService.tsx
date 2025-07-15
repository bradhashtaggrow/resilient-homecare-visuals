
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import { supabase } from '@/integrations/supabase/client';

const TermsOfService = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Terms of',
      highlightedText: 'Service',
      backgroundVideoUrl: null as string | null
    },
    body: {
      subtitle: 'Effective Date: July 14, 2025',
      description: `Effective Date: July 14, 2025

1. Acceptance of Terms
By accessing and using Resilient Healthcare services, you accept and agree to be bound by the terms and provision of this agreement.

2. Use License
Permission is granted to temporarily access Resilient Healthcare services for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.

3. Disclaimer
The materials on Resilient Healthcare are provided on an "as is" basis. Resilient Healthcare makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

4. Limitations
In no event shall Resilient Healthcare or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Resilient Healthcare, even if Resilient Healthcare or a Resilient Healthcare authorized representative has been notified orally or in writing of the possibility of such damage.

5. Accuracy of Materials
The materials appearing on Resilient Healthcare could include technical, typographical, or photographic errors. Resilient Healthcare does not warrant that any of the materials on its website are accurate, complete, or current.

6. Links
Resilient Healthcare has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Resilient Healthcare of the site.

7. Modifications
Resilient Healthcare may revise these terms of service at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.

8. Governing Law
These terms and conditions are governed by and construed in accordance with the laws of Texas and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.

9. Medical Disclaimer
The information provided by Resilient Healthcare is for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment.

10. Privacy Policy
Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.

11. Contact Information
Questions about the Terms of Service should be sent to us at info@resilienthc.com.`
    }
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load hero section
        const { data: heroData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'terms_hero')
          .eq('is_active', true)
          .single();

        // Load body section
        const { data: bodyData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'terms_body')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setContent(prev => ({
            ...prev,
            hero: {
              title: heroData.title?.split(' ')[0] + ' ' + (heroData.title?.split(' ')[1] || '') || 'Terms of',
              highlightedText: heroData.title?.split(' ')[2] || 'Service',
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
        console.error('Error loading terms of service content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('terms-of-service-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.terms_hero' },
        (payload) => {
          console.log('Terms hero updated:', payload);
          loadContent();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.terms_body' },
        (payload) => {
          console.log('Terms body updated:', payload);
          loadContent();
        }
      )
      .subscribe((status) => {
        console.log('Terms of service subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatTermsContent = (text: string) => {
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
              {formatTermsContent(content.body.description)}
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

export default TermsOfService;
