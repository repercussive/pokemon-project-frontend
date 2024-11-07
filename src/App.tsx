import { useViewStore } from '@stores/useViewStore'
import { View } from '@src/_types'
import MainHeader from '@components/MainHeader'
import GameView from '@src/components/GameView'
import IntroView from '@src/components/IntroView'
import VictoryView from '@components/VictoryView'

const views: Record<View, React.ReactNode> = {
  intro: <IntroView />,
  game: <GameView />,
  victory: <VictoryView />
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
