
import React from 'react';
import { BarChart, Monitor, Brain, Shield, Lock } from 'lucide-react';
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
    <div className="flex justify-center bg-gray-900">
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
            className={`absolute top-0 left-0 w-[800px] h-[500px] bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-3xl shadow-2xl transition-all duration-2000 ease-out border-4 border-gray-600`}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              transform: laptopOpen 
                ? 'rotateX(0deg) translateY(-380px) translateZ(0px)' 
                : 'rotateX(-90deg) translateY(-380px) translateZ(0px)',
              borderRadius: '24px'
            }}
          >
            {/* Screen Content with HD Video Background */}
            <div className="w-full h-full relative overflow-hidden rounded-2xl">
              {/* HD Video Background - Same as landing page */}
              <div className="absolute inset-0 z-0">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                >
                  <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                </video>
                {/* Minimal dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/30 rounded-2xl" />
              </div>

              {/* Admin Login Interface - With Resilient logo */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="max-w-[400px] w-full mx-4 backdrop-blur-xl bg-white/5 border border-white/10 shadow-2xl rounded-3xl p-8 relative">
                  {/* Subtle glass overlay effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-white/3 to-white/1 rounded-3xl pointer-events-none backdrop-blur-md"></div>
                  
                  <div className="relative z-10">
                    {/* Blue Globe/Shield Icon */}
                    <div className="text-center mb-8">
                      <div className="w-20 h-20 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg relative">
                        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
                          <div className="w-6 h-6 border border-white rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        </div>
                        <Shield className="w-4 h-4 text-white absolute top-2 right-2" />
                      </div>
                      <h2 className="text-white text-2xl font-bold mb-3">Healthcare Admin</h2>
                      <p className="text-white/60 text-base mb-4">Secure Dashboard Access</p>
                      <div className="w-16 h-1 bg-blue-500 mx-auto rounded-full"></div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-6">
                      {/* Email Field */}
                      <div className="space-y-3">
                        <label className="text-white/90 font-medium text-sm flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          Email Address
                        </label>
                        <input 
                          type="text" 
                          placeholder="Enter your email"
                          className="w-full p-4 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all text-base"
                        />
                      </div>
                      
                      {/* Password Field */}
                      <div className="space-y-3">
                        <label className="text-white/90 font-medium text-sm flex items-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          Password
                        </label>
                        <div className="relative">
                          <input 
                            type="password" 
                            placeholder="Enter your password"
                            className="w-full p-4 bg-white/8 backdrop-blur-sm border border-white/15 rounded-2xl text-white placeholder-white/40 focus:border-blue-400 focus:ring-1 focus:ring-blue-400/50 transition-all text-base pr-14"
                          />
                          <button className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white/70">
                            <Brain className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      
                      {/* Access Button */}
                      <div className="pt-6">
                        <button className="w-full py-4 bg-blue-500 hover:bg-blue-600 rounded-2xl text-white font-semibold text-base transition-all duration-200 flex items-center justify-center gap-3">
                          <Lock className="w-5 h-5" />
                          Access Admin Dashboard
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
