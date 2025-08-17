    import { useQuery } from "@tanstack/react-query";
    import { getCountries } from "../service";
    import  { type ParamsType } from "../../../types";

    export function useCountries(params: ParamsType) {
        return useQuery({
            queryKey: ["countries", params],
            queryFn: () => getCountries(params),
        });
    }
