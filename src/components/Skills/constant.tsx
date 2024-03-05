import {
  Html,
  Css,
  Javascript,
  Vue,
  React,
  Vite,
  Webpack,
  Nodejs,
  Nextjs,
  WxMiniapp,
} from "@/assets/svg";

export const CardList = [
  {
    name: "Webpack",
    description: "最常用的模块打包工具",
    image: <Webpack />,
  },
  { name: "Vite", description: "新一代的前端打包工具", image: <Vite /> },
  {
    name: "NextJS",
    description: "构建 SEO 友好、高性能的 React 应用",
    image: <Nextjs />,
  },
  {
    name: "NodeJS",
    description: " JavaScript 运行时，构建服务器端和网络应用程序",
    image: <Nodejs />,
  },
  {
    name: "WX Mini App",
    description: "用于在微信平台上构建小型应用程序",
    image: <WxMiniapp />,
  },
  { name: "HTML", description: "网页结构标记语言", image: <Html /> },
  { name: "CSS", description: "网页样式设计语言", image: <Css /> },
  {
    name: "JavaScript",
    description: "网页交互与动态效果编程语言",
    image: <Javascript />,
  },
  {
    name: "Vue",
    description: "现代化的 JavaScript 框架，构建MVVM的用户界面",
    image: <Vue />,
  },
  {
    name: "React",
    description: "构建大型、高性能用户界面的JavaScript库",
    image: <React />,
  },
];

export const ListLength = 10;
