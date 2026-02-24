import { useEffect } from 'react';
import { RefreshCw, Trophy, Star } from 'lucide-react';
import { SectionHeader } from '../components/DecorativeAccents';
import { MemoryCard } from '../components/MemoryCard';
import { useMemoryGame } from '../hooks/useMemoryGame';
import { useGetBestScore, useRecordScore } from '../hooks/useQueries';

export function MemoryMatch() {
  const { cards, moves, matchedPairs, totalPairs, isWon, flipCard, resetGame } = useMemoryGame();
  const { data: bestScore } = useGetBestScore();
  const { mutate: recordScore } = useRecordScore();

  // Record score when game is won
  useEffect(() => {
    if (isWon) {
      recordScore(moves);
    }
  }, [isWon, moves, recordScore]);

  return (
    <div className="min-h-screen pb-24 sm:pb-8 px-4 pt-6 max-w-3xl mx-auto">
      <SectionHeader
        title="Memory Match"
        subtitle="Find all the matching pairs!"
        emoji="🧠"
      />

      {/* Stats bar */}
      <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
        <div className="flex gap-3">
          <div className="bg-white rounded-2xl shadow-kid-sm px-5 py-3 text-center border-b-4 border-black/10">
            <div className="font-display text-2xl text-kid-blue">{moves}</div>
            <div className="font-body text-sm font-bold text-muted-foreground">Moves</div>
          </div>
          <div className="bg-white rounded-2xl shadow-kid-sm px-5 py-3 text-center border-b-4 border-black/10">
            <div className="font-display text-2xl text-kid-green">{matchedPairs}/{totalPairs}</div>
            <div className="font-body text-sm font-bold text-muted-foreground">Pairs</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {bestScore !== null && bestScore !== undefined && (
            <div className="bg-kid-yellow rounded-2xl shadow-kid-sm px-5 py-3 text-center border-b-4 border-black/10 flex items-center gap-2">
              <Trophy size={20} className="text-kid-orange" />
              <div>
                <div className="font-display text-2xl text-foreground">{bestScore.toString()}</div>
                <div className="font-body text-sm font-bold text-muted-foreground">Best</div>
              </div>
            </div>
          )}

          <button
            onClick={resetGame}
            className="
              flex items-center gap-2
              bg-kid-red text-white
              px-5 py-3 rounded-2xl
              font-body font-bold text-base
              shadow-kid hover:shadow-kid-lg
              hover:scale-105 active:scale-95
              transition-all duration-150
              min-h-[52px]
              border-b-4 border-black/15
            "
          >
            <RefreshCw size={20} />
            New Game
          </button>
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map(card => (
          <MemoryCard
            key={card.id}
            card={card}
            onClick={() => flipCard(card.id)}
          />
        ))}
      </div>

      {/* Win overlay */}
      {isWon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-4xl shadow-kid-lg p-8 text-center max-w-sm w-full animate-pop-in">
            <div className="text-7xl mb-4 animate-float">🏆</div>
            <h2 className="font-display text-4xl text-kid-yellow mb-2">You Won!</h2>
            <p className="font-body text-xl font-bold text-muted-foreground mb-2">
              Amazing job! 🎉
            </p>
            <div className="bg-kid-yellow/20 rounded-3xl px-6 py-3 mb-6">
              <p className="font-body text-lg font-bold">
                You finished in <span className="text-kid-red font-display text-2xl">{moves}</span> moves!
              </p>
              {bestScore !== null && bestScore !== undefined && (
                <p className="font-body text-base text-muted-foreground mt-1">
                  Best score: {bestScore.toString()} moves
                </p>
              )}
            </div>

            <div className="flex justify-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={32}
                  className="text-kid-yellow fill-kid-yellow animate-star-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>

            <button
              onClick={resetGame}
              className="
                flex items-center gap-2 mx-auto
                bg-kid-green text-white
                px-8 py-4 rounded-3xl
                font-body font-bold text-xl
                shadow-kid hover:shadow-kid-lg
                hover:scale-105 active:scale-95
                transition-all duration-150
                min-h-[56px]
                border-b-4 border-black/15
              "
            >
              <RefreshCw size={24} />
              Play Again!
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
