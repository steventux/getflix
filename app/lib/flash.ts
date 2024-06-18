export enum FlashType {
  ERROR = 'error',
  MESSAGE = 'message',
  WARNING = 'warning',
};

export type Flash = { message?: string, type?: FlashType };
