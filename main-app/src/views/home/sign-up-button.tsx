import { signIn } from '@/auth'
import { Button } from '@/shared/ui/button'

export default async function SignUpButton() {
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
