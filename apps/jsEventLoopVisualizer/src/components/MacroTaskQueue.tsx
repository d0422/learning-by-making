import { centeredFlexBoxColumn, macroTaskQueue, leftTitle } from '@/style.css';

export const MacroTaskQueue = () => {
  return (
    <div className={centeredFlexBoxColumn}>
      <div className={leftTitle}>MacroTaskQueue</div>
      <div className={macroTaskQueue} />
    </div>
  );
};
