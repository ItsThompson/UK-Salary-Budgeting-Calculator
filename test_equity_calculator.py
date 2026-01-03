import pytest
from equity_calculator import EquityCalculator, CompensationCalculator

class TestEquityCalculator:
    def test_calculate_annual_bonus(self):
        """Test annual bonus calculation with sign-on bonus averaging."""
        annual_bonus = EquityCalculator.calculate_annual_bonus(20000, 5000)
        expected = (20000 / 4) + 5000  # £5,000 + £5,000 = £10,000
        assert annual_bonus == expected
    
    def test_calculate_vested_stock_first_year(self):
        """Test stock vesting calculation for first year."""
        vested = EquityCalculator.calculate_vested_stock(40000, [5, 15, 40, 40])
        expected = 40000 * 0.05  # 5% of £40,000 = £2,000
        assert vested == expected
    
    def test_calculate_vested_stock_invalid_schedule(self):
        """Test stock vesting with invalid schedule."""
        with pytest.raises(ValueError, match="Vesting schedule must sum to 100%"):
            EquityCalculator.calculate_vested_stock(40000, [10, 20, 30])
    
    def test_calculate_total_compensation(self):
        """Test total compensation calculation."""
        result = EquityCalculator.calculate_total_compensation(
            50000, 20000, 5000, 40000, [5, 15, 40, 40]
        )
        
        assert result['base_salary'] == 50000
        assert result['annual_bonus'] == 10000  # (20000/4) + 5000
        assert result['vested_stock'] == 2000   # 40000 * 0.05
        assert result['total_compensation'] == 62000

class TestCompensationCalculator:
    def test_calculate_total_tax_liability(self):
        """Test complete tax liability calculation."""
        config = {
            'salary': {
                'annual_salary': 50000,
                'employee_pension_percent': 5.0
            },
            'bonuses': {
                'sign_on_bonus': 20000,
                'annual_bonus': 5000
            },
            'stock_grants': {
                'total_grant_value': 40000,
                'vesting_schedule': [5, 15, 40, 40]
            },
            'tax_settings': {
                'national_insurance_category': 'A'
            }
        }
        
        result = CompensationCalculator.calculate_total_tax_liability(config)
        
        # Check compensation components
        assert result['base_salary'] == 50000
        assert result['annual_bonus'] == 10000
        assert result['vested_stock'] == 2000
        assert result['total_compensation'] == 62000
        
        # Check tax calculations
        assert result['gross_income'] == 62000
        assert result['income_tax'] > 0
        assert result['national_insurance'] > 0
        assert result['net_income'] > 0
        assert result['monthly_net_income'] == result['net_income'] / 12
