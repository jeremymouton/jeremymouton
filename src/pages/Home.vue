<template>
  <section class="section">
    <latest-track></latest-track>
  </section>
</template>

<script>
import LatestTrack from '../components/LatestTrack'

export default {
  name: 'home',
  components: {
    LatestTrack,
  },
}
</script>
