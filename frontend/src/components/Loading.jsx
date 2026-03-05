import React from 'react';
import { Loader2 } from 'lucide-react';

const SIZES = {
  sm: { spinner: 'w-6 h-6', text: 'text-sm' },
  md: { spinner: 'w-12 h-12', text: 'text-lg' },
  lg: { spinner: 'w-16 h-16', text: 'text-xl' },
};

const Loading = ({ fullScreen = true, message = 'Loading...', size = 'md' }) => {
  const { spinner, text } = SIZES[size] ?? SIZES.md;

  const content = (
    <div 
      className="flex flex-col items-center justify-center gap-4 animate-pulse"
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="relative">
        <Loader2 className={`${spinner} text-purple-500 animate-spin`} aria-hidden="true" />
        <div className={`absolute inset-0 ${spinner} bg-purple-500/20 rounded-full blur-xl`}></div>
      </div>
      <p className={`text-slate-400 ${text} animate-pulse`}>{message}</p>
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
