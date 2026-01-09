import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from api import app

client = TestClient(app)

# --------------------
# Fixtures
# --------------------


@pytest.fixture
def valid_payload():
    return {
        "salary": {
            "annual_salary": 100000,
            "employee_pension_percent": 5,
            "employer_pension_percent": 3,
        },
        "bonuses": {
            "sign_on_bonus": 5000,
            "annual_bonus": 10000,
        },
        "stock_grants": {
            "total_grant_value": 20000,
            "vesting_schedule": [0.25, 0.25, 0.25, 0.25],
        },
        "tax_settings": {
            "national_insurance_category": "A",
        },
        "expenses": {
            "rent": 2000,
            "food": 500,
            "transport": 300,
        },
    }


# --------------------
# Root endpoint
# --------------------


def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "UK Salary Budgeting Calculator API"}


# --------------------
# Happy path
# --------------------


@patch("api.CompensationCalculator.calculate_total_tax_liability")
@patch("api.BudgetCalculator.calculate_budget")
def test_calculate_budget_success(mock_budget, mock_compensation,
                                  valid_payload):
    mock_compensation.return_value = {
        "annual_gross": 100000,
        "annual_tax": 30000,
        "monthly_net_income": 5833.33,
    }

    mock_budget.return_value = {
        "monthly_income": 5833.33,
        "monthly_expenses": 2800,
        "remaining": 3033.33,
    }

    response = client.post("/calculate-budget", json=valid_payload)

    assert response.status_code == 200

    body = response.json()

    assert body["compensation"]["monthly_net_income"] == 5833.33
    assert body["budget"]["remaining"] == 3033.33

    # Ensure calculators were called with correct data
    mock_compensation.assert_called_once()
    mock_budget.assert_called_once_with(
        5833.33,
        valid_payload["expenses"],
    )


# --------------------
# Pydantic validation
# --------------------


def test_negative_salary_rejected(valid_payload):
    valid_payload["salary"]["annual_salary"] = -50000

    response = client.post("/calculate-budget", json=valid_payload)

    # Pydantic validation happens before your endpoint code
    assert response.status_code == 422


def test_missing_required_field():
    payload = {
        "salary": {
            "annual_salary": 100000,
            "employee_pension_percent": 5,
            "employer_pension_percent": 3,
        },
        # bonuses missing
        "stock_grants": {},
        "tax_settings": {},
        "expenses": {},
    }

    response = client.post("/calculate-budget", json=payload)
    assert response.status_code == 422


# --------------------
# Calculator validation errors
# --------------------


@patch("api.CompensationCalculator.calculate_total_tax_liability")
def test_calculator_validation_error_returns_400(mock_compensation,
                                                 valid_payload):
    mock_compensation.side_effect = ValueError("Invalid NI category")

    response = client.post("/calculate-budget", json=valid_payload)

    assert response.status_code == 400
    body = response.json()

    assert body["detail"]["error"] == "Validation error"
    assert "Invalid NI category" in body["detail"]["details"]


# --------------------
# Internal errors
# --------------------


@patch("api.CompensationCalculator.calculate_total_tax_liability")
def test_unexpected_exception_returns_500(mock_compensation, valid_payload):
    mock_compensation.side_effect = RuntimeError("Database down")

    response = client.post("/calculate-budget", json=valid_payload)

    assert response.status_code == 500
    body = response.json()

    assert body["detail"]["error"] == "Calculation error"
    assert "Database down" in body["detail"]["details"]


# --------------------
# Expense handling
# --------------------


@patch("api.CompensationCalculator.calculate_total_tax_liability")
@patch("api.BudgetCalculator.calculate_budget")
def test_empty_expenses(mock_budget, mock_compensation, valid_payload):
    valid_payload["expenses"] = {}

    mock_compensation.return_value = {
        "monthly_net_income": 4000,
    }
    mock_budget.return_value = {
        "monthly_income": 4000,
        "monthly_expenses": 0,
        "remaining": 4000,
    }

    response = client.post("/calculate-budget", json=valid_payload)

    assert response.status_code == 200
    assert response.json()["budget"]["remaining"] == 4000
