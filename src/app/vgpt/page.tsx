import { Suspense } from "react";
import Chat from "./chat";
import Loading from "@/components/Loading";

const VGPT = () => {
  return (
      <div className="flex h-[calc(90vh-100px)] overflow-hidden flex-col w-[85vw] mx-auto stretch mt-[100px] bg-[#0d0d0d] border-1 border-gray-600 p-5 relative rounded-2xl z-20">
        <Suspense fallback={<Loading />}>
          <Chat />
        </Suspense>
      </div>
  );
};

export default VGPT;
