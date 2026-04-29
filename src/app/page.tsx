import { Game } from '@/game/Game';
import { GameProvider } from '@/game/GameProvider';

export default function Page() {
  return (
    <GameProvider>
      <Game />
    </GameProvider>
  );
}
