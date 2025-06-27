import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TagType } from '@/entities/tag'

const tagStub: TagType = {
  value: 'Untagged',
  uid: uuidv4(),
}

function useTagState() {
  const [currentTag, setCurrentTag] = useState<TagType>(tagStub)

  return {
    currentTag,
    setCurrentTag,
    tagStub,
  }
}

const TagContext = createContext<ReturnType<typeof useTagState> | null>(null)

export function TagProvider({ children }: { children: React.ReactNode }) {
  return (
    <TagContext.Provider value={useTagState()}>{children}</TagContext.Provider>
  )
}

export function useTagContext() {
  const ctx = useContext(TagContext)
  if (!ctx) throw new Error('useTagContext must be used within TagProvider')
  return ctx
}
