
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Users, Target, Award, Heart, TrendingUp, Globe, Zap, Building2, CheckCircle, UserCheck, ArrowRight } from 'lucide-react';

const About = () => {
  const hospitalBenefits = [
    "Reduce readmissions by 25-40% while optimizing care efficiency.",
    "Scale hospital-at-home services with on-demand contract clinicians.",
    "Maintain profitability with AI-driven automation that reduces overhead."
  ];

  const clinicianBenefits = [
    "Work on your schedule—join the home healthcare gig economy.",
    "RAIN automates scheduling, payments, and records management for a seamless experience.",
    "Deliver high-quality, patient-centered care with less bureaucracy."
  ];

  const whyResilientFeatures = [
    {
      title: "RAIN-Powered AI Infrastructure",
      description: "Reducing inefficiencies in care management through smart automation.",
      icon: Zap,
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fully Integrated With Hospital Systems",
      description: "Seamless connection to EHRs, scheduling, and billing workflows.",
      icon: Building2,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Flexible Workforce Model",
      description: "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
      icon: Users,
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const values = [
    {
      title: "Compassionate Care",
      description: "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
      icon: Heart,
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from clinical care to customer service.",
      icon: Award,
    },
    {
      title: "Innovation",
      description: "Continuously improving healthcare delivery through technology and creative solutions.",
      icon: TrendingUp,
    }
  ];

  return (
    <div className="min-h-screen bg-white font-apple">
      <Navigation />
      
      <HeroSection 
        title="About"
        highlightedText="Resilient Healthcare"
      />

      <ContentSection 
        title="Revolutionizing Home-Based Healthcare with RAIN"
        description="Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can deliver hospital-quality care at home without disruption."
      />

      {/* Why Resilient Section - Clean Modern Design */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-black tracking-tight font-apple mb-6" 
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Why Choose Resilient?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Three core pillars that make us the leader in home-based healthcare solutions
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {whyResilientFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              
              return (
                <div key={index} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mr-4">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 font-apple">{feature.title}</h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hospital Benefits - Modern Card Design */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                <span className="text-blue-600 font-semibold text-lg">For Hospitals</span>
              </div>
              <h2 className="font-black tracking-tight font-apple mb-8" 
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
                Expand Home-Based Care Without Disrupting Workflows
              </h2>
              <div className="space-y-6">
                {hospitalBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Hospital technology"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinicians Section - Modern Card Design */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="lg:order-2">
              <div className="flex items-center mb-6">
                <UserCheck className="h-8 w-8 text-green-600 mr-3" />
                <span className="text-green-600 font-semibold text-lg">For Clinicians</span>
              </div>
              <h2 className="font-black tracking-tight font-apple mb-8" 
                  style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
                More Flexibility, More Earnings, More Patient Impact
              </h2>
              <div className="space-y-6">
                {clinicianBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <p className="text-lg text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:order-1 relative">
              <img 
                src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Healthcare professional"
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-green-600/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Clean Modern Cards */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-black tracking-tight font-apple mb-6" 
                style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do in transforming healthcare delivery
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              const colors = ['blue', 'amber', 'emerald'];
              const color = colors[index];
              
              return (
                <div key={index} className="group text-center bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`w-16 h-16 mx-auto mb-6 bg-${color}-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`h-8 w-8 text-${color}-600`} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 font-apple text-gray-900">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default About;
