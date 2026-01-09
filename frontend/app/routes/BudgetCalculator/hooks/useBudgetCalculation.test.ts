import { renderHook, act } from '@testing-library/react';
import axios from 'axios';
import { useBudgetCalculation } from './useBudgetCalculator';
import type { BudgetRequest } from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useBudgetCalculation', () => {
  const mockRequest: BudgetRequest = {
    salary: { annual_salary: 50000, employee_pension_percent: 5, employer_pension_percent: 3 },
    bonuses: { sign_on_bonus: 0, annual_bonus: 0 },
    stock_grants: { total_grant_value: 0, vesting_schedule: [] },
    tax_settings: { national_insurance_category: 'A' },
    expenses: { rent: 1200 }
  };

  const mockResponse = {
    data: {
      compensation: { net_income: 40000, monthly_net_income: 3333 },
      budget: { total_expenses: 1200, remaining_for_wants_and_savings: 2133 }
    }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('handles successful calculation', async () => {
    mockedAxios.post.mockResolvedValueOnce(mockResponse);
    
    const { result } = renderHook(() => useBudgetCalculation());
    
    await act(async () => {
      await result.current.calculate(mockRequest);
    });
    
    expect(result.current.budgetData).toEqual(mockResponse.data);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('handles API errors', async () => {
    const error = new Error('API Error');
    mockedAxios.post.mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useBudgetCalculation());
    
    await act(async () => {
      try {
        await result.current.calculate(mockRequest);
      } catch (e) {
        // Expected to throw
      }
    });
    
    expect(result.current.error).toEqual(error);
    expect(result.current.isLoading).toBe(false);
  });

  it('sets loading state during calculation', async () => {
    mockedAxios.post.mockImplementation(() => new Promise(resolve => setTimeout(() => resolve(mockResponse), 100)));
    
    const { result } = renderHook(() => useBudgetCalculation());
    
    act(() => {
      result.current.calculate(mockRequest);
    });
    
    expect(result.current.isLoading).toBe(true);
  });
});
