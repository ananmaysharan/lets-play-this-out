'use client';

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/game/GameProvider';
import { AvatarSprite } from '@/components/AvatarSprite';
import { Btn } from '@/components/Btn';

export function AvatarScene() {
  const { state, dispatch, go } = useGame();
  const [name, setName] = useState(state.name);
  const [avatar, setAvatar] = useState(state.avatar);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  function confirm() {
    const v = name.trim();
    if (!v) {
      setError('Please enter a name.');
      inputRef.current?.focus();
      return;
    }
    dispatch({ type: 'SET_NAME', name: v });
    dispatch({ type: 'SET_AVATAR', avatar });
    go('promotion');
  }

  return (
    <div className="avatar-select">
      <h2 className="display-font" style={{ fontSize: 38, marginBottom: 8 }}>
        Who are you?
      </h2>
      <p className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
        Choose your avatar &amp; enter a name to begin.
      </p>
      <div className="avatar-grid" role="radiogroup" aria-label="Choose avatar">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
          <div
            key={n}
            className={`avatar-card ${avatar === n ? 'selected' : ''}`}
            onClick={() => setAvatar(n)}
            role="radio"
            aria-checked={avatar === n}
            aria-label={`Avatar ${n}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setAvatar(n);
              }
            }}
          >
            <AvatarSprite id={`avatar${n}`} />
          </div>
        ))}
      </div>
      <input
        ref={inputRef}
        type="text"
        className="name-input"
        placeholder="Your name..."
        value={name}
        maxLength={18}
        aria-label="Your name"
        onChange={(e) => {
          setName(e.target.value);
          if (error) setError(null);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter') confirm();
        }}
      />
      {error ? (
        <p className="muted" style={{ color: 'var(--terracotta)', fontSize: 12, marginTop: -10, marginBottom: 8 }}>
          {error}
        </p>
      ) : null}
      <Btn
        color="terracotta"
        style={{ maxWidth: 240, margin: '18px auto' }}
        onClick={confirm}
      >
        → ENTER
      </Btn>
    </div>
  );
}
