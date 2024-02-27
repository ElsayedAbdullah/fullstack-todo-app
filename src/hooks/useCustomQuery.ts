import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axios.config";
import { AxiosRequestConfig } from "axios";

interface IProps {
  queryKey: string[];
  url: string;
  config?: AxiosRequestConfig;
}

export const useCustomQuery = ({ queryKey, url, config }: IProps) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      return await axiosInstance.get(url, config);
    },
  });
};
