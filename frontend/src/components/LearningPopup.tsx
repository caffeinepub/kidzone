import { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Star } from './DecorativeAccents';

interface LearningPopupProps {
  label: string;
  type: 'letter' | 'number';
  color: string;
  onClose: () => void;
}

const FUN_FACTS: Record<string, string> = {
  A: '🍎 Apple starts with A!',
  B: '🐝 Bee starts with B!',
  C: '🐱 Cat starts with C!',
  D: '🐶 Dog starts with D!',
  E: '🐘 Elephant starts with E!',
  F: '🐸 Frog starts with F!',
  G: '🦒 Giraffe starts with G!',
  H: '🐴 Horse starts with H!',
  I: '🍦 Ice cream starts with I!',
  J: '🃏 Juggle starts with J!',
  K: '🦘 Kangaroo starts with K!',
  L: '🦁 Lion starts with L!',
  M: '🐒 Monkey starts with M!',
  N: '🌙 Night starts with N!',
  O: '🐙 Octopus starts with O!',
  P: '🐧 Penguin starts with P!',
  Q: '👑 Queen starts with Q!',
  R: '🌈 Rainbow starts with R!',
  S: '⭐ Star starts with S!',
  T: '🐯 Tiger starts with T!',
  U: '☂️ Umbrella starts with U!',
  V: '🎻 Violin starts with V!',
  W: '🐋 Whale starts with W!',
  X: '🎸 Xylophone starts with X!',
  Y: '🪀 Yo-yo starts with Y!',
  Z: '🦓 Zebra starts with Z!',
};

const NUMBER_FACTS: Record<string, string> = {
  '1': '☝️ One finger!',
  '2': '👀 Two eyes!',
  '3': '🍀 Three-leaf clover!',
  '4': '🐾 Four paws!',
  '5': '✋ Five fingers!',
  '6': '🎲 Six sides on a dice!',
  '7': '🌈 Seven colors in a rainbow!',
  '8': '🐙 Eight arms on an octopus!',
  '9': '🎳 Nine pins in bowling!',
  '10': '🖐️🖐️ Ten fingers!',
  '11': '⚽ Eleven players in soccer!',
  '12': '🕛 Twelve hours on a clock!',
  '13': '🍩 Thirteen in a baker\'s dozen!',
  '14': '💝 Fourteen days to Valentine\'s!',
  '15': '🌸 Fifteen petals on a daisy!',
  '16': '🎂 Sweet sixteen!',
  '17': '🌟 Seventeen stars!',
  '18': '🎉 Eighteen is a big birthday!',
  '19': '🦕 Nineteen dino teeth!',
  '20': '🦶🦶 Twenty toes!',
};

export function LearningPopup({ label, type, color, onClose }: LearningPopupProps) {
  const fact = type === 'letter' ? FUN_FACTS[label] : NUMBER_FACTS[label];

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm animate-pop-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Decorative stars */}
        <div className="absolute -top-6 -left-6 animate-star-pulse">
          <Star size={40} color="#FFD700" />
        </div>
        <div className="absolute -top-4 -right-4 animate-star-pulse" style={{ animationDelay: '0.5s' }}>
          <Star size={32} color="#FF6B35" />
        </div>
        <div className="absolute -bottom-4 -left-4 animate-star-pulse" style={{ animationDelay: '1s' }}>
          <Star size={28} color="#2ED573" />
        </div>
        <div className="absolute -bottom-6 -right-6 animate-star-pulse" style={{ animationDelay: '1.5s' }}>
          <Star size={36} color="#A855F7" />
        </div>

        <div className={`${color} rounded-4xl shadow-kid-lg p-8 text-center border-b-8 border-black/10`}>
          {/* Giant letter/number */}
          <div className="font-display text-[10rem] leading-none mb-4 drop-shadow-lg">
            {label}
          </div>

          {/* Fun fact */}
          {fact && (
            <div className="bg-white/30 rounded-3xl px-6 py-3 mb-6">
              <p className="font-body text-xl font-bold">{fact}</p>
            </div>
          )}

          {/* Back button */}
          <button
            onClick={onClose}
            className="
              flex items-center gap-2 mx-auto
              bg-white/90 text-foreground
              px-8 py-4 rounded-3xl
              font-body font-bold text-xl
              shadow-kid hover:shadow-kid-lg
              hover:scale-105 active:scale-95
              transition-all duration-150
              min-h-[56px]
            "
          >
            <ArrowLeft size={24} />
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
