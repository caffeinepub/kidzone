import React from 'react';

interface StarProps {
  className?: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export function Star({ className = '', size = 24, color = '#FFD700', style }: StarProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={className}
      style={style}
      aria-hidden="true"
    >
      <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
    </svg>
  );
}

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  emoji?: string;
}

export function SectionHeader({ title, subtitle, emoji }: SectionHeaderProps) {
  return (
    <div className="text-center mb-8 relative">
      <div className="flex items-center justify-center gap-3 mb-2">
        <Star size={28} color="#FFD700" className="animate-star-pulse" />
        <Star size={20} color="#FF6B35" className="animate-star-pulse" style={{ animationDelay: '0.3s' }} />
        <h1 className="font-display text-4xl md:text-5xl text-foreground">
          {emoji && <span className="mr-2">{emoji}</span>}
          {title}
        </h1>
        <Star size={20} color="#FF6B35" className="animate-star-pulse" style={{ animationDelay: '0.6s' }} />
        <Star size={28} color="#FFD700" className="animate-star-pulse" style={{ animationDelay: '0.9s' }} />
      </div>
      {subtitle && (
        <p className="font-body text-lg text-muted-foreground font-semibold">{subtitle}</p>
      )}
      <div className="mt-3 flex justify-center">
        <img
          src="/assets/generated/confetti-banner.dim_800x120.png"
          alt=""
          className="w-full max-w-lg h-8 object-cover object-center opacity-80"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

export function FloatingStars() {
  const stars = [
    { top: '10%', left: '5%', size: 20, color: '#FFD700', delay: '0s' },
    { top: '20%', right: '8%', size: 16, color: '#FF6B35', delay: '0.5s' },
    { top: '60%', left: '3%', size: 14, color: '#2ED573', delay: '1s' },
    { top: '75%', right: '5%', size: 18, color: '#A855F7', delay: '1.5s' },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0" aria-hidden="true">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: star.top,
            left: 'left' in star ? star.left : undefined,
            right: 'right' in star ? star.right : undefined,
            animationDelay: star.delay,
          }}
        >
          <Star size={star.size} color={star.color} />
        </div>
      ))}
    </div>
  );
}
