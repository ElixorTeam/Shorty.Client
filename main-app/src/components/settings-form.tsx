'use client'

import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

type TagType = {
  value: string
  label: string
}

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title must be at least 2 characters' })
    .max(64, { message: 'Title must be no longer than 64 characters' }),
  avatar: z.any().optional(),
  tag: z.string(),
  link: z.string().url(),
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
})

export default function SettingsForm() {
  const [searchTag, setSearchTag] = useState<string>('')
  const [tags, setTags] = useState<TagType[]>([
    {
      value: 'youtube',
      label: 'Youtube',
    },
    {
      value: 'vk',
      label: 'Vk',
    },
  ])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: 'Youtube',
      tag: 'youtube',
      link: 'https://youtube.com',
      prefix: '',
      domain: 'sh0.su',
      path: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  const finalUrl = (): string => {
    const { prefix, domain, path } = form.getValues()
    return (prefix ? `${prefix}.` : '') + domain + (path ? `/${path}` : '')
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!validTypes.includes(file.type)) {
      alert('Недопустимый тип файла. Допускаются только JPEG, PNG и WEBP')
      return
    }

    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      if (img.width <= 256 && img.height <= 256) form.setValue('avatar', file)
      else alert('Размер изображения должен быть не более 256x256')
    }
  }

  return (
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
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Avatar</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Enter title..."
                  {...field}
                  onChange={handleFileChange}
                />
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
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Tag</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value
                        ? tags.find((tag) => tag.value === field.value)?.label
                        : 'Select language'}
                      <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput
                        value={searchTag}
                        onValueChange={setSearchTag}
                        placeholder="Search language..."
                      />
                      <CommandEmpty>No language found.</CommandEmpty>
                      <CommandGroup>
                        {searchTag.trim().length !== 0 &&
                          !tags.find(
                            (tag) =>
                              tag.value === searchTag.trim().toLowerCase()
                          ) && (
                            <CommandItem
                              value={searchTag.trim().toLowerCase()}
                              onSelect={() => {
                                const newTag = {
                                  value: searchTag.trim().toLowerCase(),
                                  label: searchTag.trim(),
                                }
                                setTags([...tags, newTag])
                                form.setValue('tag', newTag.value)
                              }}
                            >
                              <PlusCircleIcon className="mr-2 size-4" />
                              {searchTag.trim()}
                            </CommandItem>
                          )}
                        {tags.map((tag) => (
                          <CommandItem
                            value={tag.label}
                            key={tag.value}
                            onSelect={() => {
                              form.setValue('tag', tag.value)
                            }}
                          >
                            <CheckIcon
                              className={cn(
                                'mr-2 h-4 w-4',
                                tag.value === field.value
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              )}
                            />
                            {tag.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input {...field} disabled />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
                <FormItem className="z-10 w-1/3">
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
        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  )
}
