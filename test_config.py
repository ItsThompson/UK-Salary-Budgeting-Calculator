import pytest
import json
import tempfile
import os
from main import ConfigManager

class TestConfigManager:
    def test_generate_example_config(self):
        """Test example config generation."""
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
            temp_path = f.name
        
        try:
            ConfigManager.generate_example_config(temp_path)
            
            with open(temp_path, 'r') as f:
                config = json.load(f)
            
            assert 'salary' in config
            assert 'bonuses' in config
            assert 'stock_grants' in config
            assert 'tax_settings' in config
            assert 'expenses' in config
            assert config['salary']['annual_salary'] == 50000
            assert config['tax_settings']['national_insurance_category'] == 'A'
        finally:
            os.unlink(temp_path)
    
    def test_load_config(self):
        """Test config loading."""
        test_config = {
            "salary": {"annual_salary": 60000},
            "bonuses": {"sign_on_bonus": 5000},
            "stock_grants": {"total_grant_value": 20000},
            "tax_settings": {"national_insurance_category": "B"},
            "expenses": {"bills": 1000}
        }
        
        with tempfile.NamedTemporaryFile(mode='w', delete=False, suffix='.json') as f:
            json.dump(test_config, f)
            temp_path = f.name
        
        try:
            loaded_config = ConfigManager.load_config(temp_path)
            assert loaded_config == test_config
        finally:
            os.unlink(temp_path)
    
    def test_validate_config_valid(self):
        """Test config validation with valid config."""
        valid_config = {
            'salary': {},
            'bonuses': {},
            'stock_grants': {},
            'tax_settings': {},
            'expenses': {}
        }
        assert ConfigManager.validate_config(valid_config) == True
    
    def test_validate_config_invalid(self):
        """Test config validation with invalid config."""
        invalid_config = {
            'salary': {},
            'bonuses': {}
        }
        assert ConfigManager.validate_config(invalid_config) == False
