'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { ChangeEvent, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import CustomUrlInput from '@/features/custom-url-input'
import TagSelector, { TagType } from '@/features/tag-selector'
import { ApiRecordType } from '@/shared/api/api-record-type'
import updateLink from '@/shared/api/update-link-action'
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
import { useToast } from '@/shared/ui/use-toast'
import FormHeader from '@/widgets/update-link-form/form-header'
import updateFormSchema from '@/widgets/update-link-form/update-form-scheme'

export default function UpdateLinkForm({ record }: { record: ApiRecordType }) {
  const [currentTag, setCurrentTag] = useState<TagType>()
  const { toast } = useToast()
  const tags = [
    {
      value: 'youtube',
      label: 'Youtube',
    },
    {
      value: 'vk',
      label: 'Vk',
    },
  ]
  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      title: record.title,
      tag: 'youtube',
      link: record.url,
      prefix: record.subdomain,
      domain: 'sh0.su',
      path: '',
      password: record.password,
    },
  })

  const onSubmit = async (values: z.infer<typeof updateFormSchema>) => {
    const res = await updateLink({
      uid: record.uid,
      title: values.title,
      password: values.password,
    })

    const { data, serverError, validationErrors } = res
    if (data?.failure || serverError || validationErrors) {
      toast({
        title: 'Form error',
        description: data?.failure,
      })
      return
    }

    toast({
      title: 'Successfully updated',
    })
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const file = e.target.files[0]
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']

    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Loading error',
        description: 'Invalid file type. Only JPEG, PNG and WEBP are allowed',
      })
      return
    }

    const img = new Image()
    img.src = URL.createObjectURL(file)
    img.onload = () => {
      if (img.width <= 256 && img.height <= 256) form.setValue('avatar', file)
      else
        toast({
          title: 'Loading error',
          description: 'The image size should be no more than 256x256',
        })
    }
  }

  const handleTagChange = (tag: TagType) => {
    setCurrentTag(tag)
    form.setValue('tag', tag.value)
  }

  return (
    <div className="size-full p-10">
      <FormHeader />
      <div className="w-full max-w-2xl py-8">
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
              render={() => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tag</FormLabel>
                  <FormControl>
                    <TagSelector
                      currentTag={currentTag}
                      onCurrentTagChange={handleTagChange}
                      initialTags={tags}
                    />
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
            <Button type="submit">Update profile</Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
