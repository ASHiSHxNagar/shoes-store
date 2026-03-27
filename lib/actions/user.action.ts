"use server"

import { signIn, signOut } from "@/auth"
import { signInFormSchema, signUpFormSchema } from "../validator"
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";

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

//sing up user

export async function signUpUser(prevState : unknown, formData : FormData){
    try {
        const user = signUpFormSchema.parse({
            name : formData.get('name'),
            email : formData.get('email'),
            password : formData.get('password'),
            confirmPassword : formData.get('confirmPassword')
        });

        const plainPassword = user.password;

        user.password = hashSync(plainPassword, 10);

        await prisma.user.create({
            data : {
                name : user.name,
                email : user.email,
                password : user.password
            }
        });

        await signIn('credentials', {
            email : user.email,
            password : plainPassword
        });
        return {success : true, message : "Sign up successful"}
    } catch (error) {
        if(isRedirectError(error)){
            throw error;
        }

        if (
            error instanceof Prisma.PrismaClientKnownRequestError &&
            error.code === "P2002" &&
            Array.isArray(error.meta?.target) &&
            error.meta.target.includes("email")
        ) {
            return {success : false, message : "User already exists with this email"}
        }

        if (error instanceof Error) {
            return {success : false, message : error.message}
        }

        return {success : false, message : "Sign up failed. Please try again."}

    }
}