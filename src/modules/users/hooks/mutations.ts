import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUsers, updateUsers, deleteUsers } from "../service";
import { type Users } from "../type";
import { Notification } from "../../../utils/notification";

// CREATE
export function useCreateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Users) => createUsers(data),
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
export function useUpdateUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { id: string; formData: FormData }) =>
      updateUsers(data),
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
export function useDeleteUsers() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string | number) => deleteUsers(id),
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
