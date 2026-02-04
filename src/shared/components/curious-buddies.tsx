"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
}

const Pupil = ({
  size = 12,
  maxDistance = 5,
  pupilColor = "black",
}: PupilProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!pupilRef.current) return;

      const pupil = pupilRef.current.getBoundingClientRect();
      const pupilCenterX = pupil.left + pupil.width / 2;
      const pupilCenterY = pupil.top + pupil.height / 2;

      const deltaX = e.clientX - pupilCenterX;
      const deltaY = e.clientY - pupilCenterY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxDistance]);

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: "transform 0.1s ease-out",
      }}
    />
  );
};

interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
}

const EyeBall = ({
  size = 48,
  pupilSize = 16,
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
}: EyeBallProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!eyeRef.current) return;

      const eye = eyeRef.current.getBoundingClientRect();
      const eyeCenterX = eye.left + eye.width / 2;
      const eyeCenterY = eye.top + eye.height / 2;

      const deltaX = e.clientX - eyeCenterX;
      const deltaY = e.clientY - eyeCenterY;
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

      const angle = Math.atan2(deltaY, deltaX);
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;

      setPosition({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [maxDistance]);

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? "2px" : `${size}px`,
        backgroundColor: eyeColor,
        overflow: "hidden",
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${position.x}px, ${position.y}px)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      )}
    </div>
  );
};

interface CharacterPosition {
  faceX: number;
  faceY: number;
  bodySkew: number;
}

interface CharacterColors {
  alto?: string;    // Tall purple character
  shade?: string;   // Dark character
  peach?: string;   // Round orange character
  sunny?: string;   // Yellow character with mouth
  pupil?: string;
  eye?: string;
}

interface CuriousBuddiesProps {
  className?: string;
  colors?: CharacterColors;
}

const defaultColors: CharacterColors = {
  alto: "#6C3FF5",    // Tall purple character
  shade: "#2D2D2D",   // Dark character
  peach: "#FF9B6B",   // Round orange character
  sunny: "#E8D754",   // Yellow character with mouth
  pupil: "#2D2D2D",
  eye: "white",
};

function CuriousBuddies({ className, colors }: CuriousBuddiesProps) {
  const c = { ...defaultColors, ...colors };
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [purplePos, setPurplePos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [blackPos, setBlackPos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [yellowPos, setYellowPos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });
  const [orangePos, setOrangePos] = useState<CharacterPosition>({ faceX: 0, faceY: 0, bodySkew: 0 });

  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  const calculatePosition = useCallback((ref: React.RefObject<HTMLDivElement | null>, mouseX: number, mouseY: number): CharacterPosition => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodySkew: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3;

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPurplePos(calculatePosition(purpleRef, e.clientX, e.clientY));
      setBlackPos(calculatePosition(blackRef, e.clientX, e.clientY));
      setYellowPos(calculatePosition(yellowRef, e.clientX, e.clientY));
      setOrangePos(calculatePosition(orangeRef, e.clientX, e.clientY));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [calculatePosition]);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000;

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150);
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={className} style={{ width: "550px", height: "400px" }}>
      <div className="relative w-full h-full">
        <div
          ref={purpleRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: "70px",
            width: "180px",
            height: "400px",
            backgroundColor: c.alto,
            borderRadius: "10px 10px 0 0",
            zIndex: 1,
            transform: `skewX(${purplePos.bodySkew}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-700 ease-in-out"
            style={{
              left: `${45 + purplePos.faceX}px`,
              top: `${40 + purplePos.faceY}px`,
            }}
          >
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor={c.eye}
              pupilColor={c.pupil}
              isBlinking={isPurpleBlinking}
            />
            <EyeBall
              size={18}
              pupilSize={7}
              maxDistance={5}
              eyeColor={c.eye}
              pupilColor={c.pupil}
              isBlinking={isPurpleBlinking}
            />
          </div>
        </div>

        <div
          ref={blackRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: "240px",
            width: "120px",
            height: "310px",
            backgroundColor: c.shade,
            borderRadius: "8px 8px 0 0",
            zIndex: 2,
            transform: `skewX(${blackPos.bodySkew}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-700 ease-in-out"
            style={{
              left: `${26 + blackPos.faceX}px`,
              top: `${32 + blackPos.faceY}px`,
            }}
          >
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor={c.eye}
              pupilColor={c.pupil}
              isBlinking={isBlackBlinking}
            />
            <EyeBall
              size={16}
              pupilSize={6}
              maxDistance={4}
              eyeColor={c.eye}
              pupilColor={c.pupil}
              isBlinking={isBlackBlinking}
            />
          </div>
        </div>

        <div
          ref={orangeRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: "0px",
            width: "240px",
            height: "200px",
            zIndex: 3,
            backgroundColor: c.peach,
            borderRadius: "120px 120px 0 0",
            transform: `skewX(${orangePos.bodySkew}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-8 transition-all duration-200 ease-out"
            style={{
              left: `${82 + orangePos.faceX}px`,
              top: `${90 + orangePos.faceY}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor={c.pupil} />
            <Pupil size={12} maxDistance={5} pupilColor={c.pupil} />
          </div>
        </div>

        <div
          ref={yellowRef}
          className="absolute bottom-0 transition-all duration-700 ease-in-out"
          style={{
            left: "310px",
            width: "140px",
            height: "230px",
            backgroundColor: c.sunny,
            borderRadius: "70px 70px 0 0",
            zIndex: 4,
            transform: `skewX(${yellowPos.bodySkew}deg)`,
            transformOrigin: "bottom center",
          }}
        >
          <div
            className="absolute flex gap-6 transition-all duration-200 ease-out"
            style={{
              left: `${52 + yellowPos.faceX}px`,
              top: `${40 + yellowPos.faceY}px`,
            }}
          >
            <Pupil size={12} maxDistance={5} pupilColor={c.pupil} />
            <Pupil size={12} maxDistance={5} pupilColor={c.pupil} />
          </div>
          <div
            className="absolute w-20 h-[4px] rounded-full transition-all duration-200 ease-out"
            style={{
              backgroundColor: c.pupil,
              left: `${40 + yellowPos.faceX}px`,
              top: `${88 + yellowPos.faceY}px`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export { CuriousBuddies, Pupil, EyeBall };
export type { CharacterColors, CuriousBuddiesProps };
export default CuriousBuddies;

