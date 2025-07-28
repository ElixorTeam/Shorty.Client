import { Button } from '@repo/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Skeleton } from '@repo/ui/skeleton'
import { RefreshCwIcon } from 'lucide-react'
import { useMemo } from 'react'
import { UseFormReturn, useWatch } from 'react-hook-form'
import { z } from 'zod'

import { rqClient } from '@/shared/api'
import { generateRandomPath } from '@/shared/lib/url'

import createFormSchema from '../model/create-form-scheme'

export function PathInput({
  form,
}: Readonly<{
  form: UseFormReturn<z.infer<typeof createFormSchema>>
}>) {
  const { data: domains } = rqClient.useQuery('get', '/user/subdomains')

  const watchedDomain = useWatch({
    control: form.control,
    name: 'domain',
  })

  const selectedDomain = useMemo(() => {
    return domains?.data.find((domain) => domain.domainUid === watchedDomain)
      ?.domainValue
  }, [domains?.data, watchedDomain])

  return (
    <FormField
      control={form.control}
      name="path"
      render={({ field }) => (
        <FormItem className="gap-0.5">
          <FormLabel>Path</FormLabel>
          <FormControl>
            <div className="flex items-center gap-1.5">
              {!domains?.data || !form.getValues('domain') ? (
                <Skeleton className="h-9 w-36" />
              ) : (
                <span className="text-sm">{selectedDomain}</span>
              )}
              <span className="text-sm">/</span>
              <Input placeholder="Enter title..." {...field} />
              <Button
                size="icon"
                variant="outline"
                type="button"
                onClick={() => {
                  form.setValue('path', generateRandomPath())
                }}
              >
                <RefreshCwIcon />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
