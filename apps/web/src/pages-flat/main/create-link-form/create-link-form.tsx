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
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'
import ROUTES from '@/shared/routes'

import { useFormContext } from './create-form-context'
import createFormSchema from './create-form-scheme'
import DomainSelector from './domain-selector'
import generateUrlPath from './generate-url-path'
import SubdomainSelector from './subdomain-selector'
import { useCreateLink } from './use-create-link'

type UrlType = z.infer<typeof createFormSchema>['urls'][number]

const singleUrl: UrlType[] = [{ url: '' }]

const groupUrls: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm() {
  const { currentDomain, currentSubdomain } = useFormContext()
  const router = useRouter()
  const queryClient = useQueryClient()
  const [type, setType] = useState<string>('single')
  const { create, isPending } = useCreateLink()

  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: '',
      urls: singleUrl,
      path: generateUrlPath(),
      password: '',
    },
  })

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const shortUrl = useMemo(() => {
    const { path } = form.getValues()
    const subdomain = currentSubdomain?.value ?? ''
    const domain = currentDomain?.value ?? ''
    const protocol = domain.includes('localhost') ? 'http://' : 'https://'
    return `${protocol}${subdomain}${domain}/${path}`
  }, [form, currentDomain, currentSubdomain])

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? singleUrl : groupUrls)
    setType(value)
  }

  const onSubmit = form.handleSubmit(async (values) => {
    if (!currentDomain?.uid) return

    const payload: ApiSchemas['RecordCreateRequest'] = {
      title: values.title || '',
      urls: values.urls.map((u) => u.url),
      path: values.path,
      domainUid: currentDomain.uid,
      tags: [],
      subdomainUid: currentSubdomain?.uid,
      password: values.password || undefined,
    }

    try {
      const request = await create(payload)
      queryClient.invalidateQueries(rqClient.queryOptions('get', '/user/links'))
      router.push(`${ROUTES.LINKS}/${request?.data?.uid}`)
    } catch (error) {
      console.log(error)
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 py-2">
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
        <div className="space-y-2">
          <Label>Type</Label>
          <Tabs value={type} onValueChange={handleTypeChange}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="group">Group</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="bg-secondary dark:bg-sidebar/80 rounded-md p-4">
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
        <div className="w-full space-y-2">
          <div className="flex w-full items-center">
            <div className="w-1/3">
              <span className="text-sm leading-none font-medium">
                Subdomain
              </span>
            </div>
            <div className="w-1/3">
              <span className="text-sm leading-none font-medium">Domain</span>
            </div>
            <div className="w-1/3">
              <span className="text-sm leading-none font-medium">Path</span>
            </div>
          </div>
          <div className="flex w-full">
            <div className="w-1/3">
              <SubdomainSelector currentDomainUid={currentDomain?.uid ?? ''} />
            </div>
            <div className="w-1/3">
              <DomainSelector />
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
          <p className="text-muted-foreground text-sm">
            Final url will be {shortUrl.toString()}
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
