import { Button } from '@repo/ui/button'

import { signOut } from '@/shared/auth'

export function SignOutButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signOut()
      }}
    >
      <Button type="submit" {...props} />
    </form>
  )
}
