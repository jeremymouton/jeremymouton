<recent-work>

  <ul>
    <li each="{ projects }">
      <h2 class="project-title"><a href="{ url }" target="_blank">{ title }</a></h2>
      <div class="recent-work-content">
        <raw content="{ body }">
      </div>
    </li>
  </ul>

  <div class="recent-work-more">
    <a class="button" href="//github.com/jeremymouton?tab=repositories" target="_blank">More on Github</a>
  </div>

  var self = this,
      projects = []

  $.ajax({
    url: opts.projects,
    dataType: 'json',
    success: function(data) {
      // Get JSON data
      // Build array of projects
      for(var key in data) {
        projects.push(data[key])
      }

      self.update({projects: projects})
      $('recent-work').addClass('is-visible')
    }
  })

</recent-work>