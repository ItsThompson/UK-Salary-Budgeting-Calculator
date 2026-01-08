# UK Salary Budgeting Calculator

A Python CLI application that calculates post-tax income from UK salary, bonuses, and stock grants, then provides basic budget planning functionality.

## Features

- **UK Tax Calculations**: Accurate Income Tax and National Insurance calculations using 2024/25 tax rates
- **Equity Compensation**: Support for bonuses and stock grants with custom vesting schedules
- **Budget Planning**: Monthly budget breakdown with expense categories
- **JSON Configuration**: Easy-to-use configuration file system
- **Comprehensive Testing**: Full test coverage with pytest

## Installation

```bash
pip3 install pytest
```

## Usage

### Generate Example Configuration

```bash
python3 main.py --generate-example
```

This creates `example_config.json` with sample values.

### Run Budget Calculation

```bash
python3 main.py --config example_config.json
```

### Configuration Format

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

## Tax Rules

### Income Tax Bands (2024/25)
- Personal Allowance: Up to £12,570 (0%)
- Basic rate: £12,571 to £50,270 (20%)
- Higher rate: £50,271 to £125,140 (40%)
- Additional rate: Over £125,140 (45%)

### National Insurance Categories
Supports all UK NI categories (A, B, D, E, F, H, I, J, L, M, N, V, Z) with appropriate rates.

### Bonus and Stock Grant Taxation
- Bonuses are taxed as regular income (Income Tax + National Insurance)
- Stock grants are tax-free at grant, taxed as employment income when vested
- Sign-on bonuses are averaged over 4 years for annual calculation

## Testing

Run all tests:
```bash
python3 -m pytest -v
```

Run specific test file:
```bash
python3 -m pytest test_tax_calculator.py -v
```

## Project Structure

- `main.py` - CLI application entry point
- `tax_calculator.py` - UK tax calculation engine
- `equity_calculator.py` - Bonus and stock grant processing
- `budget_calculator.py` - Budget calculation and output formatting
- `test_*.py` - Comprehensive test suite
- `example_config.json` - Generated example configuration

## Example Output

```
==================================================
UK SALARY BUDGETING CALCULATOR
==================================================

📊 ANNUAL COMPENSATION BREAKDOWN
-----------------------------------
Base Salary:        £50,000.00
Annual Bonus:       £7,500.00
Vested Stock:       £2,000.00
Total Compensation: £59,500.00

💰 TAX BREAKDOWN
--------------------
Gross Income:       £59,500.00
Income Tax:         £10,042.00 (16.9%)
National Insurance: £3,686.20 (6.2%)
Pension:            £2,975.00 (5.0%)
Net Income:         £42,796.80 (71.9%)

🏠 MONTHLY BUDGET
------------------
Monthly Net Income: £3,566.40

Expenses:
  Bills        £1,200.00 (33.6%)
  Groceries    £400.00 (11.2%)
  Transport    £200.00 (5.6%)
  Other        £300.00 (8.4%)

Total Expenses:     £2,100.00 (58.9%)
Remaining:          £1,466.40 (41.1%)
```
