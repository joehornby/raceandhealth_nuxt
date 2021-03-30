<template>
  <div class="section light">
    <div v-if="showLogo" class="grid-container grid-container__quarterly">
        <QuarterlyLogo  />
        <nav class="relpos">
          <div>
            <p class="overline overline--sm"><em>Editions</em></p>
            <ul class="editions">
              <li v-for="edition in editions">
                <nuxt-link :to="`/quarterly/${edition}`" :class="{ 'editions--current' : edition==currentEdition }">
                  {{ dateFormat(edition) }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div v-if="!mobile" class="relpos">
            <p class="overline overline--sm"><em>Categories</em></p>
            <ul>
              <li v-for="category in categories">
                <nuxt-link :to="`/quarterly/category/${category.slug}`" :class="{ 'editions--current' : category.slug==currentCategory }">
                  {{ category.label }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </nav>  
    </div>
    <div v-else class="grid-container small-margin">
      <nuxt-link :to="`/quarterly/${$route.params.date}`" class="back">&larr; Back to Quarterly</nuxt-link>
    </div>
    <transition name="quarterly">
      <NuxtChild :edition="currentEdition" :categories="categories" :key="$route.params.date" />
    </transition>
  </div>
</template>

<script>
  export default {
    head() {
      return {
        title: `Race & Health | Quarterly`
      }
    },
    data: {
      introduction: 'Introduction'
    },
    methods: {
      html(content) {
        return documentToHtmlString(content)
      },
      dateFormat(dateString) {
        let date = new Date(dateString)
        let monthYear = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' }).format(date)
        return monthYear
      },
      slugify(text) {
        return text.toString()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
      }
    },
    computed: {
      quarterly() {
        return this.$store.state.quarterly
      },
      editions() {
        return this.$store.state.quarterlyEditions
      },
      currentEdition() {
        return this.$route.params.date
      },
      otherEditions() {
        return this.editions.filter( ed => ed != this.currentEdition )
      },
      categories() {
        let label = this.quarterly.map( el => el.fields.category[0] ).filter( (val, index, el) => el.indexOf(val) === index).filter( el => el !== "Introduction" )
        return label.map( el => { return { label: el, slug: this.slugify(el) } })
      },
      currentCategory() {
        return this.$route.params.category
      },
      intro() {
        return this.$store.state.quarterly.filter( el => el.fields.date === this.currentEdition ).find( el => el.fields.category == "Introduction" )
      },
      currentArticles() {
        return this.$store.state.quarterly.filter( el => el.fields.date === this.currentEdition ).filter( el => el.fields.category != "Introduction" )
      },
      showLogo(){
        return (this.$route.path.match(/\//g) || []).length < 3
      },
      mobile() {
        return this.$mq == "sm"
      }
    }
  }
</script>

<style lang="scss" scoped>
  nav {
    font-size: 0.9rem;
    div:nth-child(2) {
      margin-top: 2rem;
    }
    ul {
      padding: 0;
      margin: 0;
      li {
        list-style: none;
      }
    }
  }
  .editions {
    &--current {
      margin: 0;
      padding: 0;
      font-family: $font-stack-bold;
      text-decoration: none;
      &:hover {
        text-decoration: none;
      }
      &::before {
        content: '\2192';
        margin-right: 1ex;
      }
    }
  }
  .back {
    font-size: 0.8em;
    z-index: 9999;
  }
  .small-margin {
    margin-bottom: -5rem;
  }
  .quarterly-order {
    display: grid;
    grid-template-areas: 
                  "logo"
                  "content"
                  "subnav";
    
  }
</style>