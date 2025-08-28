import { useQuery } from "@tanstack/react-query";
import { getEventss } from "../service";
import { type ParamsType } from "../../../types";

export function useEvents(params: ParamsType) {
  return useQuery({
    queryKey: ["event", params],
    queryFn: () => getEventss(params),
  });
}
