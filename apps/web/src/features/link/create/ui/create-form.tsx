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
import { RadioGroup, RadioGroupItem } from '@repo/ui/radio-group'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { type ApiSchemas, rqClient } from '@/shared/api'
import { ROUTES } from '@/shared/consts/routes'
import { generateRandomPath } from '@/shared/lib/url'

import { useCreateLink } from '../api/use-create-link'
import createFormSchema from '../model/create-form-scheme'
import { PathInput } from './path-input'
import { UrlsInput } from './urls-input'

export function CreateLinkForm() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data: domains } = rqClient.useQuery('get', '/user/subdomains')
  const { create, isPending } = useCreateLink()

  const form = useForm({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      urls: [{ url: '' }],
      path: generateRandomPath(),
    },
  })

  useEffect(() => {
    if (!form.getValues('domain') && domains?.data[0])
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
      password: values.password === '' ? undefined : values.password,
    }

    try {
      const request = await create(payload)
      queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: request.data.uid } },
        }).queryKey,
        () => {
          return request
        }
      )
      router.push(ROUTES.LINK_DETAIL(request.data.uid))

      queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links').queryKey,
        (oldData: { data: ApiSchemas['Record'][] } | undefined) => {
          if (!oldData) return oldData
          return {
            data: [...oldData.data, request.data],
          }
        }
      )
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links')
      )
    } catch {
      // pass
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} className="space-y-6 pt-2 pb-4">
        <UrlsInput control={form.control} />
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

        <PathInput form={form} />

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
