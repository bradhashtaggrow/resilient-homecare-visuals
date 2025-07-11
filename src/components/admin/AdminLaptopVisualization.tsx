
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
                {/* Contrast overlay to match website brightness */}
                <div className="absolute inset-0 bg-black/40 rounded-2xl" />
              </div>

              {/* Floating particles effect */}
              <div className="absolute inset-0 z-10">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
              </div>

              {/* Login Card - Using exact glassmorphism from Login page */}
              <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                  <div className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-black/50 hover:shadow-3xl transition-all duration-500 hover:bg-white/15 rounded-lg">
                    <div className="text-center pb-8 pt-8 flex flex-col space-y-1.5 p-6">
                      {/* Enhanced Logo Container */}
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-110">
                            <div className="h-9 w-9 text-white drop-shadow-lg">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"/>
                                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/>
                                <path d="M2 12h20"/>
                              </svg>
                            </div>
                          </div>
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                            <Shield className="h-3 w-3 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Enhanced Title */}
                      <h3 className="text-3xl font-black text-white mb-2 tracking-tight text-2xl font-semibold leading-none tracking-tight">
                        <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                          Healthcare Admin
                        </span>
                      </h3>
                      <p className="text-white/80 text-lg font-medium tracking-wide">
                        Secure Dashboard Access
                      </p>
                      <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary rounded-full mx-auto mt-4" />
                    </div>
                    
                    <div className="px-8 pb-8 p-6 pt-0">
                      <form className="space-y-6">
                        {/* Enhanced Email Field */}
                        <div className="space-y-3">
                          <label htmlFor="email" className="text-white/90 font-semibold text-sm tracking-wide flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary rounded-full mr-2" />
                            Email Address
                          </label>
                          <div className="relative">
                            <input
                              id="email"
                              type="email"
                              required
                              className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              placeholder="Enter your email"
                            />
                          </div>
                        </div>
                        
                        {/* Enhanced Password Field */}
                        <div className="space-y-3">
                          <label htmlFor="password" className="text-white/90 font-semibold text-sm tracking-wide flex items-center text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                            <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary rounded-full mr-2" />
                            Password
                          </label>
                          <div className="relative">
                            <input
                              id="password"
                              type="password"
                              required
                              className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 pr-12 flex w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                              placeholder="Enter your password"
                            />
                            <button
                              type="button"
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                            >
                              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                                <circle cx="12" cy="12" r="3"/>
                              </svg>
                            </button>
                          </div>
                        </div>
                        
                        {/* Enhanced Submit Button */}
                        <button 
                          type="submit" 
                          className="w-full h-14 text-lg font-bold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-gradient-to-r from-[hsl(214,100%,60%)] to-[hsl(214,100%,45%)] text-white hover:from-[hsl(214,100%,55%)] hover:to-[hsl(214,100%,40%)] border-0 shadow-lg" 
                        >
                          <Lock className="mr-3 h-5 w-5" />
                          <span className="tracking-wide">Access Admin Dashboard</span>
                        </button>
                      </form>
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
