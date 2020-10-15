import client from "~/plugins/contentful"

export const state = () => ({
  pages: null,
  vision: null
});

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages
  },
  updateVision: (state, vision) => {
    state.vision = vision
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
      console.error(err)
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
      console.error(err)
    }
  }
};
