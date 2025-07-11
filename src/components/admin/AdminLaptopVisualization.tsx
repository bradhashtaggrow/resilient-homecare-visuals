
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

              {/* Admin Login Interface - Matching phone design exactly */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="max-w-sm w-full mx-8 backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-black/50 rounded-xl p-8">
                  {/* Logo Container - Matching phone exactly */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/30">
                        <Shield className="h-8 w-8 text-white drop-shadow-lg" />
                      </div>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
                      Healthcare Admin
                    </h3>
                    <p className="text-white/80 text-sm font-medium tracking-wide">
                      Secure Dashboard Access
                    </p>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mx-auto mt-3" />
                  </div>

                  {/* Login Form - Matching phone version exactly */}
                  <div className="space-y-6">
                    {/* Email Field */}
                    <div className="space-y-2">
                      <label className="text-white/90 font-semibold text-xs tracking-wide flex items-center">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2" />
                        Email Address
                      </label>
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="admin@healthcare.com"
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all shadow-lg text-sm"
                          defaultValue="admin@healthcare.com"
                        />
                      </div>
                    </div>
                    
                    {/* Password Field */}
                    <div className="space-y-2">
                      <label className="text-white/90 font-semibold text-xs tracking-wide flex items-center">
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full mr-2" />
                        Password
                      </label>
                      <div className="relative">
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full p-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all shadow-lg text-sm"
                          defaultValue="••••••••"
                        />
                      </div>
                    </div>
                    
                    {/* Sign In Button - Matching phone version exactly */}
                    <button className="w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-lg text-white font-bold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm flex items-center justify-center mx-auto">
                      Sign In
                    </button>

                    {/* Biometric - Matching phone version exactly */}
                    <div className="text-center py-4">
                      <div className="w-10 h-10 bg-white/25 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center shadow-lg">
                        <div className="w-6 h-6 border-2 border-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-white/60 text-xs mt-2">Touch ID / Face ID</p>
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
