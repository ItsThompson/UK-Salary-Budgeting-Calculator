from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, validator
from typing import Dict, List
from equity_calculator import CompensationCalculator
from budget_calculator import BudgetCalculator

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SalaryConfig(BaseModel):
    annual_salary: float
    employee_pension_percent: float
    employer_pension_percent: float
    
    @validator('annual_salary')
    def salary_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError('annual_salary must be positive')
        return v

class BonusConfig(BaseModel):
    sign_on_bonus: float = 0
    annual_bonus: float = 0

class StockConfig(BaseModel):
    total_grant_value: float = 0
    vesting_schedule: List[float] = []

class TaxConfig(BaseModel):
    national_insurance_category: str = "A"

class BudgetRequest(BaseModel):
    salary: SalaryConfig
    bonuses: BonusConfig
    stock_grants: StockConfig
    tax_settings: TaxConfig
    expenses: Dict[str, float]

@app.get("/")
def read_root():
    return {"message": "UK Salary Budgeting Calculator API"}

@app.post("/calculate-budget")
def calculate_budget(request: BudgetRequest):
    try:
        # Convert to dict format expected by existing calculator
        config = {
            "salary": request.salary.dict(),
            "bonuses": request.bonuses.dict(),
            "stock_grants": request.stock_grants.dict(),
            "tax_settings": request.tax_settings.dict(),
            "expenses": request.expenses
        }
        
        # Calculate compensation and taxes
        compensation_result = CompensationCalculator.calculate_total_tax_liability(config)
        
        # Calculate budget
        budget_result = BudgetCalculator.calculate_budget(
            compensation_result['monthly_net_income'],
            config['expenses']
        )
        
        return {
            "compensation": compensation_result,
            "budget": budget_result
        }
        
    except ValueError as e:
        raise HTTPException(status_code=400, detail={"error": "Validation error", "details": str(e)})
    except Exception as e:
        raise HTTPException(status_code=500, detail={"error": "Calculation error", "details": str(e)})
