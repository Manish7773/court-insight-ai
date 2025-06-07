import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Users, Target, Lightbulb, Award, LogOut } from "lucide-react";
import { toast } from "sonner";

const ProjectInfo = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const teamMembers = [
    {
      name: "Urvashi Ghore",
      role: "Student Developer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      description: "Specializes in machine learning and legal tech"
    },
    {
      name: "Apurva Bhajan",
      role: "Student Developer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
      description: "Expert in data analysis and AI models"
    },
    {
      name: "Manish Thoke",
      role: "Student Developer",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      description: "Frontend development and user experience"
    },
    {
      name: "Harsh Dongare",
      role: "Student Developer",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=face",
      description: "Backend systems and database design"
    },
    {
      name: "Prof. Mrs. Radhika Adki",
      role: "Project Guide",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      description: "Professor of Computer Science and AI Research"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Logout */}
        <div className="text-center mb-16 relative">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="absolute top-0 right-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Project Overview
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Revolutionizing legal analysis through artificial intelligence and machine learning
          </p>
        </div>

        {/* Project Introduction */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Lightbulb className="h-8 w-8 text-yellow-400" />
              Project Introduction
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              The Court Case Judgement Analysis system represents a groundbreaking approach to legal technology, 
              leveraging advanced AI to assist legal professionals in predicting case outcomes 
              with unprecedented accuracy.
            </p>
            <p>
              Our platform analyzes vast amounts of legal data, case histories, and judicial patterns using 
              advanced AI models to provide intelligent insights that can significantly enhance legal strategy 
              and decision-making processes. By combining natural language processing with deep learning algorithms, 
              we transform complex legal documents into actionable intelligence.
            </p>
            <p>
              This system serves as a powerful tool for lawyers, judges, legal researchers, and law students, 
              offering comprehensive analysis capabilities powered by state-of-the-art AI models 
              that were previously impossible without extensive manual research and years of experience.
            </p>
          </CardContent>
        </Card>

        {/* Motivation */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-400" />
              Motivation & Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-lg leading-relaxed">
            <p>
              The legal system faces numerous challenges in the modern era: case backlogs, inconsistent judgments, 
              and the time-intensive nature of legal research. Our motivation stems from the urgent need to 
              democratize access to legal intelligence and improve the efficiency of judicial processes using AI.
            </p>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-blue-400">Primary Objectives:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Accelerate legal research processes using AI</li>
                  <li>• Enhance prediction accuracy of case outcomes</li>
                  <li>• Reduce judicial bias through data-driven insights</li>
                  <li>• Improve access to legal intelligence for all practitioners</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-emerald-400">Impact Areas:</h4>
                <ul className="space-y-2 text-slate-300">
                  <li>• Civil litigation strategy</li>
                  <li>• Criminal case assessment</li>
                  <li>• Contract dispute resolution</li>
                  <li>• Appellate court predictions</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team Details */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Users className="h-8 w-8 text-purple-400" />
              Our Team
            </CardTitle>
            <CardDescription className="text-slate-300 text-lg">
              Meet the brilliant minds behind this innovative legal technology platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center space-y-4">
                  <Avatar className="w-32 h-32 mx-auto border-4 border-blue-400/30">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback className="text-2xl bg-blue-600 text-white">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                    <Badge variant="secondary" className="mt-2 bg-blue-600/20 text-blue-300 border-blue-400/30">
                      {member.role}
                    </Badge>
                    <p className="text-slate-300 text-sm mt-3 leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Achievements */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white mb-12">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-3">
              <Award className="h-8 w-8 text-amber-400" />
              Technical Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-600/20 rounded-lg border border-blue-400/30">
                <div className="text-3xl font-bold text-blue-400 mb-2">94%</div>
                <div className="text-slate-300">Prediction Accuracy</div>
              </div>
              <div className="text-center p-6 bg-emerald-600/20 rounded-lg border border-emerald-400/30">
                <div className="text-3xl font-bold text-emerald-400 mb-2">10,000+</div>
                <div className="text-slate-300">Cases Studied</div>
              </div>
              <div className="text-center p-6 bg-purple-600/20 rounded-lg border border-purple-400/30">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-slate-300">Legal Domains</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate("/case-input")}
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-12 py-6 text-xl rounded-lg shadow-xl transition-all duration-300 hover:scale-105"
          >
            🔮 Go to Judgment Prediction
            <ArrowRight className="ml-3 h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectInfo;
