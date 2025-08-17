import axiosInstance from "../../../api";
import { type ParamsType } from "../../../types";
import { type Users} from "../type";

// GET
export const getUsers = async (params: ParamsType = { search: "", limit: 10, page: 1 }) => {
    const response = await axiosInstance.get("/users", { params });
    return response?.data;
};

// CREATE
export const createUsers = async (data: Users) => {
    const response = await axiosInstance.post("/users", data);
    return response?.data;
};

// Patch
export const updateUsers = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.patch(`/users/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteUsers = async (id: string | number) => {
    const response = await axiosInstance.delete(`/users/${id}`);
    return response?.data;
};
