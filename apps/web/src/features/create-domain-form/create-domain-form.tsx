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
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { createDomainAction } from '@/entities/domain'

const createFormSchema = z.object({
  value: z.string(),
})

export default function CreateDomainForm({
  onFormSubmit,
}: {
  onFormSubmit?: () => void
}) {
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      value: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    const result = await createDomainAction({
      value: values.value,
    })

    if (!result?.data || 'failure' in result.data) {
      toast('Form error', { description: result?.data?.failure })
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['domains'] })
    if (onFormSubmit) onFormSubmit()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
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
