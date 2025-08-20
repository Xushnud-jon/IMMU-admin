    import { useQuery } from "@tanstack/react-query";
    import { getEvents } from "../service";
    import  { type ParamsType } from "../../../types";

    export function useEvents(params: ParamsType) {
        return useQuery({
            queryKey: ["countries", params],
            queryFn: () => getEvents(params),
        });
    }
