import React, { useState, useEffect } from "react";
import type { BudgetRequest } from "../types";

interface BudgetFormProps {
  onSubmit: (data: BudgetRequest) => void;
  isLoading?: boolean;
}

export function BudgetForm({ onSubmit, isLoading }: BudgetFormProps) {
  const [isClient, setIsClient] = useState(false);
  const [JsonForms, setJsonForms] = useState<any>(null);
  const [renderers, setRenderers] = useState<any>(null);

  const [data, setData] = useState<BudgetRequest>({
    salary: {
      annual_salary: 50000,
      employee_pension_percent: 5,
      employer_pension_percent: 3
    },
    bonuses: {
      sign_on_bonus: 0,
      annual_bonus: 0
    },
    stock_grants: {
      total_grant_value: 0,
      vesting_schedule: [100]
    },
    tax_settings: {
      national_insurance_category: "A"
    },
    expenses: {
      rent: 1200,
      food: 400,
      transport: 200,
      utilities: 150
    }
  });

  useEffect(() => {
    setIsClient(true);
    Promise.all([
      import("@jsonforms/react"),
      import("@jsonforms/vanilla-renderers"),
      import("../schemas/budgetSchema"),
      import("../schemas/generateUISchema")
    ]).then(([reactModule, renderersModule, schemaModule, uiSchemaModule]) => {
      setJsonForms(() => reactModule.JsonForms);
      setRenderers({
        renderers: renderersModule.vanillaRenderers,
        cells: renderersModule.vanillaCells,
        schema: schemaModule.budgetSchema,
        uiSchema: uiSchemaModule.generateUISchema()
      });
    });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  if (!isClient || !JsonForms || !renderers || !renderers.schema) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Budget Details</h3>
        <style>{`
          .vertical-layout {
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .vertical-layout-item label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.25rem;
          }
          .vertical-layout-item input,
          .vertical-layout-item select {
            width: 100%;
            padding: 0.5rem 0.75rem;
            border: 1px solid #d1d5db;
            border-radius: 0.375rem;
            font-size: 0.875rem;
            color: #111827;
            background-color: white;
          }
          .vertical-layout-item input:focus,
          .vertical-layout-item select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
          }
          .group-layout {
            background: white;
            padding: 1rem;
            border-radius: 0.5rem;
            border: 1px solid #e5e7eb;
            margin-bottom: 1rem;
          }
          .group-layout-title,
          .group-layout legend,
          .group-layout > label,
          fieldset > legend,
          .group label:first-child {
            font-weight: 600;
            color: #1f2937 !important;
            margin-bottom: 0.75rem;
            font-size: 0.95rem;
          }
          .array-layout label,
          .array-layout span,
          .array-layout td,
          .array-layout th,
          .array-table-layout,
          .array-table-layout *,
          .array-control-layout,
          .array-control-layout *,
          table label,
          table span,
          table td,
          table th,
          .control label,
          .control span,
          .validation {
            color: #374151 !important;
          }
          .button-add,
          .button-delete {
            color: #374151 !important;
            cursor: pointer;
            padding: 0.25rem 0.5rem;
            border: 1px solid #d1d5db;
            border-radius: 0.25rem;
            background: white;
            margin: 0.25rem;
          }
          .button-add:hover,
          .button-delete:hover {
            background: #f3f4f6;
          }
        `}</style>
        <JsonForms
          schema={renderers.schema}
          uischema={renderers.uiSchema}
          data={data}
          renderers={renderers.renderers}
          cells={renderers.cells}
          onChange={({ data: formData }) => setData(formData as BudgetRequest)}
        />
      </div>
      
      <button 
        onClick={handleSubmit}
        disabled={isLoading}
        className="w-full px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? "Calculating..." : "Calculate Budget"}
      </button>
    </div>
  );
}
