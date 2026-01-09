import React from "react";
import { JsonForms } from "@jsonforms/react";
import {
  materialRenderers,
  materialCells,
} from "@jsonforms/material-renderers";
import { useForm } from "react-hook-form";
import { budgetSchema } from "../schemas/budgetSchema";
import { generateUISchema } from "../schemas/generateUISchema";
import type { BudgetRequest } from "../types";

interface BudgetFormProps {
  onSubmit: (data: BudgetRequest) => void;
  isLoading?: boolean;
}

const defaultData: BudgetRequest = {
  salary: {
    annual_salary: 50000,
    employee_pension_percent: 5,
    employer_pension_percent: 3,
  },
  bonuses: {
    sign_on_bonus: 0,
    annual_bonus: 0,
  },
  stock_grants: {
    total_grant_value: 0,
    vesting_schedule: [25, 25, 25, 25],
  },
  tax_settings: {
    national_insurance_category: "A",
  },
  expenses: {
    rent: 1200,
    food: 400,
    transport: 200,
    utilities: 150,
  },
};

export const BudgetForm: React.FC<BudgetFormProps> = ({
  onSubmit,
  isLoading = false,
}) => {
  const { handleSubmit } = useForm<BudgetRequest>();
  const [data, setData] = React.useState<BudgetRequest>(defaultData);

  const handleFormSubmit = handleSubmit(() => {
    onSubmit(data);
  });

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <JsonForms
        schema={budgetSchema}
        uischema={generateUISchema()}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? "Calculating..." : "Calculate Budget"}
      </button>
    </form>
  );
};
