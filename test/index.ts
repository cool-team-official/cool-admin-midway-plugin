import { Plugin } from "../src/index";
import pluginInfo from "../plugin.json";

// 实例化插件
const instance = new Plugin();
// 初始化插件
instance.init(pluginInfo);

const messages: any = [
  { role: "system", content: "你的名字叫COOL, 你是一个编程助手" },
  { role: "user", content: "用js 写个hello world" },
];

//非流式调用
instance.chat(messages).then((data) => {
  console.log(data);
});

//流式调用
instance.chat(messages, { stream: true }, (data) => {
  console.log(data);
});

// 向量化
instance.embedding("一个项目用COOL就够了").then((data) => {
  console.log(data);
});
