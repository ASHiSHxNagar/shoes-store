"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signInDefaultValue } from "@/lib/constants"
import Link from "next/link"
import { signInWithCredentials } from "@/lib/actions/user.action"
import { useActionState } from "react"
import { useFormStatus } from "react-dom"
import { useSearchParams } from "next/navigation"


const CredentialsSignInForm = () => {
  const [data,action] = useActionState(signInWithCredentials,{
    success: false,
    message : ""
  })

  const searchParams = useSearchParams();
  const callBackUrl = searchParams.get("callBackUrl") || "/";

  const SignInButton=()=>{
    const {pending} = useFormStatus();

    return (
      <Button type="submit" disabled={pending} className="w-full" variant="default">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    )
  }
  return (
    <form action={action}>
      <input type="hidden" name="callBackUrl" value={callBackUrl} />
      <div className="space-y-4">
        <div>
          <Label htmlFor="email" className="mb-1">Email :</Label>
          <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={signInDefaultValue.email} />
        </div>
        <div>
          <Label htmlFor="password" className="mb-1">Password :</Label>
          <Input id="password" name="password" type="password" required autoComplete="password" defaultValue={signInDefaultValue.password} />
        </div>

        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">
            {data.message}
          </div>
        )}


        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/sign-up" className="text-primary hover:underline" target="_self">
            Sign up
          </Link>
        </div>
      </div>
    </form>
  )
}

export default CredentialsSignInForm