import pytest
from budget_calculator import BudgetCalculator, OutputFormatter

class TestBudgetCalculator:
    def test_calculate_budget_positive_remaining(self):
        """Test budget calculation with positive remaining amount."""
        expenses = {'bills': 1000, 'groceries': 300, 'transport': 200}
        result = BudgetCalculator.calculate_budget(2000, expenses)
        
        assert result['monthly_net_income'] == 2000
        assert result['total_expenses'] == 1500
        assert result['remaining_for_wants_and_savings'] == 500
        assert result['expenses_breakdown'] == expenses
    
    def test_calculate_budget_negative_remaining(self):
        """Test budget calculation with negative remaining (over budget)."""
        expenses = {'bills': 1500, 'groceries': 800}
        result = BudgetCalculator.calculate_budget(2000, expenses)
        
        assert result['remaining_for_wants_and_savings'] == -300

class TestOutputFormatter:
    def test_format_currency(self):
        """Test currency formatting."""
        assert OutputFormatter.format_currency(1234.56) == "£1,234.56"
        assert OutputFormatter.format_currency(0) == "£0.00"
        assert OutputFormatter.format_currency(1000000) == "£1,000,000.00"
    
    def test_format_percentage(self):
        """Test percentage formatting."""
        assert OutputFormatter.format_percentage(25, 100) == "25.0%"
        assert OutputFormatter.format_percentage(33.333, 100) == "33.3%"
        assert OutputFormatter.format_percentage(0, 100) == "0.0%"
        assert OutputFormatter.format_percentage(50, 0) == "0.0%"
    
    def test_generate_report(self):
        """Test complete report generation."""
        config = {
            'salary': {
                'annual_salary': 50000,
                'employee_pension_percent': 5.0
            },
            'bonuses': {
                'sign_on_bonus': 10000,
                'annual_bonus': 5000
            },
            'stock_grants': {
                'total_grant_value': 40000,
                'vesting_schedule': [5, 15, 40, 40]
            },
            'tax_settings': {
                'national_insurance_category': 'A'
            },
            'expenses': {
                'bills': 1200,
                'groceries': 400,
                'transport': 200,
                'other': 300
            }
        }
        
        report = OutputFormatter.generate_report(config)
        
        # Check that report contains key sections
        assert "UK SALARY BUDGETING CALCULATOR" in report
        assert "ANNUAL COMPENSATION BREAKDOWN" in report
        assert "TAX BREAKDOWN" in report
        assert "MONTHLY BUDGET" in report
        assert "Base Salary:" in report
        assert "Income Tax:" in report
        assert "Monthly Net Income:" in report
