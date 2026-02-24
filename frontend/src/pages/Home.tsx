import { Link } from '@tanstack/react-router';
import { BookOpen, Brain, Palette, Star } from 'lucide-react';
import { FloatingStars } from '../components/DecorativeAccents';

const activities = [
  {
    path: '/learning',
    label: 'Letters & Numbers',
    description: 'Learn A-Z and 1-20!',
    icon: BookOpen,
    emoji: '📚',
    bgColor: 'bg-kid-blue',
    shadowColor: 'shadow-[0_6px_0_rgba(30,100,200,0.4)]',
    hoverBg: 'hover:bg-kid-blue',
  },
  {
    path: '/memory-match',
    label: 'Memory Match',
    description: 'Find the matching pairs!',
    icon: Brain,
    emoji: '🧠',
    bgColor: 'bg-kid-green',
    shadowColor: 'shadow-[0_6px_0_rgba(20,150,80,0.4)]',
    hoverBg: 'hover:bg-kid-green',
  },
  {
    path: '/draw',
    label: 'Draw & Color',
    description: 'Create your masterpiece!',
    icon: Palette,
    emoji: '🎨',
    bgColor: 'bg-kid-purple',
    shadowColor: 'shadow-[0_6px_0_rgba(120,50,200,0.4)]',
    hoverBg: 'hover:bg-kid-purple',
  },
];

export function Home() {
  return (
    <div className="relative min-h-screen pb-20 sm:pb-0">
      <FloatingStars />

      {/* Hero section */}
      <section className="relative pt-8 pb-6 px-4 text-center overflow-hidden">
        {/* Confetti banner */}
        <div className="flex justify-center mb-4">
          <img
            src="/assets/generated/confetti-banner.dim_800x120.png"
            alt=""
            className="w-full max-w-2xl h-16 object-cover object-center"
            aria-hidden="true"
          />
        </div>

        {/* Mascot + Title */}
        <div className="flex flex-col items-center gap-4">
          <img
            src="/assets/generated/mascot-sun.dim_256x256.png"
            alt="KidZone sun mascot"
            className="w-32 h-32 md:w-40 md:h-40 object-contain animate-float drop-shadow-lg"
          />

          <div>
            <h1 className="font-display text-6xl md:text-8xl leading-none">
              <span className="text-kid-red">Kid</span>
              <span className="text-kid-yellow">Zone</span>
            </h1>
            <p className="font-body text-xl md:text-2xl font-bold text-muted-foreground mt-2">
              🌟 Fun learning for everyone! 🌟
            </p>
          </div>
        </div>
      </section>

      {/* Activity cards */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <h2 className="font-display text-3xl text-center text-foreground mb-6">
          What do you want to do? 🎉
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {activities.map(({ path, label, description, emoji, bgColor, shadowColor }) => (
            <Link
              key={path}
              to={path}
              className={`
                ${bgColor} ${shadowColor}
                rounded-4xl p-6 text-white
                flex flex-col items-center gap-4 text-center
                transition-all duration-200
                hover:scale-105 hover:-translate-y-2
                active:scale-95 active:translate-y-0
                min-h-[180px] justify-center
                border-b-8 border-black/15
                group
              `}
            >
              <span className="text-6xl group-hover:animate-wiggle transition-transform">
                {emoji}
              </span>
              <div>
                <h3 className="font-display text-2xl leading-tight">{label}</h3>
                <p className="font-body text-base font-semibold opacity-90 mt-1">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Fun stats / encouragement */}
      <section className="px-4 pb-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-4xl shadow-kid p-6 border-b-4 border-kid-yellow/50 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Star className="text-kid-yellow fill-kid-yellow animate-star-pulse" size={28} />
            <h2 className="font-display text-2xl text-foreground">You're a Superstar!</h2>
            <Star className="text-kid-yellow fill-kid-yellow animate-star-pulse" size={28} style={{ animationDelay: '0.5s' }} />
          </div>
          <p className="font-body text-lg font-semibold text-muted-foreground">
            Pick an activity above and start your adventure! 🚀
          </p>
          <div className="flex justify-center gap-6 mt-4">
            {['🌈', '🦋', '🌸', '🎈', '🌟'].map((emoji, i) => (
              <span
                key={i}
                className="text-3xl animate-float"
                style={{ animationDelay: `${i * 0.3}s` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
