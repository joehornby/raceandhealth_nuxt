<template>
  <div class="section light">
    <div class="grid-container grid-container__two-col overline">
      <div class="heading heading--left">
        <h1>{{ page.fields.title }}</h1>
      </div>
      <article class="page-content content--right" v-html="richTextHtml"></article>
      <div class="content--right">
        <a v-if="page.fields.ctaUrl" :href="page.fields.ctaUrl">
          <button class="btn btn-primary icon-arrow-right">
            {{ page.fields.cta }}
          </button>
        </a>
        <nuxt-link v-if="page.fields.ctaRoute" :to="page.fields.ctaRoute">
          <button class="btn btn-primary icon-arrow-right">
            {{ page.fields.cta }}
          </button>
        </nuxt-link>
      </div>
    </div>

    
    <div v-for="(episode, index) in podcasts" :key="index" class="grid-container grid-container__two-col overline episode">
      <div class="heading heading--left">
        <h2>{{ episode.title }}</h2>
        <h3>{{ episode.date }}</h3>
        <a :href="episode.link" target="_blank" rel="noopener" noreferrer>Launch episode page &rarr;</a>
        <audio controls :ref="episode.link" style="display: block; margin-top:1rem;">
          <source
              :src="episode.audio.url"
              :type="episode.audio.type"
          />
          Your browser doesn't support this type of audio. Listen <a :href="episode.audio.url">here</a> instead.
        </audio>
      </div>
      <div class="content content--right">
        <p v-html="episode.description"></p>
      </div>

    </div>
    
  </div>
</template>

<script>
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"
import { mapGetters, mapActions } from 'vuex'


  export default {
    data() {
      return {
        slug: "podcast",
      }
    },
    head() {
      return {
        title: `Race & Health | ${this.page.fields.title}`
      }
    },
    computed: {
      page() {
        let page = this.$store.state.pages.find(
          el => el.fields.slug === this.slug
        )
        return page
      },
      richTextHtml() {
        let richTextHtml = documentToHtmlString(this.page.fields.content)
        return richTextHtml
      },
      ...mapGetters({podcasts: 'podcasts/getPodcasts'})
    },
    methods: {
      ...mapActions({
        fetchPodcasts: 'podcasts/fetchPodcasts'
      }),
    },
    created() {
      this.fetchPodcasts()
    }
  }
</script>

<style lang="scss" scoped>
  .page-content {
    & h2 {
      grid-column: 1 / span 1;
      padding-right: 1rem;
    }
    p, h3 {
      grid-column: 2 / span 1;
    }
  }
  .episode {
    margin-top: 5rem;
  }

  .hide {
    visibility: hidden;
  }

  .transport {
    margin-top: 1rem;
    display: flex;
    align-items: center;
    gap: .8rem;
    svg {
      width: 1.2rem;
    }
    
  }
  .active {
    fill: $color-green;
  }
</style>