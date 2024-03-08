"use client";

import { useEffect, useRef, useState } from "react";
import { Planet } from "@/assets/svg";
import { sleep } from "@/utils/sleep";
const Loading = () => {
  const [leave, setLeave] = useState(false);
  const startTime = useRef<Date>(new Date());
  const wait = async () => {
    const endTime = new Date();
    const diff = endTime.getTime() - startTime.current.getTime();
    if (diff < 1000) {
      await sleep(1000 - diff);
    }
    setLeave(true);
  };
  useEffect(() => {
    return () => {
      wait();
    };
  }, []);
  return (
    <div
      className={`w-full h-[100vh] relative flex items-center justify-center transition-transform ${
        leave ? "translate-y-[-100vh]" : ""
      }`}
    >
      <Planet className="animate-spin" />
    </div>
  );
};

export default Loading;
