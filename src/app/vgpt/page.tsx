"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  Spinner,
  Textarea,
  Avatar,
} from "@nextui-org/react";
import { useChat } from "@/app/vgpt/use-chat";
import { Menu, Up } from "@/assets/svg";
import { Avatar as AvatarIcon } from "@/assets/svg";
import Image from "next/image";
import Logo from "@/assets/image/logo.png";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./codeblocks";
import { KeyboardEvent, KeyboardEventHandler } from "react";

const Chat = () => {
  const { loading, messages, input, setInput, sendMessage } = useChat();
  const handleNewChat = () => {};
  const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  return (
    <div className="flex relative h-full flex-col w-[85vw] mx-auto stretch mt-[100px] bg-[#0d0d0d] z-20">
      <div
        className="w-[100%] border-1 border-gray-600 p-5 relative rounded-2xl flex flex-col justify-between align-center
        h-[calc(95vh-100px)] 
        "
      >
        <Dropdown>
          <DropdownTrigger>
            <div className="absolute top-5 right-5">
              <Menu />
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Static Actions">
            <DropdownItem key="keep" onClick={handleNewChat}>
              新聊天
            </DropdownItem>
            <DropdownItem key="list">聊天列表</DropdownItem>
            <DropdownItem key="delete" className="text-danger" color="danger">
              删除当前聊天
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>

        {loading && (
          <div className="absolute top-0 left-0 w-full h-full z-[30] bg-[rgba(0,0,0,0.8)]">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner />
            </div>
          </div>
        )}

        <div className="w-full h-[90%] overflow-scroll">
          {messages.map((message, idx) => (
            <div className="flex flex-col gap-1 my-3" key={idx}>
              <div className="flex gap-[10px] items-center">
                {message.role === "user" && (
                  <Avatar
                    classNames={{
                      base: "w-[26px] h-[26px]",
                    }}
                    size="sm"
                    icon={<AvatarIcon className="scale-75" />}
                  />
                )}
                {message.role === "assistant" && (
                  <Avatar
                    classNames={{
                      base: "w-[26px] h-[26px]",
                    }}
                    size="sm"
                    icon={<Image src={Logo} alt="Logo" />}
                  />
                )}
                {message.role === "system" && (
                  <Avatar
                    classNames={{
                      base: "w-[26px] h-[26px]",
                    }}
                    size="sm"
                    icon={<Image src={Logo} alt="Logo" />}
                  />
                )}
                {message.role === "user" ? "你" : "VGPT"}
              </div>
              <div className="text-md leading-5 ml-[36px]">
                <ReactMarkdown components={{ code: CodeBlock as any }}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </div>
          ))}
        </div>

        <form
          className="w-full flex justify-between gap-5"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Textarea
            classNames={{ innerWrapper: "items-center" }}
            value={input}
            minRows={1}
            maxRows={5}
            variant="bordered"
            endContent={
              <Button type="submit" isIconOnly size="sm" disabled={loading}>
                <Up className="text-white dark:text-black" />
              </Button>
            }
            onValueChange={setInput}
            onKeyDown={handleKeyDown}
            placeholder="发送消息给VGPT..."
          />
        </form>
      </div>
    </div>
  );
};

export default Chat;
