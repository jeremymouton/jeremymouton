<template>
  <header role="banner" class="site-header">
    <div class="site-header-inner">
      <ul class="site-header-nav">
        <li class="site-header-nav__item">
          <a href="//twitter.com/jeremymouton/" target="_blank" title="Twitter">
            <span class="icon-twitter"></span>
            <span>Twitter</span>
          </a>
        </li>
        <li class="site-header-nav__item">
          <a href="//github.com/jeremymouton/" target="_blank" title="Github">
            <span class="icon-github-circled"></span>
            <span>Github</span>
          </a>
        </li>
        <li class="site-header-nav__item">
          <a href="//linkedin.com/in/jeremymouton/" target="_blank" title="Linkedin">
            <span class="icon-linkedin"></span>
            <span>Linkedin</span>
          </a>
        </li>
      </ul>
      <div class="site-header-title">
        <h1>
          Hi, my name is
          <span>Jeremy Mouton</span>
        </h1>
      </div>
      <p>I'm a frontend web developer.</p>
      <ul class="site-header-list">
        <li class="site-header-list__item">
          <span class="icon-location"></span>
          <span>Salt Lake City, Utah</span>
        </li>
        <li class="site-header-list__item header-list__item--aspen">
          <a href="//aspendigital.com/" target="_blank" title="Aspen Digital">
            <span class="icon-aspen"></span>
            <span>Aspen Digital</span>
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: 'site-header',
}
</script>

<style lang="less">
@import (reference) "../assets/less/styles.less";

.site-header {
  padding: 40px;
  font-size: 13px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  p { line-height: 1.3em; }
}

.site-header-inner {}


/*
 * Site Header Title
 *
 */

.site-header-title {
  margin-bottom: 30px;

  h1 {
    font-size: 1.4rem;
    line-height: 120%;
    font-weight: 200;
    margin: 0;

    span {
      font-size: 2rem;
      line-height: 110%;
      display: block;
    }
  }
}


/*
 * Site Header Nav
 *
 */

.site-header-nav {
  list-style-type: none;
  padding: 0;
  margin: 0 0 30px 0;
}

.site-header-nav__item {
  display: inline-block;
  position: relative;
  margin: 0 5px;

  a { text-decoration: none; }

  span + span {
    opacity: 0;
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    display: block;
  }
}


/*
 * Site Header List
 *
 */

.site-header-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: 40px;

  @media (min-width: @screen-sm) {
    margin: 50px 0 0 0;
  }
}

.site-header-list__item {
  display: inline-block;
  margin: 0 15px;

  svg,
  span {
    display: inline-block;
    vertical-align: middle;
  }

  svg { width: 14px; }

  span { padding-left: 8px; }

  a { text-decoration: none; }
}

.site-header-list__item--aspen {
  &:hover {
    a { color: #FFC709; }

    svg path { fill: #FFC709; }
  }
}
</style>
