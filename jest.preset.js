const config = {
  testMatch: ['**/__tests__/**/*.[jt]s?(x)'], // 匹配测试文件
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'], // 允许的模块扩展名
  transform: {
    '^.+\\.[tj]sx?$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.json' }], // 文件转换规则
  },
  testEnvironment: 'jsdom', // 测试环境
  testTimeout: 35000, // 测试超时时间
};

module.exports = config;
