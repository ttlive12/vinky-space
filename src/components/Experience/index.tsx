import { works } from "./constants";
import Title from "./title";
import Work from "./work";

const Experiences = () => {
  return (
    <section
      className="container h-[100vh] flex flex-col items-center justify-center text-[hsla(0,0%,100%,.6)]"
      id="experience"
    >
      <Title />
      {works.map((work) => (
        <Work work={work} key={work.name} />
      ))}
    </section>
  );
};
export default Experiences;
