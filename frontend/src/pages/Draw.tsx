import { useRef, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { SectionHeader } from '../components/DecorativeAccents';
import { ColorPalette } from '../components/ColorPalette';
import { useDrawingCanvas } from '../hooks/useDrawingCanvas';

export function Draw() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { canvasRef, selectedColor, setSelectedColor, brushSize, setBrushSize, clearCanvas } = useDrawingCanvas();

  // Set canvas size to match container
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const setSize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);
      if (canvas.width !== w || canvas.height !== h) {
        // Save current drawing
        const ctx = canvas.getContext('2d');
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);

        canvas.width = w;
        canvas.height = h;

        // Restore background
        if (ctx) {
          ctx.fillStyle = '#FFFBF0';
          ctx.fillRect(0, 0, w, h);
          if (imageData) {
            ctx.putImageData(imageData, 0, 0);
          }
        }
      }
    };

    setSize();
    const observer = new ResizeObserver(setSize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [canvasRef]);

  return (
    <div className="min-h-screen pb-24 sm:pb-8 px-4 pt-6 flex flex-col max-w-5xl mx-auto">
      <SectionHeader
        title="Draw & Color"
        subtitle="Create your masterpiece!"
        emoji="🎨"
      />

      {/* Toolbar */}
      <div className="mb-4">
        <ColorPalette
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
      </div>

      {/* Canvas area */}
      <div className="flex-1 flex flex-col gap-3">
        <div
          ref={containerRef}
          className="
            flex-1 min-h-[350px] md:min-h-[450px]
            bg-white rounded-3xl shadow-kid
            overflow-hidden border-4 border-kid-yellow
            cursor-crosshair
          "
          style={{ touchAction: 'none' }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full block"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Clear button */}
        <button
          onClick={clearCanvas}
          className="
            flex items-center gap-3 mx-auto
            bg-kid-red text-white
            px-8 py-4 rounded-3xl
            font-body font-bold text-xl
            shadow-kid hover:shadow-kid-lg
            hover:scale-105 active:scale-95
            transition-all duration-150
            min-h-[56px]
            border-b-4 border-black/15
          "
        >
          <Trash2 size={24} />
          Clear Canvas
        </button>
      </div>
    </div>
  );
}
