$( function() {
	getPosts();
});	

// DRIBBBLE
// http://api.dribbble.com/players/jeremymouton/shots/

function getPosts() {
	// Post parser for Tumblr blogs.
	// Change "blog_url" to pull in  a new feed. 

	var blog_name   = 'jeremymouton',
	    tumblr_feed = 'http://' + blog_name + '.tumblr.com/api/read/json?callback=?';

	$.getJSON(tumblr_feed, function(data) {
		getPosts(data.posts);
	});

	// HELPERS
	function getPosts(json) {
		for( var i=0, l=json.length; i<l; i++ ) {
			formatPost(json[i]);
		}
	}

	function formatPost(post) {
		var date     = moment.unix(post['unix-timestamp']).fromNow(),
			date_alt = moment.unix(post['unix-timestamp']).format("MMMM Do, YYYY"),
		    content  = post['regular-body'],
		    tags     = post['tags'],
		    type     = post.type,
		    icon;

		// Format post based on post type
		switch (type)
		{
		// Normal post
		case "regular":
			content = post['regular-body'];
			// icon    = 'icon-align-left';
			if ( $.inArray( "Twitter", tags ) != '-1' ) {
				icon    = 'icon-twitter';
			}

			break;

		// Link post
		case "link":
			content = '<span class="link-text"><a href="' + post['link-url'] + 
			          '" target="_blank">' + post['link-text'] + '</a></span>' +
			          '<span class="link-description"> ' + post['link-description'] + '</span>';
			// icon    = 'icon-link';
			break;

		// Video post
		case "video":
			content = '<div class="video-container">' + post['video-player-500'] + '</div><span class="video-caption">' + post['video-caption'] + '</span>';
			// icon    = 'youtube-play';
			break;

		// Photo post
		case "photo":
			content = '<div class="photo-container"><img src="' + post['photo-url-1280'] + 
			          '" alt=""></div>' +
			          '<span class="photo-caption">' + post['photo-caption'] + '</span>';
			// icon    = 'icon-picture';
			break;

		case "quote":
			content = '<blockquote>' + post['quote-text'] + '</blockquote>';
			// icon    = 'icon-quote-right';
			break;

		case "audio":
			content = post['audio-player'] + '<span class="song-caption">' + post['audio-caption'] + '</span>';
			// icon    = 'icon-music';
			break;
		}

		// Send it to the view
		$('#posts').append('<div class="post"><div class="post-content">' + content + '</div><i class="' + icon + '"></i><div class="post-date hover-reveal"><span>posted ' + date + '</span><span class="hover-target">' + date_alt + '</span></div></div>');

		// Remove duplicate dates
		// http://stackoverflow.com/a/2822974
		// var seen = {};
		// $('.post-date').each(function() {
		// 	var txt = $(this).text();
		// 	if (seen[txt])
		// 		$(this).text('');
		// 	else
		// 		seen[txt] = true;
		// });
	}
}