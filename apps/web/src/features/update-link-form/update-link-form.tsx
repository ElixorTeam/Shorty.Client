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
import { useToast } from '@repo/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DomainType, useGetClientDomains } from '@/entities/domain'
import {
  getShortLink,
  type RecordType,
  updateLinkAction,
} from '@/entities/record'
import { SubdomainType, useGetAllSubdomains } from '@/entities/subdomain'
import { TagType, useGetAllTags } from '@/entities/tag'

import FormHeader from './form-header'
import TagSelector from './tag-selector'
import { currentTag, tagStub } from './update-form-context'
import updateFormSchema from './update-form-scheme'

export default function UpdateLinkForm({
  record,
  onFormSubmit,
}: {
  record: RecordType
  onFormSubmit?: () => void
}) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: tags } = useGetAllTags()
  const { data: domains } = useGetClientDomains()
  const { data: subdomains } = useGetAllSubdomains()

  useEffect(() => {
    const recordTag = tags?.find(
      (item: TagType) => item.value === record.tags[0]
    )
    currentTag.value =
      !recordTag || !recordTag.value ? tagStub.value : recordTag
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      title: record.title,
      tag: currentTag.value.value,
      urls: record.urls,
      prefix:
        subdomains?.find(
          (item: SubdomainType) => item.uid === record.subdomainUid
        )?.value ?? '',
      domain: domains?.find(
        (item: DomainType) => item.uid === record.domainUid
      ),
      path: record.path,
      password: record.password ?? '',
    },
  })

  const { fields } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const getCurrentShortUrl = () => {
    const { prefix, domain, path } = form.getValues()
    return getShortLink({ subdomain: prefix, domain: domain.value, path })
  }

  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    const result = await updateLinkAction({
      uid: record.uid,
      tag:
        currentTag.value.value === tagStub.value.value
          ? ''
          : currentTag.value.value,
      title: values.title,
      password: values.password,
      isEnable: true,
    })

    if (!result || !result.data || 'failure' in result.data) {
      toast({
        title: 'Form error',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    toast({
      title: 'Successfully updated',
    })
    queryClient.invalidateQueries({ queryKey: ['currentRecord'] })
    queryClient.invalidateQueries({ queryKey: ['records'] })
    if (onFormSubmit) onFormSubmit()
  }

  return (
    <div className="size-full p-5 sm:p-10">
      <FormHeader />
      <div className="w-full max-w-2xl py-4 sm:py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
            <FormField
              control={form.control}
              name="tag"
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <TagSelector />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              {fields.map((url_field, index) => (
                <FormField
                  control={form.control}
                  key={url_field.id}
                  name={`urls.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        URLs
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <div className="space-y-2">
              <Label>Short URL</Label>
              <Input value={getCurrentShortUrl()} disabled />
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
            <div className="flex w-full justify-end lg:justify-start">
              <Button type="submit">Update link</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
