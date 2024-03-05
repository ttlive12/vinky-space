import { ReactNode } from "react";

const Lift = ({ children }: { children: ReactNode }) => {
  return (
    <div className="group relative overflow-hidden">
      <div className="group-hover:translate-y-0 absolute translate-y-[100%] text-white transition duration-440 ease-in-out">
        {children}
      </div>
      <div className="group-hover:translate-y-[-100%] transition duration-440 ease-in-out">
        {children}
      </div>
    </div>
  );
};

export default Lift;
