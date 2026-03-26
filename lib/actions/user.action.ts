"use server"

import { signIn, signOut } from "@/auth"
import { signInFormSchema } from "../validator"
import { isRedirectError } from "next/dist/client/components/redirect-error";

//sign in user with credentials

export async function signInWithCredentials(prevState : unknown, formData : FormData){
    try {
        const user = signInFormSchema.parse({
            email : formData.get('email'),
            password : formData.get('password')
        })
        await signIn('credentials',user);
        return {success : true, message : "Sign in successful"}
    } catch (error) {
        if(isRedirectError(error)){
            throw error;
        }
        console.error("Sign in error:", error);
        return {success : false, message : "Invalid email or password"}
    }
}

//sign out user

export async function signOutUser(){
    await signOut()
}