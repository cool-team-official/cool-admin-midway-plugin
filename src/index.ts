import { BasePlugin } from "@cool-midway/plugin-cli";
import "./utils";
import { getWebsocketUrl, signUrl, webSocketSend } from "./utils";
import WebSocket from "ws";
import axios from "axios";

// 消息体
export interface Message {
  // 角色
  role: "system" | "user" | "assistant";
  // 内容
  content: any;
}

/**
 * 描述
 */
export class CoolPlugin extends BasePlugin {
  /**
   * 调用模型
   * @param messages 消息列表
   * @param options 配置，参考官方文档：
   * @param callback callback 当stream为true时，回调函数
   * @returns 返回模型结果
   */
  async chat(
    messages: Message[],
    options: any = {
      url: "/v3.5/chat",
      stream: false,
      parameter: {},
    },
    callback?: (data: any) => void
  ) {
    options = {
      url: "/v3.5/chat",
      stream: false,
      parameter: {},
      ...this.pluginInfo.config,
      ...options,
    };

    const { stream } = options;

    let result = "";
    const url = await getWebsocketUrl(options);
    const ws = new WebSocket(url);

    return new Promise((resolve, reject) => {
      ws.onopen = (e) => {
        webSocketSend(ws, options, messages);
      };
      ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        const content = data.payload?.choices?.text[0].content;
        if (stream && !data.payload?.usage && callback) {
          callback({ isEnd: false, content });
        }
        result += content;
        if (data.payload?.usage) {
          ws.close();
          stream && callback({ isEnd: false, content });
          stream &&
            callback &&
            callback({ isEnd: true, usage: data.payload?.usage.text });
          return resolve({
            reply: result,
            usage: data.payload?.usage.text,
          });
        }
      };
      ws.onerror = (e) => {
        console.error(e);
        ws.close();
      };
    });
  }

  /**
   * 向量化
   * @param input 输入
   * @param options 配置
   */
  async embedding(
    input: string,
    options: any = {
      type: "query",
    }
  ) {
    const urls = {
      db: {
        url: "/v1/private/sa8a05c27",
        pre: "https",
        host: "cn-huabei-1.xf-yun.com",
      },
      query: {
        url: "/v1/private/s50d55a16",
        pre: "https",
        host: "cn-huabei-1.xf-yun.com",
      },
    };
    const urlConfig = urls[options.type];
    const url = await signUrl(
      this.pluginInfo.config,
      urlConfig.pre,
      urlConfig.host,
      urlConfig.url,
      "POST"
    );
    const appid = this.pluginInfo.config.APPID;

    const content = {
      messages: [
        {
          content: input,
          role: "user",
        },
      ],
    };

    const req = {
      header: {
        app_id: appid,
        uid: "COOl",
        status: 3,
      },
      parameter: {
        emb: {
          feature: {
            encoding: "utf8",
          },
        },
      },
      payload: {
        messages: {
          text: btoa(unescape(encodeURIComponent(JSON.stringify(content)))),
        },
      },
    };

    const result = await axios.post(url, req);
    return result.data;
  }
}

// 导出插件实例， Plugin名称不可修改
export const Plugin = CoolPlugin;
