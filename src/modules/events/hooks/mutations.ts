import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvents, deleteEvents, updateEvents } from "../service";
import { type Events } from "../type";
import { Notification } from "../../../utils/notification";

// CREATE
export function useCreateEvents() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data: Events) => createEvents(data),
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
export function useUpdateEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) => updateEvents(data),
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
export function useDeleteEvents() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => deleteEvents(id),
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
