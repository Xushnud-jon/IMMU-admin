
import axiosInstance from "../../../api";
import { type SignIn } from "../types";


// ======== Auth Sign-in ========
export function signIn(data:SignIn){
    return axiosInstance.post("/auth/signin",data)
}

