
import React from 'react';
import { Brain, Zap, CreditCard, Activity, Users, Database } from 'lucide-react';

interface AdminFeature {
  icon: React.ReactNode;
  title: string;
  description: string;
  metric: string;
  color: string;
}

const AdminFeaturesGrid = ({ isVisible }: { isVisible: boolean }) => {
  const adminFeatures: AdminFeature[] = [
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

  const getGradientClass = (color: string) => {
    switch (color) {
      case 'purple': return 'bg-gradient-to-r from-purple-500 to-pink-500';
      case 'yellow': return 'bg-gradient-to-r from-yellow-500 to-orange-500';
      case 'green': return 'bg-gradient-to-r from-green-500 to-emerald-500';
      case 'blue': return 'bg-gradient-to-r from-blue-500 to-cyan-500';
      case 'teal': return 'bg-gradient-to-r from-teal-500 to-blue-500';
      default: return 'bg-gradient-to-r from-indigo-500 to-purple-500';
    }
  };

  return (
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
              <div className={`flex-shrink-0 p-4 rounded-2xl text-white transition-all duration-500 group-hover:scale-110 ${getGradientClass(feature.color)}`}>
                {feature.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3 group-hover:text-blue-300 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed font-light">
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
  );
};

export default AdminFeaturesGrid;
