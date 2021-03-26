<template>
  <div class="section light">
    <div class="grid-container grid-container__quarterly">
        <QuarterlyLogo />
        <nav class="relpos">
          <div>
            <p class="overline overline--sm"><em>Editions</em></p>
            <ul class="editions">
              <li v-for="edition in editions">
                <p v-if="edition==currentEdition" class="editions--current">{{ dateFormat(edition) }}</p>
                <nuxt-link v-else :to="`/quarterly/${edition}`">
                  {{ dateFormat(edition) }}
                </nuxt-link>
              </li>
            </ul>
          </div>
          <div class="relpos">
            <p class="overline overline--sm"><em>Categories</em></p>
            <ul>
              <li v-for="category in categories">
                <nuxt-link :to="`/quarterly/category/${category.slug}`">
                  {{ category.label }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </nav>   
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
        title: `Race & Health | Quarterly | ${this.dateFormat(this.currentEdition)}`
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
        if (this.$route.params.date){
          return this.$route.params.date
        }
        return this.$store.state.quarterlyLatestEdition
      },
      otherEditions() {
        return this.editions.filter( ed => ed != this.currentEdition )
      },
      categories() {
        let label = this.quarterly.map( el => el.fields.category[0] ).filter( (val, index, el) => el.indexOf(val) === index).filter( el => el !== "Introduction" )
        console.log(label)
        return label.map( el => { return { label: el, slug: this.slugify(el) } })

      },
      intro() {
        return this.$store.state.quarterly.filter( el => el.fields.date === this.currentEdition ).find( el => el.fields.category == "Introduction" )
      },
      currentArticles() {
        return this.$store.state.quarterly.filter( el => el.fields.date === this.currentEdition ).filter( el => el.fields.category != "Introduction" )
      }
    }
  }
</script>

<style lang="scss" scoped>
  nav {
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
      &::before {
        content: '\2192';
        margin-right: 1ex;
      }
    }
  }
  a.back {
    margin-bottom: 2rem;
    z-index: 9999;
  }
</style>