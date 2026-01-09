import { BudgetForm } from './components/BudgetForm';
import { BudgetResults } from './components/BudgetResults';
import { useBudgetCalculation } from './hooks/useBudgetCalculator';
import type { BudgetRequest } from './types';

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
    <div className="max-w-4xl mx-auto p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">UK Salary Budget Calculator</h1>
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
