import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCountry, deleteCountry, updateCountry } from "../service";
import { type Country } from "../type";
import { Notification } from "../../../utils/notification";

// CREATE
export function useCreateCountry() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Country) => createCountry(data),
        onSuccess: (response) => {
            Notification("success", response?.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error?.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["countries"] });
            }
        }
    });
}

// UPDATE
export function useUpdateCountry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) => updateCountry(data),
    onSuccess: (response) => {
      Notification("success", response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error.message);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["countries"] });
      }
    },
  });
}

// DELETE
export function useDeleteCountry() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteCountry(id),
        onSuccess: (response) => {
            Notification("success", response.message);
        },
        onSettled: async (_, error) => {
            if (error) {
                Notification("error", error.message);
            } else {
                await queryClient.invalidateQueries({ queryKey: ["countries"] });
            }
        }
    });
}
