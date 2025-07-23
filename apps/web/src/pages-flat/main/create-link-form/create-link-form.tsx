'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Label } from '@repo/ui/label'
import { cn } from '@repo/ui/lib/utils'
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group'
import { Skeleton } from '@repo/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { useQueryClient } from '@tanstack/react-query'
import { RefreshCwIcon, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'
import ROUTES from '@/shared/routes'

import createFormSchema from './create-form-scheme'
import { useCreateLink } from './use-create-link'

const generateUrlPath = (length: number = 6): string => {
  const chars = '0123456789abcdefghijklmnopqrstuvwxyz'
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, (byte) => chars[byte % chars.length]).join('')
}

type UrlType = z.infer<typeof createFormSchema>['urls'][number]
const DEFAULT_SINGLE_URL: UrlType[] = [{ url: '' }]
const DEFAULT_GROUP_URL: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [type, setType] = useState<string>('single')
  const { data: domains } = rqClient.useQuery('get', '/user/subdomains')
  const { create, isPending } = useCreateLink()

  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      urls: DEFAULT_SINGLE_URL,
      path: generateUrlPath(),
    },
  })

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? DEFAULT_SINGLE_URL : DEFAULT_GROUP_URL)
    setType(value)
  }

  useEffect(() => {
    if (!form.getValues('domain') && domains?.data?.[0])
      form.setValue('domain', domains.data[0].domainUid)
  }, [domains?.data, form])

  const onSubmit = form.handleSubmit(async (values) => {
    const payload: ApiSchemas['RecordCreateRequest'] = {
      title: values.urls
        .slice(0, 3)
        .map((item) => new URL(item.url).hostname)
        .join(', '),
      urls: values.urls.map((u) => u.url),
      path: values.path,
      domainUid: values.domain,
      tags: [],
      subdomainUid: undefined,
      password: values.password || undefined,
    }

    try {
      const request = await create(payload)
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links')
      )
      router.push(`${ROUTES.LINKS}/${request.data?.uid}`)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 pt-2 pb-4">
        <div className="space-y-2">
          <Label>Type</Label>
          <Tabs value={type} onValueChange={handleTypeChange}>
            <TabsList className="bg-secondary dark:bg-sidebar/80 grid w-full grid-cols-2">
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="bg-secondary dark:bg-sidebar/80 rounded-md px-4 py-3">
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
                      <Input {...field} className="bg-background mb-2" />
                      {type === 'group' && index >= 2 && (
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => {
                            remove(index)
                          }}
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
              onClick={() => {
                append({ url: '' })
              }}
            >
              Add URL
            </Button>
          )}
        </div>

        <FormField
          control={form.control}
          name="domain"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Domain</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  value={field.value}
                  className="flex flex-col"
                >
                  {domains?.data.map((domain) => (
                    <FormItem
                      key={domain.domainUid}
                      className="flex items-center gap-3"
                    >
                      <FormControl>
                        <RadioGroupItem value={domain.domainUid} />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {domain.domainValue}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    <span className="text-sm">
                      {
                        domains.data.find(
                          (domain) =>
                            domain.domainUid === form.getValues('domain')
                        )?.domainValue
                      }
                    </span>
                  )}
                  <span className="text-sm">/</span>
                  <Input placeholder="Enter title..." {...field} />
                  <Button
                    size="icon"
                    variant="outline"
                    type="button"
                    onClick={() => {
                      form.setValue('path', generateUrlPath())
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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password
                <span className="text-muted-foreground text-xs">
                  (Optional)
                </span>
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  autoComplete="off"
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
        <Button disabled={isPending} type="submit">
          Create
        </Button>
      </form>
    </Form>
  )
}
