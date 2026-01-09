export interface SalaryConfig {
  annual_salary: number;
  employee_pension_percent: number;
  employer_pension_percent: number;
}

export interface BonusConfig {
  sign_on_bonus: number;
  annual_bonus: number;
}

export interface StockConfig {
  total_grant_value: number;
  vesting_schedule: number[];
}

export interface TaxConfig {
  national_insurance_category: string;
}

export interface BudgetRequest {
  salary: SalaryConfig;
  bonuses: BonusConfig;
  stock_grants: StockConfig;
  tax_settings: TaxConfig;
  expenses: Record<string, number>;
}

export interface CompensationResult {
  base_salary: number;
  annual_bonus: number;
  vested_stock: number;
  total_compensation: number;
  gross_income: number;
  income_tax: number;
  national_insurance: number;
  employee_pension: number;
  net_income: number;
  monthly_net_income: number;
}

export interface BudgetResult {
  monthly_net_income: number;
  total_expenses: number;
  remaining_for_wants_and_savings: number;
  expenses_breakdown: Record<string, number>;
}

export interface BudgetResponse {
  compensation: CompensationResult;
  budget: BudgetResult;
}
