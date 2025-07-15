import React, { useState, useEffect } from 'react';
import { SEOHead, createSoftwareApplicationSchema, SEO_KEYWORDS } from '@/components/SEOHead';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import OptimizedVideo from '@/components/OptimizedVideo';
import ContentSection from '@/components/content/ContentSection';
import { supabase } from '@/integrations/supabase/client';
import { 
  Building2, 
  Heart, 
  Users, 
  Shield, 
  CheckCircle, 
  Activity, 
  Zap, 
  Clock,
  DollarSign,
  UserPlus,
  Stethoscope,
  Star,
  TrendingUp
} from 'lucide-react';

interface HeroContent {
  title: string;
  highlightedText: string;
  subtitle: string;
  description: string;
  buttonText: string;
  buttonUrl: string;
  backgroundVideoUrl: string;
}

interface SectionContent {
  title: string;
  subtitle: string;
  description: string;
  backgroundImageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

const Clinicians = () => {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    title: "Join the Future of Healthcare",
    highlightedText: "Clinicians",
    subtitle: "Transform Your Career with Resilient Healthcare",
    description: "Connect with leading hospitals, deliver exceptional patient care at home, and enjoy the flexibility of modern healthcare practice.",
    buttonText: "Join Our Network",
    buttonUrl: "/contact",
    backgroundVideoUrl: ''
  });

  const [sectionContents, setSectionContents] = useState<Record<string, SectionContent>>({
    hospitals: {
      title: "Work with Leading Hospitals",
      subtitle: "Partner with Premier Healthcare Institutions",
      description: "Join our network of clinicians working with top-tier hospitals across the region. Gain access to diverse patient populations and cutting-edge medical protocols."
    },
    referrals: {
      title: "Seamless Patient Referrals",
      subtitle: "Streamlined Workflow Management",
      description: "Receive patient referrals directly through our platform with complete medical histories, care plans, and coordination support."
    },
    delivery: {
      title: "Advanced Care Delivery",
      subtitle: "Hospital-Quality Care at Home",
      description: "Deliver comprehensive medical care in the comfort of patients' homes using our advanced monitoring and diagnostic tools."
    },
    workflows: {
      title: "Simplified Workflows",
      subtitle: "Focus on What Matters Most",
      description: "Our technology handles scheduling, documentation, and administrative tasks so you can focus on providing exceptional patient care."
    },
    payment: {
      title: "Per-Visit Payment",
      subtitle: "Transparent, Fair Compensation",
      description: "Earn competitive rates with transparent per-visit payments. Get paid quickly and track your earnings in real-time."
    },
    tools: {
      title: "Clinical Tools & Features",
      subtitle: "Everything You Need for Success",
      description: "Access comprehensive clinical tools, patient monitoring systems, and real-time support to enhance your practice."
    }
  });

  useEffect(() => {
    const loadContent = async () => {
      try {
        // Load hero content
        const { data: heroData } = await supabase
          .from('website_content')
          .select('*')
          .eq('section_key', 'clinicians_hero')
          .eq('is_active', true)
          .single();

        if (heroData) {
          setHeroContent({
            title: heroData.title || heroContent.title,
            highlightedText: "Clinicians",
            subtitle: heroData.subtitle || heroContent.subtitle,
            description: heroData.description || heroContent.description,
            buttonText: heroData.button_text || heroContent.buttonText,
            buttonUrl: heroData.button_url || heroContent.buttonUrl,
            backgroundVideoUrl: heroData.background_video_url || ''
          });
        }

        // Load section contents
        const sectionKeys = ['clinicians_hospitals', 'clinicians_referrals', 'clinicians_delivery', 'clinicians_workflows', 'clinicians_payment', 'clinicians_tools'];
        const { data: sectionsData } = await supabase
          .from('website_content')
          .select('*')
          .in('section_key', sectionKeys)
          .eq('is_active', true);

        if (sectionsData && sectionsData.length > 0) {
          const newSectionContents = { ...sectionContents };
          sectionsData.forEach(section => {
            const key = section.section_key.replace('clinicians_', '');
            if (newSectionContents[key]) {
              newSectionContents[key] = {
                title: section.title || newSectionContents[key].title,
                subtitle: section.subtitle || newSectionContents[key].subtitle,
                description: section.description || newSectionContents[key].description,
                backgroundImageUrl: section.background_image_url,
                buttonText: section.button_text,
                buttonUrl: section.button_url
              };
            }
          });
          setSectionContents(newSectionContents);
        }
      } catch (error) {
        console.error('Error loading clinicians content:', error);
      }
    };

    loadContent();

    // Set up real-time subscription
    const channel = supabase
      .channel('clinicians-content-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'website_content',
        filter: 'section_key=like.clinicians_%'
      }, () => {
        loadContent();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const cliniciansSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Healthcare Provider Solutions - Clinician Platform",
    "description": "Advanced remote healthcare technology platform designed for clinicians. Streamline patient care, remote monitoring, and telehealth services with AI-powered tools and integrated EMR systems.",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "Resilient Healthcare Clinician Platform",
      "description": "Comprehensive remote healthcare management platform for healthcare providers, featuring AI-powered diagnostics, patient monitoring, and integrated telehealth solutions.",
      "applicationCategory": "HealthApplication",
      "operatingSystem": "Web-based",
      "audience": {
        "@type": "Audience",
        "audienceType": "Healthcare Providers"
      }
    }
  };

  const benefits = [
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Work on your terms with flexible scheduling options that fit your lifestyle."
    },
    {
      icon: DollarSign,
      title: "Competitive Pay",
      description: "Earn competitive rates with transparent per-visit payments and quick processing."
    },
    {
      icon: Shield,
      title: "Professional Support",
      description: "Access 24/7 clinical support and comprehensive professional development resources."
    },
    {
      icon: Heart,
      title: "Meaningful Work",
      description: "Make a real difference in patients' lives by delivering care where they need it most."
    },
    {
      icon: Users,
      title: "Collaborative Care",
      description: "Work alongside multidisciplinary teams to provide comprehensive patient care."
    },
    {
      icon: TrendingUp,
      title: "Career Growth",
      description: "Advance your career with opportunities for specialization and leadership roles."
    }
  ];

  return (
    <>
      <SEOHead
        title="Healthcare Provider Platform - Remote Patient Management for Clinicians"
        description="Empower healthcare providers with Resilient Healthcare's advanced clinician platform. Remote patient monitoring, AI-powered diagnostics, integrated EMR, telehealth solutions, and value-based care management tools."
        keywords={`${SEO_KEYWORDS.primary}, ${SEO_KEYWORDS.clinicians}, healthcare provider software, clinician dashboard, medical practice management, telehealth for doctors, physician remote monitoring`}
        canonical="/clinicians"
        ogTitle="Advanced Healthcare Provider Platform - Resilient Healthcare for Clinicians"
        ogDescription="Transform your healthcare practice with our comprehensive remote patient monitoring, AI-powered diagnostics, and integrated telehealth platform designed for modern clinicians."
        schemaData={cliniciansSchema}
      />
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="pt-16">
          {/* Hero Section */}
          <section className="py-20 px-4 relative overflow-hidden">
            {heroContent.backgroundVideoUrl && (
              <div className="absolute inset-0 z-0">
                <OptimizedVideo
                  src={heroContent.backgroundVideoUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5" />
            <div className="max-w-6xl mx-auto text-center relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {heroContent.title} <span className="gradient-text">{heroContent.highlightedText}</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-4">{heroContent.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
                {heroContent.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href={heroContent.buttonUrl}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors inline-block"
                >
                  {heroContent.buttonText}
                </a>
                <button className="border border-border text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-accent transition-colors">
                  Schedule Demo
                </button>
              </div>
            </div>
          </section>

          {/* Work with Leading Hospitals */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionContents.hospitals.title}</h2>
                <p className="text-xl text-muted-foreground mb-2">{sectionContents.hospitals.subtitle}</p>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{sectionContents.hospitals.description}</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Building2 className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Premier Partnerships</h3>
                  <p className="text-muted-foreground">Connect with leading medical centers and specialized hospitals across the region.</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Shield className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Quality Assurance</h3>
                  <p className="text-muted-foreground">Work within established protocols and quality standards of top-tier healthcare institutions.</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Users className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-3">Diverse Opportunities</h3>
                  <p className="text-muted-foreground">Access varied patient populations and specialized care opportunities.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Patient Referrals */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionContents.referrals.title}</h2>
                  <p className="text-xl text-muted-foreground mb-4">{sectionContents.referrals.subtitle}</p>
                  <p className="text-lg text-muted-foreground mb-6">{sectionContents.referrals.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Complete medical histories and care plans</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Real-time communication with hospital teams</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Automated scheduling and logistics coordination</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <Activity className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Streamlined Process</h3>
                    <p className="text-muted-foreground text-sm">Our platform automatically matches you with suitable patients based on your expertise, location, and availability preferences.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Care Delivery */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionContents.delivery.title}</h2>
              <p className="text-xl text-muted-foreground mb-2">{sectionContents.delivery.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">{sectionContents.delivery.description}</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Stethoscope className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Remote Monitoring</h3>
                  <p className="text-sm text-muted-foreground">Advanced patient monitoring tools and real-time vital sign tracking</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Heart className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Chronic Care</h3>
                  <p className="text-sm text-muted-foreground">Comprehensive management of chronic conditions in home settings</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Zap className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Acute Care</h3>
                  <p className="text-sm text-muted-foreground">Hospital-level acute care services delivered at home</p>
                </div>
                <div className="bg-card p-6 rounded-lg shadow-lg border border-border">
                  <Shield className="w-8 h-8 text-primary mb-3 mx-auto" />
                  <h3 className="font-semibold mb-2">Post-Acute Care</h3>
                  <p className="text-sm text-muted-foreground">Recovery and rehabilitation services in comfortable home environments</p>
                </div>
              </div>
            </div>
          </section>

          {/* Simplified Workflows */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 p-8 rounded-xl">
                  <div className="bg-card p-6 rounded-lg shadow-lg mb-6">
                    <Clock className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Automated Scheduling</h3>
                    <p className="text-muted-foreground text-sm">Smart scheduling system that optimizes your route and maximizes your earning potential.</p>
                  </div>
                  <div className="bg-card p-6 rounded-lg shadow-lg">
                    <Activity className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
                    <p className="text-muted-foreground text-sm">Stay connected with instant updates on patient status, schedule changes, and important notifications.</p>
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionContents.workflows.title}</h2>
                  <p className="text-xl text-muted-foreground mb-4">{sectionContents.workflows.subtitle}</p>
                  <p className="text-lg text-muted-foreground mb-6">{sectionContents.workflows.description}</p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Automated documentation and reporting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Integrated billing and payment processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span>Mobile-first design for on-the-go access</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Clinicians Choose Us */}
          <section className="py-16 px-4 bg-muted/30">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Clinicians Choose Us</h2>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Join thousands of healthcare professionals who have transformed their careers with our platform
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {benefits.map((benefit, index) => (
                  <div key={index} className="bg-card p-6 rounded-lg shadow-lg border border-border hover:shadow-xl transition-shadow">
                    <benefit.icon className="w-10 h-10 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Per-Visit Payment */}
          <section className="py-16 px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">{sectionContents.payment.title}</h2>
              <p className="text-xl text-muted-foreground mb-2">{sectionContents.payment.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">{sectionContents.payment.description}</p>
              <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-primary-foreground">
                <div className="grid md:grid-cols-3 gap-8">
                  <div>
                    <DollarSign className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">$75-150</h3>
                    <p className="opacity-90">Per Visit Range</p>
                  </div>
                  <div>
                    <Clock className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">24-48hrs</h3>
                    <p className="opacity-90">Payment Processing</p>
                  </div>
                  <div>
                    <Star className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">4.8/5</h3>
                    <p className="opacity-90">Clinician Satisfaction</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Join Our Network CTA */}
          <section className="py-16 px-4 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center">
              <UserPlus className="w-16 h-16 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Network Today</h2>
              <p className="text-xl mb-8 opacity-90">
                Ready to transform your healthcare career? Join thousands of clinicians who are making a difference in home-based care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-background text-foreground px-8 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors">
                  Apply Now
                </button>
                <button className="border border-primary-foreground/20 text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary-foreground/10 transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </section>

          <LeadGenSection />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default Clinicians;