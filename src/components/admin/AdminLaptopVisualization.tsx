
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
        <div className="relative" style={{ perspective: '1000px' }}>
          {/* Laptop Base - More realistic proportions */}
          <div className="w-[700px] h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 rounded-xl shadow-2xl relative">
            {/* Base depth effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-600 to-gray-800 rounded-xl transform translate-y-1"></div>
            {/* Trackpad */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-24 h-4 bg-gray-800 rounded border border-gray-500"></div>
          </div>
          
          {/* Laptop Screen - Fixed animation */}
          <div 
            className={`w-[700px] h-[440px] bg-gradient-to-br from-gray-900 to-black rounded-t-2xl shadow-2xl transition-all duration-2000 origin-bottom border-2 border-gray-800 relative ${
              laptopOpen ? 'transform rotate-0' : 'transform -rotate-x-90'
            }`}
            style={{ 
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: laptopOpen ? 'rotateX(0deg)' : 'rotateX(-90deg)'
            }}
          >
            {/* Screen bezel */}
            <div className="absolute inset-2 bg-black rounded-xl">
              {/* Actual screen content */}
              <div className="p-6 h-full healthcare-gradient rounded-xl relative overflow-hidden">
                {/* Screen Content */}
                <div className="bg-black/20 rounded-xl p-4 h-full backdrop-blur-sm border border-white/10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/20">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="text-white font-semibold text-sm">
                      Resilient Healthcare - Admin Console
                    </div>
                    <div className="text-white/60 text-xs">
                      {new Date().toLocaleDateString()}
                    </div>
                  </div>

                  {/* Dynamic Dashboard Content */}
                  <div className="grid grid-cols-4 gap-3 h-full">
                    <div className="col-span-3 space-y-3">
                      {/* Top Stats Row */}
                      <div className="grid grid-cols-4 gap-3">
                        {[
                          { label: 'Active Patients', value: '247', trend: '+5%' },
                          { label: 'Team Members', value: '28', trend: '+2' },
                          { label: 'Satisfaction', value: '94.2%', trend: '+1.2%' },
                          { label: 'Revenue', value: '$127K', trend: '+12%' }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                            <div className="text-white/60 text-xs mb-1">{stat.label}</div>
                            <div className="text-white font-bold text-sm">{stat.value}</div>
                            <div className="text-green-400 text-xs">{stat.trend}</div>
                          </div>
                        ))}
                      </div>

                      {/* Main Chart Area */}
                      <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm h-48">
                        <div className="text-white font-semibold text-sm mb-3">Patient Volume Trends</div>
                        <div className="relative h-full">
                          {/* Animated Chart Bars */}
                          <div className="flex items-end justify-between h-full space-x-1">
                            {[65, 78, 82, 71, 89, 95, 88, 92].map((height, i) => (
                              <div 
                                key={i}
                                className="bg-gradient-to-t from-blue-400 to-purple-400 rounded-t transition-all duration-1000 flex-1"
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
                    <div className="space-y-3">
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm transition-all duration-500">
                        {demoScreens[activeDemo].content}
                      </div>
                      
                      {/* Activity Feed */}
                      <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm">
                        <div className="text-white font-semibold text-xs mb-2">Recent Activity</div>
                        <div className="space-y-1">
                          {[
                            'Patient check-in completed',
                            'Alert: Vitals anomaly detected',
                            'Care plan updated',
                            'Team message sent'
                          ].map((activity, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
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
            
            {/* Apple logo or brand mark */}
            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white/20 rounded-full"></div>
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
  );
};

export default AdminLaptopVisualization;
