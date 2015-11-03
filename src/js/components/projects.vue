/*
 * Component: Projects
 * 
 */

<style lang="less" scoped>
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li { margin-bottom: 30px; }

  .project-title {
    text-decoration: none;
    display: inline-block;

    h2 {
      color: #444;
      transition: all .12s ease;
      margin-bottom: 5px;

      &:hover { color: #290a0a; }
    }
  }
</style>

<template lang="jade">
h1.page-title {{ title }}

ul
  li(v-for="(index, project) in projects")
    a(class="project-title" v-bind:href="project.url" target="_blank")
      h2 {{ project.title }}
    p {{{ project.body }}}
</template>

<script>
  var feed = './json/projects.json'

  module.exports = {
    data: function() {
      return {
        title: 'Github projects',
        projects: {}
      }
    },

    created: function() {
      this.getData()
    },

    methods: {
      getData: function() {
        var self = this

        $.ajax({
          url: feed,
          dataType: 'json',
          success: function(data) {
            self.projects = data
          }
        })
      }
    }
  }
</script>
