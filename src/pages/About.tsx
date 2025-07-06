
import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import ContentSection from '@/components/content/ContentSection';
import { Users, Target, Award, Heart, TrendingUp, Globe, Zap, Building2, CheckCircle, UserCheck } from 'lucide-react';

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
      color: "blue",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Fully Integrated With Hospital Systems",
      description: "Seamless connection to EHRs, scheduling, and billing workflows.",
      icon: Building2,
      color: "green",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "Flexible Workforce Model",
      description: "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
      icon: Users,
      color: "purple",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const values = [
    {
      title: "Compassionate Care",
      description: "Every interaction is guided by empathy, respect, and genuine concern for patient well-being.",
      icon: Heart,
      color: "red"
    },
    {
      title: "Excellence",
      description: "We maintain the highest standards in everything we do, from clinical care to customer service.",
      icon: Award,
      color: "yellow"
    },
    {
      title: "Innovation",
      description: "Continuously improving healthcare delivery through technology and creative solutions.",
      icon: TrendingUp,
      color: "blue"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: "from-blue-50 to-white border-blue-100/50 text-blue-600",
      green: "from-green-50 to-white border-green-100/50 text-green-600",
      purple: "from-purple-50 to-white border-purple-100/50 text-purple-600",
      red: "from-red-50 to-white border-red-100/50 text-red-600",
      yellow: "from-yellow-50 to-white border-yellow-100/50 text-yellow-600",
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

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

      {/* Why Resilient Section with Images */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="font-black tracking-tight font-apple mb-6" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Why Resilient?
            </h2>
          </div>
          
          <div className="space-y-24">
            {whyResilientFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              const isEven = index % 2 === 0;
              const colorClasses = getColorClasses(feature.color);
              
              return (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image Side */}
                  <div className="flex-1">
                    <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                      <img 
                        src={feature.image} 
                        alt={feature.title}
                        className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                  
                  {/* Content Side */}
                  <div className="flex-1">
                    <div className={`group p-10 rounded-3xl bg-gradient-to-br ${colorClasses} border hover:shadow-xl transition-all duration-500 hover:-translate-y-2`}>
                      <div className="flex items-start space-x-6">
                        <div className={`w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                          <IconComponent className="h-10 w-10 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-3xl font-bold text-gray-900 mb-6 font-apple">{feature.title}</h3>
                          <p className="text-gray-600 text-xl leading-relaxed font-apple">{feature.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hospital Benefits Section with Background Image */}
      <section className="py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-blue-900/90" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-6">
              <Building2 className="h-8 w-8 text-blue-300 mr-3" />
              <h2 className="font-black tracking-tight font-apple text-white" 
                  style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
                Expand Home-Based Care Without Disrupting Hospital Workflows
              </h2>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {hospitalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-apple leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinicians Section with Background Image */}
      <section className="py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-green-900/90" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="font-black tracking-tight font-apple mb-4 text-white" 
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', fontWeight: 900, lineHeight: 0.9 }}>
              Clinicians & Healthcare Providers
            </h2>
            <div className="flex items-center justify-center mb-6">
              <UserCheck className="h-8 w-8 text-green-300 mr-3" />
              <h3 className="text-2xl font-semibold text-green-100 font-apple">More Flexibility, More Earnings, More Patient Impact</h3>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {clinicianBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 hover:bg-white hover:shadow-xl transition-all duration-300">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 font-apple leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section with Enhanced Styling */}
      <section className="py-32 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1721322800607-8c38375eef04?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80)',
          }}
        />
        <div className="absolute inset-0 bg-blue-900/95" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <h2 className="font-black tracking-tight font-apple text-center mb-16 text-white" 
              style={{ fontSize: 'clamp(1.5rem, 4vw, 4rem)', fontWeight: 900, lineHeight: 0.9 }}>
            Our Values
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 hover:bg-white/20 transition-all duration-300 hover:-translate-y-2 border border-white/20">
                    <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-10 w-10 text-white opacity-90" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 font-apple text-white">{value.title}</h3>
                    <p className="text-white/90 text-lg leading-relaxed font-apple">
                      {value.description}
                    </p>
                  </div>
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
