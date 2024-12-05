export interface IResponse<T> {
  error: boolean;
  message: string;
  data: T;
  [key: string]: any;
}
