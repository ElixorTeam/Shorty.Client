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
import { useQueryClient } from '@tanstack/react-query'
import { CheckIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { type ApiSchemas, rqClient } from '@/shared/api'

import { useCreateDomain } from '../api/use-create-domain'

const createFormSchema = z.object({
  value: z
    .string()
    .min(3, 'Domain must be at least 3 characters long')
    .max(32, 'Domain must be at most 32 characters long'),
})

export function CreateDomainForm({
  onFormSubmit,
}: Readonly<{
  onFormSubmit?: () => void
}>) {
  const queryClient = useQueryClient()
  const { create, isPending } = useCreateDomain()

  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      value: '',
    },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const payload: ApiSchemas['CreateDomainRequest'] = {
      value: values.value,
    }

    try {
      await create(payload)
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/domains')
      )
      onFormSubmit?.()
    } catch {
      // pass
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="flex gap-2 py-2">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter domain..."
                  className="h-8"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="self-end"
          size="sm"
          disabled={isPending}
        >
          <CheckIcon />
          Create
        </Button>
      </form>
    </Form>
  )
}
