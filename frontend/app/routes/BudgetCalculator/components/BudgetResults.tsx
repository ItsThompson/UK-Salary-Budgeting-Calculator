import React from 'react';
import type { BudgetResponse } from '../types';

const formatCurrency = (amount: number) => `£${amount.toLocaleString('en-GB', { minimumFractionDigits: 2 })}`;

export function BudgetResults({ data }: { data: BudgetResponse }) {
  return (
    <div className="mt-8 space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Compensation Breakdown</h3>
        <div className="grid grid-cols-2 gap-4 text-gray-700">
          <div>Net Income: {formatCurrency(data.compensation.net_income)}</div>
          <div>Monthly Net: {formatCurrency(data.compensation.monthly_net_income)}</div>
        </div>
      </div>
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Budget Summary</h3>
        <div className="space-y-2 text-gray-700">
          <div>Total Expenses: {formatCurrency(data.budget.total_expenses)}</div>
          <div>Remaining: {formatCurrency(data.budget.remaining_for_wants_and_savings)}</div>
        </div>
      </div>
    </div>
  );
}
