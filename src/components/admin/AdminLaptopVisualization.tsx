
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
  );
};

export default AdminLaptopVisualization;
