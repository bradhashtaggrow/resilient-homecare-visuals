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

  // Redirect if already authenticated
  if (user && isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn(email, password);

      if (error) {
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
        setLoading(false);
        return;
      }

      // Success - wait for auth state to update then redirect to admin
      toast({
        title: "Sign in successful",
        description: "Redirecting to admin dashboard...",
      });

      // Give time for auth context to update, then redirect
      setTimeout(() => {
        navigate('/admin', { replace: true });
        setLoading(false);
      }, 500);

    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Sign in failed",
        description: "An unexpected error occurred",
        variant: "destructive"
      });
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background with Contrast Overlay */}
      <div className="absolute inset-0 z-0">
        <OptimizedVideo
          src="https://videos.pexels.com/video-files/4122849/4122849-uhd_2560_1440_25fps.mp4"
          className="absolute inset-0 w-full h-full object-cover scale-105"
        />
        {/* Contrast overlay to match website brightness */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-blue-300/30 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-purple-300/25 rounded-full animate-ping" style={{ animationDelay: '4s' }} />
      </div>

      {/* Enhanced Login Card */}
      <div className="relative z-20 w-full max-w-md px-4">
        <Card className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl shadow-black/50 hover:shadow-3xl transition-all duration-500 hover:bg-white/15">
          <CardHeader className="text-center pb-8 pt-8">
            {/* Enhanced Logo Container */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary-light rounded-2xl flex items-center justify-center shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-110">
                  <Globe className="h-9 w-9 text-white drop-shadow-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center">
                  <Shield className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            {/* Enhanced Title */}
            <CardTitle className="text-3xl font-black text-white mb-2 tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                Healthcare Admin
              </span>
            </CardTitle>
            <p className="text-white/80 text-lg font-medium tracking-wide">
              Secure Dashboard Access
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary rounded-full mx-auto mt-4" />
          </CardHeader>
          
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSignIn} className="space-y-6">
              {/* Enhanced Email Field */}
              <div className="space-y-3">
                <Label htmlFor="email" className="text-white/90 font-semibold text-sm tracking-wide flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary rounded-full mr-2" />
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
                    className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              {/* Enhanced Password Field */}
              <div className="space-y-3">
                <Label htmlFor="password" className="text-white/90 font-semibold text-sm tracking-wide flex items-center">
                  <div className="w-2 h-2 bg-gradient-to-r from-primary to-primary rounded-full mr-2" />
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
                    className="h-12 bg-white/10 border-white/30 text-white placeholder:text-white/50 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/50 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 pr-12"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/90 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              {/* Enhanced Submit Button */}
              <Button 
                type="submit" 
                variant="gradient"
                className="w-full h-14 text-lg font-bold transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    <span className="tracking-wide">Accessing Dashboard...</span>
                  </>
                ) : (
                  <>
                    <Lock className="mr-3 h-5 w-5" />
                    <span className="tracking-wide">Access Admin Dashboard</span>
                  </>
                )}
              </Button>
            </form>
            
            {/* Enhanced Credentials Display */}
            <div className="mt-8 p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-black/30 transition-all duration-300">
              <div className="flex items-center mb-3">
                <Shield className="h-4 w-4 text-green-400 mr-2" />
                <p className="text-white font-bold text-sm tracking-wide">Admin Credentials</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Email:</span>
                  <code className="text-white bg-black/30 px-2 py-1 rounded text-sm font-mono">admin@healthcare.com</code>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/70 text-sm">Password:</span>
                  <code className="text-white bg-black/30 px-2 py-1 rounded text-sm font-mono">Admin123!</code>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Footer Text */}
        <div className="text-center mt-6">
          <p className="text-white/60 text-sm">
            
          </p>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce-gentle">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full flex justify-center relative overflow-hidden hover:border-white/50 transition-colors duration-300">
            <div className="w-1.5 h-4 bg-white/50 rounded-full mt-3 animate-pulse-slow" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
