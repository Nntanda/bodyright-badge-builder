import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play, Image, Languages, Share2, Upload, MousePointer, Hash, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import heroImage from "@/assets/hero-woman.jpg";

const Welcome = () => {
  const [currentLang, setCurrentLang] = useState("EN");

  const languages = ["EN", "FR", "PT", "AR"];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-primary">AUGYO</div>
          
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <Button
                key={lang}
                variant={currentLang === lang ? "default" : "ghost"}
                size="sm"
                onClick={() => setCurrentLang(lang)}
                className="text-sm font-medium"
              >
                {lang}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="African woman portrait" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/60 via-background/40 to-background/80"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-7xl md:text-9xl font-black text-primary mb-6 tracking-tight">
              AUGYO
            </h1>
            
            <div className="space-y-4 mb-12">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Stop Digital Violence
              </h2>
              <h2 className="text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Claim Your Rights
              </h2>
            </div>

            <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Join Africa Union's movement to protect women and girls
              from online abuse and gender-based violence
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Button size="lg" variant="outline" className="bg-background/20 border-border text-foreground hover:bg-background/30 text-lg px-8 py-6">
                <Play className="w-6 h-6 mr-3" />
                WATCH THE VIDEO
              </Button>
              
              <Link to="/create">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
                  <Image className="w-6 h-6 mr-3" />
                  AUGYO YOUR IMAGES
                </Button>
              </Link>
            </div>

            {/* Share Story */}
            <div className="inline-flex items-center gap-3 bg-background/10 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3">
              <Share2 className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium text-lg">SHARE YOUR STORY</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="absolute bottom-8 left-8 right-8">
          <Card className="bg-destructive/90 border-destructive text-destructive-foreground p-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full bg-destructive-foreground/20 flex items-center justify-center text-xs font-bold">!</div>
              <span className="font-semibold">
                85% of women have experienced online violence
              </span>
            </div>
          </Card>
        </div>
      </section>

      {/* Take Control Section */}
      <section className="py-24 bg-gradient-to-br from-[hsl(6,78%,57%)] to-[hsl(14,88%,55%)] text-white relative overflow-hidden">
        <div className="container mx-auto px-6 text-center">
          {/* Badge */}
          <Badge className="bg-primary text-primary-foreground mb-8 text-lg px-6 py-2 font-bold">
            RECLAIM YOUR POWER
          </Badge>

          <div className="space-y-6 mb-16">
            <h2 className="text-6xl md:text-8xl font-black text-white leading-none">
              TAKE
            </h2>
            <h2 className="text-6xl md:text-8xl font-black text-primary leading-none">
              CONTROL
            </h2>
          </div>

          <p className="text-2xl mb-16 max-w-4xl mx-auto font-medium">
            Add the AUGYO symbol to your photos and join the movement
          </p>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {[
              { 
                step: "1", 
                title: "Step 1", 
                description: "Upload your photo",
                icon: Upload,
                active: false
              },
              { 
                step: "2", 
                title: "Step 2", 
                description: "Drag and place the orange AUGYO logo",
                icon: MousePointer,
                active: true
              },
              { 
                step: "3", 
                title: "Step 3", 
                description: "Select your hashtag message",
                icon: Hash,
                active: false
              },
              { 
                step: "4", 
                title: "Step 4", 
                description: "Download and share",
                icon: Download,
                active: false
              }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="relative">
                  <Card className={`p-8 text-center transition-all duration-300 ${
                    item.active 
                      ? 'bg-white/20 border-primary/50 shadow-lg shadow-primary/25' 
                      : 'bg-white/10 border-white/20 hover:bg-white/15'
                  }`}>
                    {/* Step Number */}
                    <div className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center text-2xl font-black mb-6 mx-auto">
                      {item.step}
                    </div>
                    
                    {/* Icon */}
                    <div className="w-12 h-12 mx-auto mb-4 text-white/80">
                      <IconComponent className="w-full h-full" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-white/90 leading-relaxed">{item.description}</p>
                  </Card>
                  
                  {/* Arrow */}
                  {index < 3 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <div className="w-8 h-0.5 bg-white/50"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-white/50 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-16">
            <Link to="/create">
              <Button size="lg" className="bg-white text-[hsl(6,78%,57%)] hover:bg-white/90 text-xl px-12 py-6 font-bold">
                START NOW
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Modal Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6 text-center">
          <Card className="max-w-2xl mx-auto bg-gradient-to-br from-background to-secondary border-border/50 p-12">
            <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <Play className="w-10 h-10 text-primary" />
            </div>
            
            <h3 className="text-3xl font-bold mb-6">AUGYO Campaign Video</h3>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              This will feature powerful testimonials from African women
              sharing their experiences and calling for change.
            </p>
            
            <Button className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-lg px-8 py-4">
              YouTube Video Coming Soon
              <br />
              <span className="text-sm opacity-90">60-90 seconds • African voices</span>
            </Button>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary py-12">
        <div className="container mx-auto px-6 text-center">
          <div className="text-primary text-2xl font-bold mb-4">AUGYO</div>
          <p className="text-muted-foreground">
            © 2024 African Union. Empowering digital rights across Africa.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;