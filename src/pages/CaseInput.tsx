
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText, Send, AlertCircle, LogOut } from "lucide-react";
import { toast } from "sonner";

const CaseInput = () => {
  const [caseDetails, setCaseDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const maxLength = 3000;
  const remainingChars = maxLength - caseDetails.length;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!caseDetails.trim()) {
      toast.error("Please enter case details before submitting");
      return;
    }

    if (caseDetails.length < 50) {
      toast.error("Please provide more detailed case information (minimum 50 characters)");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Store case details for the results page
    localStorage.setItem("submittedCase", caseDetails);
    
    toast.success("Case submitted successfully! Analyzing with Gemini AI...");
    navigate("/prediction-result");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header with Logout */}
        <div className="text-center mb-12 relative">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="absolute top-0 right-0 border-red-400 text-red-400 hover:bg-red-400 hover:text-white"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
          
          <div className="flex items-center justify-center mb-6">
            <FileText className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Submit Legal Case
            <span className="block text-blue-400">for Gemini AI Prediction</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Provide detailed case information for our Gemini AI system to analyze and predict the most likely judicial outcome
          </p>
        </div>

        {/* Main Form Card */}
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-400" />
                Case Details Submission for Gemini AI Analysis
              </CardTitle>
              <CardDescription className="text-slate-300 text-lg">
                Enter comprehensive case information including facts, context, legal issues, and relevant circumstances for AI analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Label htmlFor="case-details" className="text-lg font-semibold text-white">
                    Case Details / Problem Statement
                  </Label>
                  
                  <div className="relative">
                    <Textarea
                      id="case-details"
                      placeholder="Describe the facts and context of the case here...

Example format:
• Case Type: Civil litigation / Criminal case / Contract dispute / etc.
• Parties Involved: Plaintiff vs. Defendant details
• Key Facts: Chronological sequence of events
• Legal Issues: Primary legal questions to be resolved
• Evidence: Available evidence and documentation
• Precedents: Relevant case law or statutes
• Circumstances: Any special circumstances or considerations

Please be as detailed and specific as possible to ensure accurate Gemini AI prediction."
                      value={caseDetails}
                      onChange={(e) => setCaseDetails(e.target.value.slice(0, maxLength))}
                      className="min-h-[400px] bg-white/5 border-white/20 text-white placeholder:text-slate-400 resize-none text-lg leading-relaxed"
                      maxLength={maxLength}
                    />
                    
                    {/* Character Counter */}
                    <div className="absolute bottom-4 right-4 text-sm text-slate-400">
                      {remainingChars} characters remaining
                    </div>
                  </div>

                  {/* Guidelines */}
                  <div className="bg-blue-600/10 border border-blue-400/30 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-blue-400">Gemini AI Analysis Guidelines:</h4>
                        <ul className="text-sm text-slate-300 space-y-1">
                          <li>• Provide objective facts without personal opinions</li>
                          <li>• Include relevant dates, locations, and parties involved</li>
                          <li>• Mention applicable laws, regulations, or precedents</li>
                          <li>• Describe the relief or remedy sought</li>
                          <li>• Include any mitigating or aggravating circumstances</li>
                          <li>• The more detailed your input, the better Gemini AI can analyze</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-slate-300">
                    <span>Case Details Completion</span>
                    <span>{Math.min(100, Math.round((caseDetails.length / 500) * 100))}%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (caseDetails.length / 500) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting || !caseDetails.trim()}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-6 text-xl rounded-lg shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3" />
                        Submitting to Gemini AI...
                      </>
                    ) : (
                      <>
                        <Send className="mr-3 h-6 w-6" />
                        🧾 Analyze with Gemini AI
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <Card className="bg-white/5 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">Gemini AI Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Our Google Gemini AI system analyzes your case within seconds, processing legal precedents and patterns with advanced reasoning.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/5 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="text-lg">AI Prediction Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300">
                  Powered by Google Gemini, our system provides highly accurate predictions based on comprehensive legal analysis.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseInput;
