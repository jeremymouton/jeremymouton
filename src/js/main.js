// ==============================
// Get a Last.fm feed
// Parse it
// Display to the view with album art, artist name and song title.

$( function() {
	getSongs();
});

function getSongs() {
	var last_fm_username = 'halibuthero',
		lastfm_feed = 'http://ws.audioscrobbler.com/2.0/?method=user.getRecentTracks&user=' + last_fm_username + '&api_key=5b801a66d1a34e73b6e563afc27ef06b&limit=2&format=json&callback=?';

	$.getJSON(lastfm_feed, function(data) {
		var lastfm   = data.recenttracks.track[0],
            date = '',
            pre;

		// Date formating
		// Returns "now playing" or time ago.
		if (typeof lastfm.date != 'undefined') {
			pre = 'Last listened to';
			date = ' ' + moment.unix(lastfm.date.uts).fromNow();
		} else {
			pre = 'Currently listening to';
		}

		// Send it to the view
		$('[data-latest-track]').html(pre + ' <a href="//www.last.fm/user/halibuthero/tracks" target="_blank">' + lastfm.name + ' by <span class="latest-track__artist">' + lastfm.artist['#text'] + '</span></a>' + date);
	});

	setTimeout(getSongs, 10000);
}