
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
        <div className="relative" style={{ perspective: '1500px' }}>
          
          {/* Laptop Base */}
          <div 
            className="relative w-[900px] h-[400px] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 rounded-3xl shadow-2xl"
            style={{
              transform: 'rotateX(75deg) translateZ(0px)',
              transformStyle: 'preserve-3d',
              transformOrigin: 'center bottom'
            }}
          >
            {/* Keyboard Area */}
            <div className="absolute inset-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8">
              {/* Keyboard Keys */}
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

          {/* Laptop Screen */}
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
            <div className="absolute inset-4 bg-gray-900 rounded-2xl overflow-hidden">
              {/* Screen Content */}
              <div className="w-full h-full bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden">
                
                {/* Top Navigation Bar */}
                <div className="flex items-center justify-between px-8 py-4 bg-black/30 backdrop-blur-sm border-b border-white/10">
                  {/* Left: Logo */}
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-5 h-5 bg-blue-500 rounded-sm"></div>
                    </div>
                    <span className="text-white font-bold text-xl">Resilient Healthcare</span>
                  </div>
                  
                  {/* Right: User Profile */}
                  <div className="flex items-center space-x-4">
                    <span className="text-white/90 font-medium">Dr. Sarah Chen</span>
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <ChevronDown className="h-4 w-4 text-white/70" />
                  </div>
                </div>

                {/* Dashboard Content */}
                <div className="p-8">
                  {/* Top Stats Row */}
                  <div className="grid grid-cols-5 gap-6 mb-8">
                    {/* Main Stats */}
                    <div className="col-span-4 grid grid-cols-4 gap-4">
                      {[
                        { label: 'Active Patients', value: '247', trend: '+5%', color: 'from-blue-500 to-blue-600' },
                        { label: 'Team Members', value: '28', trend: '+2', color: 'from-green-500 to-green-600' },
                        { label: 'Satisfaction', value: '94.2%', trend: '+1.2%', color: 'from-purple-500 to-purple-600' },
                        { label: 'Revenue', value: '$127K', trend: '+12%', color: 'from-orange-500 to-orange-600' }
                      ].map((stat, i) => (
                        <div key={i} className={`bg-gradient-to-br ${stat.color} rounded-xl p-5 backdrop-blur-sm shadow-lg`}>
                          <div className="text-white/80 text-sm font-medium mb-2">{stat.label}</div>
                          <div className="text-white font-bold text-2xl mb-1">{stat.value}</div>
                          <div className="text-white/90 text-sm font-semibold">{stat.trend}</div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Quick Stats Sidebar */}
                    <div className="bg-white/15 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-lg mb-4">Quick Stats</div>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">Online</span>
                          <span className="text-white font-bold">23/28</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">Active</span>
                          <span className="text-white font-bold">15</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-white/80 text-sm">Available</span>
                          <span className="text-white font-bold">8</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Main Content Row */}
                  <div className="grid grid-cols-5 gap-6">
                    {/* Chart Area */}
                    <div className="col-span-3 bg-white/10 rounded-xl p-6 backdrop-blur-sm border border-white/20 shadow-lg">
                      <div className="text-white font-semibold text-xl mb-6">Patient Volume Trends</div>
                      <div className="relative h-64">
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

                    {/* Right Sidebar */}
                    <div className="col-span-2 space-y-6">
                      {/* Performance Metrics */}
                      <div className="bg-white/15 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg">
                        <div className="text-center text-white mb-4">
                          <div className="text-3xl font-bold">94.2%</div>
                          <div className="text-sm opacity-80">Patient Satisfaction</div>
                        </div>
                        <div className="space-y-3">
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
                      
                      {/* Dynamic Demo Content */}
                      <div className="bg-white/15 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg transition-all duration-500">
                        {demoScreens[activeDemo].content}
                      </div>
                      
                      {/* Recent Activity */}
                      <div className="bg-white/10 rounded-xl p-5 backdrop-blur-sm border border-white/20 shadow-lg">
                        <div className="text-white font-semibold text-lg mb-4">Recent Activity</div>
                        <div className="space-y-3">
                          {[
                            { text: 'Patient check-in completed', color: 'bg-green-400', time: '2m' },
                            { text: 'Alert: Vitals anomaly', color: 'bg-red-400', time: '5m' },
                            { text: 'Care plan updated', color: 'bg-blue-400', time: '12m' }
                          ].map((activity, i) => (
                            <div key={i} className="flex items-start space-x-3">
                              <div className={`w-2 h-2 ${activity.color} rounded-full shadow-sm mt-2`}></div>
                              <div className="flex-1">
                                <div className="text-white/90 text-sm font-medium">{activity.text}</div>
                                <div className="text-white/60 text-xs mt-1">{activity.time} ago</div>
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

            {/* Screen Reflection */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-t-3xl pointer-events-none" />
          </div>
          
          {/* Floating Icons */}
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
