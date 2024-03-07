"use client";

import {
  TouchEvent,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useGesture } from "react-use-gesture";
import { useSpring, animated, useInView } from "@react-spring/web";
import { CardList, ListLength } from "./constant";
import dynamic from "next/dynamic";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
const snapToRotation = (currentRotation: number) => {
  const snapAngle = 360 / ListLength;
  const snappedRotation = Math.round(currentRotation / snapAngle) * snapAngle;
  return snappedRotation;
};
const Card = dynamic(() => import("./card"), {
  ssr: false,
});
const Skills = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [circleSize, setCircleSize] = useState(200);
  const [isDragging, setIsDragging] = useState(0);
  const [rotation, setRotation] = useState(-72);
  const [currentIndex, setCurrentIndex] = useState(5);
  const [{ rotate }, setRotate] = useSpring(() => ({ rotate: -72 }));
  const [textSprings, textApi] = useSpring(() => ({
    from: { y: 0, opacity: 1, x: "-50%" },
  }));
  const [ref, inView] = useInView({
    once: true,
  });
  const startX = useRef<number | null>(null);

  const list = CardList.map((_, i, o) => {
    const angle = (i * Math.PI * 2) / ListLength; // 每个点的角度
    const x = circleSize / 2 + (circleSize / 2) * Math.cos(angle); // 计算X坐标
    const y = circleSize / 2 + (circleSize / 2) * Math.sin(angle); // 计算Y坐标
    return { ..._, x, y };
  });

  // 移动端拖动适配
  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (
    event: TouchEvent<HTMLDivElement>
  ) => {
    const touch = event.touches[0];
    startX.current = touch.clientX;
  };
  const handleTouchMove = useCallback(
    (event: TouchEvent) => {
      event.preventDefault();
      if (!startX) return;
      const touch = event.touches[0];
      const moveX = touch.clientX;
      const deltaX = moveX - (startX.current ?? 0);
      const newRotation = rotation + deltaX / (windowWidth * 0.008);
      setRotation(newRotation);
      setRotate({ rotate: newRotation });
      startX.current = moveX;
    },
    [rotation, setRotate, startX, windowWidth]
  );
  const handleTouchEnd = () => {
    const snappedRotation = snapToRotation(rotation);
    setRotation(snappedRotation);
    setRotate({ rotate: snappedRotation });
    startX.current = null;
  };

  const bind = useGesture({
    onDrag: ({ movement: [mx] }) => {
      if (isDragging === 0) {
        textApi.start({
          to: { y: 60, opacity: 0 },
        });
        setIsDragging(1);
      }
      const newRotation = rotation + mx / (windowWidth * 0.1);
      setRotation(newRotation);
      setRotate({ rotate: newRotation });
    },
    onDragEnd: ({ movement: [mx] }) => {
      if (mx === 0) {
        textApi.start({
          to: { y: 0, opacity: 1 },
        });
        setIsDragging(0);
      }
      const snappedRotation = snapToRotation(rotation);
      setRotation(snappedRotation);
      setRotate({ rotate: snappedRotation });
    },
  });

  useEffect(() => {
    const arr1 = [0, 9, 8, 7, 6, 5, 4, 3, 2, 1];
    const arr2 = [5, 6, 7, 8, 9, 0, 1, 2, 3, 4];
    const temp = (((rotation % 360) + 360) / (360 / 10)) % 10;

    if (Number.isInteger(temp)) {
      setCurrentIndex(arr2[arr1.indexOf(temp)]);
      textApi.start({
        to: { y: 0, opacity: 1 },
      });
      setIsDragging(0);
    }
  }, [rotation, textApi]);
  useEffect(() => {
    const sleepOneSecondAndReset = async () => {
      await sleep(300);
      setRotation(0);
      setRotate({ rotate: 0 });
    };

    if (inView) {
      sleepOneSecondAndReset();
    }
  }, [inView, setRotate]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setCircleSize(Math.min(Math.max(window.innerWidth / 1.88, 677), 820));
    };
    handleResize();
    ref.current.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    window.addEventListener("resize", handleResize);
    return () => {
      if (ref?.current?.removeEventListener) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener("touchmove", handleTouchMove);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [handleTouchMove, ref]);

  return (
    <section
      className="w-full h-[100vh] flex items-center justify-center flex-col"
      id="skills"
    >
      <div
        className="relative overflow-hidden h-[30rem] w-full pt-20 flex justify-center cursor-grab"
        ref={ref}
        {...bind()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <animated.div
          className="relative"
          style={{
            minWidth: circleSize,
            minHeight: circleSize,
            maxWidth: circleSize,
            maxHeight: circleSize,
            transform: rotate.to((r) => `rotate(${r + 90}deg)`),
            willChange: "transform",
          }}
        >
          {list.map((item, i) => (
            <Card key={i} item={item} i={i} cardSize={circleSize / 5.2} />
          ))}
        </animated.div>
        <animated.div
          className={`w-[10rem] h-fit absolute left-1/2 top-1/2 flex flex-col items-center justify-center text-white gap-4`}
          style={textSprings}
        >
          <strong className="text-[2rem]">{list[currentIndex].name}</strong>
          <p className="text-[#68727d] text-[1rem] leading-5">
            {list[currentIndex].description}
          </p>
        </animated.div>
      </div>
      <div
        className={`relative z-0 h-[40vw] w-[40vw] sm:w-[24vw] sm:h-[24vw] md:w-[16vw] md:h-[16vw] rounded-full bottom-[6rem] transition-transform 
        before:absolute before:block before:w-[100vw] before:h-[35vh] before:left-[-30vw] before:bottom-0
        ${isDragging && "scale-75"}`}
        style={{
          background: "linear-gradient(113deg,#d7ffcf 11.44%,#a4e141 60.27%)",
          boxShadow:
            "inset -35.036px -50.051px 80.1px 0 #60e131, inset 0 20.02px 40px 0 rgba(194,255,255,.25), inset 0 0 24px 0 hsla(0,0%,100%,.26)          ",
        }}
      ></div>
    </section>
  );
};

export default Skills;
