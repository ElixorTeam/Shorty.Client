import { ArrowDownIcon, CalendarDaysIcon } from '@heroicons/react/24/outline'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/button'
import { Calendar } from '@repo/ui/calendar'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/form'
import { cn } from '@repo/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { useToast } from '@repo/ui/use-toast'
import { addDays, format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const testData = [
  {
    redirectDate: new Date(),
    os: 'Windows',
    device: 'Mobile',
    isUnique: true,
  },
  {
    redirectDate: new Date(),
    os: 'Windows',
    device: 'Desktop',
    isUnique: false,
  },
]

const analyticsFormScheme = z.object({
  date: z.object({
    from: z.date(),
    to: z.date(),
  }),
})

export default function CsvGenerateForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof analyticsFormScheme>>({
    resolver: zodResolver(analyticsFormScheme),
    defaultValues: {
      date: {
        from: addDays(new Date(), -20),
        to: new Date(),
      },
    },
  })

  const onSubmit = (values: z.infer<typeof analyticsFormScheme>) => {
    console.log(values)
    toast({
      title: 'Values',
      description: `from: ${values.date.from.toString()}\nto: ${values.date.to.toString()}`,
    })
    window.open(generateCsv())
  }

  const generateCsv = (): string => {
    const headers = ['Index', 'RedirectDate', 'OS', 'Device', 'Unique']
    let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(';') + '\n'

    testData.forEach((item, index) => {
      const row = [
        index + 1,
        item.redirectDate.toISOString(), // Convert date to ISO string format
        item.os,
        item.device,
        item.isUnique,
      ].join(';')
      csvContent += row + '\n'
    })

    console.log(csvContent)
    return encodeURI(csvContent)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        id="date"
                        variant="outline"
                        className={cn(
                          'justify-start text-left font-normal sm:w-72',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarDaysIcon className="mr-2 size-4" />
                        {field.value.from ? (
                          field.value.to ? (
                            <>
                              {format(field.value.from, 'LLL dd, y')} -{' '}
                              {format(field.value.to, 'LLL dd, y')}
                            </>
                          ) : (
                            format(field.value.from, 'LLL dd, y')
                          )
                        ) : (
                          <span>Pick a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        fromMonth={addDays(new Date(), -80)}
                        toDate={new Date()}
                        defaultMonth={field.value.from}
                        selected={field.value}
                        onSelect={field.onChange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" size="icon" className="shrink-0 sm:hidden">
          <ArrowDownIcon className="size-5" />
        </Button>
        <Button type="submit" className="hidden sm:block">
          Download
        </Button>
      </form>
    </Form>
  )
}
