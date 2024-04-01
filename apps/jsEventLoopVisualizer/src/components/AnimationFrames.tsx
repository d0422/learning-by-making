import { animationFrames, centeredFlexBoxColumn, leftTitle } from '@/style.css';

export const AnimationFrames = () => {
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>AnimationFrames</div>
      <div className={animationFrames} />
    </div>
  );
};
