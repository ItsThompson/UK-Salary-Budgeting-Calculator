import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import BudgetCalculator from './App';
import { useBudgetCalculation } from './hooks/useBudgetCalculator';

jest.mock('./hooks/useBudgetCalculator');
const mockUseBudgetCalculation = useBudgetCalculation as jest.MockedFunction<typeof useBudgetCalculation>;

describe('BudgetCalculator', () => {
  const mockCalculate = jest.fn();
  
  const defaultMockReturn = {
    calculate: mockCalculate,
    budgetData: null,
    isLoading: false,
    error: null
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseBudgetCalculation.mockReturnValue(defaultMockReturn);
  });

  it('renders the main heading', () => {
    render(<BudgetCalculator />);
    expect(screen.getByText('UK Salary Budget Calculator')).toBeInTheDocument();
  });

  it('renders the budget form', () => {
    render(<BudgetCalculator />);
    expect(screen.getByText('Calculate Budget')).toBeInTheDocument();
  });

  it('calls calculate when form is submitted', async () => {
    const user = userEvent.setup();
    render(<BudgetCalculator />);
    
    const submitButton = screen.getByText('Calculate Budget');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(mockCalculate).toHaveBeenCalledTimes(1);
    });
  });

  it('displays error message when error occurs', () => {
    mockUseBudgetCalculation.mockReturnValue({
      ...defaultMockReturn,
      error: new Error('Test error')
    });
    
    render(<BudgetCalculator />);
    expect(screen.getByText('Error: Test error')).toBeInTheDocument();
  });

  it('displays results when budgetData is available', () => {
    const mockBudgetData = {
      compensation: {
        net_income: 40000,
        monthly_net_income: 3333,
        base_salary: 50000,
        annual_bonus: 0,
        vested_stock: 0,
        total_compensation: 50000,
        gross_income: 50000,
        income_tax: 7500,
        national_insurance: 2500,
        employee_pension: 2500
      },
      budget: {
        monthly_net_income: 3333,
        total_expenses: 1200,
        remaining_for_wants_and_savings: 2133,
        expenses_breakdown: { rent: 1200 }
      }
    };
    
    mockUseBudgetCalculation.mockReturnValue({
      ...defaultMockReturn,
      budgetData: mockBudgetData
    });
    
    render(<BudgetCalculator />);
    expect(screen.getByText('Compensation Breakdown')).toBeInTheDocument();
    expect(screen.getByText('Budget Summary')).toBeInTheDocument();
  });
});
