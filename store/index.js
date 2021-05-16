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
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: process.env.CTF_PAGE_TYPE_ID,
        order: "fields.order"
      });
      if (response.items.length > 0) commit("updatePages", response.items);
    } catch (err) {
      return err
    }
  },
  async getVision({ commit }) {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: process.env.CTF_OURVISION_TYPE_ID,
        order: "sys.createdAt"
      });
      if (response.items.length > 0) commit("updateVision", response.items)
    } catch (err) {
      return err
    }
  },
  async getResources({ commit }) {
    try {
      if(!client) return
      const response = await client.getEntries({
        content_type: process.env.CTF_RESOURCES_TYPE_ID,
        order: "-sys.updatedAt"
      });
      if (response.items.length > 0) commit("updateResources", response.items)
    } catch (err) {
      return err
    }
  },
  async getEvents({ commit }) {
    try {
      if(!client) return
      const response = await client.getEntries({
        content_type: process.env.CTF_EVENTS_TYPE_ID,
        order: "-sys.createdAt"
      });
      if (response.items.length > 0) commit("updateEvents", response.items)
    } catch (err) {
      return err
    }
  },
  async getQuarterly({ commit }) {
    try {
      if(!client) return
      const response = await client.getEntries({
        content_type: process.env.CTF_QUARTERLY_TYPE_ID,
        order: "-fields.date"
      });
      if (response.items.length > 0) commit("updateQuarterly", response.items)
    } catch (err) {
      return err
    }
  }
};
