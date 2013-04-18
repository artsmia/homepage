var socialArray = new Array();

socialArray[0] = "http://www.facebook.com/artsmia";
socialArray[1] = "http://www.flickr.com/photos/minneapolisinstituteofarts/";
socialArray[2] = "http://www.twitter.com/artsmia";
socialArray[3] = "http://www.vimeo.com/artsmia";
socialArray[4] = "http://www.youtube.com/user/artsmia";

$(document).ready(function() {

	$('.socialbox').each(function(){
		var c = $(this).attr('class').split(' ')[1];
		switch(c){
			case "facebook":
				$(this).data('loc', 0);
				break;
			case "flickr":
				$(this).data('loc', 1);
				break;
			case "twitter":
				$(this).data('loc', 2);
				break;
			case "vimeo":
				$(this).data('loc', 3);
				break;
			case "youtube":
				$(this).data('loc', 4);
				break;
			default:
				break;
		}
	})
	
	$('.socialbox').click(function(){
		//alert("loc: "+$(this).data('loc'));
		var whatNum = $(this).data('loc');
		var whatLoc = socialArray[whatNum];
	  	window.location = whatLoc;
	});
	
	//@media only screen and (max-width: 760px) {
	
	function doneResizing() {
        if(Modernizr.mq('screen and (max-width: 760px)')) {
            $('.top-bar .has-dropdown').fadeIn('fast');
        }
        else{
            $('.top-bar .has-dropdown').fadeOut('fast');
        }
    }

    var id;
    $(window).resize(function() {
        clearTimeout(id);
        id = setTimeout(doneResizing, 0);
    });
    
    $('.top-bar .has-dropdown').fadeOut('fast');

    doneResizing();
	 
});