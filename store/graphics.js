export const state = () => ({
  circle: {
    width: 110,
    height: 110,
    bottom: -65,
    left: -85
  }
})

export const mutations = {
  moveCircle(state) {
    state.circle = {
      width: Math.random() * 20 + 30,
      bottom: Math.random() * 80 - 30,
      left: Math.random() * 40 - 40
    }
  },
  resetCircle(state) {
    state.circle = {
        width: 110,
        bottom: -65,
        left: -85
    }
  },
  setCircle(state, attributes) {
    state.circle = attributes
  }
}

export const getters = {
  getCircle: state => state.circle,
  getCircleWidth: state => state.circle.width,
  getCircleBottom: state => state.circle.bottom,
  getCircleLeft: state => state.circle.left
}