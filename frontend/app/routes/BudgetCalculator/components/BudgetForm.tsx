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

  const simpleSchema = {
    type: "object",
    properties: {
      salary: {
        type: "number",
        title: "Annual Salary"
      }
    }
  };

  if (!isClient || !JsonForms || !renderers || !renderers.schema) {
    return (
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg border">
          <p className="text-gray-900">Loading form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border" style={{ color: 'black' }}>
        <style>{`
          .vertical-layout input, .vertical-layout label, .vertical-layout select {
            color: black !important;
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
        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Calculating..." : "Calculate Budget"}
      </button>
    </div>
  );
}
