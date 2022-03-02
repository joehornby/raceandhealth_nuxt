<template>
  <div class="section light">
    <div class="grid-container grid-container__two-col">
      <div class="heading heading--left">
        <h1>{{ page.fields.title }}</h1>
      </div>
      <div class="content content--right">
        <p v-html="pageHtml"></p>
      </div>
    </div>
    <div class="grid-container grid-container__two-col overline" v-for="event in events" :key="event.fields.slug">
      <div class="heading heading--left">
        <h3>{{ event.fields.type }} &mdash; {{ date(event.fields.date) }}</h3>
        <h2>{{ event.fields.title }}</h2>
        <p v-if="!isPastEvent(event.fields.date)">
          {{ time(event.fields.date) }}
        </p>
        <p v-else>
          [Past Event]
        </p>
        <a :href="event.fields.buttonUrl">
          <button class="btn btn-primary icon-arrow-right">
            {{ event.fields.buttonText }}
          </button>
        </a>
      </div>
      <article class="page-content content--right" v-html="html(event.fields.description)">
      </article>
    </div>
    
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    data() {
      return {
        slug: "events"
      }
    },
    head() {
      return {
        title: `Race & Health | ${this.page.fields.title}`
      }
    },
    computed: {
      events() {
        return this.$store.state.events
      },
      page() {
        let page = this.$store.state.pages.find(
          el => el.fields.slug === this.slug
        )
        return page
      },
      pageHtml() {
        const options = {
          renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
              // render the EMBEDDED_ASSET
              return `
                <img
                  class="embedded-asset"
                  src=https://${node.data.target.fields.file.url}
                  height="auto"
                  width="100%"
                  alt="${node.data.target.fields.description}"
                />
              `
            }
          }
        }

        return documentToHtmlString(this.page.fields.content, options)

      }
    },
    methods: {
      html(doc) {
        return documentToHtmlString(doc)
      },
      date(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        let d = new Date(dateString)
        return d.toLocaleDateString(undefined, options )
      },
      time(dateString) {
        const options = { timeZoneName: 'short', hour12: false, hour: '2-digit', minute: '2-digit'  }
        let d = new Date(dateString)
        return d.toLocaleTimeString( undefined, options )
      },
      isPastEvent(dateString) {
        let today = new Date()
        let event = new Date(dateString)
        return event < today
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-content {
    margin-bottom: 5rem;
    h2 {
      grid-column: 1 / span 1;
      padding-right: 1rem;
    }
    p, h3 {
      grid-column: 2 / span 1;
    }
  }
  article h2 {
    font-size: 10px;
  }
</style>