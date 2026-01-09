import React from 'react';
import { BudgetForm } from './components/BudgetForm';
import { useBudgetCalculation } from './hooks/useBudgetCalculator';
import type { BudgetRequest, BudgetResponse } from './types';

const formatCurrency = (amount: number) => `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

const BudgetResults: React.FC<{ data: BudgetResponse }> = ({ data }) => (
  <div className="mt-8 space-y-6">
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Compensation Breakdown</h3>
      <div className="grid grid-cols-2 gap-4">
        <div>Net Income: {formatCurrency(data.compensation.net_income)}</div>
        <div>Monthly Net: {formatCurrency(data.compensation.monthly_net_income)}</div>
      </div>
    </div>
    <div className="bg-gray-50 p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Budget Summary</h3>
      <div className="space-y-2">
        <div>Total Expenses: {formatCurrency(data.budget.total_expenses)}</div>
        <div>Remaining: {formatCurrency(data.budget.remaining_for_wants_and_savings)}</div>
      </div>
    </div>
  </div>
);

export default function BudgetCalculator() {
  const { calculate, budgetData, isLoading, error } = useBudgetCalculation();

  const handleSubmit = async (data: BudgetRequest) => {
    try {
      await calculate(data);
    } catch (err) {
      console.error('Calculation failed:', err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">UK Salary Budget Calculator</h1>
      <BudgetForm onSubmit={handleSubmit} isLoading={isLoading} />
      {error && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {error.message}
        </div>
      )}
      {budgetData && <BudgetResults data={budgetData} />}
    </div>
  );
}
