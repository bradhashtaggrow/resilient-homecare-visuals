
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
    <div className="flex justify-center">
      <div className={`relative transition-all duration-1500 ${
        isVisible ? 'animate-scale-in' : 'opacity-0'
      }`} style={{ marginTop: '3.5in' }}>
        {/* 3D Container */}
        <div className="relative" style={{ perspective: '2000px', perspectiveOrigin: 'center center' }}>
          
          {/* Laptop Base (Bottom Part - Keyboard) */}
          <div 
            className="relative w-[800px] h-[400px] bg-gradient-to-br from-gray-700 via-gray-600 to-gray-500 rounded-3xl shadow-2xl"
            style={{
              transform: 'rotateX(75deg) translateZ(-20px)',
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Keyboard Area */}
            <div className="absolute inset-4 bg-gradient-to-br from-gray-800 to-gray-700 rounded-2xl p-6">
              {/* Keyboard Keys Grid */}
              <div className="grid grid-cols-12 gap-1 h-full">
                {Array.from({ length: 60 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-600 rounded-sm shadow-sm border border-gray-500"
                    style={{ height: '20px' }}
                  />
                ))}
              </div>
              
              {/* Trackpad */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gray-800 rounded-xl border border-gray-500 shadow-inner" />
            </div>
          </div>

          {/* Laptop Screen (Top Part) */}
          <div 
            className={`absolute top-0 left-0 w-[800px] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-t-3xl shadow-2xl transition-all duration-2000 ease-out border-4 border-gray-600`}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: laptopOpen 
                ? 'rotateX(0deg) translateY(-380px) translateZ(0px)' 
                : 'rotateX(-90deg) translateY(-380px) translateZ(0px)'
            }}
          >
            {/* Screen Bezel */}
            <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="w-full h-full healthcare-gradient p-6 relative overflow-hidden">
                {/* macOS-style Window Controls */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/20">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                  </div>
                  <div className="text-white font-semibold text-lg">
                    Resilient Healthcare - Admin Console
                  </div>
                  <div className="text-white/60 text-sm">
                    {new Date().toLocaleDateString()}
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-4 gap-6 h-full">
                  <div className="col-span-3 space-y-6">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { label: 'Active Patients', value: '247', trend: '+5%', color: 'from-blue-500 to-blue-600' },
                        { label: 'Team Members', value: '28', trend: '+2', color: 'from-green-500 to-green-600' },
                        { label: 'Satisfaction', value: '94.2%', trend: '+1.2%', color: 'from-purple-500 to-purple-600' },
                        { label: 'Revenue', value: '$127K', trend: '+12%', color: 'from-orange-500 to-orange-600' }
                      ].map((stat, i) => (
                        <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 backdrop-blur-sm shadow-lg`}>
                          <div className="text-white/80 text-xs mb-1 font-medium">{stat.label}</div>
                          <div className="text-white font-bold text-xl">{stat.value}</div>
                          <div className="text-white/90 text-xs font-semibold">{stat.trend}</div>
                        </div>
                      ))}
                    </div>

                    {/* Main Chart Area */}
                    <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-lg mb-4">Patient Volume Trends</div>
                      <div className="relative h-48">
                        {/* Animated Chart Bars */}
                        <div className="flex items-end justify-between h-full space-x-2">
                          {[65, 78, 82, 71, 89, 95, 88, 92, 76, 84].map((height, i) => (
                            <div 
                              key={i}
                              className="bg-gradient-to-t from-cyan-400 to-blue-500 rounded-t-lg transition-all duration-1000 flex-1 shadow-lg"
                              style={{ 
                                height: `${height}%`,
                                animationDelay: `${i * 150}ms`,
                                transform: laptopOpen ? 'scaleY(1)' : 'scaleY(0)',
                                transformOrigin: 'bottom'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="space-y-6">
                    {/* Dynamic Demo Content */}
                    <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-500">
                      {demoScreens[activeDemo].content}
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-sm mb-3">Recent Activity</div>
                      <div className="space-y-3">
                        {[
                          { text: 'Patient check-in completed', color: 'bg-green-400' },
                          { text: 'Alert: Vitals anomaly detected', color: 'bg-red-400' },
                          { text: 'Care plan updated', color: 'bg-blue-400' },
                          { text: 'Team message sent', color: 'bg-purple-400' }
                        ].map((activity, i) => (
                          <div key={i} className="flex items-center space-x-3">
                            <div className={`w-2 h-2 ${activity.color} rounded-full shadow-sm`}></div>
                            <div className="text-white/80 text-xs font-medium">{activity.text}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-t-3xl pointer-events-none" />
          </div>
          
          {/* Floating Dashboard Icons */}
          <div className="absolute -top-16 -right-16 w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center animate-float shadow-2xl">
            <BarChart className="h-8 w-8 text-white" />
          </div>
          <div className="absolute -top-12 -left-20 w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '2s'}}>
            <Monitor className="h-7 w-7 text-white" />
          </div>
          {/* Brain icon moved to top of laptop */}
          <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '4s'}}>
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
