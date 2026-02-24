import { useState } from 'react';
import { SectionHeader } from '../components/DecorativeAccents';
import { LearningCard, LETTER_COLORS } from '../components/LearningCard';
import { LearningPopup } from '../components/LearningPopup';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const NUMBERS = Array.from({ length: 20 }, (_, i) => String(i + 1));

type ItemType = 'letter' | 'number';

interface SelectedItem {
  label: string;
  type: ItemType;
  color: string;
}

export function Learning() {
  const [selected, setSelected] = useState<SelectedItem | null>(null);
  const [activeTab, setActiveTab] = useState<'letters' | 'numbers'>('letters');

  const handleSelect = (label: string, type: ItemType, colorIndex: number) => {
    setSelected({ label, type, color: LETTER_COLORS[colorIndex % LETTER_COLORS.length] });
  };

  return (
    <div className="min-h-screen pb-24 sm:pb-8 px-4 pt-6 max-w-5xl mx-auto">
      <SectionHeader
        title="Letters & Numbers"
        subtitle="Tap a card to learn!"
        emoji="📚"
      />

      {/* Tab switcher */}
      <div className="flex gap-3 justify-center mb-6">
        <button
          onClick={() => setActiveTab('letters')}
          className={`
            px-8 py-3 rounded-3xl font-display text-xl
            transition-all duration-200 min-h-[52px]
            border-b-4 border-black/10
            ${activeTab === 'letters'
              ? 'bg-kid-blue text-white shadow-kid scale-105'
              : 'bg-white text-foreground shadow-kid-sm hover:scale-105'
            }
          `}
        >
          🔤 Letters
        </button>
        <button
          onClick={() => setActiveTab('numbers')}
          className={`
            px-8 py-3 rounded-3xl font-display text-xl
            transition-all duration-200 min-h-[52px]
            border-b-4 border-black/10
            ${activeTab === 'numbers'
              ? 'bg-kid-orange text-white shadow-kid scale-105'
              : 'bg-white text-foreground shadow-kid-sm hover:scale-105'
            }
          `}
        >
          🔢 Numbers
        </button>
      </div>

      {/* Letters grid */}
      {activeTab === 'letters' && (
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {LETTERS.map((letter, i) => (
            <LearningCard
              key={letter}
              label={letter}
              type="letter"
              color={LETTER_COLORS[i % LETTER_COLORS.length]}
              onClick={() => handleSelect(letter, 'letter', i)}
            />
          ))}
        </div>
      )}

      {/* Numbers grid */}
      {activeTab === 'numbers' && (
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3">
          {NUMBERS.map((num, i) => (
            <LearningCard
              key={num}
              label={num}
              type="number"
              color={LETTER_COLORS[i % LETTER_COLORS.length]}
              onClick={() => handleSelect(num, 'number', i)}
            />
          ))}
        </div>
      )}

      {/* Popup */}
      {selected && (
        <LearningPopup
          label={selected.label}
          type={selected.type}
          color={selected.color}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
