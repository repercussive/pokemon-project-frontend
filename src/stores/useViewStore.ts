import { View } from '@src/_types'
import { create } from 'zustand'

type ViewState = {
  currentView: View,
  setView: (view: View) => void
}

export const useViewStore = create<ViewState>((set) => ({
  currentView: 'intro',
  setView: (newView) => set(() => ({ currentView: newView }))
}))