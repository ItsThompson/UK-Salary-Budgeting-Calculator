import { JsonSchema } from '@jsonforms/core';

export const budgetSchema: JsonSchema = {
  type: 'object',
  properties: {
    salary: {
      type: 'object',
      properties: {
        annual_salary: {
          type: 'number',
          minimum: 1,
          title: 'Annual Salary (£)'
        },
        employee_pension_percent: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          title: 'Employee Pension (%)'
        },
        employer_pension_percent: {
          type: 'number',
          minimum: 0,
          maximum: 100,
          title: 'Employer Pension (%)'
        }
      },
      required: ['annual_salary', 'employee_pension_percent', 'employer_pension_percent']
    },
    bonuses: {
      type: 'object',
      properties: {
        sign_on_bonus: {
          type: 'number',
          minimum: 0,
          title: 'Sign-on Bonus (£)'
        },
        annual_bonus: {
          type: 'number',
          minimum: 0,
          title: 'Annual Bonus (£)'
        }
      },
      required: ['sign_on_bonus', 'annual_bonus']
    },
    stock_grants: {
      type: 'object',
      properties: {
        total_grant_value: {
          type: 'number',
          minimum: 0,
          title: 'Total Grant Value (£)'
        },
        vesting_schedule: {
          type: 'array',
          items: {
            type: 'number',
            minimum: 0,
            maximum: 100
          },
          title: 'Vesting Schedule (%)'
        }
      },
      required: ['total_grant_value', 'vesting_schedule']
    },
    tax_settings: {
      type: 'object',
      properties: {
        national_insurance_category: {
          type: 'string',
          enum: ['A', 'B', 'C'],
          title: 'National Insurance Category'
        }
      },
      required: ['national_insurance_category']
    },
    expenses: {
      type: 'object',
      patternProperties: {
        '^.*$': {
          type: 'number',
          minimum: 0
        }
      },
      title: 'Monthly Expenses (£)'
    }
  },
  required: ['salary', 'bonuses', 'stock_grants', 'tax_settings', 'expenses']
};
