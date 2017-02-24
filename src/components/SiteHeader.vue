<template>
  <header role="banner" class="site-header">
    <div class="site-header-inner">
      <div class="site-header-title">
        <h1>
          Hi, I'm
          <span>Jeremy Mouton</span>
        </h1>
      </div>
      <p>
        I'm a frontend developer at
        <a href="//aspendigital.com/" target="_blank" title="Aspen Digital">
          <span class="icon-aspen"></span>
          <span>Aspen Digital</span>
        </a>
      </p>
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
    </div>
  </header>
</template>

<style lang="less">
@import (reference) "../assets/less/styles.less";

@aspen-color: #ffcb00;

.site-header {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 13px;
  padding: 40px 40px 0 40px;

  .icon-aspen {
    transition: all .12s ease;
    opacity: .8;
  }

  p { line-height: 1.3em; }

  a {
    text-decoration: none;

    &:hover {
      .icon-aspen {
        color: @aspen-color;
        opacity: 1;
      }
    }
  }
}


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
  margin: 30px 0;
}

.site-header-nav__item {
  display: inline-block;
  position: relative;
  margin: 0 2px;

  span + span { // hide link label
    opacity: 0;
    visibility: hidden;
    position: absolute;
    width: 0;
    height: 0;
    display: block;
  }
}
</style>
