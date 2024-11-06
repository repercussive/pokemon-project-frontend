import { useViewStore } from '@stores/useViewStore'
import { View } from '@src/_types'
import MainHeader from '@components/MainHeader'
import GameView from '@src/components/GameView'
import IntroView from '@src/components/IntroView'
import VictoryScreen from '@components/VictoryScreen'

const views: Record<View, React.ReactNode> = {
  intro: <IntroView />,
  game: <GameView />,
  victory: <VictoryScreen />
}

function App() {
  const currentView = useViewStore((state) => state.currentView)

  return (
    <>
      <MainHeader />
      {views[currentView]}
    </>
  )
}

export default App
