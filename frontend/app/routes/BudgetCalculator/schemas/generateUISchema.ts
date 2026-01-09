import { UISchemaElement } from '@jsonforms/core';

export const generateUISchema = (): UISchemaElement => ({
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Group',
      label: 'Salary Information',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/salary/properties/annual_salary'
        },
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/salary/properties/employee_pension_percent'
            },
            {
              type: 'Control',
              scope: '#/properties/salary/properties/employer_pension_percent'
            }
          ]
        }
      ]
    },
    {
      type: 'Group',
      label: 'Bonuses',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/bonuses/properties/sign_on_bonus'
        },
        {
          type: 'Control',
          scope: '#/properties/bonuses/properties/annual_bonus'
        }
      ]
    },
    {
      type: 'Group',
      label: 'Stock Grants',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/stock_grants/properties/total_grant_value'
        },
        {
          type: 'Control',
          scope: '#/properties/stock_grants/properties/vesting_schedule'
        }
      ]
    },
    {
      type: 'Group',
      label: 'Tax Settings',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/tax_settings/properties/national_insurance_category'
        }
      ]
    },
    {
      type: 'Group',
      label: 'Monthly Expenses',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/expenses'
        }
      ]
    }
  ]
});
