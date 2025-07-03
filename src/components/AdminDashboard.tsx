
import React, { useEffect, useState } from 'react';
import { Monitor, Users, Calendar, CreditCard, BarChart, Shield } from 'lucide-react';

const AdminDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [laptopOpen, setLaptopOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setLaptopOpen(true), 500);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('admin-dashboard');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const adminFeatures = [
    {
      icon: <Users className="h-6 w-6" />,
      title: "Clinician Workflows",
      description: "Streamlined task management and care coordination"
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: "Scheduling & Dispatch",
      description: "Intelligent routing and appointment optimization"
    },
    {
      icon: <CreditCard className="h-6 w-6" />,
      title: "Billing Integrations",
      description: "Seamless insurance and payment processing"
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: "Patient Analytics",
      description: "Comprehensive health outcome tracking"
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Team Management",
      description: "Staff scheduling and performance insights"
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure Documentation",
      description: "HIPAA-compliant record keeping"
    }
  ];

  return (
    <section id="admin-dashboard" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Admin Dashboard That 
            <span className="healthcare-text-gradient"> Powers Operations</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive management tools that give administrators complete 
            visibility and control over their healthcare operations.
          </p>
        </div>

        {/* 3D Laptop Mockup */}
        <div className="flex justify-center mb-16">
          <div className={`relative transition-all duration-1000 ${isVisible ? 'animate-scale-in' : 'opacity-0'}`}>
            <div className="relative">
              {/* Laptop Base */}
              <div className="w-96 h-6 bg-gradient-to-r from-gray-300 to-gray-400 rounded-lg shadow-lg" />
              
              {/* Laptop Screen */}
              <div 
                className={`w-96 h-64 bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-lg shadow-2xl transition-all duration-1000 origin-bottom ${laptopOpen ? 'rotate-0' : '-rotate-90'}`}
                style={{ transformOrigin: 'bottom center' }}
              >
                <div className="p-4 h-full healthcare-gradient rounded-t-lg">
                  <div className="bg-white/10 rounded-lg p-4 h-full backdrop-blur-sm">
                    {/* Mock Dashboard Content */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="h-6 bg-white/30 rounded" />
                      <div className="h-6 bg-white/30 rounded" />
                      <div className="h-6 bg-white/30 rounded" />
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-white/20 rounded w-full" />
                      <div className="h-4 bg-white/20 rounded w-3/4" />
                      <div className="h-4 bg-white/20 rounded w-1/2" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="h-16 bg-white/20 rounded-lg" />
                      <div className="h-16 bg-white/20 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Dashboard Icons */}
              <div className="absolute -top-8 -right-8 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center animate-float">
                <BarChart className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-6 -left-6 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-float" style={{animationDelay: '2s'}}>
                <Monitor className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {adminFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${index * 100} ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
            >
              <div className="medical-card p-6 rounded-xl hover-lift h-full">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 p-3 healthcare-gradient rounded-lg text-white">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
