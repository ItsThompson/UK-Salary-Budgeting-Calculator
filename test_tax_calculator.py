import pytest
from tax_calculator import UKTaxCalculator

class TestUKTaxCalculator:
    def test_calculate_income_tax_personal_allowance(self):
        """Test income tax calculation within personal allowance."""
        tax = UKTaxCalculator.calculate_income_tax(10000)
        assert tax == 0
    
    def test_calculate_income_tax_basic_rate(self):
        """Test income tax calculation in basic rate band."""
        # £30,000 - £12,570 = £17,430 taxable at 20%
        tax = UKTaxCalculator.calculate_income_tax(30000)
        expected = (30000 - 12570) * 0.20
        assert abs(tax - expected) < 0.01
    
    def test_calculate_income_tax_higher_rate(self):
        """Test income tax calculation in higher rate band."""
        # £60,000: (£50,270 - £12,570) * 20% + (£60,000 - £50,270) * 40%
        tax = UKTaxCalculator.calculate_income_tax(60000)
        basic_tax = (50270 - 12570) * 0.20
        higher_tax = (60000 - 50270) * 0.40
        expected = basic_tax + higher_tax
        assert abs(tax - expected) < 0.01
    
    def test_calculate_income_tax_additional_rate(self):
        """Test income tax calculation in additional rate band."""
        tax = UKTaxCalculator.calculate_income_tax(150000)
        basic_tax = (50270 - 12570) * 0.20
        higher_tax = (125140 - 50270) * 0.40
        additional_tax = (150000 - 125140) * 0.45
        expected = basic_tax + higher_tax + additional_tax
        assert abs(tax - expected) < 0.01
    
    def test_calculate_national_insurance_category_a(self):
        """Test National Insurance calculation for category A."""
        ni = UKTaxCalculator.calculate_national_insurance(30000, 'A')
        # £30,000 - £6,500 = £23,500 at 8%
        expected = (30000 - 6500) * 0.08
        assert abs(ni - expected) < 0.01
    
    def test_calculate_national_insurance_category_b(self):
        """Test National Insurance calculation for category B."""
        ni = UKTaxCalculator.calculate_national_insurance(30000, 'B')
        expected = (30000 - 6500) * 0.0185
        assert abs(ni - expected) < 0.01
    
    def test_calculate_national_insurance_high_earner(self):
        """Test National Insurance calculation for high earner."""
        ni = UKTaxCalculator.calculate_national_insurance(60000, 'A')
        # First band: (£50,270 - £6,500) * 8%
        # Second band: (£60,000 - £50,270) * 2%
        band1 = (50270 - 6500) * 0.08
        band2 = (60000 - 50270) * 0.02
        expected = band1 + band2
        assert abs(ni - expected) < 0.01
    
    def test_calculate_pension_contributions(self):
        """Test pension contribution calculations."""
        employee, employer = UKTaxCalculator.calculate_pension_contributions(50000, 5.0, 3.0)
        assert employee == 2500
        assert employer == 1500
    
    def test_calculate_net_income(self):
        """Test complete net income calculation."""
        result = UKTaxCalculator.calculate_net_income(50000, 'A', 5.0)
        
        assert result['gross_income'] == 50000
        assert result['employee_pension'] == 2500
        assert result['taxable_income'] == 47500
        assert result['income_tax'] > 0
        assert result['national_insurance'] > 0
        assert result['net_income'] > 0
        assert result['net_income'] < result['gross_income']
    
    def test_calculate_net_income_zero_income(self):
        """Test net income calculation with zero income."""
        result = UKTaxCalculator.calculate_net_income(0, 'A', 5.0)
        assert all(value == 0 for value in result.values())
