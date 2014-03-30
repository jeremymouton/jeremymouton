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
		if (typeof lastfm.date != 'undefined') {
			pre = 'Last listened to'
			date = ' ' + moment.unix(lastfm.date.uts).fromNow();
		} else {
			pre = 'Currently listening to';
			date = '';
		}

		// Send it to the view
		$('#latest_track').html(pre + ' <a href="http://www.last.fm/user/halibuthero/tracks">' + lastfm.name + ' by <span class="artist">' + lastfm.artist['#text'] + '</span></a>'+ date + '.');
	});

	setTimeout(getSongs, 30000);
}
