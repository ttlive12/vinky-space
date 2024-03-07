export type Work = {
  name: string;
  position: string;
  project: string[];
  stack: string[];
  date: string
};

export const works: Work[] = [
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
