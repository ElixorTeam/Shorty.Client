import { TrashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { useGetDomains } from '@/entities/domain'
import { createLinkAction } from '@/entities/record'
import CustomUrlInput from '@/features/custom-url-input'
import cn from '@/shared/lib/tailwind-merge'
import { Button } from '@/shared/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form'
import { Input } from '@/shared/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import { useToast } from '@/shared/ui/use-toast'
import createFormSchema from '@/widgets/create-link-form/create-form-scheme'
import generateUrlPath from '@/widgets/create-link-form/generate-url-path'

type UrlType = z.infer<typeof createFormSchema>['urls'][number]

const singleUrl: UrlType[] = [{ url: '' }]

const groupUrls: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm({
  onFormSubmit,
}: {
  onFormSubmit: () => void
}) {
  const router = useRouter()
  const { toast } = useToast()
  const { data: domains } = useGetDomains()
  const [type, setType] = useState<string>('single')
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: '',
      urls: singleUrl,
      prefix: '',
      domain: domains && domains.length > 0 ? domains[0].value : '',
      path: generateUrlPath(),
      password: '',
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

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    const res = await createLinkAction({
      domainUid: domains && domains.length > 0 ? domains[0].uid : '',
      url: values.urls.length > 0 ? values.urls[0].url : '',
      title: values.title,
      password: values.password,
      subdomain: values.prefix,
    })

    const { data, serverError, validationErrors } = res
    if (data?.failure || serverError || validationErrors) {
      toast({
        title: 'Form error',
        description: data?.failure,
        variant: 'destructive',
      })
      return
    }
    router.push(`/main?linkUid=${data?.data?.uid}`, { scroll: false })
    onFormSubmit()
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
        <CustomUrlInput form={form} />
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
