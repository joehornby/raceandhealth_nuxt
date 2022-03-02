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
    
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    data() {
      return {
        slug: this.$route.params.slug
      }
    },
    head() {
      return {
        title: `Race & Health | ${this.page.fields.title}`
      }
    },
    computed: {
      page() {
        try{
          let page = this.$store.state.pages.find(
            el => el.fields.slug === this.slug
          )
          if (page === undefined){
            throw new Error()
          }
          return page
        } catch(e) {
           this.$nuxt.error({ statusCode: 404, message: "Page not found" })
        }
      },
      richTextHtml() {
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
      },
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
</style>