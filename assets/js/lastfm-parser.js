// ==============================
// Get a Last.fm feed
// Parse it
// Display to the view with album art, artist name and song title. 
// 
// Author: Jeremy Mouton
// Authored: April 2013

$( function() {
	getSongs();
});	

function getSongs() {
	var last_fm_username = 'halibuthero',
		lastfm_feed = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=' + last_fm_username + '&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?';

	$.getJSON(lastfm_feed, function(data) {
		var lastfm   = data.recenttracks.track[0];
		var date     = '';

		// Date formating
		// Returns "now playing" or time ago.
		(typeof lastfm.date != 'undefined') ? date = 'played ' + moment.unix(lastfm.date.uts).fromNow() : date = 'now playing...';


		// Send it to the view
		$('#latest-track').html('<a href="http://www.last.fm/user/halibuthero/tracks"><i class="icon-spotify-circled" target="_blank"></i>' + lastfm.name + ' - <span class="artist">' + lastfm.artist['#text'] + '</span><br /> <span class="timeago">' + date + '</span></a>');
	});

	setTimeout(getSongs, 30000);
}
