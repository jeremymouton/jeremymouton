/*
 * Component: Hello
 * 
 */

<template lang="jade">
div.hello(v-bind:class="{ 'is-visible': visible, 'is-hidden': !visible }")
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