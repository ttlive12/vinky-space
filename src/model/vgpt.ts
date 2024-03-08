import { Dispatch, SetStateAction } from "react";

export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export type UseChatHelpers = {
  loading: boolean;
  input: string;
  chatList: ChatList;
  setChatList: Dispatch<SetStateAction<ChatList>>;
  selectedChatId: string;
  setSelectedChatId: Dispatch<SetStateAction<string>>;
  setInput: Dispatch<SetStateAction<string>>;
  handleSendMessage: () => void;
  handleUse: (id: string) => void;
  handleNewChat: () => void;
  handleDelete: () => void;
};

export type ChatList = {
  id: string;
  description: string;
  data: ChatGPTMessage[];
}[];
