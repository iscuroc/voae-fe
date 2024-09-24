import axiosInstance, { useAxios } from "../axiosInstance";

export interface organizations {
  id: number;
  name: string;
}

export const obtenerLasOrganizaciones = async (): Promise<organizations[]> => {
  const response = await axiosInstance.get("/organizations");
  return response.data;
};

export const useGetOrganizationsQuery = () => {
  const response = useAxios<organizations[]>({
    url: `/organizations`,
  });
  return response;
};
