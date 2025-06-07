
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Scale, Gavel, BookOpen, Brain, Cpu } from "lucide-react";
import { toast } from "sonner";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
  password: string;
}

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirth: "",
    password: "",
    confirmPassword: ""
  });

  const [loginForm, setLoginForm] = useState({
    firstName: "",
    lastName: "",
    password: ""
  });

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!registerForm.firstName || !registerForm.lastName || !registerForm.email || 
        !registerForm.dateOfBirth || !registerForm.password) {
      toast.error("All fields are required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerForm.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    const newUser: User = {
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      dateOfBirth: registerForm.dateOfBirth,
      password: registerForm.password
    };

    setUsers([...users, newUser]);
    toast.success("Registration successful! Please login.");
    setRegisterOpen(false);
    setLoginOpen(true);
    
    // Reset form
    setRegisterForm({
      firstName: "",
      lastName: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: ""
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = users.find(u => 
      u.firstName === loginForm.firstName && 
      u.lastName === loginForm.lastName && 
      u.password === loginForm.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success("Login successful!");
      setLoginOpen(false);
      navigate("/project-info");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center space-y-8">
            {/* Logo and Title */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <div className="relative">
                <Scale className="h-16 w-16 text-blue-400" />
                <div className="absolute -top-1 -right-1">
                  <Gavel className="h-8 w-8 text-amber-400" />
                </div>
              </div>
              <div className="text-4xl font-bold text-white">+</div>
              <div className="relative">
                <Brain className="h-16 w-16 text-purple-400" />
                <div className="absolute -bottom-1 -right-1">
                  <Cpu className="h-8 w-8 text-emerald-400" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Court Case
              <span className="block text-blue-400">Judgement Analysis</span>
            </h1>
            
            <p className="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
              Advanced AI-powered legal analysis platform using Google Gemini for predicting case outcomes and supporting legal professionals with intelligent insights.
            </p>

            {/* Court & AI Themed Images */}
            <div className="grid md:grid-cols-4 gap-6 mt-12 mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Scale className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Legal Justice</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Gavel className="h-12 w-12 text-amber-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Court Proceedings</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Brain className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">AI Intelligence</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <Cpu className="h-12 w-12 text-emerald-400 mx-auto mb-2" />
                <p className="text-slate-300 text-sm">Machine Learning</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                    🔐 Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Welcome Back</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                      <Label htmlFor="login-firstName">First Name</Label>
                      <Input
                        id="login-firstName"
                        value={loginForm.firstName}
                        onChange={(e) => setLoginForm({...loginForm, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-lastName">Last Name</Label>
                      <Input
                        id="login-lastName"
                        value={loginForm.lastName}
                        onChange={(e) => setLoginForm({...loginForm, lastName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Login
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>

              <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="lg" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105">
                    📝 Register
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold text-center">Join Our Platform</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={registerForm.firstName}
                        onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={registerForm.lastName}
                        onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="dateOfBirth">Date of Birth (DD/MM/YYYY)</Label>
                      <Input
                        id="dateOfBirth"
                        type="text"
                        placeholder="DD/MM/YYYY"
                        value={registerForm.dateOfBirth}
                        onChange={(e) => setRegisterForm({...registerForm, dateOfBirth: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                      Register
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-blue-400 mb-4" />
                <CardTitle>Gemini AI Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Powered by Google Gemini AI to analyze case details and legal precedents with advanced reasoning.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Scale className="h-12 w-12 text-amber-400 mb-4" />
                <CardTitle>Outcome Prediction</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Predict case outcomes with high accuracy based on historical data patterns and AI insights.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <Gavel className="h-12 w-12 text-emerald-400 mb-4" />
                <CardTitle>Legal Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-slate-300">
                  Comprehensive analysis and recommendations for legal professionals powered by AI.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
