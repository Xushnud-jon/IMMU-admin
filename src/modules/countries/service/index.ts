import axiosInstance from "../../../api";
import { type ParamsType } from "../../../types";
import { type Country } from "../type";

// GET
export const getCountries = async (params: ParamsType = { search: "", limit: 10, page: 1 }) => {
    const response = await axiosInstance.get("/countries", { params });
    return response?.data;
};

// CREATE
export const createCountry = async (data: Country) => {
    const response = await axiosInstance.post("/countries", data);
    return response?.data;
};

// UPDATE
export const updateCountry = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.patch(`/countries/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteCountry = async (id: string | number) => {
    const response = await axiosInstance.delete(`/countries/${id}`);
    return response?.data;
};
