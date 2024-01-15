import * as Index from '../src/index'
import pluginInfo from '../plugin.json'

// 实例化插件
const indexInstance = new Index.default();
// 初始化插件
indexInstance.init(pluginInfo);

// 调用插件方法
indexInstance.show();
