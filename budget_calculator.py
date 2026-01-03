from typing import Dict
from equity_calculator import CompensationCalculator

class BudgetCalculator:
    @staticmethod
    def calculate_budget(monthly_net_income: float, expenses: Dict[str, float]) -> Dict[str, float]:
        """Calculate budget breakdown and remaining amount."""
        total_expenses = sum(expenses.values())
        remaining = monthly_net_income - total_expenses
        
        return {
            'monthly_net_income': monthly_net_income,
            'total_expenses': total_expenses,
            'remaining_for_wants_and_savings': remaining,
            'expenses_breakdown': expenses
        }

class OutputFormatter:
    @staticmethod
    def format_currency(amount: float) -> str:
        """Format currency with proper formatting."""
        return f"£{amount:,.2f}"
    
    @staticmethod
    def format_percentage(amount: float, total: float) -> str:
        """Format percentage with 1 decimal place."""
        if total == 0:
            return "0.0%"
        return f"{(amount/total)*100:.1f}%"
    
    @staticmethod
    def generate_report(config: Dict) -> str:
        """Generate complete budget report."""
        # Calculate compensation and taxes
        compensation_result = CompensationCalculator.calculate_total_tax_liability(config)
        
        # Calculate budget
        budget_result = BudgetCalculator.calculate_budget(
            compensation_result['monthly_net_income'],
            config['expenses']
        )
        
        # Format report
        report = []
        report.append("=" * 50)
        report.append("UK SALARY BUDGETING CALCULATOR")
        report.append("=" * 50)
        
        # Compensation section
        report.append("\n📊 ANNUAL COMPENSATION BREAKDOWN")
        report.append("-" * 35)
        report.append(f"Base Salary:        {OutputFormatter.format_currency(compensation_result['base_salary'])}")
        report.append(f"Annual Bonus:       {OutputFormatter.format_currency(compensation_result['annual_bonus'])}")
        report.append(f"Vested Stock:       {OutputFormatter.format_currency(compensation_result['vested_stock'])}")
        report.append(f"Total Compensation: {OutputFormatter.format_currency(compensation_result['total_compensation'])}")
        
        # Tax section
        report.append("\n💰 TAX BREAKDOWN")
        report.append("-" * 20)
        gross = compensation_result['gross_income']
        report.append(f"Gross Income:       {OutputFormatter.format_currency(gross)}")
        report.append(f"Income Tax:         {OutputFormatter.format_currency(compensation_result['income_tax'])} ({OutputFormatter.format_percentage(compensation_result['income_tax'], gross)})")
        report.append(f"National Insurance: {OutputFormatter.format_currency(compensation_result['national_insurance'])} ({OutputFormatter.format_percentage(compensation_result['national_insurance'], gross)})")
        report.append(f"Pension:            {OutputFormatter.format_currency(compensation_result['employee_pension'])} ({OutputFormatter.format_percentage(compensation_result['employee_pension'], gross)})")
        report.append(f"Net Income:         {OutputFormatter.format_currency(compensation_result['net_income'])} ({OutputFormatter.format_percentage(compensation_result['net_income'], gross)})")
        
        # Monthly budget section
        report.append("\n🏠 MONTHLY BUDGET")
        report.append("-" * 18)
        monthly_net = budget_result['monthly_net_income']
        report.append(f"Monthly Net Income: {OutputFormatter.format_currency(monthly_net)}")
        report.append("\nExpenses:")
        for category, amount in budget_result['expenses_breakdown'].items():
            report.append(f"  {category.title():12} {OutputFormatter.format_currency(amount)} ({OutputFormatter.format_percentage(amount, monthly_net)})")
        
        report.append(f"\nTotal Expenses:     {OutputFormatter.format_currency(budget_result['total_expenses'])} ({OutputFormatter.format_percentage(budget_result['total_expenses'], monthly_net)})")
        
        remaining = budget_result['remaining_for_wants_and_savings']
        if remaining >= 0:
            report.append(f"Remaining:          {OutputFormatter.format_currency(remaining)} ({OutputFormatter.format_percentage(remaining, monthly_net)})")
        else:
            report.append(f"⚠️  OVER BUDGET:     {OutputFormatter.format_currency(abs(remaining))} ({OutputFormatter.format_percentage(abs(remaining), monthly_net)})")
        
        report.append("\n" + "=" * 50)
        
        return "\n".join(report)
