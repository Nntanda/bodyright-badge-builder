import { Button } from "./ui/button";
import { Card } from "./ui/card";

import { 
  Upload, 
  Image, 
  Trash2,
  Sparkles
} from "lucide-react";

interface ToolbarProps {
  onImageUpload: () => void;
  onAddLogo: () => void;
  onMessageSelect: (message: string) => void;
  onDeleteSelected: () => void;
  hasActiveObject: boolean;
  hasBackgroundImage: boolean;
  selectedMessage: string | null;
}

const messageOptions = [
  "#NoExcuse",
  "#StandWeSpeak", 
  "#IfMusicHasRightsITooShould",
  "#MyPhotosMyRules"
];

export const Toolbar = ({
  onImageUpload,
  onAddLogo,
  onMessageSelect,
  onDeleteSelected,
  hasActiveObject,
  hasBackgroundImage,
  selectedMessage,
}: ToolbarProps) => {
  return (
    <Card className="p-4 lg:p-6 bg-white border-primary/20 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-primary">Creation Tools</h3>
      </div>
      
      <div className="space-y-3">
        {/* Step 1: Upload Background */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              1
            </div>
            <p className="text-sm text-primary font-semibold">Upload Background</p>
          </div>
          <Button
            onClick={onImageUpload}
            variant={hasBackgroundImage ? "default" : "outline"}
            className={`w-full justify-start transition-colors ${
              hasBackgroundImage 
                ? "bg-primary text-white" 
                : "border-primary/30 text-primary hover:bg-primary/10"
            }`}
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
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <p className="text-sm text-primary font-semibold">Add Elements</p>
            </div>
            
            <div className="space-y-2">
              <Button
                onClick={onAddLogo}
                variant="outline"
                className="w-full justify-start border-primary/30 text-primary hover:bg-primary/10 transition-colors"
              >
                <Image className="w-4 h-4 mr-2" />
                Add AU-TFGBV Logo
              </Button>

              <div className="space-y-3">
                <label className="text-sm font-medium text-muted-foreground">
                  Choose your hashtag
                </label>
                <div className="flex flex-wrap gap-2">
                  {messageOptions.map((message) => (
                    <Button
                      key={message}
                      onClick={() => onMessageSelect(message)}
                      variant={selectedMessage === message ? "default" : "secondary"}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        selectedMessage === message 
                          ? "bg-orange-500 text-white hover:bg-orange-600" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {message}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Actions */}
        {hasActiveObject && (
          <div className="space-y-3 pt-4 border-t border-primary/20">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                3
              </div>
              <p className="text-sm text-primary font-semibold">Edit Selected</p>
            </div>
            
            <Button
              onClick={onDeleteSelected}
              variant="outline"
              className="w-full justify-start border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Selected
            </Button>
          </div>
        )}

        {/* Campaign Info */}
        <div className="pt-4 mt-4 border-t border-primary/20">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">AU-TFGBV Campaign</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create powerful stickers for the AU-TFGBV campaign. Choose a message that will be automatically attached to your downloaded sticker.
          </p>
        </div>
      </div>
    </Card>
  );
};