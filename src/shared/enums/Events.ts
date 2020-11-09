export enum Events {
  ShouldCalculateBaseBaseScore = 'CALCULATE_BASE_SCORE',
  CreateRiskProfileByScoreAndUser = 'CREATE_RISK_PROFILE_BY_SCORE',
  DetermineInsuranceEligibility = 'DETERMINE_ELIGIBILITY',
  CreateSuitabilityOfRiskProfile = 'CREATE_SUITABILITY',
  CalculatesRiskPointsByAge = 'CALCULATE_RISK_POINT_BY_AGE',
  CalculatesRiskPointsByIncome = 'CALCULATE_RISK_POINT_BY_INCOME',
  CalculatesRiskPointsByHouse = 'CALCULATE_RISK_POINT_BY_HOUSE',
  CalculatesRiskPointsByDependents = 'CALCULATE_RISK_POINT_BY_DEPENDENTS',
  CalculatesRiskPointsByMaritalStatus = 'CALCULATE_RISK_POINT_BY_MARITAL_STATUS',
  CalculatesRiskPointsByVehicle = 'CALCULATE_RISK_POINT_BY_VEHICLE',
}
