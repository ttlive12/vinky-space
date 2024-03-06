"use client";

import { useChat } from "@/hooks/use-chat";

const Chat = () => {
  const { loading, messages, input, handleInputChange, sendMessage } =
    useChat();
  return (
    <div className="flex h-full flex-col w-full max-w-xl pb-36 pt-9 mx-auto stretch text-white">
      <div className="h-[60vh] w-[60%] border-1 border-red-500">
        {messages.map((message) => (
          <div key={message.content}>{message.content}</div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage(input);
        }}
      >
        <input
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 focus-visible:outline-gray-300 rounded shadow-xl focus:shadow-2xl transition-all text-black"
          placeholder="随便说点什么..."
        />
      </form>
    </div>
  );
};

export default Chat;
