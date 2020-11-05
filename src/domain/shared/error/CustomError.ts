export interface CustomErrorModel {
  message: string;
  code: string;
  statusCode: number;
  field?: string;
  error?: any;
  type?: string;
}

export default class CustomError extends Error {
  public code: string;

  public message: string;

  public statusCode: number;

  public field: string;

  constructor(props: CustomErrorModel) {
    super(props.message);
    Object.assign(this, props);
  }
}
