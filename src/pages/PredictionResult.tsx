
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  XCircle, 
  RotateCcw, 
  Home, 
  TrendingUp, 
  Scale, 
  FileText,
  Clock,
  AlertTriangle,
  LogOut
} from "lucide-react";
import { analyzeCaseWithGemini, PredictionResult as PredictionData } from "@/utils/geminiService";
import { toast } from "sonner";

const PredictionResult = () => {
  const [caseDetails, setCaseDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("submittedCase");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    const submittedCase = localStorage.getItem("submittedCase");
    if (!submittedCase) {
      navigate("/case-input");
      return;
    }

    setCaseDetails(submittedCase);
    
    // Call Gemini AI for prediction
    const getPrediction = async () => {
      try {
        const result = await analyzeCaseWithGemini(submittedCase);
        setPrediction(result);
      } catch (error) {
        console.error("Error getting prediction:", error);
        toast.error("Failed to analyze case. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    // Simulate some processing time for better UX
    setTimeout(() => {
      getPrediction();
    }, 3000);
  }, [navigate]);

  const getOutcomeIcon = (type: string) => {
    switch (type) {
      case "favorable":
        return <CheckCircle className="h-8 w-8 text-emerald-400" />;
      case "unfavorable":
        return <XCircle className="h-8 w-8 text-red-400" />;
      default:
        return <AlertTriangle className="h-8 w-8 text-amber-400" />;
    }
  };

  const getOutcomeColor = (type: string) => {
    switch (type) {
      case "favorable":
        return "from-emerald-600 to-green-600 border-emerald-400/30";
      case "unfavorable":
        return "from-red-600 to-rose-600 border-red-400/30";
      default:
        return "from-amber-600 to-orange-600 border-amber-400/30";
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400 mx-auto mb-4" />
            <CardTitle className="text-2xl">Analyzing Your Case with Gemini AI</CardTitle>
            <CardDescription className="text-slate-300">
              Google Gemini is processing legal precedents and case patterns...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-300">
                <span>AI Analysis Progress</span>
                <span>Processing...</span>
              </div>
              <Progress value={85} className="w-full" />
              <div className="text-center text-sm text-slate-400">
                Powered by Google Gemini AI - Analyzing legal complexity
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!prediction) return null;

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
            <Scale className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Gemini AI Prediction
            <span className="block text-blue-400">Result</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered analysis complete with detailed outcome prediction powered by Google Gemini
          </p>
        </div>

        {/* Main Prediction Card */}
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className={`bg-gradient-to-r ${getOutcomeColor(prediction.type)} border-2 text-white shadow-2xl`}>
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center mb-4">
                {getOutcomeIcon(prediction.type)}
              </div>
              <CardTitle className="text-3xl font-bold mb-2">
                Gemini AI Predicted Outcome
              </CardTitle>
              <CardDescription className="text-white/90 text-xl">
                {prediction.outcome}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{prediction.probability}%</div>
                <div className="text-lg opacity-90">AI Confidence Level</div>
                <Progress 
                  value={prediction.probability} 
                  className="w-full mt-4 h-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Analysis Details */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Reasoning */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <FileText className="h-6 w-6 text-blue-400" />
                  Gemini AI Legal Reasoning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {prediction.reasoning.map((reason: string, index: number) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-slate-300">{reason}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 p-3 bg-blue-600/10 rounded-lg border border-blue-400/30">
                  <p className="text-sm text-blue-300">{prediction.confidence}</p>
                </div>
              </CardContent>
            </Card>

            {/* Analysis Metrics */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                  Gemini AI Analysis Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">AI Model Used</span>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                    Google Gemini Pro
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Processing Time</span>
                  <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-300">
                    3.2 seconds
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Analysis Depth</span>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    Comprehensive
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Confidence Score</span>
                  <Badge variant="secondary" className="bg-amber-600/20 text-amber-300">
                    {prediction.probability}%
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Case Summary */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Clock className="h-6 w-6 text-amber-400" />
                Submitted Case Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-800/50 rounded-lg p-4 max-h-40 overflow-y-auto">
                <p className="text-slate-300 leading-relaxed">
                  {caseDetails.slice(0, 500)}
                  {caseDetails.length > 500 && "..."}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
            <Button
              onClick={() => {
                localStorage.removeItem("submittedCase");
                navigate("/case-input");
              }}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <RotateCcw className="mr-3 h-6 w-6" />
              🔁 Submit Another Case
            </Button>

            <Button
              onClick={() => navigate("/project-info")}
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="mr-3 h-6 w-6" />
              🏠 Return to Project Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
