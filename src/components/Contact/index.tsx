"use client";

import { useContext, useEffect, useState } from "react";
import NavbarContactContext from "../NavbarContactControl/context";
import { useSpring, animated, useInView } from "@react-spring/web";
import { sleep } from "@/utils/sleep";
import { Button, Input, Spacer, Textarea } from "@nextui-org/react";
import { MedulaOne } from "@/font";
import ContactImg from "@/assets/image/contact.png";
import Image from "next/image";

const AnimatedImage = animated(Image);

const Contact = () => {
  const { openContact } = useContext(NavbarContactContext);
  const [hidden, setHidden] = useState(true);
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputContent, setInputContent] = useState("");
  const handleSend = () => {
    setInputEmail("");
    setInputName("");
    setInputContent("");
  };

  const [spring, api] = useSpring(() => ({
    from: {
      borderRadius: "3rem",
      y: "100%",
    },
  }));
  const [ref, upSprings] = useInView(() => ({
    from: {
      opacity: 0,
      y: -100,
    },
    to: {
      opacity: 1,
      y: 0,
    },
    delay: 1000,
  }));

  useEffect(() => {
    const awaitHidden = async () => {
      api.start({
        to: {
          borderRadius: "3rem",
          y: "100%",
        },
      });
      await sleep(500);
      setHidden(true);
    };
    if (openContact) {
      setHidden(false);
      api.start({
        to: {
          borderRadius: "0",
          y: "0",
        },
      });
    } else {
      awaitHidden();
    }
  }, [openContact, api]);
  return (
    <animated.div
      className={`absolute z-40 light top-0 left-0 h-[100vh] w-[100vw] bg-[#F7F7F7] flex items-center justify-between flex-col gap-5 ${
        hidden ? "hidden" : ""
      }`}
      style={spring}
    >
      <Spacer y={20} />
      <div
        className={`${MedulaOne.className} text-[6rem] bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-sky-500 animate-right-move`}
      >
        CONTACT ME
      </div>
      <form
        className="text-black font-sans flex flex-col gap-5 px-10"
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
      >
        <div className="flex gap-5">
          <Input
            type="text"
            variant="bordered"
            label="昵称 / Name"
            value={inputName}
            onValueChange={setInputName}
          />
          <Input
            type="text"
            variant="bordered"
            label="邮箱 / Email"
            value={inputEmail}
            onValueChange={setInputEmail}
          />
        </div>
        <div className="flex flex-col gap-5">
          <Textarea
            type="text"
            minRows={2}
            maxRows={5}
            variant="bordered"
            label="内容 / Content"
            value={inputContent}
            onValueChange={setInputContent}
          />
          <Button type="submit" className="font-sans" variant="ghost">
            发送 / Send
          </Button>
        </div>
      </form>
      <AnimatedImage
        width={500}
        height={400}
        ref={ref}
        style={upSprings}
        alt=""
        src={ContactImg}
      />
    </animated.div>
  );
};

export default Contact;
