<template>
  <section class="section">
    <latest-track></latest-track>
    <span class="◊">◊</span>
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

<style lang="less">
.◊ {
  display: none;

  @media (min-height: 460px) {
    text-align: center;
    display: inline-block;
    position: absolute;
    left: 50%;
    opacity: .1;
    transform: translateY(-50%);
    bottom: 10vh;
    transition: all .12s ease;
    animation: hover 2s ease-in infinite,
               glow 6s ease-in infinite;
  }

  &:hover {
    cursor: crosshair;
  }
}

@keyframes glow {
  0% { opacity: .1; }
  70% { opacity: .3; }
  100% { opacity: .1; }
}

@keyframes hover {
  0% { transform: translate3d(0, 0, 0); }
  50% { transform: translate3d(0, 4px, 0); }
  70% { transform: translate3d(0, 2px, 0); }
  100% { transform: translate3d(0, 0, 0); }
}
</style>
