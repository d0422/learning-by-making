import {
  animationFrames,
  centeredFlexBoxColumn,
  leftFlexBox,
  leftTitle,
} from '@/style.css';
import { Task } from './Task';
import { useAnimationFrames } from '@/stores/useAnimationFrames';

export const AnimationFrames = () => {
  const tasks = useAnimationFrames((state) => state.animationFrames);
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>AnimationFrames</div>
      <div className={`${animationFrames} ${leftFlexBox}`}>
        {tasks.map((task) => (
          <Task key={task.code} data={task} />
        ))}
      </div>
    </div>
  );
};
