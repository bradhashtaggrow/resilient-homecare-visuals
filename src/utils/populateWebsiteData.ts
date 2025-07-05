
import { supabase } from '@/integrations/supabase/client';

interface WebsiteSection {
  section_key: string;
  title: string;
  subtitle: string;
  description: string;
  button_text?: string;
  button_url?: string;
  background_image_url?: string;
  background_video_url?: string;
  mobile_background_url?: string;
  laptop_background_url?: string;
}

interface ServiceData {
  title: string;
  subtitle: string;
  description: string;
  icon_name: string;
  color: string;
  display_order: number;
  patient_image_url?: string;
}

const websiteSectionsData: WebsiteSection[] = [
  {
    section_key: 'navigation',
    title: 'HealthCare Pro',
    subtitle: 'Professional Healthcare Management',
    description: 'Leading healthcare technology platform for modern medical practices',
    button_text: 'Get Started',
    button_url: '/admin'
  },
  {
    section_key: 'hero',
    title: 'Revolutionary Healthcare Management System',
    subtitle: 'Streamline Your Practice with AI-Powered Solutions',
    description: 'Transform your healthcare practice with our comprehensive management system. From patient records to appointment scheduling, experience seamless healthcare administration that saves time and improves patient outcomes.',
    button_text: 'Start Free Trial',
    button_url: '/admin',
    background_video_url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e49c8a',
    background_image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  {
    section_key: 'services_header',
    title: 'Comprehensive Healthcare Solutions',
    subtitle: 'Everything You Need in One Platform',
    description: 'Our integrated healthcare management system provides complete solutions for modern medical practices, from patient management to advanced analytics.',
    button_text: 'Explore Services',
    button_url: '#services'
  },
  {
    section_key: 'mobile_showcase',
    title: 'Healthcare Management On-the-Go',
    subtitle: 'Mobile-First Design for Modern Healthcare',
    description: 'Access your practice management tools anywhere, anytime. Our mobile-optimized platform ensures you stay connected with your patients and practice, whether you\'re in the office or on the move.',
    button_text: 'Download Mobile App',
    button_url: '#mobile',
    background_image_url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  {
    section_key: 'value_proposition',
    title: 'Why Choose Our Healthcare Platform?',
    subtitle: 'Proven Results, Trusted by Thousands',
    description: 'Join over 10,000 healthcare professionals who have transformed their practices with our comprehensive management system. Experience improved efficiency, better patient outcomes, and streamlined operations.',
    button_text: 'See Success Stories',
    button_url: '#testimonials'
  },
  {
    section_key: 'admin_dashboard',
    title: 'Powerful Admin Dashboard',
    subtitle: 'Complete Control at Your Fingertips',
    description: 'Manage your entire healthcare practice from one centralized dashboard. Real-time analytics, patient management, scheduling, and administrative tools all in one place.',
    button_text: 'View Dashboard Demo',
    button_url: '/admin',
    laptop_background_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
  },
  {
    section_key: 'founder',
    title: 'Dr. Sarah Johnson, MD',
    subtitle: 'Founder & Chief Medical Officer',
    description: 'With over 15 years of clinical experience and a passion for healthcare technology, Dr. Johnson founded our platform to bridge the gap between traditional medicine and modern technology. Board-certified in Internal Medicine with specializations in Healthcare Informatics.',
    button_text: 'Learn More',
    button_url: '#about',
    background_image_url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    section_key: 'stats',
    title: 'Trusted by Healthcare Professionals Worldwide',
    subtitle: 'Real Impact, Measurable Results',
    description: 'Our platform has helped thousands of healthcare providers improve their practice efficiency and patient care quality. Join the growing community of satisfied healthcare professionals.',
    button_text: 'View Case Studies',
    button_url: '#case-studies'
  },
  {
    section_key: 'lead_generation',
    title: 'Ready to Transform Your Practice?',
    subtitle: 'Start Your Free Trial Today',
    description: 'Join thousands of healthcare professionals who have revolutionized their practice with our comprehensive management system. No setup fees, no long-term contracts.',
    button_text: 'Start Free Trial',
    button_url: '/signup'
  },
  {
    section_key: 'footer',
    title: 'HealthCare Pro',
    subtitle: 'Professional Healthcare Management Solutions',
    description: 'Empowering healthcare professionals with cutting-edge technology for better patient care and practice management. Available 24/7 with world-class support.',
    button_text: 'Contact Support',
    button_url: '/contact'
  }
];

const servicesData: ServiceData[] = [
  {
    title: 'Patient Management System',
    subtitle: 'Complete Electronic Health Records',
    description: 'Comprehensive patient record management with secure data storage, easy search functionality, and complete medical history tracking. HIPAA compliant with advanced security features.',
    icon_name: 'Users',
    color: '#3B82F6',
    display_order: 1,
    patient_image_url: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Appointment Scheduling',
    subtitle: 'Smart Scheduling & Calendar Management',
    description: 'Intelligent appointment scheduling with automated reminders, conflict detection, and patient self-scheduling portal. Reduce no-shows by up to 60%.',
    icon_name: 'Calendar',
    color: '#10B981',
    display_order: 2,
    patient_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Telemedicine Platform',
    subtitle: 'Virtual Consultations Made Easy',
    description: 'Secure video consultations with integrated billing, prescription management, and patient monitoring. Expand your reach with remote care capabilities.',
    icon_name: 'Video',
    color: '#8B5CF6',
    display_order: 3,
    patient_image_url: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Billing & Insurance',
    subtitle: 'Automated Revenue Cycle Management',
    description: 'Streamlined billing processes with insurance verification, claim submission, and payment tracking. Reduce billing errors and accelerate revenue collection.',
    icon_name: 'CreditCard',
    color: '#F59E0B',
    display_order: 4,
    patient_image_url: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Analytics & Reporting',
    subtitle: 'Data-Driven Practice Insights',
    description: 'Comprehensive analytics dashboard with practice performance metrics, patient insights, and financial reporting. Make informed decisions with real-time data.',
    icon_name: 'BarChart3',
    color: '#EF4444',
    display_order: 5,
    patient_image_url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  },
  {
    title: 'Prescription Management',
    subtitle: 'Digital Prescription & Pharmacy Integration',
    description: 'Electronic prescribing with drug interaction checks, dosage recommendations, and direct pharmacy integration. Improve medication safety and patient compliance.',
    icon_name: 'Pill',
    color: '#06B6D4',
    display_order: 6,
    patient_image_url: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
  }
];

export const populateWebsiteData = async () => {
  try {
    console.log('Starting website data population...');

    // Clear existing data
    await supabase.from('website_content').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert website sections
    const { error: contentError } = await supabase
      .from('website_content')
      .insert(websiteSectionsData);

    if (contentError) {
      console.error('Error inserting website content:', contentError);
      throw contentError;
    }

    // Insert services
    const { error: servicesError } = await supabase
      .from('services')
      .insert(servicesData);

    if (servicesError) {
      console.error('Error inserting services:', servicesError);
      throw servicesError;
    }

    console.log('Website data populated successfully!');
    return { success: true };

  } catch (error) {
    console.error('Error populating website data:', error);
    return { success: false, error };
  }
};

export const populateMediaLibrary = async () => {
  const mediaFiles = [
    {
      filename: 'hero-background.mp4',
      original_name: 'healthcare-hero-video.mp4',
      file_type: 'video/mp4',
      file_size: 15728640,
      url: 'https://player.vimeo.com/external/434045526.sd.mp4?s=c27eecc69a27dbc4ff2b87d38afc35f1a9e49c8a',
      alt_text: 'Hero section background video - healthcare professionals at work'
    },
    {
      filename: 'hero-background.jpg',
      original_name: 'healthcare-hero-image.jpg',
      file_type: 'image/jpeg',
      file_size: 2048576,
      url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt_text: 'Hero section background - modern hospital interior'
    },
    {
      filename: 'mobile-showcase.jpg',
      original_name: 'mobile-app-showcase.jpg',
      file_type: 'image/jpeg',
      file_size: 1536000,
      url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt_text: 'Mobile healthcare app interface showcase'
    },
    {
      filename: 'founder-image.jpg',
      original_name: 'dr-sarah-johnson.jpg',
      file_type: 'image/jpeg',
      file_size: 1024000,
      url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      alt_text: 'Dr. Sarah Johnson - Founder and Chief Medical Officer'
    },
    {
      filename: 'admin-dashboard.jpg',
      original_name: 'admin-dashboard-preview.jpg',
      file_type: 'image/jpeg',
      file_size: 1800000,
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
      alt_text: 'Admin dashboard interface showing analytics and management tools'
    }
  ];

  try {
    const { error } = await supabase
      .from('media_library')
      .insert(mediaFiles);

    if (error) throw error;
    
    console.log('Media library populated successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error populating media library:', error);
    return { success: false, error };
  }
};
