'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import posthog from 'posthog-js';
import { useGame } from '@/game/GameProvider';
import { Btn } from '@/components/Btn';
import { AvatarCanvas, AvatarSwatchCanvas } from '@/components/avatar/AvatarCanvas';
import { AgeSlider } from '@/components/avatar/AgeSlider';
import { useIsThumbnail } from '@/debug/ThumbnailContext';
import {
  type AvatarConfig,
  buildHairSwatchGrid,
  buildShirtSwatchGrid,
  buildSkinSwatchGrid,
  DEFAULT_AVATAR_CONFIG,
  HAIR_COLORS,
  HAIR_STYLES,
  randomConfig,
  SHIRTS,
  SKIN_TONES,
} from '@/components/avatar/avatarRender';

export function AvatarScene() {
  const { state, dispatch, go } = useGame();
  const isThumbnail = useIsThumbnail();
  const [name, setName] = useState(state.name);
  const [config, setConfig] = useState<AvatarConfig>(state.avatarConfig ?? DEFAULT_AVATAR_CONFIG);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Skip auto-focus inside the /debug thumbnail — focus() steals focus and
    // auto-scrolls the React Flow viewport, breaking the scene map layout.
    if (isThumbnail) return;
    inputRef.current?.focus();
  }, [isThumbnail]);

  const update = useCallback(
    <K extends keyof AvatarConfig>(key: K, value: AvatarConfig[K]) => {
      setConfig((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const skinSwatches = useMemo(
    () => SKIN_TONES.map((_, i) => () => buildSkinSwatchGrid(i)),
    []
  );
  const hairSwatches = useMemo(
    () => HAIR_STYLES.map((_, i) => () => buildHairSwatchGrid(i)),
    []
  );
  const shirtSwatches = useMemo(
    () => SHIRTS.map((_, i) => () => buildShirtSwatchGrid(i)),
    []
  );

  function confirm() {
    const v = name.trim();
    if (!v) {
      setError('Please enter a name.');
      inputRef.current?.focus();
      return;
    }
    dispatch({ type: 'SET_NAME', name: v });
    dispatch({ type: 'SET_AVATAR_CONFIG', config });
    posthog.capture('avatar_selected', {
      player_name: v,
      avatar_skin: SKIN_TONES[config.skin]?.name,
      avatar_hair: HAIR_STYLES[config.hair]?.name,
      avatar_hair_color: HAIR_COLORS[config.hairColor]?.name,
      avatar_shirt: SHIRTS[config.shirt]?.name,
      avatar_age: config.age,
    });
    go('promotion');
  }

  function randomize() {
    setConfig(randomConfig());
  }

  return (
    <div className="avatar-customizer">
      <header className="avatar-customizer-header">
        <h2 className="display-font">Customize Your Avatar</h2>
        <p className="muted">Build the worker you&apos;ll play as in 2025–2035.</p>
      </header>

      <div className="avatar-customizer-layout">
        <aside className="avatar-customizer-preview">
          <div className="avatar-stage">
            <AvatarCanvas config={config} />
          </div>
        </aside>

        <div className="avatar-customizer-controls">
          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Skin Tone</legend>
            <div className="avatar-swatches" role="radiogroup" aria-label="Skin tone">
              {SKIN_TONES.map((tone, i) => (
                <button
                  key={tone.name}
                  type="button"
                  className={`avatar-swatch ${config.skin === i ? 'is-active' : ''}`}
                  onClick={() => update('skin', i)}
                  aria-checked={config.skin === i}
                  role="radio"
                  title={tone.name}
                >
                  <AvatarSwatchCanvas buildGrid={skinSwatches[i]} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Hair Style</legend>
            <div className="avatar-swatches" role="radiogroup" aria-label="Hair style">
              {HAIR_STYLES.map((style, i) => (
                <button
                  key={style.name}
                  type="button"
                  className={`avatar-swatch ${config.hair === i ? 'is-active' : ''}`}
                  onClick={() => update('hair', i)}
                  aria-checked={config.hair === i}
                  role="radio"
                  title={style.name}
                >
                  <AvatarSwatchCanvas buildGrid={hairSwatches[i]} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Hair Color</legend>
            <div className="avatar-swatches" role="radiogroup" aria-label="Hair color">
              {HAIR_COLORS.map((color, i) => (
                <button
                  key={color.name}
                  type="button"
                  className={`avatar-swatch avatar-swatch-color ${
                    config.hairColor === i ? 'is-active' : ''
                  }`}
                  style={{ backgroundColor: color.main }}
                  onClick={() => update('hairColor', i)}
                  aria-checked={config.hairColor === i}
                  role="radio"
                  aria-label={color.name}
                  title={color.name}
                />
              ))}
            </div>
          </fieldset>

          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Outfit</legend>
            <div className="avatar-swatches" role="radiogroup" aria-label="Outfit">
              {SHIRTS.map((shirt, i) => (
                <button
                  key={shirt.name}
                  type="button"
                  className={`avatar-swatch ${config.shirt === i ? 'is-active' : ''}`}
                  onClick={() => update('shirt', i)}
                  aria-checked={config.shirt === i}
                  role="radio"
                  title={shirt.name}
                >
                  <AvatarSwatchCanvas buildGrid={shirtSwatches[i]} />
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Age</legend>
            <div className="avatar-age-row">
              <AgeSlider
                value={config.age}
                min={18}
                max={75}
                onChange={(v) => update('age', v)}
              />
              <div className="avatar-age-display display-font">{config.age}</div>
            </div>
          </fieldset>

          <fieldset className="avatar-group">
            <legend className="avatar-group-label">Name</legend>
            <input
              ref={inputRef}
              type="text"
              className="avatar-name-input"
              placeholder="Your name…"
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
            {error ? <p className="avatar-name-error">{error}</p> : null}
          </fieldset>

          <div className="avatar-actions">
            <Btn color="mustard" onClick={randomize}>
              ↺ Randomize
            </Btn>
            <Btn color="terracotta" onClick={confirm}>
              ◆ Use This Avatar
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
