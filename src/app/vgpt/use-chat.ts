import axios from "axios";
import { ChatGPTMessage, UseChatHelpers } from "@/model/vgpt";
import { useEffect, useState } from "react";
import { getStorage, setStorage } from "@/utils/storage";

export const getChatContent = async (prompt: ChatGPTMessage[]) => {
  const ans = await axios.post("https://server.vinky.com.cn/chat", {
    prompt: JSON.stringify(prompt),
  });
  return ans;
};

export function useChat({
  initialInput = "",
  initialMessages = [],
} = {}): UseChatHelpers {
  const [input, setInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatGPTMessage[]>(initialMessages);
  const sendMessage = async () => {
    if (!input) return;
    setLoading(true);

    const newMessages = [
      ...messages,
      { role: "user", content: input } as ChatGPTMessage,
    ];
    setMessages(newMessages);
    const last10messages = newMessages.slice(-10);

    try {
      const chatCompletionContent = await getChatContent(last10messages);
      const assistantMessage = {
        role: "assistant",
        content: chatCompletionContent.data.response,
      } as ChatGPTMessage;
      setMessages([...newMessages, assistantMessage]);
    } catch (e: unknown) {
      console.error(e);
    } finally {
      setLoading(false);
      setInput("");
    }
  };
  // 持久化储存
  useEffect(() => {
    setMessages(getStorage<ChatGPTMessage[]>("messages"));
  }, []);
  useEffect(() => {
    if (!messages.length) return;
    setStorage("messages", messages);
  }, [messages]);

  return {
    loading,
    messages,
    input,
    setInput,
    sendMessage,
  };
}
