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
    <Card className="p-4 bg-toolbar-bg border-border">
      <h3 className="font-semibold mb-4 text-foreground">Tools</h3>
      
      <div className="space-y-3">
        {/* Step 1: Upload Background */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Step 1: Background</p>
          <Button
            onClick={onImageUpload}
            variant="outline"
            className="w-full justify-start hover:bg-tool-hover transition-colors"
            disabled={hasBackgroundImage}
          >
            <Upload className="w-4 h-4 mr-2" />
            {hasBackgroundImage ? "Background Set" : "Upload Image"}
          </Button>
        </div>

        {/* Step 2: Add Elements */}
        {hasBackgroundImage && (
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground font-medium">Step 2: Add Elements</p>
            
            <Button
              onClick={onAddLogo}
              variant="outline"
              className="w-full justify-start hover:bg-tool-hover transition-colors"
            >
              <Image className="w-4 h-4 mr-2" />
              Add Logo
            </Button>

            <Button
              onClick={onAddText}
              variant="outline"
              className="w-full justify-start hover:bg-tool-hover transition-colors"
            >
              <Type className="w-4 h-4 mr-2" />
              Add Text
            </Button>
          </div>
        )}

        {/* Step 3: Actions */}
        {hasActiveObject && (
          <div className="space-y-2 pt-2 border-t border-border">
            <p className="text-sm text-muted-foreground font-medium">Actions</p>
            
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
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Bodyright Campaign</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Create powerful stickers to promote digital rights and connectivity across Africa.
          </p>
        </div>
      </div>
    </Card>
  );
};