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
import { CheckIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { textToSha256 } from '../lib/hash'

const passwordFormScheme = z.object({
  password: z.string().min(2).max(16),
})

export function PasswordForm({
  passHash,
  onSuccess,
}: {
  passHash: string
  onSuccess?: () => void
}) {
  const form = useForm<z.infer<typeof passwordFormScheme>>({
    resolver: zodResolver(passwordFormScheme),
    defaultValues: {
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof passwordFormScheme>) => {
    if (passHash !== (await textToSha256(values.password))) {
      toast('Form error', { description: 'Wrong password' })
      return
    }
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full max-w-2xs gap-2"
      >
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter password"
                  className="bg-background h-8"
                  type="password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          variant="outline"
          size="icon"
          className="size-8 self-end"
        >
          <CheckIcon />
        </Button>
      </form>
    </Form>
  )
}
