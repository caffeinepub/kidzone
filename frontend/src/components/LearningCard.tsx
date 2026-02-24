interface LearningCardProps {
  label: string;
  type: 'letter' | 'number';
  color: string;
  onClick: () => void;
}

const LETTER_COLORS = [
  'bg-kid-red text-white',
  'bg-kid-orange text-white',
  'bg-kid-yellow text-foreground',
  'bg-kid-green text-white',
  'bg-kid-blue text-white',
  'bg-kid-purple text-white',
  'bg-kid-pink text-white',
  'bg-kid-teal text-white',
];

export function LearningCard({ label, type, color, onClick }: LearningCardProps) {
  return (
    <button
      onClick={onClick}
      className={`
        ${color}
        rounded-3xl shadow-kid font-display text-3xl md:text-4xl
        flex items-center justify-center
        min-h-[80px] min-w-[80px] w-full aspect-square
        transition-all duration-150
        hover:scale-110 hover:-translate-y-1 hover:shadow-kid-lg
        active:scale-95 active:translate-y-1 active:shadow-none
        cursor-pointer select-none
        border-b-4 border-black/10
      `}
      aria-label={`${type === 'letter' ? 'Letter' : 'Number'} ${label}`}
    >
      {label}
    </button>
  );
}

export { LETTER_COLORS };
