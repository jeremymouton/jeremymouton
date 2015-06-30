---
title: On building a site with Gulp and Riot
slug: on-building-a-static-site-with-gulp-and-riot
date: 2015-06-29 22:00
---

*I have redesigned my personal site for the nth time now, and finally decided to include a blog. It will allow me to post on topics more or less related to web development and help me document some of the tricks I learn and have learned during my couple of years as a frontend web developer. I plan on keeping entries fairly short, with this first post being an exception.*

---

I wanted to use this first post as an opportunity to explain how I built this website and why I chose to set it up the way I did.

The content and pages of this website are generated into static files using a set of [Gulp](//gulpjs.com/) tasks and then displayed on the frontend using [Riot](//muut.com/riotjs/).


## Gulp

Gulp handles the "backend" side of the website. It is a javascript tool used to automate tasks. For this website, it is configured to build templates, process assets, and create JSON data for posts and projects.

This is the gulp task used to generate JSON data from blog posts originally written in markdown:

<pre class="language-javascript">
<code>
  var gulp     = require('gulp'),
      gutil    = require('gulp-util'),
      markdown = require('gulp-markdown-to-json');

  gulp.task('posts', function() {
    return gulp
      .src(paths.posts + '/*.md')
      .pipe(gutil.buffer())
      .pipe(markdown('posts.json'))
      .pipe(gulp.dest(paths.destination + '/json'));
  });
</code>
</pre>

The task loops through the posts folder looking for markdown files, queues them, and turns them into a single JSON file ready to be consumed on the frontend.


## Riot

Riot is a user-interface library for creating [web components](//webcomponents.org), a topic I have been interested in lately and wanted to experiment with.

One of its features is letting you create custom tags like this:<br>

<pre class="language-markup">
<code>
  &lt;google-analytics id="UA-XXXXXXX-XX"&gt;
</code>
</pre>

This blog post is also rendered using a custom HTML tag `<blog-posts>`. It uses the JSON data generated using Gulp, and displays the most recent post along with a list of all posts.


## Why not use Wordpress or Jekyll?

Publishing systems are fairly monolithic pieces of software. Most established options out there go well beyond the goals of this blog, so I decided to go another route and build my own system (for the 3rd or 4th time?).

Platforms like Wordpress or Drupal are not optimized for a website of this scale. Jekyll is good alternative to my Gulp backend, but still offers more features than I need at this time. 

Until I find myself needing the more advanced features offered by other publishing platforms, I will likely stay with this extensible and minimalist system.

You can find the source code on [Github](https://github.com/jeremymouton/jeremymouton).