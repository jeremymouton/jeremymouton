// Get last 4 posts
function getRecentPosts(json, length) {
	for( var i=0, l=length; i<l; i++ ) {
		formatPost(json[i]);
	}
}

// Get all posts
function getPosts(json) {
	for( var i=0, l=json.length; i<l; i++ ) {
		formatPost(json[i]);
	}
}

function formatPost(post) {
	var date    = moment.unix(post['unix-timestamp']).fromNow(),
	    content = post['regular-body'],
	    type    = post.type;

	// Format post based on post type
	switch (type)
	{
	// Normal post
	case "regular":
		if (post['regular-title'] == null)
		{
			content = post['regular-body'];
		} else {
			content = '<h3>' + post['regular-title'] + '</h3>' + post['regular-body']
		}
		break;

	// Link post
	case "link":
		content = '<span class="link-text"><a href="' + post['link-url'] + 
		          '" target="_blank">' + post['link-text'] + '</a></span>' +
		          '<span class="link-description"> ' + post['link-description'] + '</span>';
		break;

	// Video post
	case "video":
		content = '<div class="video-container">' + post['video-player-500'] + '</div><span class="video-caption">' + post['video-caption'] + '</span>';
		break;

	// Photo post
	case "photo":
		content = '<div class="photo"><img src="' + post['photo-url-1280'] + 
		          '" alt=""></div>' +
		          '<span class="photo-caption">' + post['photo-caption'] + '</span>';
		break;

	case "quote":
		content = '<blockquote>' + post['quote-text'] + '</blockquote>';
		break;

	case "audio":
		content = post['audio-player'] + '<span class="song-caption">' + post['audio-caption'] + '</span>';
		break;
	}

	// Send it to the view
	$('#posts').append('<div class="post"><div class="post-inner"><span class="post-date">' + date + '</span><div class="post-content">' + content + '</div></div></div>');
}