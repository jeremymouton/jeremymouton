<blog-posts>

  <article class="post" id="{ post.slug }">
    <h1>{ post.title }</h1>
    <div class="post-meta"> 
      <time datetime="{ post.date }">{ moment(post.date).format("MM-DD-YYYY"); }</time>
    </div>
    <div class="post-content">
      <raw content="{ post.body }"></raw>
    </div>
  </article>

  <aside class="post-aside">
    <h3>All Thoughts</h3>
    <ul>
      <li each="{ posts }">
        <a href="{ slug }" onclick="{ parent.getPost }">
          { title }
          <time datetime="{ date }">{ moment(date).format("MM-DD-YYYY"); }</time>
        </a>
      </li>
    </ul>
  </aside>

  var self = this,
      sortedPosts = [],
      recent

  $.ajax({
    type: 'GET',
    url: opts.posts,
    dataType: 'json',
    success: function(data) {
      // Get JSON data
      // Build array of posts and get latest post
      for(var key in data) {
        sortedPosts.push(data[key])
      }

      // Reverse posts to get latest posts first
      sortedPosts = sortedPosts.reverse()
      recent      = sortedPosts[0]

      // Sent posts to the views
      self.update({posts: sortedPosts})

      riot.route.exec(function(slug) {
        if(slug) {
          // If there's a slug, find the post
          findPostBySlug(slug)
        } else {
          // Else fallback to the latest post
          self.update({post: recent})
        }
      })

      // Listen to URL changes
      riot.route(function(slug) {
        findPostBySlug(slug)
      })

      Prism.highlightAll()
    }
  })

  getPost(e) {
    e.preventDefault()

    // Find the post
    var post = e.item
    
    // Update the URL
    riot.route(post.slug)

    // Update the view
    self.update({post: post})

    $.scrollTo({
      endY: $('.header').height(),
      duration: 200,
      callback: function() {
        Prism.highlightAll()
      }
    })

    ga('send', 'pageview', post.slug)
  }

  function findPostBySlug(slug) {
    if(slug) {
      // Match the slug and display post
      for(var i = 0; i < sortedPosts.length; i++) {
        if(sortedPosts[i].slug === slug) {
          post = sortedPosts[i]
          self.update({post: post})
          ga('send', 'pageview', slug)
        } else {
          document.location.href='/404';
        }
      }
    } else {
      // Fallback to recent post if no slug is defined
      self.update({post: recent})
    }
  }

</blog-posts>