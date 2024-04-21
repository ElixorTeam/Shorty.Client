'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import hash from 'object-hash'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { RedirectType } from '@/entities/redirect'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { useToast } from '@/shared/ui/use-toast'

const passwordFormScheme = z.object({
  password: z.string().min(2).max(16),
})

export default function PasswordForm({ redirect }: { redirect: RedirectType }) {
  const { toast } = useToast()
  const router = useRouter()
  const form = useForm<z.infer<typeof passwordFormScheme>>({
    resolver: zodResolver(passwordFormScheme),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = (values: z.infer<typeof passwordFormScheme>) => {
    const passwordHash = hash(values.password)

    if (passwordHash === redirect.password) {
      router.push(redirect.url)
      return
    }

    toast({ title: 'Form error', description: 'Wrong password' })
  }

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
