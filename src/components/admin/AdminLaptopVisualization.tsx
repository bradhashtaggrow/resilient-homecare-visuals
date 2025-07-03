
import React from 'react';
import { BarChart, Monitor, Brain } from 'lucide-react';
import { DemoScreen } from './AdminDemoScreens';

interface AdminLaptopVisualizationProps {
  isVisible: boolean;
  laptopOpen: boolean;
  activeDemo: number;
  demoScreens: DemoScreen[];
}

const AdminLaptopVisualization = ({ 
  isVisible, 
  laptopOpen, 
  activeDemo, 
  demoScreens 
}: AdminLaptopVisualizationProps) => {
  return (
    <div className="flex justify-center mb-24">
      <div className={`relative transition-all duration-1500 ${
        isVisible ? 'animate-scale-in' : 'opacity-0'
      }`}>
        <div className="relative" style={{ perspective: '2000px' }}>
          {/* MacBook Pro Base Image */}
          <div className="relative">
            <img 
              src="/lovable-uploads/a06b72e3-b23e-4c4f-930b-6f5df0bc7d75.png" 
              alt="MacBook Pro"
              className="w-[800px] h-auto drop-shadow-2xl"
            />
            
            {/* Screen Content Overlay - positioned precisely inside the laptop screen */}
            <div 
              className={`absolute transition-all duration-2000 transform-gpu ${
                laptopOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                top: '12%',
                left: '12.5%',
                width: '75%',
                height: '47%',
                transformOrigin: 'center center',
              }}
            >
              {/* Screen Content */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 rounded-lg relative overflow-hidden shadow-inner">
                <div className="bg-black/10 rounded-lg p-4 h-full backdrop-blur-sm border border-white/5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
                    </div>
                    <div className="text-white font-bold text-sm">
                      Resilient Healthcare - Admin Console
                    </div>
                    <div className="text-white/70 text-sm">
                      7/3/2025
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="grid grid-cols-5 gap-3 h-full">
                    <div className="col-span-4 space-y-3">
                      {/* Top Stats Row */}
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: 'Active Patients', value: '247', trend: '+5%' },
                          { label: 'Team Members', value: '28', trend: '+2' },
                          { label: 'Satisfaction', value: '94.2%', trend: '+1.2%' },
                          { label: 'Revenue', value: '$127K', trend: '+12%' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/15 rounded-lg p-3 backdrop-blur-sm border border-white/10 shadow-lg">
                            <div className="text-white/70 text-xs mb-1 font-medium">{stat.label}</div>
                            <div className="text-white font-bold text-lg">{stat.value}</div>
                            <div className="text-green-400 text-xs font-semibold">{stat.trend}</div>
                          </div>
                        ))}
                      </div>

                      {/* Main Chart Area */}
                      <div className="bg-white/15 rounded-lg p-4 backdrop-blur-sm flex-1 border border-white/10 shadow-lg">
                        <div className="text-white font-bold text-sm mb-3">Patient Volume Trends</div>
                        <div className="relative h-32">
                          {/* 3D Chart Bars */}
                          <div className="flex items-end justify-between h-full space-x-2">
                            {[65, 78, 82, 71, 89, 95, 88, 92].map((height, i) => (
                              <div 
                                key={i}
                                className="relative flex-1 group"
                              >
                                {/* 3D Bar Effect */}
                                <div 
                                  className="bg-gradient-to-t from-purple-600 via-purple-400 to-pink-400 rounded-t-sm transition-all duration-1000 shadow-lg transform hover:scale-105"
                                  style={{ 
                                    height: `${height}%`,
                                    animationDelay: `${i * 150}ms`,
                                    background: `linear-gradient(45deg, rgba(147, 51, 234, 0.8), rgba(168, 85, 247, 0.9), rgba(236, 72, 153, 0.8))`,
                                    boxShadow: '0 4px 15px rgba(147, 51, 234, 0.3)'
                                  }}
                                />
                                {/* 3D Side Effect */}
                                <div 
                                  className="absolute top-0 right-0 bg-gradient-to-b from-purple-800 to-purple-900 transform skew-y-12 origin-bottom-right opacity-60"
                                  style={{ 
                                    height: `${height}%`,
                                    width: '8px',
                                    transform: 'translateX(100%) skewY(-15deg)'
                                  }}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-3">
                      {/* Dynamic Demo Content */}
                      <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm transition-all duration-500 border border-white/10 shadow-lg">
                        <div className="text-white font-bold text-xs mb-2">
                          {demoScreens[activeDemo].title}
                        </div>
                        <div className="text-xs">
                          {demoScreens[activeDemo].content}
                        </div>
                      </div>
                      
                      {/* Activity Feed */}
                      <div className="bg-white/15 rounded-lg p-3 backdrop-blur-sm border border-white/10 shadow-lg">
                        <div className="text-white font-bold text-xs mb-2">Recent Activity</div>
                        <div className="space-y-2">
                          {[
                            'Patient check-in completed',
                            'Alert: Vitals anomaly detected',
                            'Care plan updated',
                            'Team message sent'
                          ].map((activity, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <div className="text-white/80 text-xs">{activity}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* 3D Floating Dashboard Icons with enhanced animations */}
          <div className="absolute -top-16 -right-16 w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center shadow-2xl animate-float transform hover:scale-110 transition-transform duration-300" 
               style={{ 
                 boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                 transform: 'rotateX(15deg) rotateY(-15deg)'
               }}>
            <BarChart className="h-10 w-10 text-white drop-shadow-lg" />
          </div>
          
          <div className="absolute -top-12 -left-20 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-2xl animate-float transform hover:scale-110 transition-transform duration-300" 
               style={{
                 animationDelay: '2s',
                 boxShadow: '0 15px 30px rgba(59, 130, 246, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                 transform: 'rotateX(-10deg) rotateY(20deg)'
               }}>
            <Monitor className="h-8 w-8 text-white drop-shadow-lg" />
          </div>
          
          <div className="absolute -bottom-12 right-1/4 w-18 h-18 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl animate-float transform hover:scale-110 transition-transform duration-300" 
               style={{
                 animationDelay: '4s',
                 boxShadow: '0 18px 35px rgba(168, 85, 247, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                 transform: 'rotateX(10deg) rotateY(-25deg)'
               }}>
            <Brain className="h-9 w-9 text-white drop-shadow-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
