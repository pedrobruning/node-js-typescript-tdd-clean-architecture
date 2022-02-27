import config from './jest.config'
Object.assign({}, config, { testMatch: ['**/*.test.ts'] })
export default config
