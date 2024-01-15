import { BasePlugin } from "../core/base";

/**
 * 描述
 */
export default class CoolPlugin extends BasePlugin {
  /**
   * 展示插件信息示例
   */
  async show() {
    console.log(this.pluginInfo)
  }
}