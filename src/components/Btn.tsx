'use client';

import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from 'react';

type Color = 'teal' | 'mustard' | 'terracotta' | 'forest' | 'orange' | 'pink' | 'paper';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: Color;
  /** Pre-styled "choice" layout with title + body. */
  choice?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

const COLOR_CLASS: Record<Color, string> = {
  teal: 'btn-teal',
  mustard: 'btn-mustard',
  terracotta: 'btn-terracotta',
  forest: 'btn-forest',
  orange: 'btn-orange',
  pink: 'btn-pink',
  paper: '',
};

export function Btn({ color = 'paper', choice = false, className = '', children, ...rest }: Props) {
  const classes = ['btn', COLOR_CLASS[color], choice ? 'choice-btn' : '', className]
    .filter(Boolean)
    .join(' ');
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

interface ChoiceBtnProps extends Omit<Props, 'children'> {
  title: string;
  description?: string;
}

export function ChoiceBtn({ title, description, color = 'paper', ...rest }: ChoiceBtnProps) {
  return (
    <Btn color={color} choice {...rest}>
      <span className="choice-content">
        <span className="choice-title">{title}</span>
        {description ? <span className="choice-text">{description}</span> : null}
      </span>
    </Btn>
  );
}
