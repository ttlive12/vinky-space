import axios from "axios";
import { ChatGPTMessage, ChatList, UseChatHelpers } from "@/model/vgpt";
import { useEffect, useState } from "react";
import { getStorage, setStorage } from "@/utils/storage";
import { v4 as uuid } from "uuid";

const getChatContent = async (prompt: ChatGPTMessage[]) => {
  const ans = await axios.post("https://server.vinky.com.cn/chat", {
    prompt: JSON.stringify(prompt),
  });
  return ans;
};

const defaultChatList = [
  {
    id: "",
    description: "_",
    data: [],
  },
  {
    id: "1",
    description: "新聊天",
    data: [],
  },
];

export function useChat({ initialInput = "" } = {}): UseChatHelpers {
  const [input, setInput] = useState(initialInput);
  const [loading, setLoading] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("1");
  const [chatList, setChatList] = useState<ChatList>(defaultChatList);

  // 发送
  const handleSendMessage = async () => {
    if (!input) return;
    setLoading(true);
    const chat = chatList.find((chat) => chat.id === selectedChatId);
    const messages = chat?.data!;

    const newMessages = [
      ...messages,
      { role: "user", content: input } as ChatGPTMessage,
    ];
    setChatList(
      chatList.map((chat) => {
        if (chat.id === selectedChatId) {
          const tempChat = chat;
          if (messages.length === 0) {
            tempChat.description = input;
          }
          tempChat.data = newMessages;
          return tempChat;
        }
        return chat;
      })
    );
    const last10messages = newMessages.slice(-10);

    try {
      const chatCompletionContent = await getChatContent(last10messages);
      const assistantMessage = {
        role: "assistant",
        content: chatCompletionContent.data.response,
      } as ChatGPTMessage;
      setChatList(
        chatList.map((chat) => {
          if (chat.id === selectedChatId) {
            const tempChat = chat;
            tempChat.data = [...newMessages, assistantMessage];
            return tempChat;
          }
          return chat;
        })
      );
    } catch (e: unknown) {
      console.error(e);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // 删除当前聊天
  const handleDelete = () => {
    if (chatList.length === 2) {
      setChatList(defaultChatList);
      setSelectedChatId("1");
      return;
    }
    const deleteId = selectedChatId;
    setSelectedChatId(chatList.findLast((chat) => chat.id !== deleteId)!.id);
    setChatList(chatList.filter((chat) => chat.id !== selectedChatId));
  };
  // 新聊天
  const handleNewChat = () => {
    const id = uuid();
    setChatList([
      ...chatList,
      {
        id,
        description: `新聊天`,
        data: [],
      },
    ]);
    setSelectedChatId(id);
  };
  // 使用聊天
  const handleUse = (id: string) => {};
  // 持久化储存
  useEffect(() => {
    const chatList = getStorage<ChatList>("chatList");
    if (
      JSON.stringify(chatList) === JSON.stringify(defaultChatList) ||
      chatList.length < 2
    )
      return;
    setChatList(getStorage<ChatList>("chatList"));
  }, []);
  useEffect(() => {
    setStorage("chatList", chatList);
  }, [chatList]);

  return {
    loading,
    input,
    chatList,
    selectedChatId,
    setSelectedChatId,
    setInput,
    handleSendMessage,
    handleNewChat,
    handleDelete,
  };
}
