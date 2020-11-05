export type UserHouse = {
  ownership_status: string;
};

export type UserVehicle = {
  year: number;
};

export type UserRiskQuestions = number[];

export default class User {
  public age: number;

  public dependents: number;

  public house?: UserHouse;

  public income: number;

  public marital_status: string;

  public risk_questions: UserRiskQuestions;

  public vehicle?: UserVehicle;

  constructor(props: User) {
    Object.assign(this, props);
  }
}
