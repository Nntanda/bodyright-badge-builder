import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { 
  Upload, 
  Image, 
  Type, 
  Trash2,
  Sparkles
} from "lucide-react";

interface ToolbarProps {
  onImageUpload: () => void;
  onAddLogo: () => void;
  onAddText: () => void;
  onDeleteSelected: () => void;
  hasActiveObject: boolean;
  hasBackgroundImage: boolean;
}

export const Toolbar = ({
  onImageUpload,
  onAddLogo,
  onAddText,
  onDeleteSelected,
  hasActiveObject,
  hasBackgroundImage,
}: ToolbarProps) => {
  return (
    <Card className="p-4 lg:p-6 bg-card border-border shadow-elegant">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-foreground">Creation Tools</h3>
      </div>
      
      <div className="space-y-3">
        {/* Step 1: Upload Background */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <p className="text-sm text-foreground font-semibold">Upload Background</p>
          </div>
          <Button
            onClick={onImageUpload}
            variant={hasBackgroundImage ? "default" : "outline"}
            className="w-full justify-start hover:bg-tool-hover transition-colors"
            disabled={hasBackgroundImage}
          >
            <Upload className="w-4 h-4 mr-2" />
            {hasBackgroundImage ? "✓ Background Added" : "Choose Image"}
          </Button>
        </div>

        {/* Step 2: Add Elements */}
        {hasBackgroundImage && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <p className="text-sm text-foreground font-semibold">Add Elements</p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={onAddLogo}
                variant="outline"
                className="w-full justify-start hover:bg-tool-hover transition-colors"
              >
                <Image className="w-4 h-4 mr-2" />
                Add Bodyright Logo
              </Button>

              <Button
                onClick={onAddText}
                variant="outline"
                className="w-full justify-start hover:bg-tool-hover transition-colors"
              >
                <Type className="w-4 h-4 mr-2" />
                Add Text Message
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Actions */}
        {hasActiveObject && (
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <p className="text-sm text-foreground font-semibold">Edit Selected</p>
            </div>
            
            <Button
              onClick={onDeleteSelected}
              variant="outline"
              className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}

        {/* Campaign Info */}
        <div className="pt-4 mt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Bodyright Campaign</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create powerful stickers to promote digital rights and connectivity across Africa.
          </p>
        </div>
      </div>
    </Card>
  );
};