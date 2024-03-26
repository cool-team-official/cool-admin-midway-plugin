import { BasePlugin } from "@cool-midway/plugin-cli";
import axios from "axios";
import "./other";

/**
 * 描述
 */
export class CoolPlugin extends BasePlugin {
  /**
   * 插件已就绪，注意：单例插件只会执行一次，非单例插件每次调用都会执行
   */
  async ready() {
    console.log("插件就绪");
  }

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
   * 使用缓存，使用cool-admin的缓存，开发的时候只是模拟
   */
  async useCache() {
    await this.cache.set("a", "一个项目用COOL就够了");
    const r = await this.cache.get("a");
    console.log(r);
  }

  /**
   * 调用其他插件
   */
  async usePlugin() {
    // 获得其他插件，开发的时候无法调试，只有安装到cool-admin中才能调试
    const plugin = await this.pluginService.getInstance("xxx");
    console.log(plugin);
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
