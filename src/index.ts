import { BasePlugin } from "@cool-midway/plugin-cli";
import axios from "axios";
import "./other";

/**
 * 描述
 */
export default class CoolPlugin extends BasePlugin {
  /**
   * 展示插件信息示例
   */
  async show() {
    console.log(this.pluginInfo);
  }

  /**
   * 请求网络示例
   */
  async demo() {
    const res = await axios.get("https://www.baidu.com");
    console.log(res);
  }
}
