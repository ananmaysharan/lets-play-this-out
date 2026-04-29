import type { ReactNode } from 'react';

type Color = 'terracotta' | 'green' | 'black';

interface Props {
  children: ReactNode;
  color?: Color;
  className?: string;
}

const CLASS: Record<Color, string> = {
  terracotta: '',
  green: 'green',
  black: 'black',
};

export function Stamp({ children, color = 'terracotta', className = '' }: Props) {
  const cls = ['stamp', CLASS[color], className].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}
