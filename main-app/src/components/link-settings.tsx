import { SettingsForm } from '@/components/settings-form'

export default function LinkSettings() {
  return (
    <div className="h-full w-full p-10">
      <div className="w-full space-y-0.5 border-b pb-6 dark:border-b-zinc-800">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-zinc-500 dark:text-zinc-500">
          Manage your link settings
        </p>
      </div>
      <div className="w-full max-w-2xl py-8">
        <SettingsForm />
      </div>
    </div>
  )
}
