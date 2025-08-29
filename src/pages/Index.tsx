import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "@/components/ChatInterface";
import { PrescriptionReader } from "@/components/PrescriptionReader";
import { DoctorConsultation } from "@/components/DoctorConsultation";
import { AuthScreen } from "@/components/AuthScreen";
import { Stethoscope, MessageSquare, FileText, Users, LogOut, Menu } from "lucide-react";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full medical-gradient flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  HealthAI Assistant
                </h1>
                <p className="text-xs text-muted-foreground">Your intelligent healthcare companion</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAuthenticated(false)}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <Card className="mb-8 overflow-hidden medical-card">
          <div className="relative h-64 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20">
            <img 
              src={heroImage} 
              alt="Medical AI Healthcare" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 flex items-center justify-center text-center">
              <div className="text-primary-foreground space-y-4">
                <h2 className="text-4xl font-bold animate-fade-in">Welcome to HealthAI</h2>
                <p className="text-xl opacity-90">AI-powered healthcare at your fingertips</p>
                <div className="flex justify-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
                    <span>24/7 AI Support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
                    <span>Expert Doctors</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary-foreground animate-pulse"></div>
                    <span>Secure & Private</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Main Features */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 medical-card p-1">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
            <TabsTrigger value="prescription" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline">Prescription Reader</span>
            </TabsTrigger>
            <TabsTrigger value="doctors" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Consult Doctors</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-semibold text-primary">AI Symptom Analyzer</h3>
              <p className="text-muted-foreground">
                Describe your symptoms and get instant AI-powered health insights, medication suggestions, and home remedies
              </p>
            </div>
            <ChatInterface />
          </TabsContent>

          <TabsContent value="prescription" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-semibold text-secondary">Smart Prescription Reader</h3>
              <p className="text-muted-foreground">
                Upload your prescription image and get detailed information extracted and organized into a downloadable PDF
              </p>
            </div>
            <PrescriptionReader />
          </TabsContent>

          <TabsContent value="doctors" className="space-y-6">
            <div className="text-center space-y-2 mb-6">
              <h3 className="text-2xl font-semibold text-accent">Expert Doctor Consultations</h3>
              <p className="text-muted-foreground">
                Connect with certified doctors for professional medical advice through video calls or chat sessions
              </p>
            </div>
            <DoctorConsultation />
          </TabsContent>
        </Tabs>

        {/* Disclaimer */}
        <Card className="mt-12 p-6 bg-destructive/5 border-destructive/20 text-center">
          <h4 className="font-semibold text-destructive mb-2">⚠️ Important Medical Disclaimer</h4>
          <p className="text-sm text-destructive/80">
            This AI assistant and platform are for informational purposes only and do not constitute medical advice. 
            Always consult with qualified healthcare professionals for proper diagnosis and treatment. 
            In case of emergency, contact your local emergency services immediately.
          </p>
        </Card>
      </main>
    </div>
  );
};

export default Index;
