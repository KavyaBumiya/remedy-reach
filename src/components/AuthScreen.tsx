import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, EyeOff, Stethoscope, Shield, Heart, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

export const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    confirmPassword: "",
    userType: "patient"
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login successful!",
        description: "Welcome back to HealthAI Assistant",
      });
      onAuthSuccess();
    }, 1500);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (signupData.password !== signupData.confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "Please ensure both passwords match",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account created successfully!",
        description: "Welcome to HealthAI Assistant",
      });
      onAuthSuccess();
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="space-y-8 text-center lg:text-left">
          <div className="space-y-4">
            <div className="flex items-center justify-center lg:justify-start gap-3">
              <div className="w-12 h-12 rounded-full medical-gradient flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-primary-foreground animate-float" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HealthAI Assistant
              </h1>
            </div>
            <p className="text-xl text-muted-foreground">
              Your intelligent healthcare companion powered by AI
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <Heart className="w-8 h-8 text-primary mx-auto lg:mx-0" />
              <h3 className="font-semibold text-primary">AI Symptom Analysis</h3>
              <p className="text-sm text-muted-foreground">Get instant health insights</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-secondary/5 border border-secondary/20">
              <Shield className="w-8 h-8 text-secondary mx-auto lg:mx-0" />
              <h3 className="font-semibold text-secondary">Prescription Reader</h3>
              <p className="text-sm text-muted-foreground">Digital prescription analysis</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-accent/5 border border-accent/20">
              <Users className="w-8 h-8 text-accent mx-auto lg:mx-0" />
              <h3 className="font-semibold text-accent">Expert Consultations</h3>
              <p className="text-sm text-muted-foreground">Connect with doctors 24/7</p>
            </div>
            <div className="space-y-2 p-4 rounded-lg bg-warning/5 border border-warning/20">
              <Stethoscope className="w-8 h-8 text-warning mx-auto lg:mx-0" />
              <h3 className="font-semibold text-warning">Secure & Private</h3>
              <p className="text-sm text-muted-foreground">HIPAA compliant platform</p>
            </div>
          </div>
        </div>

        {/* Right Side - Auth Forms */}
        <Card className="medical-card p-8 animate-fade-in">
          <Tabs defaultValue="login" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Welcome Back</h2>
                <p className="text-muted-foreground">Sign in to your HealthAI account</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      placeholder="Enter your password"
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full medical-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              <p className="text-center text-sm text-muted-foreground">
                Forgot your password? <a href="#" className="text-primary hover:underline">Reset it here</a>
              </p>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup" className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-semibold">Create Account</h2>
                <p className="text-muted-foreground">Join HealthAI for better healthcare</p>
              </div>

              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Account Type</label>
                  <select
                    value={signupData.userType}
                    onChange={(e) => setSignupData({...signupData, userType: e.target.value})}
                    className="w-full p-2 border border-border rounded-md bg-background"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    value={signupData.name}
                    onChange={(e) => setSignupData({...signupData, name: e.target.value})}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({...signupData, email: e.target.value})}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password</label>
                    <Input
                      type="password"
                      value={signupData.password}
                      onChange={(e) => setSignupData({...signupData, password: e.target.value})}
                      placeholder="Create password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirm</label>
                    <Input
                      type="password"
                      value={signupData.confirmPassword}
                      onChange={(e) => setSignupData({...signupData, confirmPassword: e.target.value})}
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full medical-gradient"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Create Account"}
                </Button>
              </form>

              <p className="text-center text-xs text-muted-foreground">
                By signing up, you agree to our Terms of Service and Privacy Policy
              </p>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};