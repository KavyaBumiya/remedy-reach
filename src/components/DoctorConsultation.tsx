import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Clock, Video, MessageCircle, Calendar, Stethoscope, Heart, Users } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  availability: string;
  price: string;
  languages: string[];
  image: string;
}

const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    rating: 4.9,
    experience: '12 years',
    availability: 'Available now',
    price: '$45/30min',
    languages: ['English', 'Spanish'],
    image: '👩‍⚕️'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'Cardiologist',
    rating: 4.8,
    experience: '15 years',
    availability: 'Next: 2:30 PM',
    price: '$75/30min',
    languages: ['English', 'Mandarin'],
    image: '👨‍⚕️'
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialty: 'Dermatologist',
    rating: 4.9,
    experience: '8 years',
    availability: 'Available now',
    price: '$60/30min',
    languages: ['English', 'Spanish', 'French'],
    image: '👩‍⚕️'
  }
];

export const DoctorConsultation = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const specialties = ["General Medicine", "Cardiologist", "Dermatologist", "Pediatrician", "Psychiatrist"];

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      <Card className="medical-gradient text-primary-foreground p-8 text-center">
        <Stethoscope className="w-16 h-16 mx-auto mb-4 animate-float" />
        <h2 className="text-3xl font-bold mb-2">Consult with Expert Doctors</h2>
        <p className="text-primary-foreground/90 mb-6">
          Get professional medical advice from certified doctors from the comfort of your home
        </p>
        <div className="flex justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Video className="w-4 h-4" />
            <span>Video Consultation</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            <span>Instant Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>24/7 Available</span>
          </div>
        </div>
      </Card>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <Input
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <select
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
          className="px-3 py-2 border border-border rounded-md bg-background"
        >
          <option value="">All Specialties</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>
      </div>

      {/* Doctor Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="medical-card hover:medical-glow transition-all duration-300">
            <div className="p-6 space-y-4">
              {/* Doctor Header */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl">
                  {doctor.image}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{doctor.name}</h3>
                  <p className="text-muted-foreground text-sm">{doctor.specialty}</p>
                </div>
              </div>

              {/* Rating and Experience */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{doctor.rating}</span>
                  <span className="text-muted-foreground text-sm">• {doctor.experience}</span>
                </div>
                <Badge variant={doctor.availability.includes('Available') ? 'default' : 'secondary'}>
                  {doctor.availability}
                </Badge>
              </div>

              {/* Languages */}
              <div className="flex flex-wrap gap-1">
                {doctor.languages.map((lang) => (
                  <Badge key={lang} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
              </div>

              {/* Price and Actions */}
              <div className="pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-semibold text-primary">{doctor.price}</span>
                  <span className="text-sm text-muted-foreground">30 min session</span>
                </div>
                
                <div className="grid grid-cols-2 gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <MessageCircle className="w-4 h-4 mr-1" />
                        Chat
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Start Chat with {doctor.name}</DialogTitle>
                      </DialogHeader>
                      <BookingForm doctor={doctor} type="chat" />
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        size="sm" 
                        className="w-full medical-gradient"
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        <Video className="w-4 h-4 mr-1" />
                        Video
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Book Video Call with {doctor.name}</DialogTitle>
                      </DialogHeader>
                      <BookingForm doctor={doctor} type="video" />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Stats Section */}
      <Card className="p-6 bg-gradient-to-r from-secondary/10 to-accent/10 border-secondary/20">
        <div className="grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-2">
              <Users className="w-6 h-6 text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary">1000+</div>
            <div className="text-sm text-muted-foreground">Verified Doctors</div>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary">50k+</div>
            <div className="text-sm text-muted-foreground">Happy Patients</div>
          </div>
          <div>
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-2">
              <Clock className="w-6 h-6 text-accent" />
            </div>
            <div className="text-2xl font-bold text-accent">24/7</div>
            <div className="text-sm text-muted-foreground">Available</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

const BookingForm = ({ doctor, type }: { doctor: Doctor; type: 'chat' | 'video' }) => {
  const [concern, setConcern] = useState("");
  const [duration, setDuration] = useState("30");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Consultation Type</label>
        <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
          {type === 'video' ? <Video className="w-4 h-4 text-primary" /> : <MessageCircle className="w-4 h-4 text-primary" />}
          <span className="capitalize">{type} Consultation</span>
          <Badge className="ml-auto">{doctor.price}</Badge>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Duration</label>
        <select 
          value={duration} 
          onChange={(e) => setDuration(e.target.value)}
          className="w-full p-2 border border-border rounded-md bg-background"
        >
          <option value="15">15 minutes - ${type === 'video' ? '35' : '25'}</option>
          <option value="30">30 minutes - {doctor.price.split('/')[0]}</option>
          <option value="60">60 minutes - ${type === 'video' ? '120' : '80'}</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Brief description of your concern</label>
        <Textarea
          value={concern}
          onChange={(e) => setConcern(e.target.value)}
          placeholder="Please describe your symptoms or health concerns..."
          rows={3}
        />
      </div>

      <Button className="w-full medical-gradient">
        Book {type === 'video' ? 'Video Call' : 'Chat Session'}
      </Button>
      
      <p className="text-xs text-muted-foreground text-center">
        By booking, you agree to our terms and conditions. Payment will be processed securely.
      </p>
    </div>
  );
};