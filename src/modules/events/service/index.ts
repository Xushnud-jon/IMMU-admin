import axiosInstance from "../../../api";
import { type ParamsType } from "../../../types";
import { type Events} from "../type";

// GET
export const getEventss = async (params: ParamsType = { search: "", limit: 10, page: 1 }) => {
    const response = await axiosInstance.get("/events", { params });
    return response?.data;
};

// CREATE
export const createEvents = async (data:Events) => {
    const response = await axiosInstance.post("/events", data);
    return response?.data;
};

// Patch
export const updateEvents = async ({ id, formData }: { id: string; formData: FormData }) => {
  const response = await axiosInstance.patch(`/events/${id}`, formData);
  return response?.data;
};

// DELETE
export const deleteEvents = async (id: string | number) => {
    const response = await axiosInstance.delete(`/events/${id}`);
    return response?.data;
};
