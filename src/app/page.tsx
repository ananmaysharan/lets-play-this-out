import { Game } from '@/game/Game';
import { GameProvider } from '@/game/GameProvider';
import { SceneJumpHandler } from '@/debug/SceneJumpHandler';

export default function Page() {
  return (
    <GameProvider>
      <SceneJumpHandler />
      <Game />
    </GameProvider>
  );
}
