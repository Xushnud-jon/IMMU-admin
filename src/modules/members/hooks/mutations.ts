import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMembers, updateMembers, deleteMembers } from "../service";
import { type Members } from "../type";
import { Notification } from "../../../utils/notification";

// CREATE
export function useCreateMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Members) => createMembers(data),
    onSuccess: (response) => {
      Notification("success", response?.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error?.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}

// UPDATE
export function useUpdateMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateMembers(data),
    onSuccess: (response) => {
      Notification("success", response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}

// DELETE
export function useDeleteMembers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteMembers(id),
    onSuccess: (response) => {
      Notification("success", response.message);
    },
    onSettled: async (_, error) => {
      if (error) {
        Notification("error", error.message);
      } else {
        // ✅ users query invalidatsiya qilinadi
        await queryClient.invalidateQueries({ queryKey: ["users"] });
      }
    },
  });
}
