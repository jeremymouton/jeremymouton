<template>
  <a
    class="latest-track"
    v-show="trackName"
    :href="feedUrl"
    :title="title"
    target="_blank"
  >
    <div class="latest-track__cover" v-show="albumCover">
      <img :src="albumCover" :alt="title" width="60" height="60">
    </div>
    <div class="latest-track__info">
      <span class="latest-track__name">{{ trackName }}</span>
      <span class="latest-track__artist">by {{ trackArtist }}</span>
      <span class="latest-track__date">{{ date }}</span>
    </div>
  </a>
</template>

<script>
import $ from 'webpack-zepto'
import moment from 'moment'

const lastFmFeed = '//ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=halibuthero&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?'

export default {
  data() {
    return {
      feedUrl: null,
      trackName: null,
      trackArtist: null,
      date: null,
      albumCover: null,
    }
  },
  created() {
    this.getData()
  },
  mounted() {
    setInterval(this.getData, 15000)
  },
  computed: {
    title() {
      return `${this.trackName} by ${this.trackArtist} on Last.fm`
    },
  },
  methods: {
    getData() {
      const self = this

      $.get(lastFmFeed, (res) => {
        const lastfm = res.recenttracks.track[0]

        self.feedUrl = lastfm.url
        self.trackName = lastfm.name
        self.trackArtist = lastfm.artist['#text']

        if (typeof lastfm.date !== 'undefined') {
          self.date = `played ${moment.unix(lastfm.date.uts).fromNow()}`
        } else {
          self.date = 'now playing...'
        }

        self.albumCover = lastfm.image[2]['#text']
      }, 'jsonp')
    },
  },
}
</script>

<style lang="less">
.latest-track {
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 100%;
  text-align: left;
  text-decoration: none;
  margin: 30px auto 0;
  padding: 5px;
  width: 100%;
  max-width: 250px;
  transition: max-width .3s ease;
}

.latest-track__cover {
  img {
    width: 60px;
    height: auto;
  }
}

.latest-track__cover,
.latest-track__info {
  display: table-cell;
  vertical-align: top;
}

.latest-track__info {
  font-size: 11px;
  line-height: 120%;
  padding: 5px 8px;
  color: #787887;
}

.latest-track__name {
  font-weight: bold;
}

.latest-track__name,
.latest-track__artist {
  display: block;
}

.latest-track__date {
  display: block;
  font-size: 9px;
  margin-top: 5px;
}
</style>
