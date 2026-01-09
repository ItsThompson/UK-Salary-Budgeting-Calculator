import { useState } from "react";
import axios from "axios";
import type { BudgetRequest, BudgetResponse } from "../types";

const API_BASE_URL = "http://localhost:8000";

export const useBudgetCalculation = () => {
  const [budgetData, setBudgetData] = useState<BudgetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calculate = async (data: BudgetRequest): Promise<BudgetResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post<BudgetResponse>(`${API_BASE_URL}/calculate-budget`, data);
      setBudgetData(response.data);
      return response.data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    calculate,
    budgetData,
    isLoading,
    error,
  };
};
