import { useState } from "react";
import { calculateBudget } from "../api";
import type { BudgetRequest, BudgetResponse } from "../types";

export const useBudgetCalculator = () => {
  const [budgetData, setBudgetData] = useState<BudgetResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const calculate = async (data: BudgetRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await calculateBudget(data);
      setBudgetData(result);
      return result;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    calculateBudget: calculate,
    budgetData,
    isLoading,
    error,
  };
};
