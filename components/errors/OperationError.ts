export class OperationError extends Error {
  name: string;
  code: string;
  message: string;

  constructor(
    code: string, message: string
  ) {
    super(`{"${code}": "${message}"}`);

    this.name = "OperationError";
    this.code = code;

    Object.setPrototypeOf(
      this,
      OperationError.prototype
    );
  }

}

