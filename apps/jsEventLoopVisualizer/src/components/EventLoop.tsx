import { EventLoopSVG } from '@assets/EventloopSVG';
import { centeredFlexBoxColumn, infiniteRotate, text } from '@/style.css';
import { useSchedule } from '@/hooks/useSchedule';
import { useEffect } from 'react';

export const EventLoop = () => {
  const { startSchedule, isScheduling } = useSchedule();
  useEffect(() => {
    startSchedule();
  }, []);
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
