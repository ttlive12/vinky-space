import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export type UseChatHelpers = {
  loading: boolean;
  messages: ChatGPTMessage[];
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  sendMessage: () => void;
};
