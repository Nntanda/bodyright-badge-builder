import { useState, useRef, useEffect, useCallback } from "react";
import { Canvas as FabricCanvas, FabricText, FabricImage } from "fabric";
import { Toolbar } from "./Toolbar";
import { TextEditor } from "./TextEditor";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download, Undo, Redo, Type, MessageSquare } from "lucide-react";

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
      const imgElement = new Image();
      imgElement.crossOrigin = 'anonymous';
      imgElement.onload = () => {
        FabricImage.fromURL(event.target?.result as string, {
          crossOrigin: 'anonymous'
        }).then((fabricImg) => {
          // Scale image to fit canvas while maintaining aspect ratio
          const scale = Math.min(
            canvasSize.width / fabricImg.width!,
            canvasSize.height / fabricImg.height!
          );
          
          fabricImg.set({
            left: (canvasSize.width - fabricImg.width! * scale) / 2,
            top: (canvasSize.height - fabricImg.height! * scale) / 2,
            scaleX: scale,
            scaleY: scale,
            selectable: true,
            evented: true,
          });

          fabricCanvas.add(fabricImg);
          fabricCanvas.sendObjectToBack(fabricImg);
          fabricCanvas.renderAll();
          setBackgroundImage(event.target?.result as string);
          saveCanvasState(fabricCanvas);
          toast.success("Background image uploaded successfully!");
        }).catch((error) => {
          console.error('Error loading background image:', error);
          toast.error("Failed to load background image");
        });
      };
      imgElement.onerror = () => {
        toast.error("Failed to load background image");
      };
      imgElement.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addLogo = () => {
    if (!fabricCanvas) return;

    // First check if the logo image exists
    const logoImg = new Image();
    logoImg.crossOrigin = 'anonymous';
    logoImg.onload = () => {
      FabricImage.fromURL("/logoafri-removebg-preview.png", {
        crossOrigin: 'anonymous'
      }).then((img) => {
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
        fabricCanvas.renderAll();
        saveCanvasState(fabricCanvas);
        toast.success("Logo added to canvas!");
      }).catch((error) => {
        console.error('Error loading logo:', error);
        toast.error("Failed to load logo. Please check if the logo file exists.");
      });
    };
    logoImg.onerror = () => {
      console.error('Logo image not found at /logoafri-removebg-preview.png');
      toast.error("Logo file not found. Please check if the logo exists in the public folder.");
    };
    logoImg.src = "/logoafri-removebg-preview.png";
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

    // Create a temporary canvas with the card and border
    const tempCanvas = document.createElement("canvas");
    const ctx = tempCanvas.getContext("2d");
    if (!ctx) return;

    const padding = 20;
    const messageHeight = selectedMessage ? 60 : 0;
    const borderWidth = 4;
    
    tempCanvas.width = canvasSize.width + (padding * 2) + (borderWidth * 2);
    tempCanvas.height = canvasSize.height + (padding * 2) + messageHeight + (borderWidth * 2);

    // Fill with white background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);

    // Draw orange border
    ctx.strokeStyle = "#ff6b35";
    ctx.lineWidth = borderWidth;
    ctx.strokeRect(borderWidth / 2, borderWidth / 2, tempCanvas.width - borderWidth, tempCanvas.height - borderWidth);

    // Draw the canvas content
    const canvasDataURL = fabricCanvas.toDataURL({ format: "png", quality: 1, multiplier: 1 });
    const canvasImg = new Image();
    
    canvasImg.onload = () => {
      ctx.drawImage(canvasImg, padding + borderWidth, padding + borderWidth);
      
      // Add selected message text below the canvas
      if (selectedMessage) {
        ctx.fillStyle = "#000000";
        ctx.font = "bold 32px Inter, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
          selectedMessage,
          tempCanvas.width / 2,
          canvasSize.height + padding + borderWidth + 45
        );
      }

      // Download the final image
      const finalDataURL = tempCanvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "au-tfgbv-sticker.png";
      link.href = finalDataURL;
      link.click();
      
      toast.success("Sticker downloaded successfully!");
    };
    
    canvasImg.src = canvasDataURL;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-primary/20 bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-primary">
                AU-TFGBV Sticker Maker
              </h1>
              <p className="text-muted-foreground text-sm mt-1">Create stunning campaign stickers with messages</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={undo}
                disabled={historyIndex <= 0}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Undo className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Undo</span>
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={redo}
                disabled={historyIndex >= canvasHistory.length - 1}
                className="border-primary/30 text-primary hover:bg-primary/10"
              >
                <Redo className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Redo</span>
              </Button>
              <Button
                onClick={downloadSticker}
                className="bg-primary text-white hover:bg-primary/90 shadow-lg"
                size="default"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Sticker
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
              {/* Canvas Card with Orange Border */}
              <div className="bg-white rounded-xl shadow-lg border-4 border-primary p-4 lg:p-6">
                <div className="flex justify-center">
                  <div className="w-full max-w-full overflow-auto">
                    <div className="border-2 border-dashed border-primary/30 rounded-lg p-4 bg-gray-50 inline-block">
                      <canvas 
                        ref={canvasRef} 
                        className="rounded-lg shadow-sm bg-white" 
                        style={{ width: '600px', height: '600px', maxWidth: '100%' }} 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Selected Message Display */}
              {selectedMessage && (
                <div className="bg-white rounded-xl shadow-lg border-2 border-primary/20 p-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <MessageSquare className="w-5 h-5 text-primary" />
                      <p className="text-sm text-primary font-semibold">Message Selected:</p>
                    </div>
                    <p className="text-xl font-bold text-foreground bg-primary/5 px-4 py-2 rounded-lg border border-primary/20">
                      {selectedMessage}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">This message will be attached to your downloaded sticker</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Properties Panel */}
          <div className="xl:col-span-3 order-2 xl:order-3">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl border border-primary/20 shadow-lg p-6 text-center">
                <div className="text-muted-foreground">
                  <Type className="w-12 h-12 mx-auto mb-4 text-primary/30" />
                  <h3 className="font-semibold mb-2 text-primary">Element Properties</h3>
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