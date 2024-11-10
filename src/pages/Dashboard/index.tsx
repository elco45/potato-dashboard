/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { Bsod } from '@/pages/Dashboard/components/bsod';
import potato from '@/assets/potato.gif';
import potatoGg from '@/assets/potatoGG.gif';
import potatoClap from '@/assets/potatoClap.gif';
import potatoYes from '@/assets/potatoYes.gif';

export const Dashboard = () => {
  const navigate = useNavigate();

  const transitionList = [
    { type: 'spring', stiffness: 300, damping: 20 },
    { type: 'intertia', velocity: 100 },
    { ease: 'linear', duration: 1 },
  ];

  const [searchParams] = useSearchParams();

  const [xPos, setXpos] = useState(window.innerWidth / 2 - 150);
  const [yPos, setYpos] = useState(window.innerHeight / 2 - 100);
  const [transition, setTransition] = useState<any>();
  const [isControlled, setIsController] = useState(false);
  const [windowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isBsod, setIsBsod] = useState(false);
  const [loadingText, setLoadingText] = useState('Loading...');
  const [isExploding, setIsExploding] = useState(false);
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
      }, 40);
      if (progress == 50) {
        setLoadingText('Building...');
      }
      if (progress == 75) {
        setLoadingText('Gathering Data...');
      }

      return () => clearInterval(interval);
    } else if (progress >= 95) {
      if (isAuthorized) {
        setIsExploding(true);
      } else {
        setIsBsod(true);
        setIsTimerActive(false);
      }
    }
  }, [isAuthorized, isTimerActive, progress]);

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
      <div className="w-full flex justify-end bg-[#121212] py-4">
        <button className="mx-8 text-lg cursor-pointer" onClick={() => navigate(`/${n ? '?n=1' : ''}`)}>
          Logout
        </button>
      </div>
      {!isTimerActive && !isBsod && (
        <motion.button
          animate={{
            x: xPos,
            y: yPos,
          }}
          transition={transition}
          onMouseOver={onHoverAcceptButton}
          onClick={onClick}
          className="absolute p-4 cursor-pointer text-2xl"
        >
          Accept Terms & Conditions
        </motion.button>
      )}

      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col">
          <div className="w-full flex justify-center">
            {ctrlHint > 3 && !isTimerActive && !isBsod && (
              <p className="text-2xl">
                <strong>REMINDER:</strong> You are in "Control" of the UI
              </p>
            )}
          </div>
        </div>
        {isBsod && <Bsod />}

        {isTimerActive && !isExploding && (
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
        )}

        {isExploding && (
          <div>
            <Confetti width={windowDimensions.width} height={windowDimensions.height} />
            <div className="h-screen flex flex-col items-center justify-center">
              <p className="text-6xl animate-bounce">You are one in a million potatoes!</p>
              <div className="">
                <img src={potatoGg} className="w-[30vh]" />
                <img src={potatoClap} className="w-[40vh]" />
                <img src={potatoYes} className="w-[16vh]" />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
