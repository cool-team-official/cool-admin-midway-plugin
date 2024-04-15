![](https://cool-js.com/team/gist.jpg)

## 官网

[https://cool-js.com](https://cool-js.com)

[插件开发文档](https://cool-js.com/admin/node/core/plugin.html#使用插件)

## 视频教程

[1、插件开发](https://www.bilibili.com/video/BV1aa4y187jh/)

[2、插件发布与使用](https://www.bilibili.com/video/BV1mw41157bx/)

## README 示例

下面时插件介绍的示例，你可以按照这样的规范写，当然不限于这种形式，你可以自由发挥，只要能表达清楚即可。

### 介绍

这是个示例插件， 写了一些简单的方法

### 标识

调用插件的时候需要用到标识，标识是唯一的，不能重复，建议使用英文，不要使用中文，对应插件 `plugin.json` 中的 `key` 字段

- 标识：test

### 配置

```json
{
  "appId": "xxx的appId",
  "appSecret": "xxx的appSecret"
}
```

### 方法

下面是插件提供的一些方法

- show

```ts
  /**
   * 展示插件信息
   * @param a 参数a
   * @param b 参数b
   * @returns 插件信息
   */
  async show(a, b)
```

- demo

```ts
  /**
    * 请求网络示例
    * @returns 百度的请求结果
    */
  async demo()
```

### 调用示例

```ts
@Inject()
pluginService: PluginService;

// 获取插件实例
const instance = await this.pluginService.getInstance('test');

// 调用show
await instance.show(1, 2);

// 调用demo
await instance.demo();

```

### 更新日志

- v1.0.0 (2024-04-15)
  - 初始版本
