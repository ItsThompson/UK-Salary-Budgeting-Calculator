import { axios } from "~/common/utils/axiosWrappers/axiosWrappers";
import { getApiUrl } from "~/common/utils/env";
import type { BudgetRequest, BudgetResponse } from "./types";

export const calculateBudget = async (
  data: BudgetRequest,
): Promise<BudgetResponse> => {
  const response = await axios.post<BudgetResponse>(
    `${getApiUrl()}/calculate-budget`,
    data,
  );
  return response.data;
};
