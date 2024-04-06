import { callStack, centeredFlexBoxColumn, titleText } from '@/style.css';
import { Task } from './Task';
import { useCallStack } from '@/hooks/useCallStack';
export const CallStack = () => {
  const callStacks = useCallStack((state) => state.callStack);
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={titleText}>Call Stack</div>
      <div className={callStack}>
        {callStacks.map((task) => (
          <Task key={task.code} data={task} />
        ))}
      </div>
    </div>
  );
};
