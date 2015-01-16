var buildAlbumThumbnail = function() {
	var template =
		'<div class="collection-album-container col-md-2">' +
		'  <img src="/images/album-placeholder.png"/>'+
		'  <div class="caption album-collection-info">'+
		'    <p>'+
		'      <a class="album-name" href="/album.html"> Album Name </a>'+
		'      <br/>'+
		'      X songs'+
		'      <br/>'+
		'      X:XX Total Length'+
		'    </p>'+
		'  </div>'+
		'</div>';
	return $(template);
};

var updateCollectionView = function(){
	var $collection = $(".collection-container .row");
	$collection.empty();
	var max = Math.floor((Math.random()*76)+25);
	for(var i=0; i<max; i++) {
		var $newThumbnail = buildAlbumThumbnail();
		$collection.append($newThumbnail);
	}
};

if(document.URL.match(/\/collection.html/)) {
	$(document).ready(function() {
		updateCollectionView();
	});
}