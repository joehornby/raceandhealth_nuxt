import { stat } from "fs"

/* Mobile navigation */
export const state = () => ({
  sidebar: false
})

export const mutations = {
  toggleSidebar(state) {
    state.sidebar = !state.sidebar
  }
}

export const getters = {
  getSidebarState(state) {
    return state.sidebar
  }
}