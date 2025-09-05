class APIERROR extends Error {
  constructor(
    statusCode,
    message = 'Something went wrong',
    errors = [],
    stack
  ) {
    super(message);
    ((statusCode = this.statusCode),
      (message = this.message),
      (errors = this.errors),
      (stack = this.stack));
  }
}

if (stack) {
  this.stack = stack;
} else {
  Error.captureStackTrace(this, this.constructor());
}

export { APIERROR };
