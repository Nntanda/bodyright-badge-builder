import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { 
  Bold, 
  Italic, 
  AlignLeft, 
  AlignCenter, 
  AlignRight,
  Palette,
  Type
} from "lucide-react";

interface TextEditorProps {
  activeObject: any;
  onUpdate: (properties: any) => void;
}

export const TextEditor = ({ activeObject, onUpdate }: TextEditorProps) => {
  const [text, setText] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [color, setColor] = useState("#8b5cf6");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textAlign, setTextAlign] = useState("left");

  useEffect(() => {
    if (activeObject && activeObject.type === "text") {
      setText(activeObject.text || "");
      setFontSize(activeObject.fontSize || 32);
      setColor(activeObject.fill || "#8b5cf6");
      setIsBold(activeObject.fontWeight === "bold");
      setIsItalic(activeObject.fontStyle === "italic");
      setTextAlign(activeObject.textAlign || "left");
    }
  }, [activeObject]);

  const handleTextChange = (value: string) => {
    setText(value);
    onUpdate({ text: value });
  };

  const handleFontSizeChange = (value: number[]) => {
    const size = value[0];
    setFontSize(size);
    onUpdate({ fontSize: size });
  };

  const handleColorChange = (value: string) => {
    setColor(value);
    onUpdate({ fill: value });
  };

  const toggleBold = () => {
    const newBold = !isBold;
    setIsBold(newBold);
    onUpdate({ fontWeight: newBold ? "bold" : "normal" });
  };

  const toggleItalic = () => {
    const newItalic = !isItalic;
    setIsItalic(newItalic);
    onUpdate({ fontStyle: newItalic ? "italic" : "normal" });
  };

  const handleAlignChange = (align: string) => {
    setTextAlign(align);
    onUpdate({ textAlign: align });
  };

  if (!activeObject || activeObject.type !== "text") {
    return (
      <Card className="p-4 lg:p-6 bg-card border-border shadow-elegant">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Type className="w-4 h-4 text-white" />
          </div>
          <h3 className="font-semibold text-foreground">Text Properties</h3>
        </div>
        <p className="text-sm text-muted-foreground">Select a text element to edit its properties</p>
      </Card>
    );
  }

  const colorPresets = [
    "#ff6b35", // Primary orange
    "#ffffff", // White
    "#000000", // Black
    "#ff8c42", // Light orange
    "#ef4444", // Red
    "#10b981", // Green
    "#f59e0b", // Yellow
    "#3b82f6", // Blue
  ];

  return (
    <Card className="p-4 lg:p-6 bg-card border-border shadow-elegant">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Type className="w-4 h-4 text-white" />
        </div>
        <h3 className="font-semibold text-foreground">Text Properties</h3>
      </div>
      
      <div className="space-y-4">
        {/* Text Content */}
        <div className="space-y-2">
          <Label htmlFor="text-content" className="text-sm font-medium">
            Text Content
          </Label>
          <Input
            id="text-content"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your text..."
            className="bg-background border-border"
          />
        </div>

        {/* Font Size */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Font Size: {fontSize}px
          </Label>
          <Slider
            value={[fontSize]}
            onValueChange={handleFontSizeChange}
            max={120}
            min={12}
            step={2}
            className="w-full"
          />
        </div>

        {/* Text Formatting */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Formatting</Label>
          <div className="flex gap-1">
            <Button
              variant={isBold ? "default" : "outline"}
              size="sm"
              onClick={toggleBold}
              className="px-2"
            >
              <Bold className="w-4 h-4" />
            </Button>
            <Button
              variant={isItalic ? "default" : "outline"}
              size="sm"
              onClick={toggleItalic}
              className="px-2"
            >
              <Italic className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Text Alignment */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">Alignment</Label>
          <div className="flex gap-1">
            <Button
              variant={textAlign === "left" ? "default" : "outline"}
              size="sm"
              onClick={() => handleAlignChange("left")}
              className="px-2"
            >
              <AlignLeft className="w-4 h-4" />
            </Button>
            <Button
              variant={textAlign === "center" ? "default" : "outline"}
              size="sm"
              onClick={() => handleAlignChange("center")}
              className="px-2"
            >
              <AlignCenter className="w-4 h-4" />
            </Button>
            <Button
              variant={textAlign === "right" ? "default" : "outline"}
              size="sm"
              onClick={() => handleAlignChange("right")}
              className="px-2"
            >
              <AlignRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Color Picker */}
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Palette className="w-4 h-4" />
            Text Color
          </Label>
          
          {/* Color Presets */}
          <div className="grid grid-cols-4 gap-2">
            {colorPresets.map((presetColor) => (
              <button
                key={presetColor}
                onClick={() => handleColorChange(presetColor)}
                className={`w-8 h-8 rounded-md border-2 transition-all hover:scale-110 ${
                  color === presetColor ? "border-primary shadow-glow" : "border-border"
                }`}
                style={{ backgroundColor: presetColor }}
              />
            ))}
          </div>

          {/* Custom Color Input */}
          <Input
            type="color"
            value={color}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-full h-10 p-1 bg-background border-border cursor-pointer"
          />
        </div>
      </div>
    </Card>
  );
};