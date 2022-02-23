import { HttpRequest, HttpResponse } from '../protocols/http'
import { MissingParamError } from '../protocols/errors/missing-param-error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let error: Error = new MissingParamError('name')

    if (!httpRequest.body.email) {
      error = new MissingParamError('email')
    }

    return {
      statusCode: 400,
      body: error
    }
  }
}
