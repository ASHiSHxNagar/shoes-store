"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUpDefaultValue } from "@/lib/constants"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { SignUpFormSchemaType } from "@/types"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { signUpFormSchema } from "@/lib/validator"
import { signUpUser } from "@/lib/actions/user.action"
import { useState } from "react"
import { isRedirectError } from "next/dist/client/components/redirect-error"
import { useRouter } from "next/navigation"


const SignUpForm = () => {
 

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl") || "/";
  const [actionError, setActionError] = useState<string | null>(null);
  const router = useRouter();

  const { register, handleSubmit,formState : {errors, isSubmitting}} = useForm<SignUpFormSchemaType>({
    resolver :  zodResolver(signUpFormSchema),
    defaultValues : signUpDefaultValue
    });

    const onSubmit = async (data : SignUpFormSchemaType)=>{
        try {
            const formData = new FormData();
            formData.append('name', data.name);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('confirmPassword', data.confirmPassword);

            const response = await signUpUser(null, formData);

            if(response.success){
                console.log(response.message);
            }else{
                setActionError(response.message);
            }
        } catch (error) {
            console.error("Sign up error:", error);
            if(isRedirectError(error)){
              router.refresh()
            }
            setActionError("An unexpected error occurred. Please try again later.");
        }
    }

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" name="callBackUrl" value={callBackUrl} />
     <div>
          <Label htmlFor="name" className="mb-1">Name :</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <Label htmlFor="email" className="mb-1">Email :</Label>
          <Input id="email" {...register("email")} />
          {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}

        </div>
        <div>
          <Label htmlFor="password" className="mb-1">Password :</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
        </div>
        <div>
          <Label htmlFor="confirmPassword" className="mb-1">Confirm Password :</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>}
        </div>
        <div>
            <Button type="submit" className="w-full rounded-2xl" disabled={isSubmitting}>
                {isSubmitting ? "Signing Up..." : "Sign Up"}
            </Button>
        </div>

        {actionError && (
          <div className=" text-center text-sm text-red-500 mt-1">
            {actionError}
          </div>
        )}

        <div className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline" target="_self">
            Sign in
          </Link>
        </div>
    </form>
  )
}

export default SignUpForm;