class APIRESPONSE {
  constructor(statusCode, data, message = 'Success') {
    ((this.statusCode = statusCode),
      (this.data = data),
      (this.message = message),
      (success = true));
  }
}

export { APIRESPONSE };
