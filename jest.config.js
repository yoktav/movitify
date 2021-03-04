module.exports = {
  globalSetup: '<rootDir>/jest.setup.js',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue', 'ts', 'tsx'],
  testEnvironment: 'jsdom',
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '.*\\.(js)$': 'babel-jest',
  },
  setupFiles: ['<rootDir>/components/jest.components.js'],
  transformIgnorePatterns: ['<rootDir>/node_modules/nuxt-lazy-load'],
  modulePathIgnorePatterns: [
    '<rootDir>/.nuxt',
    '<rootDir>/coverage',
    '<rootDir>/node_modules',
    '<rootDir>/.eslintrc.js',
    '<rootDir>/nuxt.config.js',
  ],
  collectCoverage: false,
  collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**'],
  forceExit: !!process.env.CI, // almost every CI platform sets this by default
};
