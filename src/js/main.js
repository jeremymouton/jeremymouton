// Web components

riot.mount('*', {
  projects: 'json/projects.json'
});


/* ************************* */
/*
 * Detect user location to suggest a different tour
 * 
 * Triggered if user didn't go through the landing page and
 * tour is different than detected country.
 *
 * Only checks US / GB.
 * 
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