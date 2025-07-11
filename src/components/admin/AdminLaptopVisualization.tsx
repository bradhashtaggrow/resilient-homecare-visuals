
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

              {/* Admin Login Interface - Real UI from /login */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="max-w-xs w-full mx-6 rounded-xl p-6">
                  {/* Resilient Healthcare Logo */}
                  <div className="text-center mb-6">
                    <img 
                      src="/lovable-uploads/5a772b80-d2b2-4229-9e36-55d6ed4eb178.png" 
                      alt="Resilient Healthcare"
                      className="h-16 mx-auto mb-4"
                    />
                    <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mx-auto mt-2" />
                  </div>

                  {/* Login Form */}
                  <div className="space-y-4">
                    {/* Enhanced Email Field */}
                    <div className="space-y-2">
                      <label className="text-white/90 font-semibold text-xs tracking-wide flex items-center">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Enter your email"
                          className="w-full p-3 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 rounded-lg border text-sm"
                          defaultValue="admin@healthcare.com"
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced Password Field */}
                    <div className="space-y-2">
                      <label className="text-white/90 font-semibold text-xs tracking-wide flex items-center">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2" />
                        Password
                      </label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="Enter your password"
                          className="w-full p-3 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 rounded-lg border text-sm"
                          defaultValue="••••••••"
                        />
                      </div>
                    </div>
                    
                    {/* Enhanced Submit Button */}
                    <button className="w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 rounded-lg text-sm flex items-center justify-center">
                      <Lock className="mr-2 h-4 w-4" />
                      <span className="tracking-wide">Sign In</span>
                    </button>

                    {/* Biometric */}
                    <div className="text-center py-2">
                      <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 border-2 border-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-white/60 text-xs mt-1">Touch ID / Face ID</p>
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
