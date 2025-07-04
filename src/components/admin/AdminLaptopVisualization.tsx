
import React from 'react';
import { BarChart, Monitor, Brain, ChevronDown, User } from 'lucide-react';
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
        {/* 3D Container */}
        <div className="relative" style={{ perspective: '1500px', perspectiveOrigin: 'center center' }}>
          
          {/* Laptop Base (Bottom Part - Keyboard) */}
          <div 
            className="relative w-[900px] h-[400px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-3xl shadow-2xl"
            style={{
              transform: 'rotateX(60deg) translateZ(0px)',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center bottom'
            }}
          >
            {/* Keyboard Area */}
            <div className="absolute inset-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
              {/* Keyboard Keys Grid */}
              <div className="grid grid-cols-14 gap-2 h-3/4">
                {Array.from({ length: 70 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-700 rounded-md shadow-sm border border-gray-600"
                    style={{ height: '18px' }}
                  />
                ))}
              </div>
              
              {/* Trackpad */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-32 h-20 bg-gray-800 rounded-xl border border-gray-600 shadow-inner" />
            </div>
          </div>

          {/* Laptop Screen (Top Part) */}
          <div 
            className={`absolute top-0 left-0 w-[900px] h-[560px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-t-3xl shadow-2xl transition-all duration-2000 ease-out border-4 border-gray-600`}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: laptopOpen 
                ? 'rotateX(0deg) translateY(-380px) translateZ(20px)' 
                : 'rotateX(-90deg) translateY(-380px) translateZ(20px)'
            }}
          >
            {/* Screen Bezel */}
            <div className="absolute inset-6 bg-black rounded-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="w-full h-full healthcare-gradient relative overflow-hidden">
                
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between px-6 py-4 bg-black/20 backdrop-blur-sm border-b border-white/10">
                  {/* Left: Logo */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                    </div>
                    <span className="text-white font-bold text-lg">Resilient Healthcare</span>
                  </div>
                  
                  {/* Right: User Profile */}
                  <div className="flex items-center space-x-3">
                    <span className="text-white/80 text-sm">Dr. Sarah Chen</span>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-white/60" />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-6 h-full">
                  <div className="grid grid-cols-4 gap-6 h-full">
                    
                    {/* Main Content Area */}
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
                            <div className="text-white font-bold text-xl mb-1">{stat.value}</div>
                            <div className="text-white/90 text-xs font-semibold">{stat.trend}</div>
                          </div>
                        ))}
                      </div>

                      {/* Main Chart Area */}
                      <div className="bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg flex-1">
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
                    <div className="space-y-4">
                      {/* Quick Stats */}
                      <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-lg">
                        <div className="text-white font-semibold text-sm mb-3">Quick Stats</div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Online</span>
                            <span className="text-white font-bold">23/28</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Active</span>
                            <span className="text-white font-bold">15</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-white/70">Available</span>
                            <span className="text-white font-bold">8</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Dynamic Demo Content */}
                      <div className="bg-white/15 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-500">
                        {demoScreens[activeDemo].content}
                      </div>
                      
                      {/* Activity Feed */}
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/20 shadow-lg">
                        <div className="text-white font-semibold text-sm mb-3">Recent Activity</div>
                        <div className="space-y-3">
                          {[
                            { text: 'Patient check-in completed', color: 'bg-green-400', time: '2m' },
                            { text: 'Alert: Vitals anomaly', color: 'bg-red-400', time: '5m' },
                            { text: 'Care plan updated', color: 'bg-blue-400', time: '12m' },
                            { text: 'Team message sent', color: 'bg-purple-400', time: '18m' }
                          ].map((activity, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 ${activity.color} rounded-full shadow-sm mt-2`}></div>
                              <div className="flex-1">
                                <div className="text-white/80 text-xs font-medium">{activity.text}</div>
                                <div className="text-white/50 text-xs mt-1">{activity.time} ago</div>
                              </div>
                            </div>
                          ))}
                        </div>
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
          <div className="absolute -bottom-12 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '4s'}}>
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
