<template>
  <div v-if="intro != undefined" class="section light">
    <div class="grid-container grid-container__two-col--thirds overline">
      <div class="heading heading--left">
        <h1 class="edition relpos">{{ dateFormat(edition) }} Edition.</h1>
      </div>
      <div class="content cols--2">
        <p class="quarterly-intro" v-html="html(intro.fields.content)"></p>
      </div>
    </div>
    <div class="grid-container cols--3 masonry">
      <div class="topic cards">
        <nuxt-link v-for="topic in currentArticles" :key="topic.fields.slug" :to="`/quarterly/${topic.fields.date}/${topic.fields.slug}`">
        <div class="card light">
          <p class="category" v-for="category in topic.fields.category">{{ category }}</p>
          <img v-if="topic.fields.image" :src="topic.fields.image.fields.file.url">
          <h2>{{ topic.fields.topic }}</h2>
          <p class="excerpt">{{ topic.fields.excerpt }}</p>
        </div>
      </nuxt-link>
      </div>
    </div>
  </div>
  <div v-else-if="currentArticles.length == 1"  class="section light">
    <div class="grid-container grid-container__two-col--thirds overline">
      <div class="heading heading--left">
        <h1 class="headline">{{ currentArticles[0].fields.topic }}</h1>
      </div>
      <div class="content cols--2">
        <p  class="quarterly-intro" v-html="html(currentArticles[0].fields.content)" ></p>
      </div>
    </div>
  </div>
  <div v-else class="section light">
    <div class="grid-container overline">
      <div class="heading heading--left">
        <h1 class="edition relpos">{{ dateFormat(edition) }} Edition.</h1>
      </div>
    </div>
    <div class="grid-container cols--2 masonry">
      <div class="topic cards">
        <nuxt-link v-for="topic in currentArticles" :key="topic.fields.slug" :to="`/quarterly/${topic.fields.date}/${topic.fields.slug}`">
        <div class="card light">
          <p class="category" v-for="category in topic.fields.category">{{ category }}</p>
          <img v-if="topic.fields.image" :src="topic.fields.image.fields.file.url">
          <h2>{{ topic.fields.topic }}</h2>
          <p class="excerpt">{{ topic.fields.excerpt }}</p>
        </div>
      </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToHtmlString } from "@contentful/rich-text-html-renderer"

  export default {
    props: ['edition'],
    scrollToTop: true,
    data() {
      return {
        slug: "quarterly",
        introduction: "Introduction"
      }
    },
    computed: {
      quarterly() {
        return this.$store.state.quarterly
      },
      intro() {
        return this.quarterly.filter( el => el.fields.date === this.edition ).find( el => el.fields.category == this.introduction )
      },
      currentArticles() {
        return this.quarterly.filter( el => el.fields.date === this.edition ).filter( el => el.fields.category != this.introduction )
      }
    },
    methods: {
      dateFormat(dateString) {
        let date = new Date(dateString)
        let monthYear = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(date)
        return monthYear
      },
      html(doc) {
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

        return documentToHtmlString(doc, options)
      }
    }
  }
</script>

<style lang="scss">
.section {
  padding-top: 13vh;
}

h1.edition {
  display: block;
}
.category {
  font-size: .8em;
  margin-bottom: 1rem;
  margin-right: 1rem;
}
  .topic.cards {
    display: block;
    .card {
      width: 100%;
      margin-bottom: 1rem;
      display: inline-block;
      img {
        margin-bottom: 1rem;
        width: 100%;
      }
      h2 {
        margin-top:0;
      }
      .excerpt {
        margin-top: 2rem;
      }
      &::before{
        content: 'Read more \2192';
      }
      &:hover {
        transform: unset;
      }
    }
  }
  .cols {
    &--2 {
      columns: 35ch 2;
      column-gap: 1rem;
    }
    &--3 {
      columns: 35ch 3;
      column-gap: 1rem;
    }
  }
  .masonry {
    display: block;
    margin-top: 5rem;
    // column-rule: 2px solid $color-darkgrey;
    break-inside: avoid;
    page-break-inside: avoid;
  }
  .title {
    // font-family: 'Noto Serif JP', serif;
    // font-size: 10rem;
    &-intro {
      height: 145ex;
    }
  }
  
  .full-width {
    width: 100%;
    max-width: 100vw;
  }
</style>