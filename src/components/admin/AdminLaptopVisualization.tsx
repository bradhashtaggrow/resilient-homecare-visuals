
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
        <div className="relative" style={{ perspective: '1500px', perspectiveOrigin: 'center bottom' }}>
          
          {/* Laptop Base (Bottom Part - Keyboard) */}
          <div 
            className="relative w-[900px] h-[420px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-3xl shadow-2xl"
            style={{
              transform: 'rotateX(75deg) translateZ(0px)',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center bottom'
            }}
          >
            {/* Keyboard Area */}
            <div className="absolute inset-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
              {/* Keyboard Keys Grid */}
              <div className="grid grid-cols-14 gap-2 h-full">
                {Array.from({ length: 70 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-gray-700 rounded-md shadow-sm border border-gray-600"
                    style={{ height: '18px' }}
                  />
                ))}
              </div>
              
              {/* Trackpad */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-36 h-24 bg-gray-800 rounded-xl border border-gray-600 shadow-inner" />
            </div>
          </div>

          {/* Laptop Screen (Top Part) */}
          <div 
            className={`absolute top-0 left-0 w-[900px] h-[560px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-t-3xl shadow-2xl transition-all duration-2000 ease-out border-4 border-gray-600`}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: laptopOpen 
                ? 'rotateX(0deg) translateY(-400px) translateZ(0px)' 
                : 'rotateX(-95deg) translateY(-400px) translateZ(0px)'
            }}
          >
            {/* Screen Bezel */}
            <div className="absolute inset-6 bg-black rounded-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="w-full h-full healthcare-gradient p-8 relative overflow-hidden">
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/20">
                  {/* Left: Logo and Window Controls */}
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-red-400 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg"></div>
                    </div>
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                        <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                      </div>
                      <span className="text-white font-bold text-lg">Resilient Healthcare</span>
                    </div>
                  </div>
                  
                  {/* Center: Title */}
                  <div className="text-white font-semibold text-xl">
                    Admin Console
                  </div>
                  
                  {/* Right: User Profile */}
                  <div className="flex items-center space-x-4">
                    <div className="text-white/60 text-sm">
                      {new Date().toLocaleDateString()}
                    </div>
                    <div className="flex items-center space-x-3 bg-white/10 rounded-full px-4 py-2 backdrop-blur-sm border border-white/20">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-white font-medium text-sm">Dr. Sarah Chen</span>
                      <ChevronDown className="h-4 w-4 text-white/60" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="grid grid-cols-4 gap-8 h-full">
                  <div className="col-span-3 space-y-8">
                    {/* Top Stats Row */}
                    <div className="grid grid-cols-4 gap-6">
                      {[
                        { label: 'Active Patients', value: '247', trend: '+5%', color: 'from-blue-500 to-blue-600' },
                        { label: 'Team Members', value: '28', trend: '+2', color: 'from-green-500 to-green-600' },
                        { label: 'Satisfaction', value: '94.2%', trend: '+1.2%', color: 'from-purple-500 to-purple-600' },
                        { label: 'Revenue', value: '$127K', trend: '+12%', color: 'from-orange-500 to-orange-600' }
                      ].map((stat, i) => (
                        <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 backdrop-blur-sm shadow-lg`}>
                          <div className="text-white/80 text-xs mb-2 font-medium">{stat.label}</div>
                          <div className="text-white font-bold text-2xl mb-1">{stat.value}</div>
                          <div className="text-white/90 text-sm font-semibold">{stat.trend}</div>
                        </div>
                      ))}
                    </div>

                    {/* Main Chart Area */}
                    <div className="bg-white/10 rounded-xl p-8 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-xl mb-6">Patient Volume Trends</div>
                      <div className="relative h-56">
                        {/* Animated Chart Bars */}
                        <div className="flex items-end justify-between h-full space-x-3">
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
                    {/* Additional Stats Card */}
                    <div className="bg-white/15 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-sm mb-4">Active Patients</div>
                      <div className="text-white font-bold text-3xl mb-2">247</div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-white/70">89% On Track</span>
                        <span className="text-white/70">7 At Risk</span>
                      </div>
                    </div>
                    
                    {/* Dynamic Demo Content */}
                    <div className="bg-white/15 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-500">
                      {demoScreens[activeDemo].content}
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-sm mb-4">Recent Activity</div>
                      <div className="space-y-4">
                        {[
                          { text: 'Patient check-in completed', color: 'bg-green-400', time: '2m ago' },
                          { text: 'Alert: Vitals anomaly detected', color: 'bg-red-400', time: '5m ago' },
                          { text: 'Care plan updated', color: 'bg-blue-400', time: '12m ago' },
                          { text: 'Team message sent', color: 'bg-purple-400', time: '18m ago' }
                        ].map((activity, i) => (
                          <div key={i} className="flex items-start space-x-3">
                            <div className={`w-2 h-2 ${activity.color} rounded-full shadow-sm mt-2`}></div>
                            <div className="flex-1">
                              <div className="text-white/80 text-xs font-medium">{activity.text}</div>
                              <div className="text-white/50 text-xs mt-1">{activity.time}</div>
                            </div>
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
          <div className="absolute -bottom-12 right-1/4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{animationDelay: '4s'}}>
            <Brain className="h-8 w-8 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
