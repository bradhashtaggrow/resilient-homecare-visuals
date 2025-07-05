
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Globe, Loader2, Eye, EyeOff, Shield, Lock } from 'lucide-react';
import OptimizedVideo from '@/components/OptimizedVideo';

const Login = () => {
  const [email, setEmail] = useState('admin@healthcare.com');
  const [password, setPassword] = useState('Admin123!');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, user, isAdmin } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already authenticated and is admin
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  // Redirect if authenticated but not admin
  if (user && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await signIn(email, password);

    if (error) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome back!",
        description: "Redirecting to admin dashboard..."
      });
      // Auto-redirect to admin dashboard
      navigate('/admin');
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Video Background */}
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* Two-tone blue gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/70 via-blue-800/60 to-blue-600/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-transparent to-blue-900/40" />
        {/* Additional blue accent gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/30 via-transparent to-blue-700/30" />
      </div>

      {/* Floating blue particles effect */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-blue-300/40 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-blue-400/50 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-blue-200/35 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
        <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-blue-500/45 rounded-full animate-ping" style={{ animationDelay: '6s' }} />
      </div>

      {/* Enhanced Login Card with Blue Gradients */}
      <div className="relative z-20 w-full max-w-md px-4">
        <Card className="backdrop-blur-2xl bg-gradient-to-br from-blue-950/30 via-blue-900/20 to-blue-800/30 border border-blue-400/30 shadow-2xl shadow-blue-900/60 hover:shadow-blue-800/70 transition-all duration-500 hover:bg-gradient-to-br hover:from-blue-900/40 hover:via-blue-800/30 hover:to-blue-700/40">
          <CardHeader className="text-center pb-8 pt-8">
            {/* Enhanced Logo Container with Blue Gradients */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-18 h-18 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-800 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/50 hover:shadow-blue-400/70 transition-all duration-300 hover:scale-110 border border-blue-300/20">
                  <Globe className="h-10 w-10 text-white drop-shadow-2xl" />
                </div>
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-blue-300 to-blue-500 rounded-full flex items-center justify-center shadow-lg shadow-blue-400/40">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                {/* Blue glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-600/20 rounded-3xl blur-xl animate-pulse-slow" />
              </div>
            </div>
            
            {/* Enhanced Title with Blue Gradients */}
            <CardTitle className="text-4xl font-black text-white mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                Healthcare Admin
              </span>
            </CardTitle>
            <p className="text-blue-100/90 text-lg font-semibold tracking-wide drop-shadow-md">
              Secure Dashboard Access
            </p>
            <div className="w-20 h-1.5 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-full mx-auto mt-4 shadow-lg shadow-blue-400/30" />
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Enhanced Email Field with Blue Accents */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-blue-100/95 font-semibold text-sm tracking-wide flex items-center">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-400 to-blue-300 rounded-full mr-2 shadow-sm shadow-blue-400/50" />
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-blue-950/30 border-blue-400/40 text-white placeholder:text-blue-200/60 focus:border-blue-300 focus:ring-2 focus:ring-blue-300/60 backdrop-blur-sm transition-all duration-300 hover:bg-blue-900/30 hover:border-blue-300/50 shadow-inner"
                    placeholder="Enter your email"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/5 rounded-md pointer-events-none" />
                </div>
              </div>
              
              {/* Enhanced Password Field with Blue Accents */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-blue-100/95 font-semibold text-sm tracking-wide flex items-center">
                  <div className="w-2.5 h-2.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full mr-2 shadow-sm shadow-blue-300/50" />
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={loading}
                    className="h-12 bg-blue-950/30 border-blue-400/40 text-white placeholder:text-blue-200/60 focus:border-blue-300 focus:ring-2 focus:ring-blue-300/60 backdrop-blur-sm transition-all duration-300 hover:bg-blue-900/30 hover:border-blue-300/50 pr-12 shadow-inner"
                    placeholder="Enter your password"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-blue-400/5 rounded-md pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-200/70 hover:text-blue-100/90 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Enhanced Submit Button with Blue Gradients */}
              <Button 
                type="submit" 
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700 border-0 shadow-2xl shadow-blue-600/40 hover:shadow-blue-500/60 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 text-white relative overflow-hidden group" 
                disabled={loading}
              >
                {/* Button glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-blue-300/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative z-10 flex items-center justify-center">
                  {loading ? (
                    <>
                      <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                      <span className="tracking-wide">Authenticating...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="mr-3 h-5 w-5" />
                      <span className="tracking-wide">Access Admin Dashboard</span>
                    </>
                  )}
                </div>
              </Button>
            </form>
            
            {/* Enhanced Credentials Display with Blue Theme */}
            <div className="mt-8 p-6 bg-gradient-to-br from-blue-950/40 via-blue-900/30 to-blue-800/40 backdrop-blur-sm rounded-xl border border-blue-400/20 hover:bg-gradient-to-br hover:from-blue-900/50 hover:via-blue-800/40 hover:to-blue-700/50 transition-all duration-300 shadow-inner">
              <div className="flex items-center mb-4">
                <Shield className="h-5 w-5 text-blue-300 mr-2" />
                <p className="text-blue-100/95 font-bold text-sm tracking-wide">Admin Credentials</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-blue-200/80 text-sm font-medium">Email:</span>
                  <code className="text-blue-200 bg-blue-800/40 px-3 py-1.5 rounded-md text-sm font-mono border border-blue-600/30 shadow-sm">admin@healthcare.com</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-200/80 text-sm font-medium">Password:</span>
                  <code className="text-blue-200 bg-blue-800/40 px-3 py-1.5 rounded-md text-sm font-mono border border-blue-600/30 shadow-sm">Admin123!</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer Text with Blue Theme */}
        <div className="text-center mt-6">
          <p className="text-blue-200/70 text-sm font-medium">
            Secured by <span className="text-blue-200 font-semibold bg-gradient-to-r from-blue-300 to-blue-200 bg-clip-text text-transparent">Healthcare Platform</span>
          </p>
        </div>
      </div>

      {/* Enhanced scroll indicator with blue theme */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce-gentle">
          <div className="w-8 h-12 border-2 border-blue-300/40 rounded-full flex justify-center relative overflow-hidden hover:border-blue-200/60 transition-colors duration-300 bg-gradient-to-b from-blue-950/20 to-blue-900/30 backdrop-blur-sm">
            <div className="w-1.5 h-4 bg-gradient-to-b from-blue-300 to-blue-400 rounded-full mt-3 animate-pulse-slow shadow-sm shadow-blue-300/50" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-300/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
