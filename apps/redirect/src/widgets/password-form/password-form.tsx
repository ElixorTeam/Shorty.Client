'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import hash from 'object-hash'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RedirectType, RedirectTypesEnum } from '@/entities/redirect'

import GroupRecordView from '../group-record-view'

const passwordFormScheme = z.object({
  password: z.string().min(2).max(16),
})

export default function PasswordForm({ redirect }: { redirect: RedirectType }) {
  const router = useRouter()
  const form = useForm<z.infer<typeof passwordFormScheme>>({
    resolver: zodResolver(passwordFormScheme),
    defaultValues: {
      password: '',
    },
  })
  const [isCompleted, setIsCompleted] = useState(false)

  const onSubmit = (values: z.infer<typeof passwordFormScheme>) => {
    const passwordHash = hash(values.password)

    if (passwordHash === redirect.password) {
      if (redirect.type == RedirectTypesEnum.SINGLE)
        router.push(redirect.urls[0] ?? '/')
      else setIsCompleted(true)
      return
    }

    toast('Form error', { description: 'Wrong password' })
  }

  if (isCompleted && redirect.type == RedirectTypesEnum.GROUP)
    return <GroupRecordView urls={redirect.urls} />

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="w-full max-w-sm overflow-hidden rounded-md border p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
