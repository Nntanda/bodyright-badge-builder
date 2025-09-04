import { useState, useRef, useEffect, useCallback } from "react";
import { Canvas as FabricCanvas, FabricText, FabricImage } from "fabric";
import { Toolbar } from "./Toolbar";
import { TextEditor } from "./TextEditor";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download, Undo, Redo, Type, Upload } from "lucide-react";

export const StickerMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [canvasSize] = useState({ width: 600, height: 600 }); // Fixed size for professional design

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: canvasSize.width,
      height: canvasSize.height,
      backgroundColor: "#ffffff",
    });

    setFabricCanvas(canvas);

    // Event listeners
    canvas.on("selection:created", (e) => setActiveObject(e.selected?.[0]));
    canvas.on("selection:updated", (e) => setActiveObject(e.selected?.[0]));
    canvas.on("selection:cleared", () => setActiveObject(null));
    canvas.on("object:modified", () => saveCanvasState(canvas));

    toast.success("Sticker maker ready! Upload a background image to start.");

    return () => {
      canvas.dispose();
    };
  }, [canvasSize]);

  const saveCanvasState = useCallback((canvas: FabricCanvas) => {
    const state = JSON.stringify(canvas.toJSON());
    const newHistory = canvasHistory.slice(0, historyIndex + 1);
    newHistory.push(state);
    setCanvasHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [canvasHistory, historyIndex]);

  const undo = useCallback(() => {
    if (!fabricCanvas || historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    const state = canvasHistory[newIndex];
    
    fabricCanvas.loadFromJSON(state, () => {
      fabricCanvas.renderAll();
      setHistoryIndex(newIndex);
      toast.success("Undid last action");
    });
  }, [fabricCanvas, canvasHistory, historyIndex]);

  const redo = useCallback(() => {
    if (!fabricCanvas || historyIndex >= canvasHistory.length - 1) return;
    
    const newIndex = historyIndex + 1;
    const state = canvasHistory[newIndex];
    
    fabricCanvas.loadFromJSON(state, () => {
      fabricCanvas.renderAll();
      setHistoryIndex(newIndex);
      toast.success("Redid last action");
    });
  }, [fabricCanvas, canvasHistory, historyIndex]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricCanvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imageUrl = event.target?.result as string;
      
      // Set the image as canvas background
      fabricCanvas.setBackgroundImage(imageUrl, () => {
        fabricCanvas.renderAll();
        setBackgroundImage(imageUrl);
        saveCanvasState(fabricCanvas);
        toast.success("Background image uploaded successfully!");
      }, {
        // Scale and position the background to cover the entire canvas
        scaleX: canvasSize.width / 1000, // Assuming reasonable image dimensions
        scaleY: canvasSize.height / 1000,
        originX: 'left',
        originY: 'top'
      });
    };
    reader.readAsDataURL(file);
  };

  const addLogo = () => {
    if (!fabricCanvas) return;

    FabricImage.fromURL("/lovable-uploads/8366b68a-a4bc-4496-86d3-a9fa64589a61.png").then((img) => {
      img.set({
        left: 50,
        top: 50,
        scaleX: 0.2,
        scaleY: 0.2,
        selectable: true,
        evented: true,
        hasControls: true,
        hasBorders: true,
        cornerSize: 10,
        transparentCorners: false,
        cornerColor: '#ff6b35',
        borderColor: '#ff6b35',
      });
      fabricCanvas.add(img);
      fabricCanvas.bringObjectToFront(img);
      fabricCanvas.setActiveObject(img);
      saveCanvasState(fabricCanvas);
      toast.success("Logo added to canvas!");
    });
  };

  const handleMessageSelect = (message: string) => {
    setSelectedMessage(message);
    toast.success("Message selected!");
  };

  const deleteSelected = () => {
    if (!fabricCanvas || !activeObject) return;
    
    fabricCanvas.remove(activeObject);
    saveCanvasState(fabricCanvas);
    toast.success("Element deleted");
  };

  const downloadSticker = () => {
    if (!fabricCanvas) return;

    // Export the canvas directly as it now contains the background image
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2, // Higher resolution for better quality
      width: canvasSize.width,
      height: canvasSize.height
    });
    
    const link = document.createElement("a");
    link.download = "au-tfgbv-sticker.png";
    link.href = dataURL;
    link.click();
    
    toast.success("Sticker downloaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary to-background">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                AU-TFGBV Sticker Maker
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Create stunning campaign stickers</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="transition-all duration-200 hover:shadow-glow"
              >
                <Undo className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Undo</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= canvasHistory.length - 1}
                className="transition-all duration-200 hover:shadow-glow"
              >
                <Redo className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Redo</span>
              </Button>
              <Button
                onClick={downloadSticker}
                className="bg-primary text-primary-foreground"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto p-4 lg:p-6">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Toolbar */}
          <div className="xl:col-span-3 order-1 xl:order-1">
            <div className="sticky top-24">
              <Toolbar
                onImageUpload={() => fileInputRef.current?.click()}
                onAddLogo={addLogo}
                onMessageSelect={handleMessageSelect}
                onDeleteSelected={deleteSelected}
                hasActiveObject={!!activeObject}
                hasBackgroundImage={!!backgroundImage}
                selectedMessage={selectedMessage}
              />
            </div>
          </div>

          {/* Canvas */}
          <div className="xl:col-span-6 order-3 xl:order-2">
            <div className="space-y-4">
              {/* Canvas Container */}
              <div className="bg-card rounded-xl shadow-elegant border border-border p-4 lg:p-6">
                <div className="flex justify-center">
                  <div className="relative">
                    <canvas 
                      ref={canvasRef} 
                      className="border-2 border-primary rounded-lg shadow-lg" 
                      style={{ 
                        width: `${canvasSize.width}px`, 
                        height: `${canvasSize.height}px`,
                        maxWidth: '100%',
                        maxHeight: '70vh'
                      }} 
                    />
                    {!backgroundImage && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-50/80 rounded-lg border-2 border-dashed border-gray-300">
                        <div className="text-center text-gray-500">
                          <Upload className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p className="text-sm font-medium">Upload a background image to start</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="xl:col-span-3 order-2 xl:order-3">
            <div className="sticky top-24">
              <div className="bg-card rounded-xl border border-border p-6 text-center">
                <div className="text-muted-foreground">
                  <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="font-semibold mb-2">Element Properties</h3>
                  <p className="text-sm">
                    {activeObject ? "Use your mouse to resize and move elements on the canvas" : "Select an element to see options"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
      </main>
    </div>
  );
};