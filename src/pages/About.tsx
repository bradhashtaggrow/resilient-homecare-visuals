import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
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
      color: "from-blue-50 to-white border-blue-100/50"
    },
    {
      title: "Fully Integrated With Hospital Systems",
      description: "Seamless connection to EHRs, scheduling, and billing workflows.",
      icon: Building2,
      color: "from-green-50 to-white border-green-100/50"
    },
    {
      title: "Flexible Workforce Model",
      description: "On-demand contract clinicians that expand hospital capacity without adding full-time costs.",
      icon: Users,
      color: "from-purple-50 to-white border-purple-100/50"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-blue-50/30 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              About Us
            </h1>
            
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Revolutionizing Home-Based Healthcare with 
                <span className="text-blue-600"> RAIN</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Resilient Healthcare provides turnkey solutions for hospitals and providers, powered by RAIN – the Resilient AI Network. 
                This intelligent system optimizes patient-clinician matching, streamlines care coordination, and ensures hospitals can 
                deliver hospital-quality care at home without disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Resilient Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Resilient?</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {whyResilientFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className={`group p-8 rounded-3xl bg-gradient-to-br ${feature.color} border hover:shadow-xl transition-all duration-500 hover:-translate-y-1`}>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hospital Benefits Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-blue-600 mr-3" />
              <h2 className="text-3xl font-bold text-gray-900">Expand Home-Based Care Without Disrupting Hospital Workflows</h2>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {hospitalBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-blue-100/50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinicians Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute bottom-0 left-20 w-64 h-64 bg-green-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Clinicians & Healthcare Providers</h2>
            <div className="flex items-center justify-center mb-6">
              <UserCheck className="h-8 w-8 text-green-600 mr-3" />
              <h3 className="text-2xl font-semibold text-gray-800">More Flexibility, More Earnings, More Patient Impact</h3>
            </div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {clinicianBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-white rounded-2xl shadow-sm border border-green-100/50">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <p className="text-lg text-gray-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Compassionate Care</h3>
              <p className="opacity-90">
                Every interaction is guided by empathy, respect, and genuine concern for patient well-being.
              </p>
            </div>
            
            <div className="text-center">
              <Award className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Excellence</h3>
              <p className="opacity-90">
                We maintain the highest standards in everything we do, from clinical care to customer service.
              </p>
            </div>
            
            <div className="text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 opacity-90" />
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="opacity-90">
                Continuously improving healthcare delivery through technology and creative solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      <LeadGenSection />

      <Footer />
    </div>
  );
};

export default About;
