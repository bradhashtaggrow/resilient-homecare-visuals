
import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import { supabase } from '@/integrations/supabase/client';

const HIPAACompliance = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'HIPAA',
      highlightedText: 'Compliance',
      backgroundVideoUrl: null as string | null
    },
    body: {
      subtitle: 'Effective Date: July 14, 2025',
      description: `Effective Date: July 14, 2025

1. Our Commitment to HIPAA Compliance
Resilient Healthcare is committed to maintaining the highest standards of data protection and privacy in accordance with the Health Insurance Portability and Accountability Act (HIPAA) of 1996 and its implementing regulations.

2. Protected Health Information (PHI)
We understand that Protected Health Information (PHI) is any information that can identify an individual and relates to their health condition, healthcare provision, or payment for healthcare services. This includes:

• Medical records and clinical data
• Billing and payment information
• Patient demographics and contact details
• Health plan enrollment information
• Electronic health records (EHR) data

3. Administrative Safeguards
Our administrative safeguards include:

• Designated HIPAA Security Officer responsible for developing and implementing security policies
• Regular workforce training on HIPAA compliance and data protection
• Assigned security responsibilities to all workforce members
• Information access management procedures
• Regular security evaluations and risk assessments
• Incident response and breach notification procedures

4. Physical Safeguards
We implement physical safeguards to protect electronic PHI:

• Secure facility access controls and visitor management
• Workstation and device access controls
• Secure disposal of PHI-containing media
• Assigned workstation use policies
• Environmental controls for server rooms and data centers

5. Technical Safeguards
Our technical safeguards include:

• Access control systems with unique user identification
• Role-based access controls and audit logs
• Encryption of PHI in transit and at rest
• Multi-factor authentication for system access
• Regular software updates and security patching
• Automatic logoff procedures for inactive sessions

6. Business Associate Agreements
We maintain Business Associate Agreements (BAAs) with all third-party vendors and partners who may have access to PHI. These agreements ensure that all business associates comply with HIPAA requirements and maintain appropriate safeguards.

7. Risk Assessment and Management
We conduct regular risk assessments to:

• Identify potential vulnerabilities in our systems
• Evaluate the likelihood and impact of potential threats
• Implement appropriate security measures to mitigate risks
• Monitor and review security controls effectiveness
• Update policies and procedures as needed

8. Breach Notification
In the event of a breach involving PHI, we follow strict protocols:

• Immediate containment and assessment of the breach
• Notification to affected individuals within 60 days
• Notification to the Department of Health and Human Services
• Documentation and analysis for prevention measures
• Implementation of corrective actions

9. Employee Training and Awareness
All Resilient Healthcare employees receive comprehensive HIPAA training that covers:

• Understanding of PHI and its protection requirements
• Proper handling and disposal of sensitive information
• Recognizing and reporting potential security incidents
• Understanding penalties for HIPAA violations
• Regular updates on policy changes and best practices

10. Patient Rights
Under HIPAA, patients have specific rights regarding their PHI:

• Right to access their own health information
• Right to request amendments to their records
• Right to request restrictions on PHI use and disclosure
• Right to receive an accounting of PHI disclosures
• Right to request alternative communication methods

11. Compliance Monitoring
We maintain ongoing compliance through:

• Regular internal audits and assessments
• Third-party security evaluations
• Continuous monitoring of access logs and system activities
• Review and update of policies and procedures
• Staff compliance monitoring and corrective actions

12. Contact Information
For questions about our HIPAA compliance practices or to report potential violations, please contact:

HIPAA Privacy Officer
Resilient Healthcare
Email: privacy@resilienthc.com
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
          .eq('section_key', 'hipaa_hero')
          .eq('is_active', true)
          .single();

        // Load body section
        const { data: bodyData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'hipaa_body')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setContent(prev => ({
            ...prev,
            hero: {
              title: heroData.title?.split(' ')[0] || 'HIPAA',
              highlightedText: heroData.title?.split(' ')[1] || 'Compliance',
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
        console.error('Error loading HIPAA compliance content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('hipaa-compliance-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.hipaa_hero' },
        () => loadContent()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.hipaa_body' },
        () => loadContent()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatHIPAAContent = (text: string) => {
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
              {formatHIPAAContent(content.body.description)}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="text-gray-700 mb-2"><strong>HIPAA Privacy Officer</strong></p>
              <p className="text-gray-700 mb-2"><strong>Resilient Healthcare</strong></p>
              <p className="text-gray-700 mb-2">Email: privacy@resilienthc.com</p>
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

export default HIPAACompliance;
