import Viewer from '@/components/Viewer/Viewer'
import NavigationList from '@/components/Navigation/NavigationList'
import ViewerClientWrapper from '@/components/Viewer/ViewerClientWrapper'
import NavigationHeader from '@/components/Navigation/NavigationHeader'
import NavigationServerWrapper from '@/components/Navigation/NavigationServerWrapper'

export default function AppPage() {
  return (
    <div className="h-full sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <NavigationServerWrapper>
        <NavigationHeader />
        <NavigationList />
      </NavigationServerWrapper>
      <ViewerClientWrapper>
        <Viewer />
      </ViewerClientWrapper>
    </div>
  )
}
