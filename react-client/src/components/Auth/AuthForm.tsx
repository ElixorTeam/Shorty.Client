'use client'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import EmailForm from './EmailForm'
import PinForm from './PinForm'

type FormData = {
  email: string
}

export default function LoginPage({
  translate
}: {
  translate: { [key: string]: string }
}) {
  const [isPinForm, togglePinForm] = useState(true)
  const [email, setEmail] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const handleEmail = (data: FormData) => {
    setEmail(data.email)
    togglePinForm(true)
  }

  const handlePin = (pin: string) => {
    console.log(`Email: ${email}, Pin: ${pin}`)
  }
  return isPinForm ? (
    // @ts-ignore
    <PinForm onSubmit={handlePin} translate={translate} />
  ) : (
    <EmailForm onSubmit={handleEmail} translate={translate} />
  )
}
