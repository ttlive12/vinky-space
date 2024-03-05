import Title from "./title";
import Work from "./work";

const works = [
  {
    name: "新友科技",
    position: "前端开发",
    project: [
      "CCPC报名系统",
      "东秦闪送",
      "河北省大创年会系统",
      "教代会管理系统",
    ],
    stack: ["React", "umijs", "Wx-MiniApp"],
    date: "2023.5 - 2023.10",
  },
  {
    name: "小红书",
    position: "前端开发",
    project: ["风控平台前端"],
    stack: ["Vue", "qiankun"],
    date: "2023.10 - 2024.2",
  },
];

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
