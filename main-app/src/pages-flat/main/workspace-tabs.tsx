import { Button } from '@/shared/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import Dashboard from '@/widgets/dashboard/dashboard'
import Description from '@/widgets/description/description'
import UpdateLinkForm from '@/widgets/update-link-form'

export default function WorkspaceTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="sticky top-14 z-20 flex h-10 w-full shrink-0 items-center justify-center border-b bg-background/[.95] backdrop-blur supports-[backdrop-filter]:bg-background/[.6]">
        <TabsTrigger value="overview" asChild>
          <Button variant="link">Overview</Button>
        </TabsTrigger>
        <TabsTrigger value="settings" asChild>
          <Button variant="link">Settings</Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <div className="size-full grow space-y-4 p-8 pt-6">
          <Description />
          <Dashboard />
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <UpdateLinkForm />
      </TabsContent>
    </Tabs>
  )
}
