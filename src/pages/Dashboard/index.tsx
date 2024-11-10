import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { Bsod } from './components/bsod';
import Confetti from 'react-confetti';
import potato from './assets/potato.gif';

export const Dashboard = () => {
  const transitionList = [
    { type: 'spring', stiffness: 300, damping: 20 },
    { type: 'intertia', velocity: 100 },
    { ease: 'linear', duration: 1 },
  ];

  let [searchParams, _] = useSearchParams();

  const [xPos, setXpos] = useState(0);
  const [yPos, setYpos] = useState(0);
  const [transition, setTransition] = useState<any>();
  const [isControlled, setIsController] = useState(false);
  const [windowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBsod, setIsBsod] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading');
  const [isExploding, setIsExploding] = useState(false);
  const [recycleConfetti, setRecycleConfetti] = useState(true);
  const [ctrlHint, setCtrlHint] = useState(0);

  const n = searchParams.get('n');
  const [isAuthorized, setIsAuthorized] = useState(false);

  const onHoverAcceptButton = () => {
    if (!isControlled) {
      const x = Math.floor(Math.random() * transitionList.length);
      setTransition(transitionList.at(x));
      setXpos(Math.random() * windowDimensions.width);
      setYpos(Math.random() * windowDimensions.height);
      setCtrlHint(ctrlHint + 1);
    }
  };

  const onCtrlKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setIsController(true);
    }
  };

  const onCtrlKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Control') {
      setIsController(false);
    }
  };

  const onClick = () => {
    setIsTimerActive(true);
  };

  useEffect(() => {
    if (isTimerActive && progress < 100) {
      const interval = setInterval(() => {
        setProgress(prev => Math.min(prev + 1, 100));
      }, 10);
      if (progress == 50) {
        setLoadingText('Building');
      }
      if (progress == 75) {
        setLoadingText('Gathering Data');
      }

      return () => clearInterval(interval);
    } else if (progress >= 95) {
      if (isAuthorized) {
        setIsExploding(true);
        setRecycleConfetti(false);
      } else {
        setIsBsod(true);
        setIsTimerActive(false);
      }
    }
  }, [isTimerActive, progress]);

  useEffect(() => {
    if (n && parseInt(n!) > 0) {
      setIsAuthorized(true);
    }
  }, [n]);

  useEffect(() => {
    window.addEventListener('keydown', onCtrlKeyDown);
    window.addEventListener('keyup', onCtrlKeyUp);

    return () => {
      window.removeEventListener('keydown', onCtrlKeyDown);
      window.removeEventListener('keyup', onCtrlKeyUp);
    };
  }, []);

  return (
    <div>
      {!isTimerActive && !isBsod && (
        <motion.button
          animate={{
            x: xPos,
            y: yPos,
          }}
          transition={transition}
          onMouseOver={onHoverAcceptButton}
          onClick={onClick}
          className="absolute"
        >
          Accept T&C
        </motion.button>
      )}

      {ctrlHint > 5 && !isTimerActive && !isBsod && (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col">
            <div className="w-full flex justify-center">REMINDER: You have the "CTRL" of the UI</div>
          </div>
        </div>
      )}

      {isTimerActive && !isExploding && (
        <div className="h-screen flex items-center justify-center">
          <div className="flex flex-col">
            <div className="w-full flex justify-center">
              <img className="w-80 h-80" src={potato} alt="loading..." />
            </div>
            <div className="w-[50vw] bg-[#ddd] mt-5 h-2.5">
              <div
                style={{
                  width: `${progress}%`,
                  height: '100%',
                  background: 'green',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <div className="mt-5 flex w-full justify-center">{loadingText}</div>
          </div>
        </div>
      )}

      {isBsod && <Bsod />}

      {isExploding && (
        <div>
          <Confetti width={windowDimensions.width} height={windowDimensions.height} recycle={recycleConfetti} />
          <div className="h-screen flex items-center justify-center">Positive message here</div>
        </div>
      )}
    </div>
  );
};
