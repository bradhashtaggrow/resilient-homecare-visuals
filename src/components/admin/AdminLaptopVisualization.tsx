
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
                {/* Dark overlay for better contrast */}
                <div className="absolute inset-0 bg-black/50 rounded-2xl" />
              </div>

              {/* Admin Login Interface - Enhanced Glassmorphism */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="max-w-[320px] w-full mx-4 relative overflow-hidden rounded-3xl">
                  {/* Multi-layered glassmorphism background */}
                  <div className="absolute inset-0 backdrop-blur-3xl bg-white/[0.15] rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/5 to-transparent rounded-3xl"></div>
                  <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/20 via-transparent to-purple-500/20 rounded-3xl"></div>
                  
                  {/* Glass border effect */}
                  <div className="absolute inset-0 rounded-3xl border border-white/40 shadow-2xl shadow-black/50"></div>
                  
                  {/* Inner glass reflection */}
                  <div className="absolute inset-1 rounded-3xl bg-gradient-to-br from-white/10 via-transparent to-transparent"></div>
                  
                  {/* Content container */}
                  <div className="relative z-10 p-8">
                    {/* Resilient Healthcare Logo */}
                    <div className="text-center mb-6">
                      <div className="flex items-center justify-center mb-4">
                        <img 
                          src="/lovable-uploads/7c1e9f2c-e9a3-484c-9ce9-0e5ce0293c0e.png" 
                          alt="Resilient Healthcare" 
                          className="h-8 w-auto drop-shadow-lg filter brightness-110"
                        />
                      </div>
                    </div>

                    {/* Login Form */}
                    <div className="space-y-4">
                      {/* Email Field */}
                      <div className="space-y-2">
                        <label className="text-white/95 font-semibold text-sm flex items-center drop-shadow-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 shadow-lg shadow-blue-400/50" />
                          Email Address
                        </label>
                        <input 
                          type="text" 
                          placeholder="admin@healthcare.com"
                          className="w-full p-3 bg-white/15 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/60 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 transition-all text-sm shadow-lg"
                          defaultValue="admin@healthcare.com"
                        />
                      </div>
                      
                      {/* Password Field */}
                      <div className="space-y-2">
                        <label className="text-white/95 font-semibold text-sm flex items-center drop-shadow-sm">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 shadow-lg shadow-blue-400/50" />
                          Password
                        </label>
                        <input 
                          type="password" 
                          placeholder="••••••••"
                          className="w-full p-3 bg-white/15 backdrop-blur-sm border border-white/40 rounded-xl text-white placeholder-white/60 focus:border-blue-400/70 focus:ring-2 focus:ring-blue-400/30 transition-all text-sm shadow-lg"
                          defaultValue="••••••••"
                        />
                      </div>
                      
                      {/* Sign In Button */}
                      <div className="pt-2">
                        <button className="w-full py-3 bg-gradient-to-r from-blue-500/90 to-blue-600/90 hover:from-blue-500 hover:to-blue-600 rounded-xl text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/30 backdrop-blur-sm border border-blue-400/20">
                          Sign In
                        </button>
                      </div>

                      {/* Touch ID / Face ID */}
                      <div className="text-center pt-4">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center mb-2 border border-white/30 shadow-lg">
                          <div className="w-6 h-6 border border-white/70 rounded-full shadow-inner"></div>
                        </div>
                        <p className="text-white/80 text-sm drop-shadow-sm">Touch ID / Face ID</p>
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
