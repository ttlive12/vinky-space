import { ChangeEvent, Dispatch, SetStateAction } from "react";

export type ChatGPTAgent = "user" | "system" | "assistant";

export interface ChatGPTMessage {
  role: ChatGPTAgent;
  content: string;
}

export interface OpenAIStreamPayload {
  model: string;
  messages: ChatGPTMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  max_tokens: number;
  stream: boolean;
  stop?: string[];
  user?: string;
  n: number;
}

export type UseChatHelpers = {
  loading: boolean;
  messages: ChatGPTMessage[];
  input: string;
  handleInputChange: (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => void;
  sendMessage: (message: string) => void
};
