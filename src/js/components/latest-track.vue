/*
 * Component: Latest Track
 * 
 */

<style lang="less" scoped>
  .latest-track {
    display: table;
    background: #101010;
    border-radius: 2px;
    line-height: 100%;
    text-decoration: none;
    margin: 30px auto 0;
    padding: 5px;
    text-align: left;
  }

  .latest-track-cover {
    img {
      width: 75px;
      height: auto;
    }
  }
  
  .latest-track-cover,
  .latest-track-info {
    display: table-cell;
    vertical-align: top;
  }

  .latest-track-info {
    font-size: 11px;
    line-height: 120%;
    padding: 5px 8px;
  }

  .latest-track-name {
    font-weight: bold;
  }

  .latest-track-name,
  .latest-track-artist {
    display: block;
  }

  .latest-track-date {
    display: block;
    font-size: 9px;
    margin-top: 5px;
  }
</style>

<template lang="jade">
a.latest-track(v-bind:href="feedUrl" target="_blank" title="{{trackName}} by {{trackArtist}} on Last.fm")
  div.latest-track-cover
    img(v-bind:src="albumCover" alt="")
  div.latest-track-info
    span.latest-track-name {{trackName}} 
    span.latest-track-artist by {{trackArtist}}
    span.latest-track-date {{date}}
</template>

<script>
var moment = require('moment')

var lastFmFeed = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=halibuthero&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?'

module.exports = {
  data: function() {
    return {
      feedUrl: null,
      trackName: null,
      trackArtist: null,
      date: null,
      albumCover: null
    }
  },

  created: function() {
    this.getData()
    setTimeout(this.getData(), 30000)
  },

  methods: {
    getData: function() {
      var self = this

      $.get(lastFmFeed, function(response) {
        var lastfm = response.recenttracks.track[0]

        self.feedUrl     = lastfm.url
        self.trackName   = lastfm.name
        self.trackArtist = lastfm.artist['#text']

        // Date formating
        // Returns "now playing" or time ago.
        if (typeof lastfm.date !== 'undefined') {
          self.date = 'played ' + moment.unix(lastfm.date.uts).fromNow()
        } else {
          self.date = 'now playing...'
        }

        // Set the album cover
        self.albumCover = lastfm.image[2]['#text'] || 'http://placehold.it/75x75&text=';

      }, 'jsonp');
    }
  }
}
</script>
