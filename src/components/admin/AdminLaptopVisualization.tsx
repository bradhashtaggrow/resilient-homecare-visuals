
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
            {/* Screen Bezel */}
            <div className="absolute inset-4 bg-black rounded-2xl overflow-hidden">
              {/* Screen Content with Video Background */}
              <div className="w-full h-full relative overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl"
                    poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Crect fill='%23003D6B' width='1920' height='1080'/%3E%3C/svg%3E"
                  >
                    <source src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4" type="video/mp4" />
                  </video>
                  {/* Video overlay for UI visibility */}
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] rounded-2xl" />
                </div>

                {/* Admin Login Interface - Over Video - Made Smaller */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <div className="max-w-xs w-full mx-6">
                    {/* Header - Smaller */}
                    <div className="text-center mb-6">
                      {/* Logo */}
                      <div className="w-12 h-12 healthcare-gradient rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-white text-xl font-bold mb-2">Admin Portal</h3>
                      <p className="text-gray-300 text-sm">Secure Healthcare Management</p>
                    </div>

                    {/* Login Form - Smaller */}
                    <div className="space-y-4">
                      <div>
                        <input 
                          type="text" 
                          placeholder="Email Address"
                          className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:border-blue-400 transition-colors shadow-lg text-sm"
                          defaultValue="admin@healthcare.com"
                        />
                      </div>
                      <div>
                        <input 
                          type="password" 
                          placeholder="Password"
                          className="w-full p-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-gray-300 focus:border-blue-400 transition-colors shadow-lg text-sm"
                          defaultValue="••••••••"
                        />
                      </div>
                      
                      {/* Login Button - Smaller */}
                      <button className="w-full p-3 healthcare-gradient rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                        Secure Login
                      </button>

                      {/* Biometric - Smaller */}
                      <div className="text-center py-4">
                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center shadow-lg">
                          <div className="w-8 h-8 border-2 border-blue-400 rounded-full animate-pulse"></div>
                        </div>
                        <p className="text-gray-300 text-xs mt-2">Touch ID / Face ID</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent rounded-3xl pointer-events-none" />
          </div>
          
          {/* Floating Icons - Naturally distributed around laptop */}
          {/* Top Brain icon */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{ top: '-160px', animationDelay: '4s' }}>
            <Brain className="h-8 w-8 text-white" />
          </div>
          
          {/* Top right corner */}
          <div className="absolute w-14 h-14 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{ top: '-120px', right: '-80px' }}>
            <BarChart className="h-7 w-7 text-white" />
          </div>
          
          {/* Top left corner */}
          <div className="absolute w-14 h-14 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center animate-float shadow-2xl" style={{ top: '-120px', left: '-80px', animationDelay: '2s' }}>
            <Monitor className="h-7 w-7 text-white" />
          </div>
          
          {/* Right side middle */}
          <div className="absolute w-12 h-12 healthcare-gradient rounded-full flex items-center justify-center animate-float shadow-xl" style={{ top: '-60px', right: '-90px', animationDelay: '1s' }}>
            <Shield className="h-6 w-6 text-white" />
          </div>
          
          {/* Left side middle */}
          <div className="absolute w-12 h-12 healthcare-gradient-secondary rounded-full flex items-center justify-center animate-float shadow-xl" style={{ top: '-60px', left: '-90px', animationDelay: '3s' }}>
            <Lock className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLaptopVisualization;
