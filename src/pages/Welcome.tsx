import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Image, Type, Download, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Bodyright</h1>
                <p className="text-xs text-muted-foreground">Sticker Maker</p>
              </div>
            </div>
            <Link to="/create">
              <Button className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 lg:py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bodyright Campaign Tool</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Create Powerful
            <span className="bg-gradient-hero bg-clip-text text-transparent block">
              Campaign Stickers
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Design stunning stickers to promote digital rights and connectivity across Africa. 
            Upload your images, add our logo, customize with text, and share your message.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/create">
              <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8">
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 border-border/50">
            <div className="w-12 h-12 bg-gradient-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Image className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Upload Background</h3>
            <p className="text-muted-foreground">
              Start with your own images as backgrounds for personalized campaign materials.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 border-border/50">
            <div className="w-12 h-12 bg-gradient-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Type className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Customize Text</h3>
            <p className="text-muted-foreground">
              Add compelling messages with full control over fonts, colors, and formatting.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-glow transition-all duration-300 border-border/50">
            <div className="w-12 h-12 bg-gradient-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Download & Share</h3>
            <p className="text-muted-foreground">
              Export high-quality stickers ready for social media and print campaigns.
            </p>
          </Card>
        </div>

        {/* How it Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Upload Your Image</h3>
              <p className="text-muted-foreground">
                Choose any image as your sticker background
              </p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Add Elements</h3>
              <p className="text-muted-foreground">
                Insert the Bodyright logo and customize your message
              </p>
            </div>
            
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Download Result</h3>
              <p className="text-muted-foreground">
                Export your finished sticker in high quality
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <Card className="p-8 md:p-12 text-center bg-gradient-primary/5 border-primary/20">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join the Bodyright movement and create compelling visual content 
            that drives digital rights across Africa.
          </p>
          <Link to="/create">
            <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300 text-lg px-8">
              Start Creating Now
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </Card>
      </main>

      {/* Footer */}
      <footer className="border-t bg-secondary/50 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Bodyright Campaign. Empowering digital rights across Africa.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Welcome;