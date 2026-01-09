import { budgetSchema } from './budgetSchema';
import Ajv from 'ajv';

describe('budgetSchema', () => {
  const ajv = new Ajv();
  const validate = ajv.compile(budgetSchema);

  const validData = {
    salary: {
      annual_salary: 50000,
      employee_pension_percent: 5,
      employer_pension_percent: 3
    },
    bonuses: {
      sign_on_bonus: 0,
      annual_bonus: 0
    },
    stock_grants: {
      total_grant_value: 0,
      vesting_schedule: [25, 25, 25, 25]
    },
    tax_settings: {
      national_insurance_category: 'A'
    },
    expenses: {
      rent: 1200
    }
  };

  it('validates correct data', () => {
    const isValid = validate(validData);
    expect(isValid).toBe(true);
  });

  it('rejects negative salary', () => {
    const invalidData = { ...validData, salary: { ...validData.salary, annual_salary: -1000 } };
    const isValid = validate(invalidData);
    expect(isValid).toBe(false);
  });

  it('rejects invalid pension percentages', () => {
    const invalidData = { ...validData, salary: { ...validData.salary, employee_pension_percent: 150 } };
    const isValid = validate(invalidData);
    expect(isValid).toBe(false);
  });

  it('requires all salary fields', () => {
    const invalidData = { ...validData, salary: { annual_salary: 50000 } };
    const isValid = validate(invalidData);
    expect(isValid).toBe(false);
  });
});
