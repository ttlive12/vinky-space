import { Simonetta } from "@/font";
import { Project, Time } from "@/assets/svg";
import Lift from "@/components/Style/lift";
import { Work } from "./constants";

const Work = ({ work }: { work: Work }) => {
  return (
    <div className="group relative w-full h-fit py-12 lg:py-8 px-8 lg:px-0 flex lg:justify-between border-b-1 border-[hsla(0,0%,100%,.1)]">
      <div>
        <div className="whitespace-nowrap text-[1.4rem] leading-[1.8rem] lg:leading-[3rem] lg:text-[2.4rem] relative mb-8">
          <Lift>
            <span className="tracking-widest font-mono font-semibold">
              {work.name}
            </span>
            <span style={Simonetta.style} className="ml-5">
              {work.stack.join(" ")}
            </span>
          </Lift>
        </div>
        <p className="text-[1.2rem] leading-[1.8rem] tracking-wide font-serif flex items-center gap-3">
          <Project className="min-w-[25px] max-w-[25px] min-h-[25px] max-h-[25px]" />
          {work.project.join(" ")}
        </p>
      </div>
      <div className="text-[1.2rem] lg:mt-5 font-serif flex items-center gap-3 whitespace-nowrap lg:bottom-0 lg:right-0 lg:static absolute bottom-4 right-6">
        <Time className="group-hover:animate-rotate360 transition-transform" />
        {work.date}
      </div>
    </div>
  );
};
export default Work;
