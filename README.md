### 介绍

讯飞星火 拥有跨领域的知识和语言理解能力，完成问答对话和文学创作等任务。持续从海量文本数据和大规模语法知识中学习进化，实现从提出问题、规划问题到解决问题的全流程闭环

官网：[https://xinghuo.xfyun.cn/sparkapi](https://xinghuo.xfyun.cn/sparkapi)

插件集成了 讯飞星火 的接口，可以方便的调用 讯飞星火 的接口

### 标识

调用插件的时候需要用到标识，标识是唯一的，不能重复，建议使用英文，不要使用中文，对应插件 `plugin.json` 中的 `key` 字段

- 标识：xunfei

### 配置

```json
{
  "Host": "spark-api.xf-yun.com",
  "APPID": "xxxxx",
  "APISecret": "xxxxx",
  "APIKey": "xxxxx",
  "Version": "v3.5"
}
```

### 方法

下面是插件提供的一些方法

- chat

聊天

```ts
 /**
   * 调用模型
   * @param messages 消息列表
   * @param options 配置，参考官方文档
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
  )
```

消息体

```ts
// 消息体
interface Message {
  // 角色
  role: "system" | "user" | "assistant";
  // 内容
  content: any;
}
```

### 调用示例

```ts
@Inject()
pluginService: PluginService;

const instance = await this.pluginService.getInstance('xunfei');

// 消息
const messages: any = [
  { role: "system", content: "你的名字叫COOL, 你是一个编程助手" },
  { role: "user", content: "你是谁" },
];

//非流式调用
instance.chat(messages).then((data) => {
  console.log(data);
});

//流式调用
instance.chat(messages, { stream: true }, (data) => {
  console.log(data);
});

```

### 更新日志

- v1.0.0 (2024-03-09)
  - 初始版本
