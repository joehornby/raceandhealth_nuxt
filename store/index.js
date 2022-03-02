import client from "~/plugins/contentful"

export const state = () => ({
  pages: null,
  vision: null,
  resources: null,
  events: null,
  quarterly: null,
  quarterlyLatestEdition: null,
  quarterlyEditions: null
});

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages
  },
  updateVision: (state, vision) => {
    state.vision = vision
  },
  updateResources: (state, resources) => {
    state.resources = resources
  },
  updateEvents: (state, events) => {
    state.events = events
  },
  updateQuarterly: (state, quarterly) => {
    state.quarterly = quarterly

    state.quarterlyEditions = quarterly.map( el => el.fields.date ).filter( (val, index, el) => el.indexOf(val) === index)

    state.quarterlyLatestEdition = state.quarterlyEditions[0]

  },
  setCurrentEdition: (state, quarterlyCurrentEdition) => {
    state.quarterlyCurrentEdition = quarterlyCurrentEdition
  }
};

export const actions = {
  async getPages({ commit }) {
      if (!client) return
      await client.getEntries({
        content_type: process.env.CTF_PAGE_TYPE_ID,
        include: 10,
        order: "fields.order"
      })
      .then((pages) => {
        if (pages.items.length > 0) commit("updatePages", pages.items);
      })
      .catch (err => {
        this.$nuxt.error({ statusCode: err.sys.id, message: err.sys.message })
      })
      
  },
  async getVision({ commit }) {
      if (!client) return
      await client.getEntries({
        content_type: process.env.CTF_OURVISION_TYPE_ID,
        order: "sys.createdAt"
      })
      .then(response => {
        if (response.items.length > 0) commit("updateVision", response.items)
      })
      .catch (err => {
        this.$nuxt.error({ statusCode: err.sys.id, message: err.sys.message })
      })
  },
  async getResources({ commit }) {
    if(!client) return
    await client.getEntries({
      content_type: process.env.CTF_RESOURCES_TYPE_ID,
      include: 10,
      order: "-sys.updatedAt"
    })
    .then(response => {
      if (response.items.length > 0) commit("updateResources", response.items)
    })
    .catch (err => {
      this.$nuxt.error({ statusCode: err.sys.id, message: err.sys.message })
    })
  },
  async getEvents({ commit }) {
    if(!client) return
    await client.getEntries({
      content_type: process.env.CTF_EVENTS_TYPE_ID,
      include: 10,
      order: "-sys.createdAt",
    })
    .then(response => {
      if (response.items.length > 0) commit("updateEvents", response.items)
    })
    .catch (err => {
      this.$nuxt.error({ statusCode: err.sys.id, message: err.sys.message })
    })
  },
  async getQuarterly({ commit }) {
    if(!client) return
    await client.getEntries({
      content_type: process.env.CTF_QUARTERLY_TYPE_ID,
      include: 10,
      order: "-fields.date"
    })
    .then(response => {
      if (response.items.length > 0) commit("updateQuarterly", response.items)
    })
    .catch (err => {
      this.$nuxt.error({ statusCode: err.sys.id, message: err.sys.message })
    })
  }
};
