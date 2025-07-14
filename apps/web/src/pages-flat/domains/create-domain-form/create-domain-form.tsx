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
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'

const createFormSchema = z.object({
  value: z.string(),
})

export default function CreateDomainForm({
  onFormSubmit,
}: {
  onFormSubmit?: () => void
}) {
  const queryClient = useQueryClient()
  const createMutation = rqClient.useMutation('post', '/domains')

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
      await createMutation.mutateAsync({ body: payload })
      queryClient.invalidateQueries(rqClient.queryOptions('get', '/domains'))
      onFormSubmit?.()
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-4 py-2">
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <Input placeholder="Enter domain..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
