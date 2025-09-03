import { useState, useRef, useEffect, useCallback } from "react";
import { Canvas as FabricCanvas, FabricText, FabricImage } from "fabric";
import { Toolbar } from "./Toolbar";
import { TextEditor } from "./TextEditor";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download, Undo, Redo, Type } from "lucide-react";

export const StickerMaker = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fabricCanvas, setFabricCanvas] = useState<FabricCanvas | null>(null);
  const [activeObject, setActiveObject] = useState<any>(null);
  const [canvasHistory, setCanvasHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new FabricCanvas(canvasRef.current, {
      width: 800,
      height: 600,
      backgroundColor: "hsl(var(--canvas-bg))",
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
  }, []);

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
      const img = new Image();
      img.onload = () => {
        // Calculate scale to fit canvas while maintaining aspect ratio
        const scale = Math.min(
          fabricCanvas.width! / img.width,
          fabricCanvas.height! / img.height
        );

        FabricImage.fromURL(event.target?.result as string).then((fabricImg) => {
          fabricImg.set({
            scaleX: scale,
            scaleY: scale,
            left: (fabricCanvas.width! - img.width * scale) / 2,
            top: (fabricCanvas.height! - img.height * scale) / 2,
            selectable: false,
            evented: false,
          });

          fabricCanvas.backgroundImage = fabricImg;
          fabricCanvas.renderAll();
          setBackgroundImage(event.target?.result as string);
          saveCanvasState(fabricCanvas);
          toast.success("Background image uploaded successfully!");
        });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const addLogo = () => {
    if (!fabricCanvas) return;

    FabricImage.fromURL("/lovable-uploads/8366b68a-a4bc-4496-86d3-a9fa64589a61.png").then((img) => {
      img.set({
        left: 50,
        top: 50,
        scaleX: 0.3,
        scaleY: 0.3,
      });
      fabricCanvas.add(img);
      fabricCanvas.setActiveObject(img);
      saveCanvasState(fabricCanvas);
      toast.success("Logo added to canvas!");
    });
  };

  const addText = (text: string, options: any = {}) => {
    if (!fabricCanvas) return;

    const textObj = new FabricText(text, {
      left: 100,
      top: 100,
      fontFamily: "Inter, sans-serif",
      fontSize: 32,
      fill: "hsl(var(--primary))",
      fontWeight: "bold",
      ...options,
    });

    fabricCanvas.add(textObj);
    fabricCanvas.setActiveObject(textObj);
    saveCanvasState(fabricCanvas);
  };

  const deleteSelected = () => {
    if (!fabricCanvas || !activeObject) return;
    
    fabricCanvas.remove(activeObject);
    saveCanvasState(fabricCanvas);
    toast.success("Element deleted");
  };

  const downloadSticker = () => {
    if (!fabricCanvas) return;

    const dataURL = fabricCanvas.toDataURL({
      format: "png",
      quality: 1,
      multiplier: 2,
    });

    const link = document.createElement("a");
    link.download = "bodyright-sticker.png";
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
                Bodyright Sticker Maker
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
                onAddText={() => addText("Your Text Here")}
                onDeleteSelected={deleteSelected}
                hasActiveObject={!!activeObject}
                hasBackgroundImage={!!backgroundImage}
              />
            </div>
          </div>

          {/* Canvas */}
          <div className="xl:col-span-6 order-3 xl:order-2">
            <div className="bg-card rounded-xl shadow-elegant border border-border p-4 lg:p-6">
              <div className="flex justify-center">
                <div className="w-full max-w-full overflow-auto">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 bg-canvas-bg inline-block min-w-full">
                    <canvas ref={canvasRef} className="rounded-lg shadow-sm max-w-full h-auto" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="xl:col-span-3 order-2 xl:order-3">
            <div className="sticky top-24">
              {activeObject ? (
                <TextEditor
                  activeObject={activeObject}
                  onUpdate={(properties) => {
                    if (fabricCanvas) {
                      activeObject.set(properties);
                      fabricCanvas.renderAll();
                      saveCanvasState(fabricCanvas);
                    }
                  }}
                />
              ) : (
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <div className="text-muted-foreground">
                    <Type className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <h3 className="font-semibold mb-2">Select an Element</h3>
                    <p className="text-sm">Click on text or images to edit their properties</p>
                  </div>
                </div>
              )}
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