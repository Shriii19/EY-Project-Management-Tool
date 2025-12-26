import React from 'react';
import { Loader2 } from 'lucide-react';

const Loading = ({ fullScreen = true, message = 'Loading...' }) => {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 animate-pulse">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
        <div className="absolute inset-0 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
      </div>
      <p className="text-slate-400 text-lg animate-pulse">{message}</p>
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
