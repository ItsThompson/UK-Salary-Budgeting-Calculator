import { axios } from "~/common/utils/axiosWrappers/axiosWrappers";

export const fetcher = async (url: string) => {
  const response = await axios.get(url);
  return response.data;
};
