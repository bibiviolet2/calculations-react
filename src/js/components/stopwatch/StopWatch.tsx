import React, { useEffect, useState } from 'react';

interface IStopWatch {
  play: boolean;
}
const StopWatch: React.FC<IStopWatch> = ({ play }) => {
  const [time, setTime] = useState<number>(0);
  let interval: NodeJS.Timer | null = null;

  useEffect(() => {
    if (play) {
      interval = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => {
      if (null !== interval) {
        clearInterval(interval);
      }
    };
  }, [play]);

  return <div>{time} s</div>;
};

export default StopWatch;
