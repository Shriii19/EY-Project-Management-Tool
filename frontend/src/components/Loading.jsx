import React from 'react';

const SIZES = {
  sm: { outer: 'w-8 h-8', inner: 'w-5 h-5', dot: 'w-1.5 h-1.5', text: 'text-sm' },
  md: { outer: 'w-16 h-16', inner: 'w-10 h-10', dot: 'w-2 h-2', text: 'text-lg' },
  lg: { outer: 'w-24 h-24', inner: 'w-16 h-16', dot: 'w-2.5 h-2.5', text: 'text-xl' },
};

const Loading = ({ fullScreen = true, message = 'Loading...', size = 'md' }) => {
  const { outer, inner, dot, text } = SIZES[size] ?? SIZES.md;

  const content = (
    <div
      className="flex flex-col items-center justify-center gap-5"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Multi-ring spinner */}
      <div className="relative flex items-center justify-center">
        {/* Outer ring */}
        <div className={`${outer} rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin absolute`} />
        {/* Middle ring */}
        <div className={`${inner} rounded-full border-2 border-pink-500/20 border-b-pink-500 animate-spin absolute`} style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        {/* Center dot */}
        <div className={`${dot} rounded-full bg-gradient-to-br from-purple-400 to-pink-400 shadow-lg shadow-purple-500/50 animate-pulse`} />
        {/* Glow backdrop */}
        <div className={`${outer} absolute rounded-full bg-purple-500/10 blur-lg`} />
      </div>
      <p className={`text-slate-400 ${text} font-medium tracking-wide`}>{message}</p>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        {content}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-8">
      {content}
    </div>
  );
};

export default Loading;
