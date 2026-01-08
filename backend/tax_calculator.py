from typing import Dict, Tuple

class UKTaxCalculator:
    # UK Tax Bands 2024/25
    TAX_BANDS = [
        (12570, 0.0),    # Personal Allowance
        (50270, 0.20),   # Basic rate
        (125140, 0.40),  # Higher rate
        (float('inf'), 0.45)  # Additional rate
    ]
    
    # National Insurance rates by category (weekly thresholds converted to annual)
    NI_RATES = {
        'A': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'B': {'lower': 6500, 'upper': 50270, 'rate1': 0.0185, 'rate2': 0.02},
        'D': {'lower': 6500, 'upper': 50270, 'rate1': 0.02, 'rate2': 0.02},
        'E': {'lower': 6500, 'upper': 50270, 'rate1': 0.0185, 'rate2': 0.02},
        'F': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'H': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'I': {'lower': 6500, 'upper': 50270, 'rate1': 0.0185, 'rate2': 0.02},
        'J': {'lower': 6500, 'upper': 50270, 'rate1': 0.02, 'rate2': 0.02},
        'L': {'lower': 6500, 'upper': 50270, 'rate1': 0.02, 'rate2': 0.02},
        'M': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'N': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'V': {'lower': 6500, 'upper': 50270, 'rate1': 0.08, 'rate2': 0.02},
        'Z': {'lower': 6500, 'upper': 50270, 'rate1': 0.02, 'rate2': 0.02}
    }
    
    @classmethod
    def calculate_income_tax(cls, taxable_income: float) -> float:
        """Calculate income tax using UK progressive tax bands."""
        if taxable_income <= 0:
            return 0
        
        tax = 0
        remaining_income = taxable_income
        
        for i, (threshold, rate) in enumerate(cls.TAX_BANDS):
            if remaining_income <= 0:
                break
            
            if i == 0:
                # Personal allowance - no tax
                if remaining_income <= threshold:
                    break
                remaining_income -= threshold
            else:
                prev_threshold = cls.TAX_BANDS[i-1][0]
                taxable_in_band = min(remaining_income, threshold - prev_threshold)
                tax += taxable_in_band * rate
                remaining_income -= taxable_in_band
        
        return tax
    
    @classmethod
    def calculate_national_insurance(cls, gross_income: float, category: str) -> float:
        """Calculate National Insurance contributions."""
        if category not in cls.NI_RATES or gross_income <= 0:
            return 0
        
        rates = cls.NI_RATES[category]
        ni = 0
        
        if gross_income > rates['lower']:
            # First band
            band1_income = min(gross_income - rates['lower'], rates['upper'] - rates['lower'])
            ni += band1_income * rates['rate1']
            
            # Second band (if applicable)
            if gross_income > rates['upper']:
                band2_income = gross_income - rates['upper']
                ni += band2_income * rates['rate2']
        
        return ni
    
    @classmethod
    def calculate_pension_contributions(cls, gross_income: float, employee_percent: float, employer_percent: float) -> Tuple[float, float]:
        """Calculate pension contributions (employee and employer)."""
        employee_contribution = gross_income * (employee_percent / 100)
        employer_contribution = gross_income * (employer_percent / 100)
        return employee_contribution, employer_contribution
    
    @classmethod
    def calculate_net_income(cls, gross_income: float, ni_category: str, employee_pension_percent: float) -> Dict[str, float]:
        """Calculate net income after all deductions."""
        employee_pension, employer_pension = cls.calculate_pension_contributions(
            gross_income, employee_pension_percent, 0
        )
        
        # Taxable income is after pension contributions
        taxable_income = gross_income - employee_pension
        
        income_tax = cls.calculate_income_tax(taxable_income)
        national_insurance = cls.calculate_national_insurance(gross_income, ni_category)
        
        net_income = gross_income - income_tax - national_insurance - employee_pension
        
        return {
            'gross_income': gross_income,
            'employee_pension': employee_pension,
            'taxable_income': taxable_income,
            'income_tax': income_tax,
            'national_insurance': national_insurance,
            'net_income': net_income
        }
