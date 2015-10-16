/*
 * Web components
 */

riot.mount('*', {
  projects: 'json/projects.json'
});


/*
 * Detect 
 */

$(function() {
  $.get('http://ipinfo.io', function(response) {
    var zip = response.postal,
        zipPrefix = zip.substring(0, 2),
        html = '<div class="hi"><span>hi julie</span></div>';

    if (zipPrefix === '92') {
      $(html).appendTo('.header').addClass('is-hidden');
      setTimeout( function() {
        $('.hi').removeClass('is-hidden');
      }, 200);
    }
  }, 'jsonp');
});
