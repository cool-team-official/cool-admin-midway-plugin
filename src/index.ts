import { BasePlugin } from "@cool-midway/plugin-cli";
import axios from "axios";
import "./other";

/**
 * 描述
 */
export class CoolPlugin extends BasePlugin {
  /**
   * 展示插件信息
   * @param a 参数a
   * @param b 参数b
   * @returns 插件信息
   */
  async show(a, b) {
    console.log("传参", a, b);
    return this.pluginInfo;
  }

  /**
   * 请求网络示例
   */
  async demo() {
    const res = await axios.get("https://www.baidu.com");
    return res.data;
  }
}

// 导出插件实例， Plugin名称不可修改
export const Plugin = CoolPlugin;
