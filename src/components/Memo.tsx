'use client';

import type { CSSProperties, ReactNode } from 'react';

type HeaderColor = 'terracotta' | 'teal' | 'mustard' | 'forest' | 'orange';

interface Props {
  headerLeft?: ReactNode;
  headerRight?: ReactNode;
  headerColor?: HeaderColor;
  rotate?: 'left' | 'right' | null;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  bodyStyle?: CSSProperties;
}

const HEADER_CLASS: Record<HeaderColor, string> = {
  terracotta: '',
  teal: 'teal',
  mustard: 'mustard',
  forest: 'forest',
  orange: 'orange',
};

export function Memo({
  headerLeft,
  headerRight,
  headerColor = 'terracotta',
  rotate = null,
  children,
  className = '',
  style,
  bodyStyle,
}: Props) {
  const rotateClass =
    rotate === 'left' ? 'memo-rotate-left' : rotate === 'right' ? 'memo-rotate-right' : '';
  const cls = ['memo', rotateClass, className].filter(Boolean).join(' ');
  const showHeader = headerLeft !== undefined || headerRight !== undefined;
  return (
    <div className={cls} style={style}>
      {showHeader ? (
        <div className={['memo-header', HEADER_CLASS[headerColor]].filter(Boolean).join(' ')}>
          <span>{headerLeft}</span>
          <span>{headerRight}</span>
        </div>
      ) : null}
      <div className="memo-body" style={bodyStyle}>
        {children}
      </div>
    </div>
  );
}
