import { Button } from '@repo/ui/button'

import { signIn } from '@/shared/auth'

export async function SignUpButton() {
  return (
    <form
      action={async () => {
        'use server'

        await signIn('keycloak')
      }}
    >
      <Button variant="outline" type="submit">
        <span className="uppercase">Sign up</span>
      </Button>
    </form>
  )
}
