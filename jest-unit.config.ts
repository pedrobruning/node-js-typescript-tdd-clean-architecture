import config from './jest.config'
Object.assign({}, config, { testMatch: ['**/*.spec.ts'] })
export default config
