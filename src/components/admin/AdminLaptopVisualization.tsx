
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

              {/* Admin Login Interface - Over Video */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <div className="max-w-xs w-full mx-6">
                  {/* Header */}
                  <div className="text-center mb-6">
                    {/* Logo */}
                    <div className="w-12 h-12 healthcare-gradient rounded-2xl mx-auto mb-3 flex items-center justify-center shadow-lg">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-white text-xl font-bold mb-2">Admin Portal</h3>
                    <p className="text-gray-300 text-sm">Secure Healthcare Management</p>
                  </div>

                  {/* Login Form */}
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Email Address"
                        className="w-full p-3 bg-white/25 backdrop-blur-sm border border-white/40 rounded-lg text-white placeholder-gray-200 focus:border-blue-400 transition-colors shadow-lg text-sm"
                        defaultValue="admin@healthcare.com"
                      />
                    </div>
                    <div>
                      <input 
                        type="password" 
                        placeholder="Password"
                        className="w-full p-3 bg-white/25 backdrop-blur-sm border border-white/40 rounded-lg text-white placeholder-gray-200 focus:border-blue-400 transition-colors shadow-lg text-sm"
                        defaultValue="••••••••"
                      />
                    </div>
                    
                    {/* Login Button */}
                    <button className="w-full p-3 healthcare-gradient rounded-lg text-white font-semibold hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg text-sm">
                      Secure Login
                    </button>

                    {/* Biometric */}
                    <div className="text-center py-4">
                      <div className="w-12 h-12 bg-white/25 backdrop-blur-sm rounded-full mx-auto flex items-center justify-center shadow-lg">
                        <div className="w-8 h-8 border-2 border-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-gray-200 text-xs mt-2">Touch ID / Face ID</p>
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
