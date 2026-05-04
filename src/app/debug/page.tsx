import { SceneMapCanvas } from '@/debug/SceneMapCanvas';
import './debug.css';

export const metadata = {
  title: 'Scene Map · Debug',
};

export default function DebugPage() {
  return <SceneMapCanvas />;
}
