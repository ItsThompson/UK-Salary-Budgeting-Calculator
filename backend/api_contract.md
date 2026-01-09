# Budget Calculator API Contract

## POST /calculate-budget

Calculate UK salary budget with tax deductions and expense breakdown.

### Request Body
```json
{
  "salary": {
    "annual_salary": 50000,
    "employee_pension_percent": 5.0,
    "employer_pension_percent": 3.0
  },
  "bonuses": {
    "sign_on_bonus": 10000,
    "annual_bonus": 5000
  },
  "stock_grants": {
    "total_grant_value": 40000,
    "vesting_schedule": [5, 15, 40, 40]
  },
  "tax_settings": {
    "national_insurance_category": "A"
  },
  "expenses": {
    "bills": 1200,
    "groceries": 400,
    "transport": 200,
    "other": 300
  }
}
```

### 200 Success Response
```json
{
  "compensation": {
    "base_salary": 50000,
    "annual_bonus": 5000,
    "vested_stock": 10000,
    "total_compensation": 65000,
    "gross_income": 65000,
    "income_tax": 8500,
    "national_insurance": 4284,
    "employee_pension": 3250,
    "net_income": 48966,
    "monthly_net_income": 4080.5
  },
  "budget": {
    "monthly_net_income": 4080.5,
    "total_expenses": 2100,
    "remaining_for_wants_and_savings": 1980.5,
    "expenses_breakdown": {
      "bills": 1200,
      "groceries": 400,
      "transport": 200,
      "other": 300
    }
  }
}
```

### 400 Bad Request Response
```json
{
  "error": "Validation error",
  "details": "annual_salary must be a positive number"
}
```

### 422 Unprocessable Entity Response
```json
{
  "error": "Invalid input format",
  "details": "Missing required field: salary"
}
```

### 500 Internal Server Error Response
```json
{
  "error": "Calculation error",
  "details": "Unable to process tax calculation"
}
```
