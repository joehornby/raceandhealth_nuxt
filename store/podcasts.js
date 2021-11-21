export const state = () => ({
  podcasts:[],
  podcastRSS: "https://anchor.fm/s/47093bec/podcast/rss",
})
export const mutations = {
  updatePodcasts: (state, podcasts) => {
    state.podcasts = podcasts
  }
}

export const actions = {
  async fetchPodcasts({ commit }) {
    await fetch("https://anchor.fm/s/47093bec/podcast/rss")
      .then(response => response.text())
      .then(str => new DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = Array.from(data.querySelectorAll("item"));
        let episodes = []
        items.forEach( (el, i) => {
          episodes[i] = {
            title: el.querySelector("title").childNodes[0].data,
            date: date(el.querySelector("pubDate").childNodes[0].data),
            link: el.querySelector("link").innerHTML,
            description: el.querySelector("description").childNodes[0].data,
            audio: {
              url: decodeURIComponent(el.querySelector("enclosure").getAttribute("url")),
              type: el.querySelector("enclosure").getAttribute("type")
            }
          }
        })
        if (episodes.length > 0) commit('updatePodcasts', episodes)
      })
  }
}

export const getters = {
  getPodcasts(state) {
    return state.podcasts
  }
}

// Utils

let DOMParser = require("universal-dom-parser")

const date = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  let d = new Date(dateString)
  return d.toLocaleDateString(undefined, options )
}