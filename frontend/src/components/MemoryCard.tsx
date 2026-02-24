import { CardState } from '../hooks/useMemoryGame';

interface MemoryCardProps {
  card: CardState;
  onClick: () => void;
}

const CARD_COLORS = [
  'bg-kid-red',
  'bg-kid-orange',
  'bg-kid-yellow',
  'bg-kid-green',
  'bg-kid-blue',
  'bg-kid-purple',
  'bg-kid-pink',
  'bg-kid-teal',
];

export function MemoryCard({ card, onClick }: MemoryCardProps) {
  const isVisible = card.isFlipped || card.isMatched;
  const cardColor = CARD_COLORS[card.animalIndex % CARD_COLORS.length];

  return (
    <div
      className="perspective-1000 aspect-square cursor-pointer"
      onClick={onClick}
    >
      <div className={`card-flip w-full h-full relative ${isVisible ? 'flipped' : ''}`}>
        {/* Card back (face down) */}
        <div
          className={`
            card-face absolute inset-0
            bg-gradient-to-br from-kid-blue to-kid-purple
            rounded-2xl shadow-kid
            flex items-center justify-center
            border-b-4 border-black/15
            ${card.isMatched ? 'opacity-0' : ''}
          `}
        >
          <span className="text-4xl select-none">⭐</span>
        </div>

        {/* Card front (face up) */}
        <div
          className={`
            card-face card-back absolute inset-0
            ${cardColor}
            rounded-2xl shadow-kid
            flex items-center justify-center
            border-b-4 border-black/15
            ${card.isMatched ? 'ring-4 ring-kid-yellow ring-offset-2 opacity-80' : ''}
            transition-opacity duration-300
          `}
        >
          <span className="text-4xl md:text-5xl select-none">{card.emoji}</span>
          {card.isMatched && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/20">
              <span className="text-2xl">✓</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
