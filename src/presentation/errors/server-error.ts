export class ServerError extends Error {
  constructor (error: Error) {
    super('Internal Server Error')
    this.name = 'ServerParamError'
    this.stack = error.stack
  }
}
