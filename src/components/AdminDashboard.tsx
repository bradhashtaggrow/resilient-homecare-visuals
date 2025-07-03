
import React, { useEffect, useState } from 'react';
import { Monitor, Users, Calendar, CreditCard, BarChart, Shield, Activity, Brain, Zap, Database } from 'lucide-react';

const AdminDashboard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [laptopOpen, setLaptopOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setLaptopOpen(true), 800);
          }
        });
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('admin-dashboard');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (laptopOpen) {
      const interval = setInterval(() => {
        setActiveDemo((prev) => (prev + 1) % 4);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [laptopOpen]);

  const adminFeatures = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: "AI-Powered Workflows",
      description: "Intelligent task automation and predictive care coordination",
      metric: "40% faster",
      color: "purple"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Real-time Dispatch",
      description: "Lightning-fast routing with traffic and availability optimization",
      metric: "2.3 min",
      color: "yellow"
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Smart Billing Hub",
      description: "Automated insurance processing with 99.7% accuracy rate",
      metric: "99.7%",
      color: "green"
    },
    {
      icon: <Activity className="h-8 w-8" />,
      title: "Advanced Analytics",
      description: "ML-driven insights for population health management",
      metric: "15+ KPIs",
      color: "blue"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Team Orchestration",
      description: "Dynamic scheduling with skill-based assignment algorithms",
      metric: "95% efficiency",
      color: "teal"
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Unified Records",
      description: "FHIR-compliant documentation with blockchain security",
      metric: "Zero breaches",
      color: "indigo"
    }
  ];

  const demoScreens = [
    {
      title: "Patient Overview",
      content: (
        <div className="space-y-3">
          <div className="flex justify-between items-center text-white">
            <span className="text-sm opacity-80">Active Patients</span>
            <span className="font-bold">247</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-green-500/20 rounded p-2 text-center">
              <div className="text-lg font-bold text-white">89%</div>
              <div className="text-xs text-green-200">On Track</div>
            </div>
            <div className="bg-orange-500/20 rounded p-2 text-center">
              <div className="text-lg font-bold text-white">7</div>
              <div className="text-xs text-orange-200">At Risk</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Care Team Status",
      content: (
        <div className="space-y-3">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-white">
              <span className="text-sm">Available Clinicians</span>
              <span className="font-bold">23/28</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full w-4/5"></div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 text-center">
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">12</div>
              <div className="text-xs text-white/60">On Route</div>
            </div>
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">8</div>
              <div className="text-xs text-white/60">In Session</div>
            </div>
            <div className="bg-white/10 rounded p-1">
              <div className="text-sm font-bold text-white">3</div>
              <div className="text-xs text-white/60">Standby</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Performance Metrics",
      content: (
        <div className="space-y-3">
          <div className="text-center text-white mb-3">
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs opacity-80">Patient Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-white text-sm">
              <span>Response Time</span>
              <span className="font-bold">4.2 min</span>
            </div>
            <div className="flex justify-between text-white text-sm">
              <span>Completion Rate</span>
              <span className="font-bold">98.7%</span>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Revenue Dashboard",
      content: (
        <div className="space-y-3">
          <div className="text-center text-white">
            <div className="text-xl font-bold">$127K</div>
            <div className="text-xs opacity-80">This Month</div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-sm font-bold text-white">+12%</div>
              <div className="text-xs text-white/60">vs Last Month</div>
            </div>
            <div className="bg-white/10 rounded p-2 text-center">
              <div className="text-sm font-bold text-white">$2.1K</div>
              <div className="text-xs text-white/60">Per Patient</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section id="admin-dashboard" className="py-32 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${2 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'animate-slide-up' : 'opacity-0'
        }`}>
          <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-6 py-3 rounded-full text-sm font-medium mb-8 backdrop-blur-sm">
            <Monitor className="h-4 w-4" />
            <span>Revolutionary Admin Console</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
            Admin Dashboard That 
            <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"> Powers Operations</span>
          </h2>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Next-generation management tools with AI-powered insights that give 
            administrators unprecedented visibility and control.
          </p>
        </div>

        {/* Revolutionary 3D Laptop */}
        <div className="flex justify-center mb-24">
          <div className={`relative transition-all duration-1500 ${
            isVisible ? 'animate-scale-in' : 'opacity-0'
          }`}>
            <div className="relative perspective-1000">
              {/* Laptop Base */}
              <div className="w-[800px] h-8 bg-gradient-to-r from-gray-600 to-gray-500 rounded-2xl shadow-2xl transform-gpu" 
                   style={{ transformStyle: 'preserve-3d' }} />
              
              {/* Laptop Screen */}
              <div 
                className={`w-[800px] h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-t-3xl shadow-2xl transition-all duration-2000 origin-bottom border-4 border-gray-700 ${
                  laptopOpen ? 'rotate-x-0' : '-rotate-x-90'
                }`}
                style={{ 
                  transformOrigin: 'bottom center',
                  transformStyle: 'preserve-3d'
                }}
              >
                <div className="p-8 h-full healthcare-gradient rounded-t-2xl relative overflow-hidden">
                  {/* Screen Content */}
                  <div className="bg-black/20 rounded-2xl p-6 h-full backdrop-blur-sm border border-white/10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-white font-semibold">
                        Resilient Healthcare - Admin Console
                      </div>
                      <div className="text-white/60 text-sm">
                        {new Date().toLocaleDateString()}
                      </div>
                    </div>

                    {/* Dynamic Dashboard Content */}
                    <div className="grid grid-cols-4 gap-4 h-full">
                      <div className="col-span-3 space-y-4">
                        {/* Top Stats Row */}
                        <div className="grid grid-cols-4 gap-4">
                          {[
                            { label: 'Active Patients', value: '247', trend: '+5%' },
                            { label: 'Team Members', value: '28', trend: '+2' },
                            { label: 'Satisfaction', value: '94.2%', trend: '+1.2%' },
                            { label: 'Revenue', value: '$127K', trend: '+12%' }
                          ].map((stat, i) => (
                            <div key={i} className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                              <div className="text-white/60 text-xs mb-1">{stat.label}</div>
                              <div className="text-white font-bold text-lg">{stat.value}</div>
                              <div className="text-green-400 text-xs">{stat.trend}</div>
                            </div>
                          ))}
                        </div>

                        {/* Main Chart Area */}
                        <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm h-64">
                          <div className="text-white font-semibold mb-4">Patient Volume Trends</div>
                          <div className="relative h-full">
                            {/* Animated Chart Bars */}
                            <div className="flex items-end justify-between h-full space-x-2">
                              {[65, 78, 82, 71, 89, 95, 88, 92].map((height, i) => (
                                <div 
                                  key={i}
                                  className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-t-lg transition-all duration-1000 flex-1"
                                  style={{ 
                                    height: `${height}%`,
                                    animationDelay: `${i * 200}ms`
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Sidebar */}
                      <div className="space-y-4">
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm transition-all duration-500">
                          {demoScreens[activeDemo].content}
                        </div>
                        
                        {/* Activity Feed */}
                        <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                          <div className="text-white font-semibold text-sm mb-3">Recent Activity</div>
                          <div className="space-y-2">
                            {[
                              'Patient check-in completed',
                              'Alert: Vitals anomaly detected',
                              'Care plan updated',
                              'Team message sent'
                            ].map((activity, i) => (
                              <div key={i} className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <div className="text-white/70 text-xs">{activity}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Dashboard Icons */}
              <div className="absolute -top-12 -right-12 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center animate-float shadow-2xl">
                <BarChart className="h-8 w-8 text-white" />
              </div>
              <div className="absolute -top-8 -left-16 w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '2s'}}>
                <Monitor className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-8 right-1/4 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '4s'}}>
                <Brain className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Revolutionary Feature Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adminFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`transition-all duration-1000 delay-${index * 150} ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
            >
              <div className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl hover-lift h-full border border-white/10 group hover:bg-white/10 transition-all duration-500">
                <div className="flex items-start space-x-6">
                  <div className={`flex-shrink-0 p-4 rounded-2xl text-white transition-all duration-500 group-hover:scale-110 ${
                    feature.color === 'purple' ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                    feature.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                    feature.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    feature.color === 'blue' ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    feature.color === 'teal' ? 'bg-gradient-to-r from-teal-500 to-blue-500' :
                    'bg-gradient-to-r from-indigo-500 to-purple-500'
                  }`}>
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {feature.description}
                    </p>
                    <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
                      <Activity className="h-4 w-4" />
                      <span>{feature.metric}</span>
                    </div>
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
