import { TrashIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'

import { DomainType, useGetDomains } from '@/entities/domain'
import { createLinkAction, getShortLink } from '@/entities/record'
import { SubdomainType, useGetAllSubdomains } from '@/entities/subdomain'
import SubdomainSelector, {
  SubdomainType as SelectorSubdomainType,
} from '@/features/subdomain-selector'
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

import createFormSchema from './create-form-scheme'
import generateUrlPath from './generate-url-path'

type UrlType = z.infer<typeof createFormSchema>['urls'][number]

const singleUrl: UrlType[] = [{ url: '' }]

const groupUrls: UrlType[] = [{ url: '' }, { url: '' }]

export default function CreateLinkForm({
  onFormSubmit,
}: {
  onFormSubmit?: () => void
}) {
  const subdomainStubValue = 'Unselected'
  const { toast } = useToast()
  const router = useRouter()

  const { data: domains } = useGetDomains()
  const [currentDomain] = useState<DomainType | undefined>(
    domains && domains.length > 0 ? domains[0] : undefined
  )
  const { data: subdomains } = useGetAllSubdomains(currentDomain?.uid ?? '')
  const [currentSubdomain, setCurrentSubdomain] =
    useState<SelectorSubdomainType>({
      value: subdomainStubValue.replaceAll(' ', ''),
      label: subdomainStubValue,
    })
  const [type, setType] = useState<string>('single')

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: '',
      urls: singleUrl,
      prefix: '',
      domain: currentDomain,
      path: generateUrlPath(),
      password: '',
    },
  })

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  const convertToSelectSubdomains = (
    initSubdomains: SubdomainType[]
  ): SelectorSubdomainType[] => {
    const selectorSubdomains: SelectorSubdomainType[] = initSubdomains.map(
      (item) => ({ value: item.uid, label: item.value })
    )
    selectorSubdomains.push({
      value: subdomainStubValue.replaceAll(' ', ''),
      label: subdomainStubValue,
    })
    return selectorSubdomains
  }

  const getCurrentShortUrl = () => {
    const { domain, path } = form.getValues()
    const subdomain =
      currentSubdomain.label === subdomainStubValue
        ? ''
        : currentSubdomain.label
    return getShortLink({ subdomain, domain: domain.value, path })
  }

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? singleUrl : groupUrls)
    setType(value)
  }

  const onSubmit = async (values: z.infer<typeof createFormSchema>) => {
    const res = await createLinkAction({
      domainUid: currentDomain?.uid ?? '',
      url: values.urls.length > 0 ? values.urls[0].url?.trim() : '',
      title: values.title?.trim() ?? '',
      password: values.password?.trim(),
      subdomainUid: '',
      path: values.path.trim(),
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
    router.push(`/main?linkUid=${data?.data.uid}`, { scroll: false })
    if (onFormSubmit) onFormSubmit()
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
              <span className="text-sm font-medium leading-none">
                Subdomain
              </span>
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
              render={() => (
                <FormItem className="w-1/3">
                  <FormControl>
                    <SubdomainSelector
                      currentSubdomain={currentSubdomain}
                      onCurrentSubdomainChange={setCurrentSubdomain}
                      initialSubdomains={convertToSelectSubdomains(
                        subdomains ?? []
                      )}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="-z-10 flex h-10 w-1/3 shrink-0 items-center justify-center border-y bg-muted px-4">
              {form.getValues().domain?.value}
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
          <p className="text-sm text-muted-foreground">
            Final url will be {getCurrentShortUrl()}
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
