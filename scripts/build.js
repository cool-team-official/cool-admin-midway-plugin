const esbuild = require('esbuild');
const copyPlugin = require('esbuild-plugin-copy').default;
const packageJson = require('../package.json');
const fs = require('fs');

// 输出目录
const outdir = 'dist';

// 删除 dist 目录
if (fs.existsSync(outdir)) {
  fs.rmdirSync(outdir, { recursive: true });
}

// 构建
esbuild.build({
  entryPoints: ['src/index.ts', 'test/index.ts'],
  external: Object.keys(packageJson.devDependencies),
  bundle: true,
  platform: 'node',
  outdir,
  plugins: [
    copyPlugin({
      assets: [{
        from: ['./README.md'],
        to: ['./README.md']
      },{
        from: ['./plugin.json'],
        to: ['./plugin.json']
      },{
        from: ['./assets/*'],
        to: ['./assets']
      }]
    })
  ]
}).catch(() => process.exit(1));
