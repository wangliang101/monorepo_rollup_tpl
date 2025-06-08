const createBabelConfig = require('./babel.config.js') 
const resolve = require('@rollup/plugin-node-resolve') // 解析模块路径
const babelPlugin = require('@rollup/plugin-babel') // 集成 Babel 编译器到 Rollup 打包过程
const commonjs = require('@rollup/plugin-commonjs') //转换模块格式
const { dts } = require('rollup-plugin-dts') // 处理 TypeScript 的类型声明文件

const extensions = ['.ts', '.tsx']

const getBabelOptions = () => {
  return {
    ...createBabelConfig,
    extensions,
    babelHelpers: 'bundled', // 以内联方式处理辅助函数
    comments: false, // 精简输出，移除冗余注释
  }
}

function createDeclarationConfig(input, output) {

  return {
    input,
    output: {
      file: output,
      format: 'esm',
    },
    plugins: [dts()]
  }
}

function createESMConfig(input, output) {
  return {
    input,
    output: {
      file: output,
      format: 'esm',
    },
    plugins: [resolve({extensions}), commonjs(), babelPlugin(getBabelOptions())]
  }
}

function createCJSConfig(input, output) {
  return {
    input,
    output: {
      file: output,
      format: 'cjs',
    },
    plugins: [resolve({extensions}), commonjs(), babelPlugin(getBabelOptions())]
  }
}

function createUMDConfig(input, output, name) {
  return {
    input,
    output: {
      file: output,
      format: 'umd',
      name,
    },  
    plugins: [resolve({extensions}), commonjs(), babelPlugin(getBabelOptions())]
  }
}






module.exports = (args) => {
  console.log(args); // jotai

  const packageName = process.env.PACKAGE;


  const input = `packages/${packageName}/src/index.ts`
  const output = `packages/${packageName}/dist`

  // console.log('-----------------', input, output)


  const declarationConfig = createDeclarationConfig(input, `${output}/index.d.ts`)
  const esmConfig = createESMConfig(input, `${output}/index.mjs`)
  const cjsConfig = createCJSConfig(input, `${output}/index.cjs`)
  const umdConfig = createUMDConfig(input, `${output}/index.umd.js`, packageName)
  // console.log('-----------------1', declarationConfig, esmConfig, cjsConfig, umdConfig)
  return [declarationConfig, esmConfig, cjsConfig, umdConfig]
}
