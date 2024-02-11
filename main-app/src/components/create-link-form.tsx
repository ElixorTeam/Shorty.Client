import { TrashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn, generateRandomString } from '@/lib/utils'

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(64, { message: 'Title must be no longer than 64 characters' })
    .optional()
    .or(z.literal('')),
  urls: z.array(
    z.object({
      url: z.string().url({ message: 'Please enter a valid URL.' }),
    })
  ),
  prefix: z
    .string()
    .min(2, { message: 'Prefix must be at least 2 characters' })
    .max(6, { message: 'Prefix must be no longer than 6 characters' })
    .optional()
    .or(z.literal('')),
  domain: z.string(),
  path: z
    .string()
    .min(2, { message: 'Path must be at least 2 characters' })
    .max(16, { message: 'Path must be no longer than 16 characters' })
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(2, { message: 'Password must be at least 2 characters' })
    .max(16, { message: 'Password must be no longer than 16 characters' })
    .optional()
    .or(z.literal('')),
})

type UrlType = z.infer<typeof formSchema>['urls'][number]

const singleUrl: UrlType[] = [{ url: '' }]

const groupUrls: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm() {
  const [type, setType] = useState<string>('single')
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      urls: singleUrl,
      prefix: '',
      domain: 'sh0.su',
      path: generateRandomString(),
    },
  })

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? singleUrl : groupUrls)
    setType(value)
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => console.log(values)

  const finalUrl = (): string => {
    const { prefix, domain, path } = form.getValues()
    return (prefix ? `${prefix}.` : '') + domain + (path ? `/${path}` : '')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        <Tabs value={type} onValueChange={handleTypeChange}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="single">Single</TabsTrigger>
            <TabsTrigger value="group">Group</TabsTrigger>
          </TabsList>
        </Tabs>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormDescription>
                This name will only be displayed in the application
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((url_field, index) => (
            <FormField
              control={form.control}
              key={url_field.id}
              name={`urls.${index}.url`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && 'sr-only')}>
                    URLs
                  </FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input {...field} />
                      {type === 'group' && index >= 2 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => remove(index)}
                        >
                          <TrashIcon className="mx-2 size-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          {type === 'group' && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append({ url: '' })}
            >
              Add URL
            </Button>
          )}
        </div>
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
            <div className="flex h-10 w-1/3 shrink-0 items-center justify-center border-y px-4 dark:border-y-zinc-800 dark:bg-zinc-900">
              {form.getValues().domain}
            </div>
            <FormField
              control={form.control}
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
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Final url will be {finalUrl()}
          </p>
        </div>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                The link is initially public, but if you enter a password,
                further access will require it
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  )
}
