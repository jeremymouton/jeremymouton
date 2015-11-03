/*
 * Component: Hello
 * 
 */

<style lang="less" scoped>
  .hi {
    display: inline-block;
    border: 1px #fff solid;
    border-radius: 2px;
    margin-top: 25px;
    transition: opacity .6s ease-in, margin .4s ease;
    opacity: 1;
    line-height: 100%;
  }

  span {
    padding: 8px 14px;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
  }

  .is-hidden {
    opacity: 0;
    margin-top: -10px;
  }
</style>

<template lang="jade">
div.hi(v-bind:class="{ 'is-visible': visible, 'is-hidden': !visible }")
  span {{ text }}
</template>

<script>
  module.exports = {
    data: function() {
      return {
        text: '',
        visible: false
      }
    },

    ready: function() {
      this.getLocation()
    },

    methods: {
      getLocation: function() {
        var self = this

        $.get('http://ipinfo.io/', function(response) {
          var zip = response.postal,
              zipPrefix = zip.substring(0, 2)

          if (zipPrefix === '92') {
            setTimeout( function() {
              self.text = 'Hi Julie'
              self.visible = true
            }, 1200)
          }
        }, 'jsonp')
      }
    }
  }
</script>