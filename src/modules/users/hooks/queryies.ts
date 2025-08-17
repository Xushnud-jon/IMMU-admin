import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../service";
import { type ParamsType } from "../../../types";

export function useUsers(params: ParamsType) {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
}
