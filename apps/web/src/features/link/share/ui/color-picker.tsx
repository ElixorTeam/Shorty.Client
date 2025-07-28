'use client'

import { Button } from '@repo/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'

export function ColorPicker({
  value,
  onValueChange,
  ...props
}: {
  value: string
  onValueChange: (color: string) => void
} & React.ComponentProps<typeof Button>) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => {
            setOpen(true)
          }}
          style={{ backgroundColor: value }}
          {...props}
        />
      </PopoverTrigger>
      <PopoverContent className="w-full">
        <HexColorPicker color={value} onChange={onValueChange} />
      </PopoverContent>
    </Popover>
  )
}
