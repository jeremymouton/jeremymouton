/*
 * Component: Projects
 * 
 */

<template lang="jade">
h1.page-title {{ title }}

ul.projects
  li.projects__item(v-for="(index, project) in projects")
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
