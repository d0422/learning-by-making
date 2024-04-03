import { EventLoopSVG } from '@assets/EventloopSVG';
import { centeredFlexBoxColumn, text } from '@/style.css';
import { useSchedule } from '@/hooks/useSchedule';
import { useEffect } from 'react';

export const EventLoop = () => {
  const { startSchedule } = useSchedule();
  useEffect(() => {
    startSchedule();
  }, []);
  return (
    <div className={centeredFlexBoxColumn}>
      <EventLoopSVG width={50} height={50} />
      <div className={text}>Event Loop</div>
    </div>
  );
};
