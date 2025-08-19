import { Button } from '@repo/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { cn } from '@repo/ui/lib/utils'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Control, useFieldArray } from 'react-hook-form'
import { Label } from 'recharts'
import { z } from 'zod'

import createFormSchema from '../model/create-form-scheme'

type UrlType = z.infer<typeof createFormSchema>['urls'][number]
const DEFAULT_SINGLE_URL: UrlType[] = [{ url: '' }]
const DEFAULT_GROUP_URL: UrlType[] = [{ url: '' }, { url: '' }]

export function UrlsInput({
  control,
}: {
  control: Control<z.infer<typeof createFormSchema>>
}) {
  const [type, setType] = useState<string>('single')

  const { fields, append, replace, remove } = useFieldArray({
    name: 'urls',
    control: control,
  })

  const handleTypeChange = (value: string) => {
    replace(value === 'single' ? DEFAULT_SINGLE_URL : DEFAULT_GROUP_URL)
    setType(value)
  }
  return (
    <>
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
            control={control}
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
    </>
  )
}
