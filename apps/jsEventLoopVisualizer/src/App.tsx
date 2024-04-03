import { CallStack } from '@components/CallStack';
import { MacroTaskQueue } from './components/MacroTaskQueue';
import { MicroTaskQueue } from './components/MicroTaskQueue';
import { centeredFlexBox, centeredFlexBoxColumn } from './style.css';
import { AnimationFrames } from './components/AnimationFrames';
import { EventLoop } from './components/EventLoop';
import { useJobQueue } from './hooks/useJobQueue';
import { useEffect } from 'react';
function App() {
  const jobQueue = useJobQueue();
  useEffect(() => {
    jobQueue.addMicroTask('foo()');
    jobQueue.addMacroTask('bar()');
    jobQueue.addAnimationFrames('animation()');
  }, []);
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
