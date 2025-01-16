"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { supabase } from "../../utils/supabase"

import { toast } from "../../hooks/use-toast"
import LoadingButton from "./loading-button"
import { hashPassword, verifyPassword } from "../../utils/bcrypt"
import { useLocation } from 'react-router-dom';

import {
  Form,
  FormControl,
//   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
})

export default function InputForm() {
  const [isLoading, setIsloading] = useState(false)
  const location = useLocation()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  async function onSubmit() {
    const currentPath: any = location.pathname

    const { email, password } = form.watch()
    
    if (currentPath.includes('login')) {
      await loginUser(email, password)
    } else {
      await registerUser(email, password)
    }
  }

  async function registerUser(email: string, password: string) {
    setIsloading(true)

    const hashedPassword = await hashPassword(password)
    
    const { error } = await supabase
        .from('users')
        .insert([{ email, password: hashedPassword }])
        .select()

    if (error) {
        toast({
            title: 'Ops, something went wrong!',
            description: (
                error.message ? error.details : 'Please try again later'
            ),
            variant: 'destructive'
        })
    } else {
        toast({
            title: 'Success add user!',
        })
    }

    setIsloading(false)
  }

  async function loginUser(email: string, password: string) {
    setIsloading(true)

    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)

    if (error) {
      console.error('Error fetching user:', error);
      return null;
    }

    const userData = data[0]

    const isMatch = await verifyPassword(password, userData.password)

    setIsloading(false)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Email</FormLabel>
              <FormControl>
                <Input type="email" className="rounded-xl border-gray-600" placeholder="Type email here" {...field} />
              </FormControl>
              {/* <FormDescription> */}
                {/* This is your public display name. */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Password</FormLabel>
              <FormControl>
                <Input type="password" className="rounded-xl border-gray-600" placeholder="Type password here" {...field} />
              </FormControl>
              {/* <FormDescription> */}
                {/* This is your public display name. */}
              {/* </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        
        <LoadingButton isLoading={isLoading} onClick={onSubmit}>
            {isLoading ? "Processing..." : "Submit"}
        </LoadingButton>
      </form>
    </Form>
  )
}
