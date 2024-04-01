import { CallStack } from '@components/CallStack';
import { MacroTaskQueue } from './components/MacroTaskQueue';
import { MicroTaskQueue } from './components/MicroTaskQueue';
import { centeredFlexBox, centeredFlexBoxColumn } from './style.css';
import { AnimationFrames } from './components/AnimationFrames';
import { EventLoop } from './components/EventLoop';
function App() {
  return (
    <>
      <div
        className={centeredFlexBox}
        style={{
          gap: 20,
        }}
      >
        <CallStack />
        <EventLoop />

        <div className={centeredFlexBoxColumn} style={{ gap: 20 }}>
          <MacroTaskQueue />
          <MicroTaskQueue />
          <AnimationFrames />
        </div>
      </div>
    </>
  );
}

export default App;
