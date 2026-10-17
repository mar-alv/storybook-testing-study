import type { ReactNode } from 'react';

export interface LegacyButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

export function LegacyButton({ children, onClick }: LegacyButtonProps) {
  return (
    <div
      onClick={onClick}
      className="inline-block cursor-pointer rounded bg-yellow-400 px-4 py-2 text-sm text-white"
    >
      {children}
    </div>
  );
}
