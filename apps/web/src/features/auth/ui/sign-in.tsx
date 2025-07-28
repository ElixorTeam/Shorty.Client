import { Button } from '@repo/ui/button'

import { signIn } from '@/shared/auth'

export function SignInButton({
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <form
      action={async () => {
        'use server'
        await signIn('keycloak')
      }}
    >
      <Button type="submit" {...props}>
        Sign up
      </Button>
    </form>
  )
}
