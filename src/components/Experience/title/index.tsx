"use client";

import { MedulaOne } from "@/font";
import { useInView, animated } from "@react-spring/web";

const Title = () => {
  const [ref, springs] = useInView(
    () => ({
      from: {
        opacity: 0,
        y: 100,
      },
      to: {
        opacity: 1,
        y: 0,
      },
    }),
    {
      once: true,
      rootMargin: "-40% 0%",
    }
  );
  return (
    <animated.div className="h-[8rem] w-full" ref={ref} style={springs}>
      <span
        className="text-[5.5rem] leading-[6rem] lg:ml-0 ml-8"
        style={MedulaOne.style}
      >
        Experience
      </span>
    </animated.div>
  );
};
export default Title;
