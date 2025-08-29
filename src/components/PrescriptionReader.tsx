import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Upload, FileText, Download, Camera, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExtractedInfo {
  patientName: string;
  doctorName: string;
  date: string;
  medications: Array<{
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
  }>;
  diagnosis: string;
  instructions: string[];
}

export const PrescriptionReader = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState<ExtractedInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    if (file.type.startsWith('image/')) {
      setSelectedFile(file);
      setExtractedInfo(null);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select an image file",
        variant: "destructive"
      });
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const processPrescription = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      const mockData: ExtractedInfo = {
        patientName: "John Doe",
        doctorName: "Dr. Sarah Johnson",
        date: "2024-01-15",
        medications: [
          {
            name: "Amoxicillin",
            dosage: "500mg",
            frequency: "3 times daily",
            duration: "7 days"
          },
          {
            name: "Ibuprofen",
            dosage: "200mg",
            frequency: "As needed",
            duration: "For pain relief"
          }
        ],
        diagnosis: "Upper respiratory infection",
        instructions: [
          "Take medications with food",
          "Complete the full course of antibiotics",
          "Rest and stay hydrated",
          "Return if symptoms worsen"
        ]
      };
      
      setExtractedInfo(mockData);
      setIsProcessing(false);
      toast({
        title: "Prescription processed successfully!",
        description: "Information has been extracted from your prescription image.",
      });
    }, 3000);
  };

  const downloadPDF = () => {
    // Simulate PDF download
    toast({
      title: "PDF Downloaded",
      description: "Prescription information saved as PDF",
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card 
        className={`p-8 border-2 border-dashed transition-colors cursor-pointer ${
          selectedFile 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:bg-primary/5'
        }`}
        onClick={() => fileInputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
        />
        
        <div className="text-center space-y-4">
          {selectedFile ? (
            <div className="space-y-2">
              <CheckCircle className="w-12 h-12 text-primary mx-auto" />
              <h3 className="text-lg font-semibold text-primary">File Selected</h3>
              <p className="text-muted-foreground">{selectedFile.name}</p>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                <Upload className="w-6 h-6 text-primary animate-float" />
              </div>
              <h3 className="text-lg font-semibold">Upload Prescription Image</h3>
              <p className="text-muted-foreground">
                Drag & drop your prescription image here, or click to browse
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Action Buttons */}
      {selectedFile && (
        <div className="flex gap-3 justify-center">
          <Button
            onClick={processPrescription}
            disabled={isProcessing}
            className="medical-gradient"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Camera className="w-4 h-4 mr-2" />
                Extract Information
              </>
            )}
          </Button>
          
          <Button
            variant="outline"
            onClick={() => {
              setSelectedFile(null);
              setExtractedInfo(null);
            }}
          >
            Clear
          </Button>
        </div>
      )}

      {/* Extracted Information */}
      {extractedInfo && (
        <Card className="medical-card animate-fade-in">
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Extracted Prescription Information
              </h3>
              <Button onClick={downloadPDF} className="medical-gradient-secondary">
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
            </div>

            {/* Patient & Doctor Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-primary">Patient Information</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <p><span className="font-medium">Name:</span> {extractedInfo.patientName}</p>
                  <p><span className="font-medium">Date:</span> {extractedInfo.date}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium text-secondary">Doctor Information</h4>
                <div className="bg-muted p-3 rounded-lg">
                  <p><span className="font-medium">Doctor:</span> {extractedInfo.doctorName}</p>
                  <p><span className="font-medium">Diagnosis:</span> {extractedInfo.diagnosis}</p>
                </div>
              </div>
            </div>

            {/* Medications */}
            <div className="space-y-3">
              <h4 className="font-medium text-accent">Prescribed Medications</h4>
              <div className="space-y-3">
                {extractedInfo.medications.map((med, index) => (
                  <Card key={index} className="p-4 bg-accent/5 border-accent/20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                      <div>
                        <span className="font-medium text-accent">Medicine:</span>
                        <p>{med.name}</p>
                      </div>
                      <div>
                        <span className="font-medium text-accent">Dosage:</span>
                        <p>{med.dosage}</p>
                      </div>
                      <div>
                        <span className="font-medium text-accent">Frequency:</span>
                        <p>{med.frequency}</p>
                      </div>
                      <div>
                        <span className="font-medium text-accent">Duration:</span>
                        <p>{med.duration}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="space-y-3">
              <h4 className="font-medium text-warning">Special Instructions</h4>
              <Card className="p-4 bg-warning/5 border-warning/20">
                <ul className="space-y-2">
                  {extractedInfo.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-warning"></div>
                      {instruction}
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="p-4 bg-destructive/5 border-destructive/20">
        <p className="text-sm text-destructive text-center">
          ⚠️ <strong>Important:</strong> This extracted information is for reference only. 
          Always verify with your healthcare provider and follow their original prescription instructions.
        </p>
      </Card>
    </div>
  );
};