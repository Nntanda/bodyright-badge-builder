import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { 
  Upload, 
  Image, 
  MessageSquare, 
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
  "#No Excuse",
  "#Stand we speak",
  "#If Music has right,I too should",
  "#My Photos,my rules"
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
            <p className="text-sm text-foreground font-semibold">Set Background Image</p>
          </div>
          <Button
            onClick={onImageUpload}
            variant="outline"
            className="w-full justify-start hover:bg-tool-hover transition-colors"
          >
            <Upload className="w-4 h-4 mr-2" />
            {hasBackgroundImage ? "Change Background" : "Choose Background"}
          </Button>
        </div>

        {/* Step 2: Add Elements */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
              2
            </div>
            <p className="text-sm text-foreground font-semibold">Add Logo & Message</p>
          </div>
          
          <div className="space-y-2">
            <Button
              onClick={onAddLogo}
              variant="outline"
              className="w-full justify-start hover:bg-tool-hover transition-colors"
            >
              <Image className="w-4 h-4 mr-2" />
              Add AU-TFGBV Logo
            </Button>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Campaign Message</label>
              <Select onValueChange={onMessageSelect} value={selectedMessage || ""}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a campaign message" />
                </SelectTrigger>
                <SelectContent>
                  {messageOptions.map((message) => (
                    <SelectItem key={message} value={message}>
                      {message}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

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

        {/* Selected Message Display */}
        {selectedMessage && (
          <div className="pt-4 border-t border-border">
            <div className="bg-primary/10 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Selected Message:</p>
              <p className="text-sm font-semibold text-primary">{selectedMessage}</p>
            </div>
          </div>
        )}

        {/* Campaign Info */}
        <div className="pt-4 mt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm font-semibold text-primary">AU-TFGBV Campaign</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Create powerful stickers for the AU-TFGBV campaign. Upload a background image, add the logo, and include campaign messages.
          </p>
        </div>
      </div>
    </Card>
  );
};