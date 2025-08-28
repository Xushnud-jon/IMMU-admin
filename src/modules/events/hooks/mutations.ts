import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEvents, updateEvents, deleteEvents } from "../service";

import { Notification } from "../../../utils/notification";

// CREATE
export function useCreateEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createEvents(data),
    onSuccess: (response) => {
      Notification("success", response?.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["event"] });
      }
    },
  });
}

// UPDATE
export function useUpdateEvents() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateEvents(data),
    onSuccess: (response) => {
      Notification("success", response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["event"] });
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
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["event"] });
      }
    },
  });
}
