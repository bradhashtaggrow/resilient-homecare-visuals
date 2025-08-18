import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LeadGenSection from '@/components/LeadGenSection';
import HeroSection from '@/components/hero/HeroSection';
import { TrendingUp, Building, DollarSign, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const HealthSystems = () => {
  const burningPlatformItems = [
    {
      icon: TrendingUp,
      title: "Rising Costs",
      description: "Healthcare costs continue to escalate, putting pressure on budgets and resources while maintaining quality care standards."
    },
    {
      icon: Building,
      title: "Capacity Constraints", 
      description: "Limited hospital beds and overwhelming patient volumes strain existing infrastructure and staff resources."
    },
    {
      icon: DollarSign,
      title: "Revenue Pressures",
      description: "Declining reimbursements and increasing operational costs create financial challenges for sustainable growth."
    },
    {
      icon: Zap,
      title: "Staff Shortages",
      description: "Critical workforce gaps in nursing and clinical staff impact service delivery and patient satisfaction."
    }
  ];

  const benefits = [
    {
      icon: CheckCircle,
      title: "Improved Patient Outcomes",
      description: "Deliver personalized care that leads to better health results and higher patient satisfaction scores."
    },
    {
      icon: TrendingUp,
      title: "Operational Efficiency", 
      description: "Streamline workflows and reduce administrative burden while increasing productivity across departments."
    },
    {
      icon: DollarSign,
      title: "Cost Reduction",
      description: "Significantly lower operational costs through optimized resource allocation and reduced readmissions."
    },
    {
      icon: Building,
      title: "Scalable Growth",
      description: "Expand your care delivery network without proportional increases in infrastructure investment."
    },
    {
      icon: Zap,
      title: "Enhanced Reputation",
      description: "Build market leadership through innovative care delivery and superior patient experience."
    },
    {
      icon: ArrowRight,
      title: "Future-Ready Technology",
      description: "Stay ahead with cutting-edge healthcare technology that adapts to evolving industry needs."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      <HeroSection 
        title="Transform Your"
        highlightedText="Health System"
        description="Partner with us to expand care delivery, improve outcomes, and prepare for the future of healthcare"
      />

      {/* Burning Platform Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              The Challenge Health Systems Face Today
            </h2>
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              Traditional healthcare delivery models are under unprecedented pressure
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Rising costs, staff shortages, and patient demands for convenient care create an urgent need for innovative solutions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {burningPlatformItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-100 to-indigo-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-4">
              Why Leading Health Systems Choose Resilient Healthcare
            </h2>
            <p className="text-xl text-slate-600 mb-4 max-w-3xl mx-auto">
              Transform your care delivery with our comprehensive platform
            </p>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Join the healthcare revolution and deliver exceptional patient outcomes while reducing costs and improving efficiency.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
              >
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <LeadGenSection />
      <Footer />
    </div>
  );
};

export default HealthSystems;