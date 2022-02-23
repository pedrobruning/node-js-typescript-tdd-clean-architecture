export class SignUpController {
  handle (httpRequest: any): any {
    let error: Error = new Error('Missing param: name')

    if (!httpRequest.body.email) {
      error = new Error('Missing param: email')
    }

    return {
      statusCode: 400,
      body: error
    }
  }
}
