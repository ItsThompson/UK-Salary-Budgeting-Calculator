import React, { useState, useEffect, lazy, Suspense } from "react";
import type { BudgetRequest } from "../types";

const JsonFormsWrapper = lazy(() =>
  import("./JsonFormsWrapper").then((m) => ({ default: m.JsonFormsWrapper })),
);

interface BudgetFormProps {
  onSubmit: (data: BudgetRequest) => void;
  isLoading?: boolean;
}

const formStyles = `
  .vertical-layout { display: flex; flex-direction: column; gap: 1rem; }
  .vertical-layout-item label { display: block; font-size: 0.875rem; font-weight: 500; color: #374151; margin-bottom: 0.25rem; }
  .vertical-layout-item input, .vertical-layout-item select { width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; font-size: 0.875rem; color: #111827; background-color: white; }
  .vertical-layout-item input:focus, .vertical-layout-item select:focus { outline: none; border-color: #3b82f6; box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2); }
  .group-layout { background: white; padding: 1rem; border-radius: 0.5rem; border: 1px solid #e5e7eb; margin-bottom: 1rem; }
  .group-layout legend, fieldset > legend { font-weight: 600; color: #1f2937 !important; margin-bottom: 0.75rem; font-size: 0.95rem; }
  .array-table-layout *, .array-control-layout *, .control label, .control span, .validation, table td, table th { color: #374151 !important; }
  .button-add, .button-delete { color: #374151 !important; cursor: pointer; padding: 0.25rem 0.5rem; border: 1px solid #d1d5db; border-radius: 0.25rem; background: white; margin: 0.25rem; }
  .button-add:hover, .button-delete:hover { background: #f3f4f6; }
`;

const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-3">
    <div className="h-10 bg-gray-200 rounded"></div>
    <div className="h-10 bg-gray-200 rounded"></div>
  </div>
);

export const BudgetForm = ({ onSubmit, isLoading }: BudgetFormProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [data, setData] = useState<BudgetRequest>({
    salary: {
      annual_salary: 50000,
      employee_pension_percent: 5,
      employer_pension_percent: 3,
    },
    bonuses: { sign_on_bonus: 0, annual_bonus: 0 },
    stock_grants: { total_grant_value: 0, vesting_schedule: [100] },
    tax_settings: { national_insurance_category: "A" },
    expenses: { rent: 1200, food: 400, transport: 200, utilities: 150 },
  });

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">
          Budget Details
        </h3>
        <style>{formStyles}</style>
        {mounted ? (
          <Suspense fallback={<LoadingSkeleton />}>
            <JsonFormsWrapper data={data} onChange={setData} />
          </Suspense>
        ) : (
          <LoadingSkeleton />
        )}
      </div>

      <button
        onClick={() => onSubmit(data)}
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Calculating..." : "Calculate Budget"}
      </button>
    </div>
  );
};
