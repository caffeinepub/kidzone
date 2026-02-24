import { Link, useLocation } from '@tanstack/react-router';
import { BookOpen, Brain, Palette, Home } from 'lucide-react';

const navItems = [
  { path: '/', label: 'Home', icon: Home, color: 'bg-kid-red', textColor: 'text-white' },
  { path: '/learning', label: 'Learn', icon: BookOpen, color: 'bg-kid-blue', textColor: 'text-white' },
  { path: '/memory-match', label: 'Memory', icon: Brain, color: 'bg-kid-green', textColor: 'text-white' },
  { path: '/draw', label: 'Draw', icon: Palette, color: 'bg-kid-purple', textColor: 'text-white' },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b-4 border-kid-yellow shadow-kid-sm">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img
              src="/assets/generated/mascot-sun.dim_256x256.png"
              alt="KidZone mascot"
              className="w-12 h-12 object-contain group-hover:animate-wiggle transition-transform"
            />
            <span className="font-display text-3xl text-kid-red leading-none">
              Kid<span className="text-kid-yellow">Zone</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden sm:flex items-center gap-2">
            {navItems.map(({ path, label, icon: Icon, color, textColor }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-2xl font-body font-800 text-base
                    transition-all duration-200 min-h-[48px] min-w-[48px]
                    ${isActive
                      ? `${color} ${textColor} shadow-kid-sm scale-105`
                      : 'bg-muted text-foreground hover:scale-105 hover:shadow-kid-sm'
                    }
                  `}
                >
                  <Icon size={20} />
                  <span className="font-bold">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Mobile bottom nav */}
      <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t-4 border-kid-yellow">
        <div className="flex items-center justify-around py-2 px-2">
          {navItems.map(({ path, label, icon: Icon, color, textColor }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  flex flex-col items-center gap-1 px-3 py-2 rounded-2xl
                  transition-all duration-200 min-h-[56px] min-w-[56px]
                  ${isActive ? `${color} ${textColor} shadow-kid-sm` : 'text-muted-foreground'}
                `}
              >
                <Icon size={24} />
                <span className="text-xs font-bold font-body">{label}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden sm:block bg-white border-t-4 border-kid-yellow py-4 text-center">
        <p className="text-muted-foreground font-body text-sm">
          Built with{' '}
          <span className="text-kid-red animate-star-pulse inline-block">❤️</span>
          {' '}using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'kidzone-app')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-kid-blue hover:underline"
          >
            caffeine.ai
          </a>
          {' '}· © {new Date().getFullYear()} KidZone
        </p>
      </footer>
    </div>
  );
}
