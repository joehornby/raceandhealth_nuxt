<template>
  <div class="section light">
    <div class="grid-container">
      <h1>{{ page.fields.title }}</h1>
    </div>
    <div class="grid-container grid-container__two-col overline" v-for="event in events" :key="event.fields.slug">
      <div class="heading heading--left">
        <p v-html="pageHtml"></p>
        <h3>{{ event.fields.type }} &mdash; {{ date(event.fields.date) }}</h3>
        <h1>{{ event.fields.title }}</h1>
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
        let richTextHtml = documentToHtmlString(this.page.fields.content)
        return richTextHtml
      }
    },
    mounted() {
      this.$store.commit('graphics/setCircle',
        {
          width: 120,
          bottom: -110,
          left: 50
        })
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
        return event.getDate() < today.getDate()
      }
    }
  }
</script>

<style lang="scss" scoped>
  .page-content {
    margin-bottom: 5rem;
    & h2 {
      grid-column: 1 / span 1;
      padding-right: 1rem;
    }
    p, h3 {
      grid-column: 2 / span 1;
    }
  } 
</style>