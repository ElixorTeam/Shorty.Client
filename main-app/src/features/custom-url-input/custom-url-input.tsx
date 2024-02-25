import { UseFormReturn } from 'react-hook-form'

import { FormControl, FormField, FormItem, FormMessage } from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'

type CustomUrlValues = {
  prefix?: string | undefined
  domain: string
  path?: string | undefined
}

export default function CustomUrlInput<T extends CustomUrlValues>({
  form,
}: {
  form: UseFormReturn<T>
}) {
  const getCustomUrl = () => {
    const { prefix, domain, path } = form.getValues()
    return (prefix ? `${prefix}.` : '') + domain + (path ? `/${path}` : '')
  }
  return (
    <div className="w-full space-y-2">
      <div className="flex w-full items-center">
        <div className="w-1/3">
          <span className="text-sm font-medium leading-none">Prefix</span>
        </div>
        <div className="w-1/3">
          <span className="text-sm font-medium leading-none">Domain</span>
        </div>
        <div className="w-1/3">
          <span className="text-sm font-medium leading-none">Path</span>
        </div>
      </div>
      <div className="flex w-full">
        <FormField
          control={form.control}
          /* @ts-ignore */
          name="prefix"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormControl>
                <Input {...field} className="rounded-r-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="bg-muted flex h-10 w-1/3 shrink-0 items-center justify-center border-y px-4">
          {form.getValues().domain}
        </div>
        <FormField
          control={form.control}
          /* @ts-ignore */
          name="path"
          render={({ field }) => (
            <FormItem className="w-1/3">
              <FormControl>
                <Input {...field} className="rounded-l-none" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <p className="text-muted text-sm">Final url will be {getCustomUrl()}</p>
    </div>
  )
}
