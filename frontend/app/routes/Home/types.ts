export type HelloWorldResponse = {
  message: string;
};

export type BudgetRequest = {
  salary: {
    annual_salary: number;
    employee_pension_percent: number;
    employer_pension_percent: number;
  };
  bonuses: {
    sign_on_bonus: number;
    annual_bonus: number;
  };
  stock_grants: {
    total_grant_value: number;
    vesting_schedule: number[];
  };
  tax_settings: {
    national_insurance_category: string;
  };
  expenses: Record<string, number>;
};

export type BudgetResponse = {
  compensation: {
    base_salary: number;
    annual_bonus: number;
    vested_stock: number;
    total_compensation: number;
    gross_income: number;
    employee_pension: number;
    taxable_income: number;
    income_tax: number;
    national_insurance: number;
    net_income: number;
    monthly_net_income: number;
  };
  budget: {
    monthly_net_income: number;
    total_expenses: number;
    remaining_for_wants_and_savings: number;
    expenses_breakdown: Record<string, number>;
  };
};
