import { PALETTE_COLORS } from '../hooks/useDrawingCanvas';
import { Check } from 'lucide-react';

interface ColorPaletteProps {
  selectedColor: string;
  onSelectColor: (color: string) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export function ColorPalette({ selectedColor, onSelectColor, brushSize, onBrushSizeChange }: ColorPaletteProps) {
  const brushSizes = [6, 12, 20, 32];

  return (
    <div className="bg-white rounded-3xl shadow-kid p-4 border-b-4 border-black/10">
      {/* Colors */}
      <div className="flex flex-wrap gap-2 justify-center mb-4">
        {PALETTE_COLORS.map(color => (
          <button
            key={color}
            onClick={() => onSelectColor(color)}
            className={`
              w-12 h-12 rounded-full
              transition-all duration-150
              hover:scale-110 active:scale-95
              flex items-center justify-center
              border-4
              ${selectedColor === color
                ? 'border-foreground scale-110 shadow-kid'
                : 'border-transparent shadow-kid-sm'
              }
            `}
            style={{ backgroundColor: color }}
            aria-label={`Select color ${color}`}
            title={color}
          >
            {selectedColor === color && (
              <Check
                size={16}
                style={{ color: color === '#FFFFFF' || color === '#FFD700' ? '#333' : '#fff' }}
                strokeWidth={3}
              />
            )}
          </button>
        ))}
      </div>

      {/* Brush sizes */}
      <div className="flex items-center gap-3 justify-center">
        <span className="font-body font-bold text-sm text-muted-foreground">Brush:</span>
        {brushSizes.map(size => (
          <button
            key={size}
            onClick={() => onBrushSizeChange(size)}
            className={`
              rounded-full flex items-center justify-center
              transition-all duration-150
              hover:scale-110 active:scale-95
              min-w-[48px] min-h-[48px]
              ${brushSize === size
                ? 'bg-kid-yellow shadow-kid-sm border-2 border-foreground'
                : 'bg-muted border-2 border-transparent'
              }
            `}
            aria-label={`Brush size ${size}`}
          >
            <div
              className="rounded-full bg-foreground"
              style={{ width: Math.min(size, 28), height: Math.min(size, 28) }}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
