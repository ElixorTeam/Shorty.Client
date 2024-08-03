import { signal } from '@preact-signals/safe-react'
import { v4 as uuidv4 } from 'uuid'

import { TagType } from '@/entities/tag'

export const tagStub = signal<TagType>({
  value: 'Untagged',
  uid: uuidv4(),
})

export const currentTag = signal<TagType>(tagStub.value)
