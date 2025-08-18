import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import TabsSection from '@/components/tabs/TabsSection';
import { TrendingUp, Building, DollarSign, Zap, Heart, CheckCircle, ArrowRight, Users, Shield } from 'lucide-react';

const HealthSystems = () => {
  const services = [
    {
      id: 'improving-outcomes',
      icon: Heart,
      title: 'Improving Outcomes',
      subtitle: 'Enhanced Patient Care',
      description: 'Enhanced patient care delivery and satisfaction through innovative home-based healthcare solutions that put patients first.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'expanding-services',
      icon: Building,
      title: 'Expanding Services',
      subtitle: 'Broaden Your Reach',
      description: 'Broaden your service offerings and reach more patients in their preferred care environment with comprehensive solutions.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'growing-revenue',
      icon: DollarSign,
      title: 'Growing Revenue',
      subtitle: 'Financial Excellence',
      description: 'Increase revenue streams while reducing operational costs through efficient care delivery models and optimized workflows.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'shifting-payment-models',
      icon: Zap,
      title: 'Preparing for Shifting Payment Models',
      subtitle: 'Future-Ready Solutions',
      description: 'Stay ahead of evolving healthcare payment structures and reimbursement changes with adaptive technology platforms.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1551076805-e1869033e561?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'operational-efficiency',
      icon: CheckCircle,
      title: 'Operational Efficiency',
      subtitle: 'Streamlined Operations',
      description: 'Streamline workflows and reduce administrative burden while increasing productivity across all departments and teams.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    },
    {
      id: 'enhanced-reputation',
      icon: Shield,
      title: 'Enhanced Reputation',
      subtitle: 'Market Leadership',
      description: 'Build market leadership through innovative care delivery and superior patient experience that sets you apart.',
      color: "blue",
      patient_image_url: "https://images.unsplash.com/photo-1576669802149-e3f6d0d43c48?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="Transform Your"
        highlightedText="Health System"
        description="Partner with leading hospitals and health systems to deliver patient-centered, technology-driven care at home. Our platform grows your program through innovative solutions that ensure patients receive top-quality care where they are most comfortable."
      />

      <ContentSection 
        title="Revolutionizing Healthcare Delivery"
        description="We partner with progressive health systems and hospitals to transform patient care through cutting-edge technology and seamless care coordination. Our comprehensive platform enables you to expand services, improve outcomes, and prepare for the future of healthcare while maintaining the highest standards of clinical excellence."
      />

      <TabsSection services={services} />

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;