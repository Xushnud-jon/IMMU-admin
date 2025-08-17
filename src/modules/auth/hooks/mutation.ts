import { useMutation } from "@tanstack/react-query";
import { signIn } from "../services";
import { type SignIn } from "../types";
import { saveAccessToken } from "../../../utils/token-service";
import { Notification } from "../../../utils/notification";
import { useNavigate } from "react-router-dom"; 

export function useSignInMutation() {
    const navigate = useNavigate(); 

    return useMutation({
        mutationFn: async (data: SignIn) => {
            const response = await signIn(data);
            if (response.status !== 201) {
                Notification('error', 'Sign In Failed', 'Please check your credentials.');
                throw new Error('Sign in failed');
            }
            return response;
        },
       onSuccess: (response) => {
    const token = response.data?.data?.accessToken?.token;
    if (token) {
        saveAccessToken(token);
        setTimeout(() => {
            navigate("/admin-layout");
            Notification('success', 'Sign In Successful', 'Welcome back!');
        }, 1000);
    } else {
        Notification('error', 'Invalid Response', 'No access token found.');
    }
},
        onError: (error) => {
            console.error('Sign in error:', error);
            Notification('error', error.message || 'Sign in failed.');
        },
    });
}

