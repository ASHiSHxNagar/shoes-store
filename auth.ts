
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/db/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { compareSync } from "bcrypt-ts-edge";


export const config={
    pages:{
        signIn : "/sign-in",
        error : "/sign-in",
    },
     session: {
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
    },
    adapter: PrismaAdapter(prisma),
    providers: [
        // Add your authentication providers here (e.g., Google, GitHub, etc.)
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                email : {type : "email"},
                password : {type : "password"}

            },
            async authorize(credentials){
                if(!credentials) return null;
                //find user from database
                const user = await prisma.user.findFirst({
                    where : {
                        email : credentials.email as string
                    }
                })
                //check if user exists and password match
                if(user && user.password){
                    const isMatch = compareSync(credentials.password as string, user.password);

                    if(isMatch){
                        return {
                            id : user.id,
                            email : user.email,
                            name : user.name,
                            role : user.role
                        }
                    }
                }
                //return null if user not found or password mismatch
                return null;
            }
        })
    ],
    callbacks : {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async jwt({ token, user }: any) {
            if (user) {
                token.sub = user.id;
                token.role = user.role;
                token.name = user.name;
            }
            return token;
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        async session({session,user,trigger,token}:any){
            session.user.id = token.sub;
            session.user.role = token.role;
            session.user.name = token.name;

            if(trigger === "update"){
                session.user.name = user.name;
            }
            return session;
        }
    }

} satisfies NextAuthConfig

export const {handlers,auth,signIn,signOut} = NextAuth(config)