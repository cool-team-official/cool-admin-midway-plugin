import { Plugin } from "../src/index";
import pluginInfo from "../plugin.json";

// 实例化插件
const instance = new Plugin();
// 初始化插件
instance.init(pluginInfo);

(async () => {
  // 调用插件方法
  const res = await instance.demo();
  console.log(res);
})();
