export interface GenericFetchable<userID, Entity> {
  fetch(userId: userID): Promise<Entity>;
}
export interface GenericCreatable<Entity> {
  create(entity: Entity): Promise<void>;
}

export interface GenericUpdatable<Entity> {
  update(entity: Entity): Promise<Entity>;
}

export interface GenericUseCaseSingleParam<Param, Result> {
  execute(param: Param): Promise<Result>;
}

export interface GenericUseCaseDoubleParam<Param, SecondParam, Result> {
  execute(param: Param, secondParam: SecondParam): Promise<Result>;
}

export interface GenericUseCaseTripleParam<Param, SecondParam, ThirdParam, Result> {
  execute(param: Param, secondParam: SecondParam, thirdParam: ThirdParam): Promise<Result>;
}

export interface LoggerDTO {
  error(message: string): Promise<void>;
  info(message: string): Promise<void>;
}

export interface EventEmitter<Entity> {
  on(event: string, listener: (entity: Entity) => void): this;
  emit(event: string, data: any): void;
}
