<template>
  <a
    class="latest-track"
    v-show="trackName"
    :href="feedUrl"
    :title="title"
    target="_blank"
  >
    <div
      class="latest-track__cover"
      :class="{ 'latest-track__cover--is-spinning': !date }"
      v-show="trackCover"
    >
      <img :src="trackCover" :alt="title" width="60" height="60">
    </div>
    <div class="latest-track__info">
      <span v-show="playing" class="latest-track__date">{{ playing }}</span>
      <span class="latest-track__name">{{ trackName }}</span>
      <span class="latest-track__artist">by {{ trackArtist }}</span>
      <span v-show="date" class="latest-track__date">{{ date }}</span>
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
      trackCover: null,
      date: null,
      playing: null,
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
        self.trackCover = lastfm.image[2]['#text']

        if (typeof lastfm.date !== 'undefined') {
          self.date = `${moment.unix(lastfm.date.uts).fromNow()}`
          self.playing = 'Last listened to'
        } else {
          self.date = null
          self.playing = 'I\'m currently listening to'
        }
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
  transition: all .3s ease;

  &:hover { transform: translate3d(0, -2px, 0); }
}

.latest-track__cover {
  img {
    width: 60px;
    height: auto;
    border-radius: 3px;
    transition: all .12s ease;
  }
}

.latest-track__cover--is-spinning {
  img {
    border-radius: 100%;
    animation: spin 7s linear infinite;
  }
}

@keyframes spin {
  100% { transform: rotate(360deg); }
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
  margin: 5px 0;

  &:first-child { margin-top: 0; }
  &:last-child  { margin-bottom: 0; }
}
</style>
