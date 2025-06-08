module.exports = {
  babelrc: false, // 告诉 Babel 不要使用任何外部的.babelrc配置文件，从而避免配置冲突。
  ignore: ['/node_modules/'], // 告诉 Babel 忽略 node_modules 目录
  presets: [['@babel/preset-env', { loose: true, modules: false }]], // 告诉 Babel 使用 @babel/preset-env 预设，并配置 loose 和 modules 选项，loose 表示使用更宽松的语法，modules 表示使用 ES 模块语法
  plugins: [
    [
      '@babel/plugin-transform-react-jsx', // 转换 JSX 语法
      {
        runtime: 'automatic', // 自动导入必要的 JSX 转换而不需要手动导入 React。
      },
    ],
    ['@babel/plugin-transform-typescript', { isTSX: true }], //添加了对 TypeScript 的支持， 支持 TSX 语法
  ],
}
