export const state = () => ({
  circle: {
    diameter: 110,
    x: -70,
    y: 60
  },
  options: {
    d: [ 90, 95, 110, 90, 45 ],
    x: [ 70, 65, -80, -65, -15 ],
    y: [ 70, -65, -85, 75, -10 ]
  },
  idx: 0
})

export const mutations = {
  moveCircle(state) {
    state.circle = {
      diameter: state.options.d[state.idx],
      x: state.options.x[state.idx],
      y: state.options.y[state.idx]
    }
    if( ++state.idx >= state.options.x.length) {
      state.idx = 0  
    }
  },
  resetCircle(state) {
    state.circle = {
      diameter: 110,
      x: -70,
      y: 60
    }
  },
  setCircle(state, attributes) {
    state.circle = attributes
  }
}

export const getters = {
  getCircle: state => state.circle,
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

