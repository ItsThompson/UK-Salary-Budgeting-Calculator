from typing import List, Dict
from tax_calculator import UKTaxCalculator

class EquityCalculator:
    @staticmethod
    def calculate_annual_bonus(sign_on_bonus: float, annual_bonus: float) -> float:
        """Calculate average annual bonus including sign-on bonus over 4 years."""
        return (sign_on_bonus / 4) + annual_bonus
    
    @staticmethod
    def calculate_vested_stock(total_grant_value: float, vesting_schedule: List[float]) -> float:
        """Calculate annual vested stock value based on vesting schedule."""
        if sum(vesting_schedule) != 100:
            raise ValueError("Vesting schedule must sum to 100%")
        
        # Calculate first year vesting
        first_year_percent = vesting_schedule[0]
        return total_grant_value * (first_year_percent / 100)
    
    @staticmethod
    def calculate_total_compensation(salary: float, sign_on_bonus: float, annual_bonus: float, 
                                   total_grant_value: float, vesting_schedule: List[float]) -> Dict[str, float]:
        """Calculate total annual compensation including all components."""
        annual_bonus_amount = EquityCalculator.calculate_annual_bonus(sign_on_bonus, annual_bonus)
        vested_stock_amount = EquityCalculator.calculate_vested_stock(total_grant_value, vesting_schedule)
        
        total_compensation = salary + annual_bonus_amount + vested_stock_amount
        
        return {
            'base_salary': salary,
            'annual_bonus': annual_bonus_amount,
            'vested_stock': vested_stock_amount,
            'total_compensation': total_compensation
        }

class CompensationCalculator:
    @staticmethod
    def calculate_total_tax_liability(config: Dict) -> Dict[str, float]:
        """Calculate complete tax liability for all compensation components."""
        salary_config = config['salary']
        bonus_config = config['bonuses']
        stock_config = config['stock_grants']
        tax_config = config['tax_settings']
        
        # Calculate total compensation
        compensation = EquityCalculator.calculate_total_compensation(
            salary_config['annual_salary'],
            bonus_config['sign_on_bonus'],
            bonus_config['annual_bonus'],
            stock_config['total_grant_value'],
            stock_config['vesting_schedule']
        )
        
        # Calculate taxes on total compensation
        tax_result = UKTaxCalculator.calculate_net_income(
            compensation['total_compensation'],
            tax_config['national_insurance_category'],
            salary_config['employee_pension_percent']
        )
        
        # Combine results
        result = {**compensation, **tax_result}
        result['monthly_net_income'] = result['net_income'] / 12
        
        return result
