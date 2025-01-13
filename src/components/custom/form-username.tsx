"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { supabase } from "../../utils/supabase"

import { toast } from "../../hooks/use-toast"
import { Button } from "../ui/button"
import LoadingButton from "./loading-button"

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
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

export default function InputForm() {
  const [isLoading, setIsloading] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  })

  function onSubmit() {
    const { username } = form.watch()
    insertUserName(username)
  }

  async function insertUserName(username: any) {
    setIsloading(true)

    const { error } = await supabase
        .from('users')
        .insert([{ username }])
        .select()

    if (error) {
        toast({
            title: 'Ops, something went wrong!',
            description: (
                error.message ? error.details : 'Please try again later'
            ),
            variant: 'destructive'
        })

        setIsloading(false)
    } else {
        toast({
            title: 'Success add username!',
        })

        setIsloading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-72 space-y-6">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Username</FormLabel>
              <FormControl>
                <Input className="rounded-xl border-gray-600" placeholder="Type username here" {...field} />
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
