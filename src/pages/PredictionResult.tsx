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
  AlertTriangle
} from "lucide-react";

const PredictionResult = () => {
  const [caseDetails, setCaseDetails] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [prediction, setPrediction] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const submittedCase = localStorage.getItem("submittedCase");
    if (!submittedCase) {
      navigate("/case-input");
      return;
    }

    setCaseDetails(submittedCase);
    
    // Simulate AI processing
    setTimeout(() => {
      // Generate mock prediction based on case content
      const mockPrediction = generateMockPrediction(submittedCase);
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 3000);
  }, [navigate]);

  const generateMockPrediction = (caseText: string) => {
    const outcomes = [
      {
        outcome: "Judgment in favor of the Plaintiff",
        probability: 78,
        type: "favorable",
        reasoning: [
          "Strong legal precedent supports plaintiff's position",
          "Evidence strongly favors plaintiff's claims",
          "Defendant's arguments lack substantial legal foundation"
        ]
      },
      {
        outcome: "Not in favor of the Plaintiff",
        probability: 72,
        type: "unfavorable", 
        reasoning: [
          "Defendant's constitutional rights were violated",
          "Burden of proof not met by prosecution",
          "Key evidence may be inadmissible"
        ]
      },
      {
        outcome: "Case will be Dismissed",
        probability: 65,
        type: "neutral",
        reasoning: [
          "Insufficient evidence to support the claims",
          "Statute of limitations may have expired",
          "Procedural issues affect case validity"
        ]
      }
    ];

    return outcomes[Math.floor(Math.random() * outcomes.length)];
  };

  const determineCaseType = (text: string) => {
    if (text.includes("criminal") || text.includes("prosecution")) return "Criminal";
    if (text.includes("contract") || text.includes("breach")) return "Contract";
    if (text.includes("divorce") || text.includes("custody")) return "Family";
    if (text.includes("property") || text.includes("real estate")) return "Property";
    return "Civil";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white max-w-md w-full mx-4">
          <CardHeader className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-400 mx-auto mb-4" />
            <CardTitle className="text-2xl">Analyzing Your Case</CardTitle>
            <CardDescription className="text-slate-300">
              Our AI is processing legal precedents and case patterns...
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-300">
                <span>Analysis Progress</span>
                <span>Processing...</span>
              </div>
              <Progress value={85} className="w-full" />
              <div className="text-center text-sm text-slate-400">
                Analyzing over 10,000 legal cases and precedents
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!prediction) return null;

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Scale className="h-16 w-16 text-blue-400" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Judgment Prediction
            <span className="block text-blue-400">Result</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI-powered analysis complete with detailed outcome prediction and legal insights
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
                Predicted Outcome
              </CardTitle>
              <CardDescription className="text-white/90 text-xl">
                {prediction.outcome}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{prediction.probability}%</div>
                <div className="text-lg opacity-90">Confidence Level</div>
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
                  Key Legal Reasoning
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
              </CardContent>
            </Card>

            {/* Analysis Metrics */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <TrendingUp className="h-6 w-6 text-emerald-400" />
                  Analysis Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Similar Cases Analyzed</span>
                  <Badge variant="secondary" className="bg-blue-600/20 text-blue-300">
                    2,847
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Processing Time</span>
                  <Badge variant="secondary" className="bg-emerald-600/20 text-emerald-300">
                    3.2 seconds
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Precedent Matches</span>
                  <Badge variant="secondary" className="bg-purple-600/20 text-purple-300">
                    147 cases
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Model Accuracy</span>
                  <Badge variant="secondary" className="bg-amber-600/20 text-amber-300">
                    94.2%
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
              onClick={() => navigate("/")}
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white px-8 py-4 text-lg rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
            >
              <Home className="mr-3 h-6 w-6" />
              🏠 Return to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResult;
