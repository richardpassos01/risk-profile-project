import { v4 as uuid } from 'uuid';

export type UserHouse = {
  ownership_status: string;
};

export type UserVehicle = {
  year: number;
};

export type UserRiskQuestions = number[];

export interface UserDTO {
  age: number;
  dependents: number;
  house?: UserHouse;
  income: number;
  marital_status: string;
  risk_questions: UserRiskQuestions;
  vehicle?: UserVehicle;
  id?: string;
  userId?: string;
}

export default class User {
  public readonly id: string;

  public year_of_birthday: number;

  public age: number;

  public dependents: number;

  public house?: string | JSON;

  public income: number;

  public marital_status: string;

  public risk_questions: string | JSON;

  public vehicle?: string | JSON;

  public is_deleted: boolean;

  constructor(props: UserDTO) {
    Object.assign(this, props);

    this.is_deleted = false;

    if (!props.id) {
      this.id = uuid();
    }
  }

  private getAgeByBirthday() {
    const currentYear = new Date().getFullYear();
    const yearOfBirthday = currentYear - this.year_of_birthday;
    delete this.year_of_birthday;

    return yearOfBirthday;
  }

  private getYearOfBirthdayByAge() {
    const currentYear = new Date().getFullYear();
    const yearOfBirthday = currentYear - this.age;
    delete this.age;

    return yearOfBirthday;
  }

  public prepareToSaveOnDatabase(): void {
    if (this.house) {
      this.house = this.parserToString(this.house);
    }

    if (this.vehicle) {
      this.vehicle = this.parserToString(this.vehicle);
    }

    this.risk_questions = this.parserToString(this.risk_questions);

    this.year_of_birthday = this.getYearOfBirthdayByAge();
  }

  private parserToString(prop): string {
    return JSON.stringify(prop);
  }

  public prepareToReadFromDatabase(): void {
    this.age = this.getAgeByBirthday();
  }
}
