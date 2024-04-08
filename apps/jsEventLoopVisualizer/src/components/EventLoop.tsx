import { EventLoopSVG } from '@assets/EventloopSVG';
import { centeredFlexBoxColumn, infiniteRotate, text } from '@/style.css';
import { useSchedule } from '@/hooks/useSchedule';

export const EventLoop = () => {
  const { isScheduling } = useSchedule();
  return (
    <div className={`${centeredFlexBoxColumn}`}>
      <EventLoopSVG
        width={50}
        height={50}
        className={isScheduling ? infiniteRotate : undefined}
      />
      <div className={text}>Event Loop</div>
    </div>
  );
};
