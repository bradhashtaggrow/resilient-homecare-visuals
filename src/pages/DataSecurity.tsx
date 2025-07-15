import React, { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import HeroSection from '@/components/hero/HeroSection';
import { supabase } from '@/integrations/supabase/client';

const DataSecurity = () => {
  const [content, setContent] = useState({
    hero: {
      title: 'Data',
      highlightedText: 'Security',
      backgroundVideoUrl: null as string | null
    },
    body: {
      subtitle: 'Effective Date: July 14, 2025',
      description: `Effective Date: July 14, 2025

1. Our Commitment to Data Security
Resilient Healthcare is committed to implementing and maintaining the highest standards of data security to protect sensitive healthcare information and ensure the confidentiality, integrity, and availability of all data entrusted to us.

2. Data Classification and Handling
We classify data based on sensitivity levels and apply appropriate security controls:

• Public Data - Information available to the general public
• Internal Data - Information intended for internal use within the organization
• Confidential Data - Sensitive business information requiring protection
• Restricted Data - Highly sensitive data including PHI requiring the highest level of protection

3. Encryption Standards
We employ industry-leading encryption technologies to protect data:

• AES-256 encryption for data at rest
• TLS 1.3 encryption for data in transit
• End-to-end encryption for sensitive communications
• Hardware Security Modules (HSMs) for key management
• Regular encryption key rotation and management
• Zero-knowledge architecture for maximum privacy

4. Access Controls and Authentication
Our access control framework includes:

• Multi-factor authentication (MFA) for all user accounts
• Role-based access control (RBAC) with principle of least privilege
• Just-in-time access provisioning for temporary elevated permissions
• Continuous authentication monitoring and anomaly detection
• Regular access reviews and certification processes
• Automated account deprovisioning for terminated users

5. Network Security
We maintain robust network security measures:

• Next-generation firewalls with deep packet inspection
• Network segmentation and micro-segmentation
• Intrusion detection and prevention systems (IDS/IPS)
• DDoS protection and traffic analysis
• Virtual private networks (VPNs) for secure remote access
• Network monitoring and threat intelligence integration

6. Vulnerability Management
Our vulnerability management program includes:

• Continuous vulnerability scanning and assessment
• Regular penetration testing by certified security professionals
• Automated patch management and testing
• Security configuration management
• Threat modeling and risk assessment
• Bug bounty programs for external security research

7. Incident Response and Recovery
We maintain a comprehensive incident response capability:

• 24/7 security operations center (SOC) monitoring
• Incident response team with defined roles and responsibilities
• Automated threat detection and response capabilities
• Forensic analysis and evidence preservation procedures
• Business continuity and disaster recovery planning
• Regular incident response drills and tabletop exercises

8. Data Backup and Recovery
Our data protection strategy includes:

• Automated daily backups with multiple retention periods
• Geographically distributed backup storage locations
• Regular backup testing and restoration procedures
• Point-in-time recovery capabilities
• Immutable backup storage to prevent ransomware attacks
• Recovery time objectives (RTO) and recovery point objectives (RPO)

9. Security Monitoring and Analytics
We employ advanced security monitoring:

• Security Information and Event Management (SIEM) systems
• User and Entity Behavior Analytics (UEBA)
• Machine learning-based threat detection
• Real-time security alerting and notification
• Compliance monitoring and reporting
• Integration with threat intelligence feeds

10. Compliance and Auditing
We maintain compliance with security standards:

• SOC 2 Type II compliance and annual audits
• HIPAA Security Rule compliance
• Regular internal and external security assessments
• Compliance monitoring and reporting dashboards
• Evidence collection and audit trail maintenance
• Third-party security certifications and validations

11. Employee Security Training
All employees receive comprehensive security training:

• Security awareness training upon hiring
• Annual security training updates and refreshers
• Phishing simulation and testing programs
• Role-specific security training for technical staff
• Incident reporting and escalation procedures
• Security policy acknowledgment and compliance

12. Contact Information
For security-related inquiries or to report security incidents, please contact:

Chief Information Security Officer
Resilient Healthcare
Email: security@resilienthc.com
Phone: +1 888-874-0852
Security Hotline: Available 24/7
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
          .eq('section_key', 'security_hero')
          .eq('is_active', true)
          .single();

        // Load body section
        const { data: bodyData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'security_body')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setContent(prev => ({
            ...prev,
            hero: {
              title: heroData.title?.split(' ')[0] || 'Data',
              highlightedText: heroData.title?.split(' ')[1] || 'Security',
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
        console.error('Error loading data security content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('data-security-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.security_hero' },
        (payload) => {
          console.log('Data security hero updated:', payload);
          loadContent();
        }
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'website_content', filter: 'section_key=eq.security_body' },
        (payload) => {
          console.log('Data security body updated:', payload);
          loadContent();
        }
      )
      .subscribe((status) => {
        console.log('Data security subscription status:', status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const formatSecurityContent = (text: string) => {
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
              {formatSecurityContent(content.body.description)}
            </div>

            <div className="bg-gray-50 p-6 rounded-lg mt-8">
              <p className="text-gray-700 mb-2"><strong>Chief Information Security Officer</strong></p>
              <p className="text-gray-700 mb-2"><strong>Resilient Healthcare</strong></p>
              <p className="text-gray-700 mb-2">Email: security@resilienthc.com</p>
              <p className="text-gray-700 mb-2">Phone: +1 888-874-0852</p>
              <p className="text-gray-700 mb-2">Security Hotline: Available 24/7</p>
              <p className="text-gray-700">Address: Dallas, TX</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DataSecurity;
