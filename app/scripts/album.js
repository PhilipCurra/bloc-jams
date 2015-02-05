var currentlyPlayingSong = null;

var createSongRow = function(songNumber, songName, songLength) {
	var template =
		'<tr>' +
		'  <td class="song-number col-md-1" data-song-number="' + songNumber + '">' + songNumber + '</td>' +
		'  <td class="col-md-9">' + songName + '</td>' +
		'  <td class="col-md-2">' + songLength + '</td>' +
		'</tr>';

    var $row = $(template);

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-number');
        var songNumber = songNumberCell.data('song-number');
        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
        }
    };

    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-number');
        var songNumber = songNumberCell.data('song-number');
        if(songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };

    var clickHandler = function(event) {
        var songNumber = $(this).data('song-number');
        if(currentlyPlayingSong !== null) {
            var currentlyPlayingCell = $('.song-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if(currentlyPlayingSong !== songNumber) {
            $(this).html('<a class="album-song-button"><i class="fa fa-pause"></i></a>');
            currentlyPlayingSong = songNumber;
        } 
        else if(currentlyPlayingSong === songNumber) {
            $(this).html('<a class="album-song-button"><i class="fa fa-play"></i></a>');
            currentlyPlayingSong = null;
        }
    };

    $row.find('.song-number').click(clickHandler);
    $row.hover(onHover, offHover);
    return $row;
};

var changeAlbumView = function(album) {

	var $albumTitle = $('.album-title');
	$albumTitle.text(album.name);

	var $albumArtist = $('.album-artist');
	$albumArtist.text(album.artist);

	var $albumMeta = $('.album-meta-info');
	$albumMeta.text(album.year + " on " + album.label);

	var $albumImage = $('.album-image img');
	$albumImage.attr('src', album.albumArtUrl);

	var $songList = $(".album-song-listing");
	$songList.empty();
	var songs = album.songs;
	for(var i=0; i<songs.length; i++) {
		var songData = songs[i];
		var $newRow = createSongRow(i+1, songData.name, songData.length);
		$songList.append($newRow);
	}
};

var setupSeekBars = function() {
	$seekBars = $('.player-bar .seek-bar');
	$seekBars.click(function (event) {
		updateSeekPercentage($(this), event);
	});
};

if(document.URL.match(/\/album.html/)) {
	$(document).ready(function() {
		changeAlbumView(albumPicasso);
		setupSeekBars();
		$('#toggler').click(function() {
			changeAlbumView(albumMarconi);
		});
	});
}