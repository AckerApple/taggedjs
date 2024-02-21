export type TagErrorDetails = Record<string, unknown>
export type TagErrorFullDetails = Record<string, unknown> & {errorCode: string}

export class TagError extends Error {
  details: TagErrorFullDetails

  constructor(
    message: string,
    errorCode: string,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = TagError.name;
    this.details = {...details, errorCode}
  }
}

export class ArrayNoKeyError extends TagError {
  constructor(message: string, details?: TagErrorDetails) {
    super(message, 'array-no-key-error', details);
    this.name = ArrayNoKeyError.name;
  }
}

export class StateMismatchError extends TagError {
  constructor(message: string, details?: TagErrorDetails) {
    super(message, 'state-mismatch-error', details);
    this.name = StateMismatchError.name;
  }
}
