import client from "~/plugins/contentful"

export const state = () => ({
  pages: null
});

export const mutations = {
  updatePages: (state, pages) => {
    state.pages = pages
  }
};

export const actions = {
  async getPages({ commit }) {
    try {
      if (!client) return
      const response = await client.getEntries({
        content_type: "page"
      });
      if (response.items.length > 0) commit("updatePages", response.items);
    } catch (err) {
      console.error(err)
    }
  }
};
