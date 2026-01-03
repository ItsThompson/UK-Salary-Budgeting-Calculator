import json
import argparse
from pathlib import Path
from typing import Dict, Any
from budget_calculator import OutputFormatter

class ConfigManager:
    @staticmethod
    def generate_example_config(output_path: str = "example_config.json") -> None:
        """Generate an example configuration file."""
        example_config = {
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
        
        with open(output_path, 'w') as f:
            json.dump(example_config, f, indent=2)
    
    @staticmethod
    def load_config(config_path: str) -> Dict[str, Any]:
        """Load configuration from JSON file."""
        with open(config_path, 'r') as f:
            return json.load(f)
    
    @staticmethod
    def validate_config(config: Dict[str, Any]) -> bool:
        """Validate configuration structure."""
        required_sections = ['salary', 'bonuses', 'stock_grants', 'tax_settings', 'expenses']
        return all(section in config for section in required_sections)

def main():
    parser = argparse.ArgumentParser(description='UK Salary Budgeting Calculator')
    parser.add_argument('--config', type=str, help='Path to configuration file')
    parser.add_argument('--generate-example', action='store_true', 
                       help='Generate example configuration file')
    
    args = parser.parse_args()
    
    if args.generate_example:
        ConfigManager.generate_example_config()
        print("Generated example_config.json")
        return
    
    if not args.config:
        print("Please provide --config path or use --generate-example")
        return
    
    config = ConfigManager.load_config(args.config)
    if not ConfigManager.validate_config(config):
        print("Invalid configuration file")
        return
    
    # Generate and display budget report
    report = OutputFormatter.generate_report(config)
    print(report)

if __name__ == "__main__":
    main()
