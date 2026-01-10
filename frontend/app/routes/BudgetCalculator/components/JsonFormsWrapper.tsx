import { JsonForms } from "@jsonforms/react";
import { vanillaRenderers, vanillaCells } from "@jsonforms/vanilla-renderers";
import { budgetSchema } from "../schemas/budgetSchema";
import { generateUISchema } from "../schemas/generateUISchema";
import type { BudgetRequest } from "../types";

interface Props {
  data: BudgetRequest;
  onChange: (data: BudgetRequest) => void;
}

export const JsonFormsWrapper = ({ data, onChange }: Props) => {
  return (
    <JsonForms
      schema={budgetSchema}
      uischema={generateUISchema()}
      data={data}
      renderers={vanillaRenderers}
      cells={vanillaCells}
      onChange={({ data: formData }) => onChange(formData as BudgetRequest)}
    />
  );
};
