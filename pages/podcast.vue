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

    <!-- Loading -->
    <div v-if="$fetchState.pending" class="grid-container grid-container__two-col">
      <div class="content content--right">
        <p>Loading Race &amp; Health Podcast Episodes...</p>
      </div>
    </div>
    <!-- Error -->
    <div v-else-if="$fetchState.error" class="grid-container grid-container__two-col">
      <div class="content content--right">
        <p>Listen to the podcast <a href="https://anchor.fm/raceandhealth">here</a>.</p>
      </div>
    </div>
    <!-- Success -->
    <div v-else v-for="(episode, index) in episodes" :key="index" class="grid-container grid-container__two-col overline episode">
      <div class="heading heading--left">
        <h2>{{ episode.title }}</h2>
        <h3>{{ episode.date }}</h3>
        <!-- <client-only> -->
          <!-- <div class="transport">
            <button v-if="isPlayingArr[episode.link]" @click="pause(episode.link)" class="play">
              <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 75 75">
                <path d="M25,75H0V0H25ZM62.5,0h-25V75h25Z"/>
              </svg>
              <span class="sr-only">Pause</span>
            </button>
            <button v-else @click="play(episode.link)" class="play">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 86.6 100">
                <polygon points="86.6 50 0 0 0 100 86.6 50"/>
              </svg>
              <span class="sr-only">Play</span>
            </button>
          </div> -->
        <!-- </client-only> -->
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
let DOMParser = require("universal-dom-parser")

  export default {
    data() {
      return {
        slug: "podcast",
        podcastRSS: "https://anchor.fm/s/47093bec/podcast/rss",
        episodes: [],
        isPlayingArr: []
      }
    },
    head() {
      return {
        title: `Race & Health | ${this.page.fields.title}`
      }
    },
    async fetch() {
      await fetch(this.podcastRSS)
        .then(response => response.text())
        .then(str => new DOMParser().parseFromString(str, "text/xml"))
        .then(data => {
          const items = Array.from(data.querySelectorAll("item"));
          items.forEach( (el, i) => {
            this.episodes[i] = {
              title: el.querySelector("title").childNodes[0].data,
              date: this.date(el.querySelector("pubDate").childNodes[0].data),
              link: el.querySelector("link").innerHTML,
              description: el.querySelector("description").childNodes[0].data,
              audio: {
                url: decodeURIComponent(el.querySelector("enclosure").getAttribute("url")),
                type: el.querySelector("enclosure").getAttribute("type")
              }
            }
            this.isPlayingArr[this.episodes[i].link] = false
          });
        });
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
      }
    },
    methods: {
      date(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' }
        let d = new Date(dateString)
        return d.toLocaleDateString(undefined, options )
      },
      play(audioRef) {
        if ( this.$refs[audioRef] ) {
          this.$refs[audioRef][0].play()
          this.isPlayingArr[audioRef] = true
        }
      },
      pause(audioRef) {
        if ( this.$refs[audioRef] ) {
          this.$refs[audioRef][0].pause()
          this.isPlayingArr[audioRef] = false
        } 
      },
      isPlaying(audioRef) {
        return isPlayingArr[audioRef]
      }
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