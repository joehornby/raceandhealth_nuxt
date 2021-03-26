<template>
  <div class="graphics">
      <div 
        class="circle-large circle-large--accent"
        :style="circleAttrs"
        ></div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

  export default {
    computed: {
      circleAttrs() {
        return {
          '--circle-diameter': this.circle.diameter,
          '--circle-x': this.circle.x,
          '--circle-y': this.circle.y
        }
      },
      ...mapGetters({ 
        circle: "graphics/getCircle" 
      })
    },
    methods: {
      ...mapMutations({ 
        moveCircle: "graphics/moveCircle",
        resetCircle: "graphics/resetCircle"
      })
    },
    watch: {
      $route() {
        if (this.$route.path == "/") { 
          this.resetCircle() 
        } else if ((this.$route.path.match(/\//g) || []).length < 2) {
          this.moveCircle()
        } 
      }
    }
  }
</script>

<style lang="scss" scoped>
@media only screen and (min-width:$bp-med) {
  .graphics {
    position: fixed;
    top: 0; left: 0; right: 0;
    min-height: 100%;
    pointer-events: none;
    overflow:hidden;
    z-index: 0;
    .circle-large {
      transition: all 1s cubic-bezier(.79,.14,.15,.86);
      position: absolute;
      border-radius: 50%;
      width: calc(var(--circle-diameter) * 1vw);
      height: calc(var(--circle-diameter) * 1vw);
      top: 0;
      left: 0;
      transform-origin: top right;
      transform: translate3d( calc( var(--circle-x) * 1vw), calc(var(--circle-y) * 1vh), 0 );


      &--accent {
        background-color: $color-red;
      }
      &--light {
        background-color: $color-cream;
      }
      &--dark {
        background-color: $color-darkgrey;
      }
    }
    .circle-small {
      transition: all 1s cubic-bezier(.79,.14,.15,.86);
      position: absolute;
      border-radius: 50%;
      width: 40vw;
      height: 40vw;
      bottom: -20vw;
      left: 70vw;
        &--accent {
          background-color: $color-red;
        }
      }
    }
}
</style>